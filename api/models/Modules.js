/**
* Modules.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var _ = require('underscore');

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    type: {
      model: 'ModuleTypes'
    },

    group: {
      model: 'ModuleGroups'
    },

    values: {
      type: 'json'
    }
  },

  // TODO Figure out why this runs multiple times per PUT
  beforeUpdate: function(data, next) {
    if(!data.id) return;

    Modules.findOne(data.id).exec(function(err, module) {

      // Loop through values
      _(data.values).each(function(value, key) {
        // Find any that have changed
        if(value !== module.values[key]) {
          // Notifiy the system
          EventBus.emit('module:change', key, value, module.values[key], module);
        }
      }); // Context

      next();
    });
  }

};