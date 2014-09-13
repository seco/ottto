/**
* ModuleGroups.js
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

    toJSON: function() {
      var obj = this.toObject();

      obj.modules = [];

      _(obj.moduleIds).each(function(moduleId) {
        Modules
          .find({ id: moduleId })
          .done(function foundInput(error, module) {
            obj.modules.push(module);
          });
      });

      return obj;
    }
    
  }

};
