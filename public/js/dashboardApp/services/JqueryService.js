angular.module('DashboardApp').service('JqueryService', function() {
    this.defineScrollHandler = function(offset, duration) {
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.back-to-top').fadeIn(duration);
            } else {
                jQuery('.back-to-top').fadeOut(duration);
            }

        });
    };

    this.animateScrollOnTop = function(duration) {
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
    }
});
