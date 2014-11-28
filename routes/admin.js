
// # routes - admin

exports = module.exports = function(IoC) {

  var app = this;

  app.get('/admin', IoC.create('controllers/admin'));

};

exports['@require'] = [ '$container' ];
exports['@singleton'] = true;
