const categoryTemplate = document.querySelector("[data-category-template]");
const playlistTemplate = document.querySelector("[data-playlist-template]");
const playlistContainer = document.querySelector("[data-playlist-container]");

let playlists = [];

fetch("playlistdata.json")
  .then(res => res.json())
  .then(data => {
    const categories = {};

    // Group playlists by category
    data.forEach(playlist => {
      if (!categories[playlist.category]) {
        categories[playlist.category] = [];
      }
      categories[playlist.category].push(playlist);
    });

    // Create category sections and populate playlists
    for (const [category, playlistData] of Object.entries(categories)) {
      const categorySection = categoryTemplate.content.cloneNode(true).children[0];
      const categoryTitle = categorySection.querySelector("[data-category-title]");
      const playlistCardsContainer = categorySection.querySelector("[data-playlist-cards]");

      categoryTitle.textContent = category;

      playlistData.forEach(playlist => {
        const card = playlistTemplate.content.cloneNode(true).children[0];
        const playlistHeader = card.querySelector("[data-playlist-header]");
        const playlistDescription = card.querySelector("[data-playlist-description]");
        const playlistImage = card.querySelector("[data-playlist-image]");

        playlistHeader.textContent = playlist.title;
        playlistDescription.textContent = playlist.description;
        playlistImage.src = playlist.album_cover;

        playlistCardsContainer.append(card);
      });

      playlistContainer.append(categorySection);

      // Add the drag and slide functionality for each category
      const categoryPlaylistCards = categorySection.querySelector("[data-playlist-cards]");
      let isMouseDown = false;
      let startX;
      let scrollLeft;

      categoryPlaylistCards.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX - categoryPlaylistCards.offsetLeft;
        scrollLeft = categoryPlaylistCards.scrollLeft;
      });

      categoryPlaylistCards.addEventListener('mouseleave', () => {
        isMouseDown = false;
      });

      categoryPlaylistCards.addEventListener('mouseup', () => {
        isMouseDown = false;
      });

      categoryPlaylistCards.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - categoryPlaylistCards.offsetLeft;
        const walk = (x - startX) * 1.5; // Adjust the multiplier for smoother or faster scrolling
        categoryPlaylistCards.scrollLeft = scrollLeft - walk;
      });
    }
  });
