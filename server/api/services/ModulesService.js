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
      .findOne(id)
      .populate('type')
      .then(function(found) { return _.cloneDeep(found); });
  },


  // TODO JJ: build this out into full fledged validations (min/max/etc)
  _coerceValuesTypes: function(params) {
    return function(module) {
      params.values = _({})
        .extend(module.values, params.values)
        .mapValues(function(value, key) {
          if(module && module.type) {
            var attribute = _.find(module.type.attributes, { name: key });

            if (!attribute) return value;

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
          } else {
            return value
          }
        })
        .value();

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
        .findOne(id)
        .populateAll()
        .then(function(module) {
          var simplified = _.pick(module, [ 'id', 'values' ]);

          Modules.publishUpdate(id, simplified, req);

          if(req) {
            console.log('Sending:', 'modules/' + id, simplified)
            MqttService.publish({
              topic: 'modules/' + id,
              payload: JSON.stringify(simplified),
              qos: 0,
              retain: true
            });
          }
          return module;
        });

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
