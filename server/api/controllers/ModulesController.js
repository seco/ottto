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
      .then(res.ok)
      .catch(res.badRequest);

  },


  register: function(req, res) {

    console.log('registering');

    return ModulesRegistrationService
      .register(req.param('chip'), req.param('ip'))
      .then(res.ok)
      .catch(res.badRequest);

  }

};
