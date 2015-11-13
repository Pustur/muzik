var Player = (function($) {
    'use strict';

    // Variables
    var isPlaying = false,

        volume = 1,
        isMuted = false,
        volumeStates = ['volume_off', 'volume_mute', 'volume_down', 'volume_up'],

        settingsOpen = false,

        queueOpen = false;

    // Cache DOM
    var $playButton = $('.player .play-button'),
        $playIcon = $playButton.find('> .material-icons'),

        $volumeButton = $('.player .volume-button'),
        $sliderContainer = $('.player .slider-container'),
        $volumeIcon = $volumeButton.find('> .material-icons'),
        $volumeSlider = $sliderContainer.find('.volume.slider'),

        $settingsButton = $('.player .settings-button'),
        $settingsIcon = $settingsButton.find('> .material-icons'),
        $settingsMenu = $('.player .settings-container'),

        $queueButton = $('.player .queue-button'),
        $queueIcon = $queueButton.find('> .material-icons'),
        $queueContainer = $('.player .queue-container');

    // Event binding
    $playButton.on('click', function() {
        isPlaying = !isPlaying;
        $playIcon.text(isPlaying ? 'pause' : 'play_arrow');
    });

    $volumeButton.hover(function() {
        $sliderContainer.fadeIn();
    }, function() {
        $sliderContainer.fadeOut();
    });
    $volumeIcon.on('click', function() {
        isMuted = !isMuted;
        $(this).text(getVolumeIcon());
        $volumeSlider.attr('disabled', isMuted);
    });
    $volumeSlider.on('input', function() {
        volume = $(this).val();
        $volumeIcon.text(getVolumeIcon());
    });

    $settingsIcon.on('click', function() {
        settingsOpen = !settingsOpen;
        if (settingsOpen) {
            $(this).addClass('active');
            $settingsMenu.fadeIn();
        } else {
            $(this).removeClass('active');
            $settingsMenu.fadeOut();
        }
    });

    $queueIcon.on('click', function() {
        queueOpen = !queueOpen;
        if (queueOpen) {
            $(this).addClass('active');
            $queueContainer.fadeIn();
        } else {
            $(this).removeClass('active');
            $queueContainer.fadeOut();
        }
    });

    // Functions
    function getVolumeIcon() {
        if (isMuted) {
            return volumeStates[0];
        }

        if (volume < 1 / 3) {
            return volumeStates[1];
        } else if (volume > 2 / 3) {
            return volumeStates[3];
        }

        return volumeStates[2];
    }

    // Expose methods
    return {};
})(jQuery);
