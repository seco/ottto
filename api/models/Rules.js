/**
* Rules.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    // User-given name to the rule for easy targeting
    name: {
      type: 'string',
      required: true
    },

    // Used to decide whether all or any conditions need to be met
    operator: {
      type: 'string',
      required: true,
      defaultsTo: '&&'
    },

    // Array of IDs associated to the required conditions
    conditions: {
      collection: 'RuleConditions',
      via: 'rule'
    },

    // Array of IDs associated to the actions to be triggered
    actions: {
      type: 'array'
    }

  }

};
