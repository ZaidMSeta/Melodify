const songCardTemplate = document.querySelector("[data-song-template]");
const songCardContainer = document.querySelector("[data-song-cards-container]");
const searchInput = document.querySelector("[data-search]");

let songs = [];

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  songs.forEach(song => {
    const isVisible =
      song.name.toLowerCase().includes(value) ||
      song.artist.toLowerCase().includes(value);
    song.card.classList.toggle("hide", !isVisible);
  });
});

fetch("../songdata.json")
  .then(res => res.json())
  .then(data => {
    songs = data.map((song, index) => {
      const song_card = songCardTemplate.content.cloneNode(true).children[0];
      const song_header = song_card.querySelector("[data-song_header]");
      const song_body = song_card.querySelector("[data-song_body]");
      const image = song_card.querySelector("[data-image]");
    
      song_header.textContent = song.songname;
      song_body.textContent = song.artist;
      image.src = song.image;
      songCardContainer.append(song_card);
    
      return { id: song.songid, name: song.songname, artist: song.artist, card: song_card, image: song.image };
    });
  });

function goBack() {
  console.log("hello");
  window.location.href = '../main/index.html';
}

function playSong(id) {
  console.log("Clicked on song card with id:", id);

  // Find the index of the selected song based on the id
  const selectedSongIndex = songs.findIndex(song => song.id === id);

  console.log("Selected song index:", selectedSongIndex);

  if (selectedSongIndex !== -1) {
    // Play the selected song in the song player
    playMusic(selectedSongIndex);
  }
}

function updateCurrentlyPlayingSong() {
  const currentSong = document.querySelector(".song_card.current-song");

  if (currentSong) {
    currentSong.classList.remove("current-song");
  }
}
