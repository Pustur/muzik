var Randomator = (function($) {
    'use strict';

    // Functions
    function getJsonData(callback) {
        $.getJSON('/db.json', function(results){
            if (typeof callback === 'function') {
                callback(results);
            }
        });
    }

    function getAlbum(data, id) {
        var albums = data.albums;

        if (Number.isInteger(id)) {
            id = clamp(id, 0, albums.length - 1);
        } else {
            id = Math.floor(Math.random() * albums.length);
        }

        console.log('id: ' + id);
        return albums[id];
    }

    function getSong(data, albumId, songId) {
        var albums = data.albums;

        if (Number.isInteger(albumId)) {
            albumId = clamp(albumId, 0, albums.length - 1);
        } else {
            albumId = Math.floor(Math.random() * albums.length);
        }

        if (Number.isInteger(songId)) {
            songId = clamp(songId, 0, albums[albumId].tracks.length - 1);
        } else {
            songId = Math.floor(Math.random() * albums[albumId].tracks.length);
        }

        console.log('albumId: ' + albumId + ' songId: ' + songId);
        return albums[albumId].tracks[songId];
    }

    function getArtistAlbums(data, artist, nameToExclude) {
        var albums = data.albums,
            albumsArray = [];

        nameToExclude = nameToExclude || '';

        for (var i=0; i<albums.length; i++) {
            if (albums[i].artist === artist && albums[i].name !== nameToExclude) {
                albumsArray.push(albums[i]);
            }
        }

        return albumsArray;
    }

    function clamp(value, min, max) {
        return value > max ? max : (value < min ? min : value);
    }

    // Expose methods
    return {
        getData: getJsonData,
        getAlbum: getAlbum,
        getArtistAlbums: getArtistAlbums,
        getSong: getSong
    };
})(jQuery);
