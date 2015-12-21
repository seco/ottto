/**
* RuleConditions.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    rule: {
      model: 'Rules'
    },

    module: {
      model: 'Modules',
      required: true
    },

    attribute: {
      type: 'string',
      required: true
    },

    operator: {
      type: 'string',
      enum: ['==', '!=', '>', '<', '> x <']
    },

    arguments: {
      type: 'array',
      required: true
    }

  }

};
