
// # subscriber

var _ = require('underscore');
var _str = require('underscore.string');
_.mixin(_str.exports());

exports = module.exports = function(settings, logger, email, Subscriber) {

  function create(req, res, next) {

    // email
    if (_.isBlank(req.body.email)) {
      res.status(500).send({
        status: 'error',
        title: 'Error',
        message: 'Email was blank',
      });
      return;
    }

    Subscriber.findOne({email: req.body.email}, function (err, subscriber) {
      if( err ) {
        res.status(500).send({
          status: 'error',
          title: 'Error',
          message: 'Unknow error',
        });
        return;
      }
      if( subscriber ) {
        res.status(500).send({
          status: 'error',
          title: 'Error',
          message: 'Subscriber already exists'
        });
        return;
      }

      subscriber = new Subscriber({ email: req.body.email });
      subscriber.save(function (err) {
        if (err) {
          res.status(500).send({
            status: 'error',
            title: 'Error',
            message: 'Unknow error'
          });
          return;
        }
        subscriber.sendConfirmationEmail();
        res.status(200).send({
          status: 'success',
          title: settings.application.product,
          message: 'Subscriber added'
        });
      });
    });
  }

  return {
    create: create
  };

};

exports['@singleton'] = true;
exports['@require'] = [ 'igloo/settings', 'igloo/logger', 'igloo/email', 'models/subscriber' ];
