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

    function getArtistSongs(data, artist) {
        var albums = data.albums,
            songsArray = [];

        for (var i=0; i<albums.length; i++) {
            if (albums[i].artist === artist) {
                for (var j=0; j<albums[i].tracks.length; j++) {
                    songsArray.push(albums[i].tracks[j]);
                }
            }
        }

        return songsArray;
    }

    function getRandomArtistSongs(songs, limit) {
        var randomSongsArray = [];

        limit = Math.min(limit, songs.length);

        while (limit > 0) {
            var randomId = Math.floor(Math.random() * songs.length);

            randomSongsArray.push(songs[randomId]);
            songs.splice(randomId, 1);
            limit--;
        }

        return randomSongsArray;
    }

    function sortAlbumsBy(albums, sortCriteria, reverse) {
        var validSorts = ['name', 'artist', 'duration', 'releaseDate', 'trackCount'];

        if (validSorts.indexOf(sortCriteria) < 0) {
            throw Error('Invalid sort method. Accepted values: "name", "artist", "duration", "releaseDate", "trackCount"');
        } else {
            return sortByKey(albums, sortCriteria, reverse);
        }
    }

    function sortByKey(array, key, reverse) {
        reverse = reverse || false;

        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];

            if (typeof x == 'string') {
                x = x.toLowerCase();
                y = y.toLowerCase();
            }

            var result = x > y ? 1 : (x < y ? -1 : 0);

            if (reverse) {
                result *= -1;
            }

            return result;
        });
    }

    function clamp(value, min, max) {
        return value > max ? max : (value < min ? min : value);
    }

    // Expose methods
    return {
        getData: getJsonData,
        getAlbum: getAlbum,
        getArtistAlbums: getArtistAlbums,
        sortAlbumsBy: sortAlbumsBy,
        getSong: getSong,
        getArtistSongs: getArtistSongs,
        getRandomArtistSongs: getRandomArtistSongs
    };
})(jQuery);
