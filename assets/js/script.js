$( document ).ready(function() {


// Navbar search box slide toggle
//////////////////////////////////

var blurTime;

// Show navbar navbar box details on large screens
function navBarSelectDetailsShow() {
  $('.nav_search-box-details').slideDown(400);
  $('.nav_search-box-details').css("display", "flex");
  clearInterval(blurTime);
}

// Hide navbar navbar box details 
function navBarSelectDetailsHide() {
  if ($(window).width() > 991) {
    blurTime = setTimeout(function() {
      $('.nav_search-box-details').slideUp(300)
    }, 1000);
  } else {
    blurTime = setTimeout(function() {
      $('.nav_search-box-details').slideUp(300)
    }, 100);
  }
}

// On hover 
$('.nav_search-box-city, .nav_search-box-details').on("mouseover  mouseenter", function() {
  navBarSelectDetailsShow()
// when mouseOut 
}).on("mouseleave", function(){
  navBarSelectDetailsHide()

});

$('.nav_search-box-city input').on("keydown keypress", function() {
  navBarSelectDetailsShow()})



// OWL CAROSAL ADJUSTMENT
// ==========================

$('.owl-carousel.last-minutes-tours-slider, .owl-carousel.top-rated-tours-slider, .owl-carousel.tour_guides_slider').owlCarousel({
  loop:true,
  margin:20,
  dots: false,
  nav: true,
  autoplay:true,
  slideSpeed : 2000,
  autoplayTimeout:7500,
  autoplaySpeed : 1200,
  autoplayHoverPause:true,
  navText: ['<img src="../assets/img/arrow_left.png" alt="arrow left">','<img src="../assets/img/arrow_right.png" alt="arrow left">'],
  mouseDrag : true,
  touchDrag : true,
  responsive:{
      0:{
          items:1,
          nav:false,
          mouseDrag : false
         
      },
      750:{
          items:2,
          nav:false,
          mouseDrag : true
      },
      1200:{
          items:3,
          nav:true,
          mouseDrag : true
      }
  }
  
})


$('.owl-carousel.top_rated_attractions-slider').owlCarousel({
  loop:true,
  margin:20,
  dots: false,
  nav: true,
  autoplay:true,
  slideSpeed : 2000,
  autoplayTimeout:7500,
  autoplaySpeed : 1200,
  autoplayHoverPause:true,
  navText: ['<img src="../assets/img/arrow_left.png" alt="arrow left">','<img src="../assets/img/arrow_right.png" alt="arrow left">'],
  mouseDrag : true,
  touchDrag : true,
  responsive:{
      0:{
          items:1,
          nav:true,
          mouseDrag : false
      },
      600:{
          items:2,
          nav:false,
          mouseDrag : false
      },
      900:{
          items:4,
          nav:true,
          mouseDrag : true
      },
      1300:{
          items:5,
          nav:true,
      }
  }   
})



$('.open-popup-link').magnificPopup({
  type:'inline',
  alignTop : true,
  midClick: true

});

$('.open-popup-link').on('click', function() {
  $owl.trigger('refresh.owl.carousel');
})

var $owl = $('.owl-carousel.trip-attracions-slider').owlCarousel({
  loop:true,
  margin:30,
  dots: false,
  nav: true,
  autoplay:false,
  slideSpeed : 2000,
  autoplayTimeout:7500,
  autoplaySpeed : 1200,
  autoplayHoverPause:true,
  navText: ['<img src="../assets/img/arrow_left.png" alt="arrow left">','<img src="../assets/img/arrow_right.png" alt="arrow left">'],
  mouseDrag : true,
  touchDrag : true,
  responsive:{
      0:{
          items:1,
          nav:true,
          mouseDrag : false
      },
      600:{
          items:1,
          nav:true,
          mouseDrag : false
      },
      900:{
          items:2,
          nav:true,
      },
      1300:{
          items:2,
          nav:true,
      }
  }   
})




/* Profile Page Script */

// Function to get selected value
$('#trip-type').change(function() {
  let value = $("#trip-type option:selected").val();
  if (value == "opened") {
    $(".opened-trips").removeClass("d-none");
    $(".closed-trips").addClass("d-none");
    $(".pagination-nav").show();
    $(".pagination-nav").removeClass("d-none");
  } else if (value == "closed") {
    $(".opened-trips").addClass("d-none");
    $(".closed-trips").removeClass("d-none");
    $(".pagination-nav").removeClass("d-none");
  }
  else {
    $(".opened-trips").addClass("d-none");
    $(".closed-trips").addClass("d-none");
    $(".pagination-nav").hide();
  }
});

$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

/* Profile Page Script */



/*Messenger Page Script*/
$(".messages").animate({
  scrollTop: $(document).height()
}, "fast");

$("#profile-img").click(function() {
  $("#status-options").toggleClass("active");
});

$(".expand-button").click(function() {
  $("#profile").toggleClass("expanded");
  $("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function() {
  $("#profile-img").removeClass();
  $("#status-online").removeClass("active");
  $("#status-offline").removeClass("active");
  $(this).addClass("active");

  if ($("#status-online").hasClass("active")) {
    $("#profile-img").addClass("online");
  } else if ($("#status-offline").hasClass("active")) {
    $("#profile-img").addClass("offline");
  } else {
    $("#profile-img").removeClass();
  };

  $("#status-options").removeClass("active");
});

function newMessage() {
  message = $(".message-input input").val();
  if ($.trim(message) == '') {
    return false;
  }
  $('<li class="sent"><img src="../assets/img/avatar.jpg" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
  $('.message-input input').val(null);
  $('.contact.active .preview').html('<span>You: </span>' + message);
  $(".messages").animate({
    scrollTop: $(document).height()
  }, "fast");
};

$('.submit').click(function() {
  newMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    newMessage();
    return false;
  }
});

/*Messenger Page Script*/
/*Tourist Profile*/
$('.expand-icon').click(function() {
  if ($('.expand-icon').hasClass('fa-plus')) {
    $('i.expand-icon.fa.fa-plus').addClass('fa-minus');
    $('i.expand-icon.fa.fa-plus').removeClass('fa-plus');
  } else {
    $('i.expand-icon.fa.fa-minus').addClass('fa-plus');
    $('i.expand-icon.fa.fa-minus').removeClass('fa-minus');
  }
});
/*Tourist Profile*/

/*Filteration Page*/
$('.cat-icon').click(function() {
  if ($('.cat-icon').hasClass('fa-plus')) {
    $('i.cat-icon.fa.fa-plus').addClass('fa-minus');
    $('i.cat-icon.fa.fa-plus').removeClass('fa-plus');
  } else {
    $('i.cat-icon.fa.fa-minus').addClass('fa-plus');
    $('i.cat-icon.fa.fa-minus').removeClass('fa-minus');
  }
});
$('.other-icon').click(function() {
  if ($('.other-icon').hasClass('fa-plus')) {
    $('i.other-icon.fa.fa-plus').addClass('fa-minus');
    $('i.other-icon.fa.fa-plus').removeClass('fa-plus');
  } else {
    $('i.other-icon.fa.fa-minus').addClass('fa-plus');
    $('i.other-icon.fa.fa-minus').removeClass('fa-minus');
  }
});
/*Filteration Page*/
/*Blog Page*/
$(document).ready( function() {
    	$(document).on('change', '.btn-file :file', function() {
		var input = $(this),
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [label]);
		});

		$('.btn-file :file').on('fileselect', function(event, label) {

		    var input = $(this).parents('.input-group').find(':text'),
		        log = label;

		    if( input.length ) {
		        input.val(log);
		    } else {
		        if( log ) alert(log);
		    }

		});
		function readURL(input) {
		    if (input.files && input.files[0]) {
		        var reader = new FileReader();

		        reader.onload = function (e) {
		            $('#img-upload').attr('src', e.target.result);
		        }

		        reader.readAsDataURL(input.files[0]);
		    }
		}

		$("#imgInp").change(function(){
		    readURL(this);
		});
	});
/*Blog Page*/

/* Global */
$('.collapse').on('shown.bs.collapse', function () {
  $(this).parent().find(".fa-angle-double-right").removeClass("fa-angle-double-right").addClass(
    "fa-angle-double-down");
}).on('hidden.bs.collapse', function () {
  $(this).parent().find(".fa-angle-double-down").removeClass("fa-angle-double-down").addClass(
    "fa-angle-double-right");
});
$("#accordion").on('show.bs.collapse', '.collapse', function () {
  $("#accordion").find('.collapse.in').collapse('hide');
});


}); //document.ready