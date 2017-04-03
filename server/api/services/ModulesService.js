var request = require('request');

module.exports = {

  update: function(id, params, req) {
    if(!id || _.isEmpty(params)) return;

    return this._getModule(id)
      .then(this._coerceValuesTypes(params))
      .then(this._updateModule)
      .then(this._broadcastChanges(req))
      .then(this._createEvents);
  },


  _getModule: function(id) {
    return Modules
      .find(id)
      .populate('type')
      .then(function(found) {
        return _.cloneDeep(found[0]);
      });
  },


  // TODO JJ: build this out into full fledged validations (min/max/etc)
  _coerceValuesTypes: function(params) {
    return function(module) {
      params.values = _.mapValues(params.values, function(value, key) {
        var attribute = _.find(module.type.attributes, { name: key });

        if (!attribute) return;

        switch(attribute.type) {
          case 'float':
            return Number(value);

          case 'boolean':
            if(typeof value == 'boolean') {
              return value;
            } else if(typeof value == 'string') {
              return value == 'true';
            }
            break;

          default:
            return value;
        }
      });

      return Promise.all([ module, params ]);
    };
  },


  _updateModule: function(args) {
    var pre = args[0],
        params = args[1],

        id = pre.id,

        post = Modules
          .update(id, params)
          .then(function(updated) {
            return updated[0];
          });

    return Promise.all([ pre, post, params ]);
  },


  _broadcastChanges: function(req) {
    return function(args) {
      var pre = args[0],
          post = args[1],
          params = args[2],

          id = pre.id;

      Modules
        .find(id)
        .populateAll()
        .then(function(modules) {
          Modules.publishUpdate(id, modules[0], req);
          return modules[0]
        });

      // // TODO: Have some sort of action confirm that the values
      // // sent were also received.  Fire some sort of messaging otherwise.
      // if (pre.ip) {
      //   request({
      //     url: 'http://' + pre.ip + '/',
      //     method: 'PUT',
      //     // TODO: Remove this hack, should be able to pass params as body
      //     qs: { plain: JSON.stringify({ values: params.values }) }
      //     // json: true,
      //     // body: params
      //   },
      //   function(error, response, body) {
      //     console.log('response', error, response, body);
      //   });
      //
      //   console.log('sending', pre.ip, { values: params.values });
      // }

      return Promise.all([ pre, post ]);
    }
  },


  _createEvents: function(args) {
    var pre = args[0],
        post = args[1];

    _.map(post.values, function(value, attribute) {
      var preValue = pre.values[attribute],
          postValue = post.values[attribute];

      if (typeof preValue == 'undefined' || preValue == null) return;
      if (typeof postValue == 'undefined' || postValue == null) return;
      if (preValue == postValue) return;

      ModuleEventsService
        .create({
          module: post.id,
          attribute: attribute,
          previous: preValue,
          value: postValue
        });
    });

    return post;
  }
};
