const songCardTemplate = document.querySelector("[data-song-template]")
const songCardContainer = document.querySelector("[data-song-cards-container]")
const searchInput = document.querySelector("[data-search]")

let songs = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  songs.forEach(song => {
    const isVisible =
      song.name.toLowerCase().includes(value) ||
      song.artist.toLowerCase().includes(value)
    song.card.classList.toggle("hide", !isVisible)
  })
})

fetch("../songdata.json")
  .then(res => res.json())
  .then(data => {
    songs = data.map(song => {
      const song_card = songCardTemplate.content.cloneNode(true).children[0]
      const song_header = song_card.querySelector("[data-song_header]")
      const song_body = song_card.querySelector("[data-song_body]")
      const image = song_card.querySelector("[data-image]")
      
      song_header.textContent = song.songname
      song_body.textContent = song.artist
      image.src = song.image
      songCardContainer.append(song_card)
      
      return { name: song.songname, artist: song.artist, card: song_card, image: song.image }
    })
  })
  function goBack() {
    console.log("hello")
    window.location.href = '../main/index.html';
  }
  function playSong(id) {
    songPlayer(id);
  }