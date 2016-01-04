/**
 * ModulesController
 *
 * @description :: Server-side logic for managing modules
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var update = require('sails/lib/hooks/blueprints/actions/update');

module.exports = {

  update: function(req, res) {

    Modules
      .findOne(req.param('id'))
      .exec(function(err, module) {
        if (err) return res.json(err, 400);

        _.each(req.body.values, function(value, key) {
          if (value == module.values[key]) return;

          // Create Module Event
          ModuleEvents
            .create({
              module: module.id,
              attribute: key,
              value: value,
              previous: module.values[key]
            })
            .exec(function(err, event) { });

        });

        update(req, res);
      });

  }

};

