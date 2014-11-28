
// # home

exports = module.exports = function(settings) {

  function home(req, res, next) {
    res.format({
      html: function() {
        res.render('home', {
          product: settings.application.product,
          company: settings.application.company,
          title: settings.application.title,
          description: settings.application.description,
          googleanalytics: settings.googleanalytics
        });
      },
      json: function() {
        res.status(200).end();
      }
    });
  }

  return home;

};

exports['@singleton'] = true;
exports['@require'] = [ 'igloo/settings' ];