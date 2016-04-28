// var Promise = require('bluebird');
var request = require('request');

module.exports = {

  update: function(id, params) {
    return this._getModule(id)
      .then(this._updateModule(params))
      .then(this._broadcastChanges(params))
      .then(this._createEvents);
  },


  _getModule: function(id) {
    return Modules
      .find(id)
      .then(function(found) {
        return _.cloneDeep(found[0]);
      });
  },


  _updateModule: function(params) {
    return function(pre) {
      var id = pre.id,

          post = Modules
            .update(id, params)
            .then(function(updated) {
              return _.cloneDeep(updated[0]);
            });

      return Promise.all([ pre, post ]);
    };
  },


  _broadcastChanges: function(params) {
    return function(args) {
      var pre = args[0],
          post = args[1],

          id = pre.id;

      Modules.publishUpdate(id, params);

      request({
        method: 'POST',
        uri: 'http://' + pre.address + '/',
        body: params.values,
        json: true
      });

      return Promise.all([ pre, post ]);
    };
  },


  _createEvents: function(args) {
    var pre = args[0],
        post = args[1];

    return _.map(post.values, function(value, attribute) {
      var preValue = pre.values[attribute],
          postValue = post.values[attribute];

      if (typeof preValue !== "undefined" && preValue !== null) return;
      if (typeof postValue !== "undefined" && postValue !== null) return;
      if (preValue == postValues) return;

      return ModuleEventsService
        .create({
          module: post.id,
          attribute: attribute,
          value: postValue,
          previous: preValue
        });
    });
  }
};
