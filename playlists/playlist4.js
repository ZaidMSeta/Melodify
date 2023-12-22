$(document).ready(function () {
    $.getJSON('../jsondata/playlist4.json', function (data) {
        var playlistContainer = $('#playlist-container');

        $.each(data, function (index, song) {
            var songItem = $('<div class="song-item">');
            var songImage = $('<img class="song-image" src="' + song.image + '">');
            var songDetails = $('<div class="song-details">');
            var songName = $('<div class="song-name">' + song.songname + '</div>');
            var artistName = $('<div class="artist-name">' + song.artist + '</div>');

            songDetails.append(songName, artistName);
            songItem.append(songImage, songDetails);
            playlistContainer.append(songItem);

            // Create song_card element and add click event listener
            var song_card = songItem.get(0);
            song_card.addEventListener("click", () => playSong(song.songid));
        });
    });
});

fetch("../songdata.json")
    .then(res => res.json())
    .then(data => {
        console.log("working2")
        songs = data.map((song, index) => {
            // You can remove this part since the click event is added inside the first part
            console.log("working3")
            return { id: song.songid, card: song_card }
        });
});

function playSong(id) {
    console.log("Clicked on song with id:", id);
  
    // Redirect to the song player page with the selected song ID
    window.location.href = `../songplayer.html?id=${id}`;
}
