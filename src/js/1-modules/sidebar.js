var Sidebar = (function($) {
    'use strict';

    // Variables
    var activeState = false;

    // Cache DOM
    var $sidebar = $('.sidebar'),
        $sidebarButton = $sidebar.find('.close'),
        $overlay = $('.overlay');

    // Functions
    function show() {
        $sidebar.addClass('active');
        $overlay.addClass('active');
        activeState = true;
    }

    function hide() {
        $sidebar.removeClass('active');
        $overlay.removeClass('active');
        activeState = false;
    }

    function isActive() {
        return activeState;
    }

    // Expose methods
    return {
        show: show,
        hide: hide,
        isActive: isActive
    };
})(jQuery);
