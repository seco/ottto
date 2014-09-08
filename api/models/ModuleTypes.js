/**
* ModuleTypes.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    type: {
      type: 'string',
      required: true,
      in: [ 'boolean', 'float', 'string' ]
    },

    direction: {
      type: 'string',
      required: true,
      in: [ 'input', 'output' ]
    }
  
  }

};