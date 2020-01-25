/*
 TEMPLATE NAME: Bootbox - Agency HTML Template
 TEMPLATE URI: - https://bootbox.froid.works/src/index.html
 DESCRIPTION: Bootbox Agency HTML Template is crafted carefully and with love which can bring attentions to your client to make things working good for your business.
 VERSION: 1.0.1
 AUTHOR: Ajay Kumar Choudhary
 AUTHOR URL: https://themeforest.net/user/ajay138/

 [TABLE OF CONTENT]
 1. PRE LOADER
 2. COLLAPSE NAVBAR ON SCROLL
 3. BACK TO TOP BUTTON
 4. CONTACT FORM
 5. COUNTERS
 6. TESTIMONIAL SLIDER
 7. CLIENT SLIDER
 8. Isotope And Masonry init
 9. Project Magnific Popup
 10. WOW JS init
 */

(function ($) {
  "use strict";

  /* (1) Pre Loader
   ========================================================================== */
  var preloader = $('#preloader');
  if (preloader.length > 0) {
    $(window).on("load", function () {
      preloader.fadeOut("slow");
    });
  }

  /*(2) Collapse Navbar on Scroll
   ========================================================================== */
  var affix = $('#affix');
  if (affix.length > 0) {
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll >= 50) {
        affix.addClass("sticky");
      } else {
        affix.removeClass("sticky");
      }
    });
  }

  /*(3) Back to Top Button
   ========================================================================== */
  var back_top = $('#back-top');
  if (back_top.length > 0) {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 150) {
        back_top.fadeIn(200);
      } else {
        back_top.fadeOut(200);
      }
    });
    back_top.on("click", function () {
      $("html, body").animate({
          scrollTop: 0
        },
        "slow"
      );
      return false;
    });
  }

  /*(4) Contact Form
   ========================================================================== */
  $('#contact-submit').on("click", function () {
    var un = $('#fullName').val();
    var em = $('#email').val();
    var msg = $('#message').val();
    $.ajax({
      type: "POST",
      url: "ajaxmail.php",
      data: {
        'username': un,
        'email': em,
        'msg': msg,
      },
      success: function (message) {
        var response = JSON.parse(message);
        if (response.status === 'success') {
          $('.form')[0].reset();
        }
        $('#error_contact').html(response.message);
      }
    });
  });

  /*(5) Counters
   ========================================================================== */

  if ($('#counters').length > 0) {
    var a = 0;
    $(window).scroll(function () {
      var oTop = $('#counters').offset().top - window.innerHeight;
      if (a === 0 && $(window).scrollTop() > oTop) {
        $('.count').each(function () {
          var $this = $(this),
            countTo = $this.attr('data-count');
          $({
            countNum: $this.text()
          }).animate({
            countNum: countTo
          }, {
            duration: 3000,
            easing: 'swing',
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
              //alert('finished');
            }
          });
        });
        a = 1;
      }

    });
  }

  /*(6) Testimonial Slider
   ========================================================================== */
  var testimonial_slider = $('#testimonial-slider');
  if (testimonial_slider.length > 0) {
    testimonial_slider.slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      autoplay: false,
      mobileFirst:true,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3
          }
        },
      ]
    });
  }

  /*(7) Client Slider
   ========================================================================== */
  var client_slider = $('#client-slider');
  if (client_slider.length > 0) {
    client_slider.slick({
      infinite: true,
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000,
      mobileFirst:true,
      responsive: [
        {
          breakpoint: 499,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 4
          }
        }
      ]

    });
  }

  /*(8) Isotope And Masonry
   ======================================*/
  var masonary_wrap = $('.masonary-wrap');
  if (masonary_wrap.length > 0) {
    $(window).on('load', function () {
      var $grid = masonary_wrap.isotope({
        itemSelector: '.port-item',
        percentPosition: true,
        masonry: {
          columnWidth: '.port-item'
        }
      });
      $('.sorting').on('click', '.filter-btn', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
          filter: filterValue
        });
      });
      $('.sorting li').on('click', function (event) {
        $(".filter-btn").removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
      });
    });
  }

  /*(9) Magnific Popup
   ======================================*/
  var project_selector = $('.project');
  if (project_selector.length > 0) {
    project_selector.magnificPopup({
      delegate: '.pop-btn',
      type: 'image',
      gallery: {
        enabled: true
      },
      removalDelay: 300,
      mainClass: 'animated fadeIn'
    });
  }

  /*(10) Wow JS
   ======================================*/
  var wow_selector = $('.wow');
  if (wow_selector.length > 0) {
    var wow = new WOW(
      {
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        scrollContainer: null // optional scroll container selector, otherwise use window
      }
    );
    wow.init();
  }
})(jQuery);