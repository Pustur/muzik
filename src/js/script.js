$(document).ready(function() {
    'use strict';

    // Cache DOM
    var $burger = $('.burger'),
        $sidebarCloseButton = $('.sidebar .close'),
        $songInPlayer = $('.player > .song'),
        $queueButton = $songInPlayer.find('.queue-button'),
        $queueList = $songInPlayer.find('.queue-list');

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

    // Init
    if ($queueList.length > 0) {
        Randomator.getData(function(data) {
            var i,
                itemNumber = Math.floor(Math.random() * 20) + 1,
                songsString = '';

            for (i=0; i<itemNumber; i++) {
                var song = Randomator.getSong(data);

                songsString += '' +
                    '<li class="song' + (i === 0 ? ' active' : '') + '">' +
                        '<a href="album-detail.html">' +
                            '<img class="thumbnail" src="img/covers/' + song.imageUrl + '">' +
                        '</a>' +
                        '<div class="details">' +
                            '<a class="title truncate" href="#" title="' + song.name + '">' + song.name + '</a>' +
                            '<a class="artist truncate" href="artist-detail.html" title="' + song.artist + '">' + song.artist + '</a>' +
                        '</div>' +
                        '<div class="icon-bars">' +
                            '<div class="bar"></div>' +
                            '<div class="bar"></div>' +
                            '<div class="bar"></div>' +
                        '</div>' +
                        '<button class="player-button">' +
                            '<i class="material-icons tiny">more_vert</i>' +
                        '</button>' +
                        '<button class="player-button">' +
                            '<i class="material-icons tiny">clear</i>' +
                        '</button>' +
                    '</li>';

                if (i === 0) {
                    var songInPlayer = '';
                        songInPlayer += '' +
                            '<a href="album-detail.html">' +
                                '<img class="thumbnail" src="img/covers/' + song.imageUrl + '">' +
                            '</a>' +
                            '<div class="details">' +
                                '<a class="title truncate" href="#" title="' + song.name + '">' + song.name + '</a>' +
                                '<a class="artist truncate" href="artist-detail.html" title="' + song.artist + '">' + song.artist + '</a>' +
                            '</div>';

                    $queueButton.before(songInPlayer);
                }
            }

            $queueList.append(songsString);
        });
    }
});
