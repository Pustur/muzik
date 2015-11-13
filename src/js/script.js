$(document).ready(function() {
    'use strict';

    // Cache DOM
    var $burger = $('.burger'),
        $sidebarCloseButton = $('.sidebar .close');

    // Event binding
    $(window).on('resize', function() {
        if (Sidebar.isActive() && $(this).innerWidth() >= 1024) {
            Sidebar.hide();
        }
    });
    $burger.on('click', function() {
        Sidebar.show();
    });
    $sidebarCloseButton.on('click', function() {
        Sidebar.hide();
    });
});
