const playlistTemplate = document.querySelector("[data-playlist-template]")
const playlistContainer = document.querySelector("[data-playlist-container]")

let playlists = []

fetch("playlistdata.json")
  .then(res => res.json())
  .then(data => {
    playlists = data.map(playlist => {
      const card = playlistTemplate.content.cloneNode(true).children[0]
      const playlist_header = card.querySelector("[data-playlist_header]")
      const playlist_description = card.querySelector("[data-playlist_description]")
      const playlist_image = card.querySelector("[data-playlist_image]") 
      playlist_header.textContent = playlist.title
      playlist_description.textContent = playlist.description
      playlist_image.src = playlist.album_cover
      playlistContainer.append(card)
      return {title: playlist.title, description: playlist.description, image: playlist.album_cover}
      //returned image above 
    })
  })