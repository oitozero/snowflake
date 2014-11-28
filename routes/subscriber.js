
// # routes - subscriber

var express = require('express');

exports = module.exports = function(IoC) {

  var app = this;
  var router = express.Router();
  var controller = IoC.create('controllers/subscriber');

  router.post(
    '/',
    controller.create
  );

  app.use(
    '/subscriber',
    router
  );

};

exports['@require'] = [ '$container' ];
exports['@singleton'] = true;
