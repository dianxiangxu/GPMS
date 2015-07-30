/*
 * Project: Twitter Bootstrap Hover Dropdown
 * Author: Cameron Spear
 * Contributors: Mattia Larentis
 *
 * Dependencies?: Twitter Bootstrap's Dropdown plugin
 *
 * A simple plugin to enable twitter bootstrap dropdowns to active on hover and provide a nice user experience.
 *
 * No license, do what you want. I'd love credit or a shoutout, though.
 *
 * http://cameronspear.com/blog/twitter-bootstrap-dropdown-on-hover-plugin/
 */
;(function($, window, undefined) {
    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $();

    function closeDropdowns(dropdowns) {
      dropdowns.filter('.open').children('[data-toggle="dropdown"]').dropdown('toggle');
    }

    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function(options) {

        // the element we really care about
        // is the dropdown-toggle's parent
        $allDropdowns = $allDropdowns.add(this.parent());

        return this.each(function() {
            var toggle = $(this),
                $this = toggle.parent(),
                defaults = {
                    delay: 500,
                    instantlyCloseOthers: true
                },
                data = {
                    delay: $(this).data('delay'),
                    instantlyCloseOthers: $(this).data('close-others')
                },
                options = $.extend(true, {}, defaults, options, data),
                hoverTimeout,
                unhoverTimeout;

            $this.hover(function() {
              window.clearTimeout(unhoverTimeout);

              //Use setTimeout(350) to wait for the touch devices to handle the tap event. Without it the menu would not work correctly on touch devices
              hoverTimeout = setTimeout(function () {
                if ($this.hasClass('open')) return;

                if (options.instantlyCloseOthers === true)
                  closeDropdowns($allDropdowns.not($this));

                toggle.dropdown('toggle');

                //Temporarily deactivate the toggle to wait for the dropdown animation to complete.
                //Because some people might think they have to click the menu to expand it, but the expansion actually has already started.
                //If we don't suppress the click event, it would cause the menu to collapse, which can be confusing.
                toggle.attr('data-toggle', 'temp-disabled');//We can't just remove it, since it's used as css selector in a few places
                setTimeout(function () {
                  toggle.attr('data-toggle', 'dropdown');
                }, 1000);
              }, 350);//350 seems to be long enough for most mobile browsers
            }, function() {
              window.clearTimeout(hoverTimeout);

              unhoverTimeout = window.setTimeout(function () {
                toggle.attr('data-toggle', 'dropdown');//in case it's changed temporarily
                closeDropdowns($this);
              }, options.delay);
            });
        });
    };

    $(document).ready(function() {
      //Some mobile browsers would trigger hover event automatically on the first focusable element when the page is loaded. We don't want to handle it. So a timeout is used
      setTimeout(function () {
        $('[data-hover="dropdown"]').dropdownHover();
      }, 1000);
    });
})(jQuery, this);