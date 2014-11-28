
// # admin

var googleanalytics = require('googleanalytics');
var moment = require('moment');
var Q = require('q');
var _ = require('underscore');

exports = module.exports = function(settings, Subscriber) {

  function admin(req, res, next) {
    Subscriber.find().sort({createdAt: -1}).exec(function (err, subscribers) {
      pullPageViews()
      .then(function(counter){
        res.format({
          html: function() {
            res.render('admin/index', {
              product: settings.application.product,
              pageviews: counter,
              bouncerate: subscribers.length > 0 && counter > 0 ? Math.round((subscribers.length / counter) * 100) : 0, 
              subscribers: subscribers
            });
          },
          json: function() {
            res.status(200).end();
          }
        });
      })
      .catch(function(err){
        console.log(err);
        return next(err);
      });
    });
  }

  function pullPageViews(cb) {
    var deferred = Q.defer();
    var counter = 0;

    if( settings.googleanalytics.enabled ){
      var GA_USER = settings.googleanalytics.username;
      var GA_PASSWORD = settings.googleanalytics.password;
      var GA_TOKEN = settings.googleanalytics.token;
      var GA_PROFILE_ID = settings.googleanalytics.profile_id;
      var GA_START_DATE = moment().subtract(1, 'y').format('YYYY-MM-DD');
      var GA_END_DATE = moment().format('YYYY-MM-DD');

      var config = null;
      if(GA_TOKEN){
        config = {
          'token': GA_TOKEN
        };
      } else {
        config = {
          'user': GA_USER,
          'password': GA_PASSWORD
        };
      }

      try{
        var ga = new googleanalytics.GA(config);
        ga.login(function(err, token) {
          var options = {
            'ids': GA_PROFILE_ID,
            'start-date': GA_START_DATE,
            'end-date': GA_END_DATE,
            'dimensions': 'ga:date',
            'metrics': 'ga:pageviews',
            'sort': 'ga:date'
          };

          ga.get(options, function(err, entries) {
            _.each(entries, function(entry){
              counter += entry["metrics"][0]["ga:pageviews"];
            });
            deferred.resolve(counter);
          });
        });
      } catch(err){
        console.log(err);
        deferred.reject(counter);
      }
    } else {
      //@TODO implement in-app, mixpanel, ...
      deferred.resolve(counter);  
    }

    return deferred.promise;
  }

  return admin;

};

exports['@singleton'] = true;
exports['@require'] = [ 'igloo/settings', 'models/subscriber' ];