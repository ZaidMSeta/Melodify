document.addEventListener('DOMContentLoaded', function () {
    const playlistContainer = document.getElementById('playlist-container');

    // Fetch JSON data from external file
    fetch('jsondata/playlistdata.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(playlist => {
                // Create playlist header
                const header = document.createElement('div');
                header.classList.add('playlist-header');

                const image = document.createElement('img');
                image.src = playlist.album_cover;
                image.alt = playlist.title;
                image.classList.add('playlist-image');
                header.appendChild(image);

                const title = document.createElement('h1');
                title.textContent = playlist.title;
                header.appendChild(title);

                const description = document.createElement('p');
                description.textContent = playlist.description;
                description.classList.add('playlist-description');
                header.appendChild(description);

                playlistContainer.appendChild(header);

                // Create song container
                const songContainer = document.createElement('div');
                songContainer.id = 'song-container';

                playlist.songs.forEach(song => {
                    const songItem = document.createElement('div');
                    songItem.classList.add('song-container');

                    const songImage = document.createElement('img');
                    songImage.src = song.image;
                    songImage.alt = song.songname;
                    songImage.classList.add('song-image');
                    songItem.appendChild(songImage);

                    const songInfo = document.createElement('div');
                    songInfo.classList.add('song-info');

                    const songTitle = document.createElement('h3');
                    songTitle.textContent = song.songname;
                    songInfo.appendChild(songTitle);

                    const songArtist = document.createElement('p');
                    songArtist.textContent = song.artist;
                    songInfo.appendChild(songArtist);

                    songItem.appendChild(songInfo);

                    songContainer.appendChild(songItem);
                });

                playlistContainer.appendChild(songContainer);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
