/**
* Events.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var _ = require('underscore');

module.exports = {

  attributes: {
  
    moduleId: {
      type: 'integer',
      required: true
    },

    action: {
      type: 'string',
      required: true
    },

    toJSON: function() {
      var obj = this.toObject();

      return Events.withRelated(obj);
    }
  
  },

  withRelated: function(obj) {
    Modules
      .find({ id: obj.moduleId })
      .done(function(error, modules) {
    
        obj.module = modules[0];
    
      });

    return obj;
  },

  createFromModule: function(module) {
    
  },

  afterCreate: function(model, next) {
    Events.publishCreate(
      Events.withRelated(model)
    );

    Events
      .find()
      .sort({ createdAt: 'asc' })
      .skip(49)
      .done(function(error, events) {

        _(events).each(function(event) {
          
          Events
            .destroy(event.id)
            .exec(function(){
     
              next();
     
            });

          Events.publishDestroy(event.id);
        });

      });
  }

};
