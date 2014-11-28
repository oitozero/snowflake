
// # confirm

var crypto = require('crypto');

exports = module.exports = function(settings, logger, Subscriber) {

  function confirm(req, res, next) {

    var s = req.query.s;
    var t = req.query.t;

    console.log('s:' + s);
    console.log('t:' + t);

    Subscriber.findById(s, function (err, subscriber) {
      if(err) {
        res.render('confirm', {
          status: 'error',
          message: 'Unknow subscriber',
          product: settings.application.product
        });
        return;
      }

      console.log(subscriber);

      if(subscriber.confirmedAt) {
        res.render('confirm', {
          status: 'error',
          message: 'Subscriber already confirmed',
          product: settings.application.product
        });  
        return;
      }

      var md5 = crypto.createHash( 'md5' );
      md5.update( subscriber.id + subscriber.email, 'utf8' );
      var hash = md5.digest( 'hex' );

      if(hash !== t) {
        res.render('confirm', {
          status: 'error',
          message: 'Unable to verify subscriber',
          product: settings.application.product
        });  
        return;
      } 

      res.render('confirm', {
        status: 'success',
        message: 'Thank you',
        product: settings.application.product
      });  

      subscriber.confirmedAt = new Date();
      subscriber.save(function(err){
        if(err){
          logger.error(err);
        }
      });
    });
  }

  return confirm;

};

exports['@singleton'] = true;
exports['@require'] = [ 'igloo/settings', 'igloo/logger', 'models/subscriber' ];