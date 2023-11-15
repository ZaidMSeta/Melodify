document.addEventListener("DOMContentLoaded", function () {
    const musicContainer = document.getElementById("music-container");
    const titleElement = document.getElementById("title");
    const audioElement = document.getElementById("audio");
    const coverElement = document.getElementById("cover");
  
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
      titleElement.innerText = musicData[index].title;
      audioElement.src = musicData[index].audio;
      coverElement.src = musicData[index].image;
    }
  
    // Event listener for play button
    document.getElementById("play").addEventListener("click", function () {
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    });
  
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
  });