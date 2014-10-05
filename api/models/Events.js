/**
* Events.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var _ = require('underscore');

module.exports = {

  attributes: {

    module: {
      model: 'Modules'
    },

    action: {
      type: 'string',
      required: true
    }

  }

};
