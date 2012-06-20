/*
 * Bootstrap Carousel Animate JS 1.0
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

  $.extend($.fn.carousel.defaults, {
    duration: 600
  , easing: 'swing'
  , adjustHeight: true
  })

  var originalSlide = $.fn.carousel.Constructor.prototype.slide

  $.fn.carousel.Constructor.prototype.slide = function (type, next) {
    var $active = this.$element.find('.active')
      , $next = next || $active[type]()
      , isCycling = this.interval
      , direction = type == 'next' ? 'left' : 'right'
      , fallback  = type == 'next' ? 'first' : 'last'
      , that = this
      , e = $.Event('slide')
      , duration = this.options.duration
      , easing = this.options.easing
    
    if (this.options.adjustHeight) {
      this.$element.css({height: $active.height()})
      this.$element.filter('.slide').one('slid', function () {
        var $element = $(this)
          , height = $element.find('.active').height()
        // Adjust the height of the carousel for the active content:
        if (!$.support.transition)
          $element.animate({height: height}, duration, easing)
        else
          $(this).css({height: height})
      })
    }
    
    if(!$.support.transition && this.$element.hasClass('slide')) {
      this.$element.find('.item').stop(true, true);

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      if ($next.hasClass('active')) return

      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $active.animate({left: (direction == 'right' ? '100%' : '-100%')}, duration, easing, function(){
        $active.removeClass(['active', direction].join(' ')).css('left', '')
        that.sliding = false
        setTimeout(function () { that.$element.trigger('slid') }, 0)
      })
      $next.animate({left: '0%'}, duration, easing, function(){
        $next.removeClass([type, direction].join(' ')).addClass('active').css('left', '')
      })

      isCycling && this.cycle()

      return this
    }
    
    return originalSlide.call(this, type, next)
  }
    
}(window.jQuery);
