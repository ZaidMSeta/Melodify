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
    song.element.classList.toggle("hide", !isVisible)
  })
})

fetch("songdata.json")
  .then(res => res.json())
  .then(data => {
    songs = data.map(song => {
      const card = songCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      const image = card.querySelector("[data-image]")
      //line above 
      header.textContent = song.songname
      body.textContent = song.artist
      image.textContent = song.image
      songCardContainer.append(card)
      return { name: song.songname, artist: song.artist, element: card, image: song.image, }
      //returned image above 
    })
  })