const songCardTemplate = document.querySelector("[data-song-template]")
const songCardContainer = document.querySelector("[data-song-cards-container]")


fetch('songdata.json')
.then(res => res.json())
.then(data => {
    data.forEach(song => {
        const card = songCardTemplate.content.cloneNode(true).children[0]
        const image = card.querySelector("data-img")
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        header.textContent = song.songname
        body.textContent = song.artist
        songCardContainer.append(card)
    })
})