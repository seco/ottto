/**
* ModuleEvents.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var _ = require('lodash');

module.exports = {

  attributes: {

    module: {
      model: 'Modules'
    },

    attribute: {
      type: 'string',
      required: true
    },

    value: {
      type: 'string',
      required: true
    },

    previous: {
      type: 'string'
    }

  },

  afterCreate: function(event, next) {

    // RulesService
    //   .match({
    //     module: event.module,
    //     attribute: event.attribute,
    //     value: event.value
    //   });

    next();

  }

};
