module.exports = {

  create: function(params) {

    return this._createEvent(params)
      .then(this._execRules);

  },


  _createEvent: function(params) {

    return ModuleEvents
      .create(params);

  },


  _execRules: function(event) {

    return RulesService
      .match({
        module: event.module,
        attribute: event.attribute,
        value: event.value
      });

  }


};
