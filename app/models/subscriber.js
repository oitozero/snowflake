
// # subscriber

var util = require('util');
var validator = require('validator');
var _ = require('underscore');
var _str = require('underscore.string');
_.mixin(_str.exports());
var crypto = require('crypto');
var MailChimpAPI = require('mailchimp').MailChimpAPI;

exports = module.exports = function(settings, mongoose, email, logger) {

  var nameType = {
    type: String,
    required: true,
    validate: [ function(val) { return !_.isBlank(val); }, '{path} was blank' ],
    trim: true
  };

  var Subscriber = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [ validator.isEmail, 'Email is not a valid address' ],
      trim: true
    },
    confirmedAt: Date,
    createdAt: Date,
    updatedAt: Date
  });

  // pre save
  Subscriber.pre('save', function(next) {
    var subscriber = this;
    if (!subscriber.createdAt) {
      subscriber.createdAt = new Date();
    }
    subscriber.updatedAt = new Date();
    next();
  });

  // virtuals

  Subscriber.virtual('object').get(function() {
    return 'subscriber';
  });

  // methods
  Subscriber.methods.sendConfirmationEmail = function sendConfirmationEmail(callback) {
    var subscriber = this;

    if(settings.mailchimp.enabled) {
      var api;
      try { 
        api = new MailChimpAPI(settings.mailchimp.apiKey, { version : '2.0', secure : false });
      } catch (error) {
        logger.error(error.message);
      }

      // submit subscription request to mail chimp
      api.lists_subscribe({id: settings.mailchimp.listId, email: {email: subscriber.email}}, function(data) {
        logger.info('sent confirmation email to %s', subscriber.email);
      }, function(error) {
        logger.error(error);
      }); 

    } else {

      var md5 = crypto.createHash( 'md5' );
      md5.update( subscriber.id + subscriber.email, 'utf8' );
      var hash = md5.digest( 'hex' );

      var link = settings.url + '/confirm?s=' + subscriber.id + '&' + 't=' + hash;

      email('confirmation', {
        link: link,
        email: settings.application.email
      }, {
        to: subscriber.email,
        from: settings.application.email,
        subject: util.format('%s: Please Confirm Subscription', settings.application.product)
      }, function(err, responseStatus) {
        if (_.isFunction(callback)) {
          return callback(err, responseStatus);
        }
        if (err) {
          return logger.error(err);
        }
        logger.info('sent confirmation email to %s', subscriber.email);
      });
    }
  };

  return mongoose.model('Subscriber', Subscriber);
};

exports['@singleton'] = true;
exports['@require'] = [ 'igloo/settings', 'igloo/mongo', 'igloo/email', 'igloo/logger' ];
