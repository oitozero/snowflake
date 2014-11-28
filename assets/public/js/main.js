
(function(window, $) {
  'use strict';

  $('#email-btn').click(function(){
  	var email = $('#email-input').val();

  	if( !validateEmail(email) ) {
  		window.sweetAlert('Error', 'Your email is not valid', 'error');
      return;
  	}

  	$.post( '/subscriber', {email: email}, function(response) {
      $('#email-input').val('');
      window.sweetAlert(response.title, response.message, response.status); 
    })
    .fail(function(error) {
      $('#email-input').val('');
      var response = error.responseJSON;
      window.sweetAlert(response.title, response.message, response.status); 
    });

  });

  // validate email
  function validateEmail(email) { 
  	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
	} 

}(window, jQuery));
