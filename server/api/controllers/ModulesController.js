/**
 * ModulesController
 *
 * @description :: Server-side logic for managing modules
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  update: function(req, res) {

    return ModulesService
      .update(req.param('id'), req.body)
      .then(function(module) {
        res.ok(module);
      });

  }

};
