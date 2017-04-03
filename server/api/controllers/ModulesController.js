/**
 * ModulesController
 *
 * @description :: Server-side logic for managing modules
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  update: function(req, res) {

    ModulesService
      .update(req.param('id'), req.body, req)
      .catch(res.badRequest);

    return Modules
      .find(req.param('id'))
      .populateAll()
      .then(res.ok);

  },


  register: function(req, res) {

    console.log('registering', req.param('chip'), req.param('ip'));

    return ModulesRegistrationService
      .register(req.param('chip'), req.param('ip'))
      .then(res.ok)
      .catch(res.badRequest);

  }

};
