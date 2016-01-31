var Promise = require('bluebird');

module.exports = {

  update: function(id, params) {

    return this._getModule(id, params)
      .then(this._createEvents);

  },


  _getModule: function(id, params) {

    return Modules
      .find(id)
      .then(function(response) {

        return _.cloneDeep(response);

      })
      .then(function(previous) {

        var id = previous[0].id;

        return Modules
          .update(id, params)
          .then(function(next) {

            Modules.publishUpdate(id, _.cloneDeep(params));

            return Promise.all([ previous, next ]);

          });

      });

  },


  _createEvents: function(response) {

    var previous = response[0][0],
        next = response[1][0];

    return _.map(next.values, function(nex, attribute) {
      var prev = previous.values[attribute];

      if (prev && prev == nex) return;

      return ModuleEventsService
        .create({
          module: next.id,
          attribute: attribute,
          value: nex,
          previous: prev
        });
    });

  }


};
