$(function() {

  "use strict";

  /*===============================================
    Parallax
  ===============================================*/
  $(".parallax-section").parallax({
    speed : 0.3
  });

  /*===============================================
    Circular Progress bar
  ===============================================*/
  $(".dial").knob({
    'width': '100',
    'height': '100',
    'thickness': .03,
    'fgColor': 'rgb(255, 255, 255)',
    'bgColor': 'rgba(255, 255, 255, .0)',
    'inputColor': 'rgb(255, 255, 255)',
    'readOnly': true,
    'font': 'Open Sans',
    'fontWeight': "300",
      parse: function (v) {return parseInt(v, 10);},
      format: function (v) {return v + "%";}
  });

  /*===============================================
    Circular Progress bar Animate when visible
  ===============================================*/
  $(".dial").each(function () {
    var $this = $(this);
    var myVal = $this.data("number");
    $(".skill-bar").appear(function() {
      $({
        value: 0
      }).animate({
        value: myVal,
      }, {
        duration: 2000,
        easing: 'swing',
        step: function () {
          $this.val(Math.ceil(this.value)).trigger('change');
        }
      })
    },{accX: 0, accY: -10});
  });

  /*===============================================
    Contact Form
  ===============================================*/
  $("#contactform").on('submit',function(e) {
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    if (name == '') {
      $("#name").css('border-color','rgba(255, 0, 0, 0.7)');
    }
    if (email == '') {
      $("#email").css('border-color','rgba(255, 0, 0, 0.7)');
    }
    if (message == '') {
      $("#message").css('border-color','rgba(255, 0, 0, 0.7)');
    }
    else {
      $.ajax({
        url:'contact_form.php',
        data:$(this).serialize(),
        type:'POST',
        success:function(data){
          $("#success").show().fadeIn(1000); //=== Show Success Message==
          $('#contactform').each(function(){
            this.reset();
          });
        },
        error:function(data){
          $("#error").show().fadeIn(1000); //===Show Error Message====
        }
      });
    }
    e.preventDefault(); //=== To Avoid Page Refresh and Fire the Event "Click"===
  });

  /*===============================================
    Magnific Popup
  ===============================================*/
  $('.lightbox-popup').magnificPopup({ 
    type:'inline',
    fixedContentPos: false,
    removalDelay: 100,
    closeBtnInside: true,
    preloader: false,
    mainClass: 'mfp-fade'
  });

  /*===============================================
    Counter
  ===============================================*/
  $(".facts-background [data-to]").each(function() {
    var $this = $(this);
    $this.appear(function() {
      $this.countTo({
        speed: 1500,
        onComplete: function() {
          if($this.data("append")) {
            $this.html($this.html() + $this.data("append"));
          }
        }
      });
    }, {accX: 0, accY: -10});
  });

  /*===============================================
    Owl Carousel
  ===============================================*/
  $("#portfolioSlider").owlCarousel({
    slideSpeed: 400,
    paginationSpeed: 400,
    rewindSpeed: 800,
    singleItem: true
  });

  $("#clientSlider").owlCarousel({
    items: 3,
    itemsDesktop: [1199,3],
    itemsDesktopSmall: [979,2],
    itemsTablet: [768,1],
    itemsMobile: [479,1],
    autoPlay: 2000, // 2 seconds
    stopOnHover: true,
    pagination: false,
    slideSpeed: 400,
    paginationSpeed: 400,
    rewindSpeed: 800,
    singleItem: false
  });

  /*===============================================
    Google Maps
  ===============================================*/
  var markerIcon = "images/marker.png";
  // Map Initial Location
  var initLatitude = 51.513569; // <- Latitude here
  var initLongitude = -0.123443; // <- Longitude here
  
  var map = new GMaps({
    el: '#map-canvas',
    lat: initLatitude,
    lng: initLongitude,
    zoom: 16,
    disableDefaultUI: true
  });
  map.addMarker({
    lat : initLatitude,
    lng : initLongitude,
    icon: markerIcon
  });

  /*===============================================
    Preloader
  ===============================================*/
  $(window).load(function () {
    $("body").addClass("loaded");
  });

  /*===============================================
    Smooth Scrolling
  ===============================================*/
  $(document).ready(function(e) {
    $(".menu li a, .hire-background a").on("click", function(e) {
      e.preventDefault();
      $("html,body").animate({scrollTop: $(this.hash).offset().top}, 800, "easeInOutQuart");                                       
    });
  });

  /*===============================================
    Scroll Spy
  ===============================================*/
  $('body').scrollspy({ target: '.menu' });

  /*===============================================
    Toggle Menu
  ===============================================*/
  $(".toggle-btn").on("click", function(e) {
    e.stopPropagation();
    if ($(".menu").hasClass("show-menu")) {
      $(".menu").removeClass("show-menu");
    }
    else {
      $(".menu").addClass("show-menu");
    }
  });

  // Navicon transform into X //
  $(".toggle-btn").on("click", function() {
    if ($(".toggle-btn").hasClass("toggle-close")) {
      $(".toggle-btn").removeClass("toggle-close");
    }
    else {
      $(".toggle-btn").addClass("toggle-close");
    }
  });

  // Close Menu
  $(document).on("click", function() {
    if ($(".menu").hasClass("show-menu")) {
      $(".menu").removeClass("show-menu");
    }
    if ($(".toggle-btn").hasClass("toggle-close")) {
      $(".toggle-btn").removeClass("toggle-close");
    }
  });
  
  /*===============================================
    end Toggle Menu
  ===============================================*/
});