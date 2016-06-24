angular.module('DashboardApp').service('JqueryService', function() {
    
    /**
    * Defines handler for scrolling, that changes appearing/disappearing state of scroll top button.
    * @param {number} offset The offset value that is the limit for chaging of visiblity state. 
    * @param {number} duration Duration of scrolling animation.
    */
    this.defineScrollHandler = function(offset, duration) {
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.back-to-top').fadeIn(duration);
            } else {
                jQuery('.back-to-top').fadeOut(duration);
            }

        });
    };

    /**
    * Scrolls on top of page and animates it.
    * @param {number} duration Duration of scrolling animation.
    */
    this.animateScrollOnTop = function(duration) {
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
    }
});
