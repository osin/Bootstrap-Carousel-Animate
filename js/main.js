/*
 * Bootstrap Carousel Animate JS Example 1.0
 * https://github.com/blueimp/Bootstrap-Carousel-Animate
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

!function ($) {

  "use strict"; // jshint ;_;

  // Initialize the carousels:
  $('.carousel').carousel({
    duration: 600 // default
  , easing: 'easeInOutExpo' // default is 'swing'
  , adjustHeight: true // default
  }).on('slide', function () {
    // Pause videos if the carousel goes on:
    var activeVideo = $(this).find('.active .vjs-playing');
    activeVideo.length && window._V_(activeVideo.prop('id')).pause()
  })

  $('.video-js').each(function () {
    var carousel = $(this).closest('.carousel')
    window._V_($(this).prop('id')).ready(function () {
      // Pause the carousel when a video is played:
      this.addEvent('play', function () {
        carousel.carousel('pause');
      })
    })
  })

}(window.jQuery);
