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
    },

    on: function(event) {
      if (!event) throw('An event is required to "on".');

      var obj = this.toObject();

      // Find rules that match
      // TODO move this logic into Rules model as Rules.match(input, event)
      Rules
        .find({
          inputId: obj.id,
          event: event
        })
        .then(function foundRule(error, rules) {
          _(rules).each(function(rule) {
            rule.do();
          });
        });

      // Create event log item
      Events
        .create({
          moduleId: this.id,
          action: action
        })
        .then(function() {});
    },
    
    do: function(action) {
      console.log('do: ', action);
      if (action === undefined || !Radio.send) {
        return;
      }


      Radio.send(this.name, action);
    }
  },

  beforeUpdate: function(attributes, cb) {
    Modules
      .findOne({ id: attributes.id })
      .then(function(module) {
        if (module.status !== attributes.status) {
          module.do(attributes.status);
        }
      });

    cb();
  },

  afterDestroy: function(records, cb) {
    Events
      .find({
        'moduleId': this.id
      })
      .then(function(error, events) {
        _(events).each(function(event) {
          Events.destroy(event.id);
        });
      });

    cb();
  }

};