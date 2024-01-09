document.addEventListener("DOMContentLoaded", function () {
  const musicContainer = document.getElementById("music-container");
  const titleElement = document.getElementById("title");
  const audioElement = document.getElementById("audio");
  const coverElement = document.getElementById("cover");
  const artistElement = document.getElementById("artist");

  let musicData;
  let currentIndex = 0; // Added currentIndex variable

  // Function to load and play a specific song based on ID
  function loadAndPlaySong(id) {
    // Fetch music data from JSON file
    fetch("songdata.json")
      .then((response) => response.json())
      .then((data) => {
        musicData = data;

        // Find the index of the song with the given ID
        const index = musicData.findIndex((song) => song.songid === id);

        if (index !== -1) {
          loadMusic(index);
          // Update the URL
          updateURL(musicData[currentIndex].songid);
        } else {
          console.error("Song not found with ID:", id);
        }
      });
  }

  // Function to load music based on index
  function loadMusic(index) {
    currentIndex = index; // Update currentIndex
    const currentSong = musicData[index];
    titleElement.innerText = currentSong.songname;
    audioElement.src = currentSong.audio;
    coverElement.src = currentSong.image;
    artistElement.innerText = currentSong.artist;

    audioElement.play();

    // Highlight the currently playing song
    const songElements = document.querySelectorAll(".song");
    songElements.forEach((song, i) => {
      if (i === index) {
        song.classList.add("current-song");
      } else {
        song.classList.remove("current-song");
      }
    });

    // Remove the currently playing song class from the song player
    const currentSongPlayer = document.querySelector(".music-container.current-song");
    if (currentSongPlayer) {
      currentSongPlayer.classList.remove("current-song");
    }

    // Add the currently playing song class to the song player
    musicContainer.classList.add("current-song");
  }

  // Event listener for play button
  document.getElementById("play").addEventListener("click", togglePlay);

  // Event listener for next button
  document.getElementById("next").addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % musicData.length;
    loadMusic(currentIndex);
    // Update the URL
    updateURL(musicData[currentIndex].songid);
  });

  // Event listener for previous button
  document.getElementById("prev").addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + musicData.length) % musicData.length;
    loadMusic(currentIndex);
    // Update the URL
    updateURL(musicData[currentIndex].songid);
  });

  // Add an event listener to the audio element to update the play button when the audio is paused or played
  audioElement.addEventListener("play", updatePlayButton);
  audioElement.addEventListener("pause", updatePlayButton);

  // Function to toggle play/pause
  function togglePlay() {
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
    updatePlayButton(); // Update the play button icon
  }

  // Function to update play button icon
  function updatePlayButton() {
    const playIcon = document.querySelector("#play i");
    const isPlaying = !audioElement.paused;

    playIcon.className = isPlaying ? "fas fa-pause" : "fas fa-play";
  }

  // Function to update the URL
  function updateURL(songId) {
    const newURL = `${window.location.origin}${window.location.pathname}?id=${songId}`;
    history.pushState({}, '', newURL);
  }

  // Initial load and play based on the song ID from the URL
  loadAndPlaySong(getSongIdFromUrl());

  // Helper function to get song ID from URL parameters
  function getSongIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }
});
function goBack() {
  console.log("hello");
  window.location.href = '../main/index.html';
}
const canvas = document.createElement("canvas");
const imgCanva = canvas.getContext("2d");
imgCanva.drawImage(cover, 0, 0);