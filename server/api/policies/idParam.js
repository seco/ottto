module.exports = function(req, res, next) {
  var id = req.param('id');

  if (id && req.body) {
    req.body.id = id;
  }

  next();
};