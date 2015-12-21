/**
* Modules.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var _ = require('lodash');

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
    if (!data.id) return next();

    Modules
      .findOne(data.id)
      .then(function(module) {

        // Loop through values
        _(data.values).each(function(value, key) {
          if (value == module.values[key]) return;

          // Create Event Model
          Events
            .create({
              module: data.id,
              attribute: key,
              value: value,
              previous: module.values[key]
            })
            .exec(function() {
              console.log(arguments);
            });

        });

        next();
      });

  }

};