/**
 * ModulesController
 *
 * @description :: Server-side logic for managing modules
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  update: function(req, res) {
    data = req.body[0] || req.body;

    if ( data && data.values ) delete data.values;

    Modules
      .update({ id: req.param('id') }, req.body)
      .exec(function(err, module) {
        res.status(200).json(module);
      });

  }

};

