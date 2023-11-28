document.addEventListener("DOMContentLoaded", function () {
  const musicContainer = document.getElementById("music-container");
  const titleElement = document.getElementById("title");
  const audioElement = document.getElementById("audio");
  const coverElement = document.getElementById("cover");
  const artistElement = document.getElementById("artist"); // Moved outside loadMusic function

  let currentIndex = 0;
  let musicData;

  // Fetch music data from JSON file
  fetch("songdata.json")
    .then((response) => response.json())
    .then((data) => {
      musicData = data;
      loadMusic(currentIndex);
    });

  // Function to load music based on index
  function loadMusic(index) {
    const currentSong = musicData[index];
    titleElement.innerText = currentSong.songname;
    audioElement.src = currentSong.audio;
    coverElement.src = currentSong.image;
    artistElement.innerText = currentSong.artist; // Moved this line outside the function

    // Highlight the currently playing song
    const songElements = document.querySelectorAll(".song");
    songElements.forEach((song, i) => {
      if (i === index) {
        song.classList.add("current-song");
      } else {
        song.classList.remove("current-song");
      }
    });
  }
  function togglePlay() {
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
    updatePlayButton(); // Update the play button icon
  }
  function updatePlayButton() {
    const playIcon = document.querySelector("#play i");
    const isPlaying = !audioElement.paused;

    playIcon.className = isPlaying ? "fas fa-pause" : "fas fa-play";
  }

  // Event listener for play button
  document.getElementById("play").addEventListener("click", togglePlay);

  // Event listener for next button
  document.getElementById("next").addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % musicData.length;
    loadMusic(currentIndex);
  });

  // Event listener for previous button
  document.getElementById("prev").addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + musicData.length) % musicData.length;
    loadMusic(currentIndex);
  });

  // Add an event listener to the audio element to update the play button when the audio is paused or played
  audioElement.addEventListener("play", updatePlayButton);
  audioElement.addEventListener("pause", updatePlayButton);
});
