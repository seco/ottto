/**
 * ModuleEventsController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var create = require('sails/lib/hooks/blueprints/actions/create');

module.exports = {

  create: function(req, res) {

    create(req, res);

  }

};


// RulesService
//   .match({
//     module: event.module,
//     attribute: event.attribute,
//     value: event.value
//   });