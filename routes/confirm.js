
// # routes - confirm

exports = module.exports = function(IoC) {

  var app = this;

  app.get('/confirm', IoC.create('controllers/confirm'));

};

exports['@require'] = [ '$container' ];
exports['@singleton'] = true;
