$(document).ready( function() {
	$('#tourist-sign-in').submit(function(e){
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: tourist_signin,
			data: new FormData(this),
			processData: false,
			contentType: false,
			success: function(data,status) {
				toastr.info(data.msg, 'Welcome', {timeOut: delay});
				setTimeout(function() {location.reload();}, delay);},
		   error: function(data,status) {
				console.log(data.responseJSON);
				toastr.error(data.responseJSON.msg, 'Validation' , {timeOut: delay});
		   }
		});
	});
});
$(document).ready( function() {
	$('#tourguide-sign-in').submit(function(e){
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: tourguide_signin,
			data: new FormData(this),
			processData: false,
			contentType: false,
			success: function(data,status) {
				toastr.info(data.msg, 'Welcome', {timeOut: delay});
				setTimeout(function() {location.reload();}, delay);
			},
			error: function(data,status) {
				toastr.error(data.responseJSON.msg, 'Validation' , {timeOut: delay});
		   }
		});
	});
});

$(document).ready( function() {
	$('#tourist-sign-up').submit(function(e){
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: tourist_signup,
			data: new FormData(this),
			processData: false,
			contentType: false,
			success: function(data,status) {
				toastr.info('Congrats', 'Signed Up successfully', {timeOut: delay});
				$('#sign-up-modal').modal('hide');
				$('#sign-in-modal').modal('show');
			},
			error: function(data,status) {
				if ((data.responseJSON.msg)){
					if ((data.responseJSON.msg.name))  toastr.error(data.responseJSON.msg.name, 'Validation' , {timeOut: delay});
					if ((data.responseJSON.msg.email))  toastr.error(data.responseJSON.msg.email, 'Validation' , {timeOut: delay});
					if ((data.responseJSON.msg.password))  toastr.error(data.responseJSON.msg.password, 'Validation' , {timeOut: delay});
				}
				else
					toastr.error('Something went wrong', 'Try Again' , {timeOut: delay});		 
		  }
		});
	});
});

$(document).ready( function() {
	$('#tourguide-sign-up').submit(function(e){
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: tourguide_signup,
			data: new FormData(this),
			processData: false,
			contentType: false,
			success: function(data,status) {
				toastr.info('Congrats', 'Signed Up successfully', {timeOut: delay});
				$('#sign-up-modal').modal('hide');
				$('#sign-in-modal').modal('show');
			},
			error: function(data,status) {
				if ((data.responseJSON.msg)){
					if ((data.responseJSON.msg.name))  toastr.error(data.responseJSON.msg.name, 'Validation' , {timeOut: delay});
					if ((data.responseJSON.msg.email))  toastr.error(data.responseJSON.msg.email, 'Validation' , {timeOut: delay});
					if ((data.responseJSON.msg.password))  toastr.error(data.responseJSON.msg.password, 'Validation' , {timeOut: delay});
					if ((data.responseJSON.msg.phoneNumber))  toastr.error(data.responseJSON.msg.phoneNumber, 'Validation' , {timeOut: delay});
				}
				else
					toastr.error('Something went wrong', 'Try Again' , {timeOut: delay});		 
		  }
		});
	});
});

$('#sign-out').click(function(){
  $.ajax({
	type: 'POST',
	url: signout,
	success: function(status) {
		toastr.info('Logged Out', 'Bye ' , {timeOut: delay});
		// Simulate an HTTP redirect:
		window.location.replace(home);
	},
  });
});

