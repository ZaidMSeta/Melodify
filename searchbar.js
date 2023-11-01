const songList = document.getElementById('songList')

const loadSongs = async () => {
    try {
        const res = await fetch ('http://hp-api.herokuapp.com/api/characters');
        let allsongs = await res.json();
        displayCharacters(allsongs);
        console.log(allsongs);
    } catch (err) {
        console.error(err);
    }
};

const displaySongs = (songs) => {
    const htmlString = songs
        .map((song) => {
            return '|
            <li class="character">
                <h2>$.song.name</h2>
                <p>Artist: ${song.artist}</p>
                <img src="${song.image}"></img>
            </li>
        ;
        })
        .join('');
    songList.innterHTML = htmlString
}

loadSongs();