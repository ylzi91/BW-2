/* async function searchDeezer(query) {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`);
    const data = await response.json();
    return data.data;
  }

  function displayResults(results) {
    searchResults.innerHTML = '';
    results.forEach(result => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.innerHTML = `
        <img src="${result.album.cover_small}" alt="${result.title}" />
        <div>
          <h4>${result.title}</h4>
          <p>${result.artist.name}</p>
        </div>
        `
      ;
      searchResults.appendChild(item);
    });
  } */
    const traksArray = [];
    function goAlbum(id) {
      window.open(`./album.html?myId=${id}`, "_blank");
    }
    function goArtist(id) {
      window.open(`./artist.html?myId=${id}`, "_blank");
    }
    
    document.addEventListener("DOMContentLoaded", () => {
      const hero = document.getElementsByClassName("hero")[0];
      const myUl = document.getElementById("myUl");
    
      
    
      const myId = new URLSearchParams(location.search).get("myId");
      function fetchAlbum(id, numOfTracks) {
        return fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=${numOfTracks}`
        )
          .then((response) => response.json())
          .then((data) => data)
          .catch((error) => {
            console.error("Error fetching album:", error);
            return null;
          });
      }

      function fetchArtist(id) {
        return fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`
        )
          .then((response) => response.json())
          .then((data) => data)
          .catch((error) => {
            console.error("Error fetching album:", error);
            return null;
          });
      }
    
      function displayAlbum(myArtist) {
        hero.innerHTML = `

      <div class="central">
        <p>Artista verificato</p>
       <h1 title="${myArtist.name}">${myArtist.name}</h1> 
        <p>${myArtist.nb_fan} Ascolatatori mensili </p>
    
      </div>
    
    `;
    
    
}

    function displayTracks(traksArray) {
        myUl.innerHTML = '';
        traksArray.forEach((track, index) => {
        myUl.innerHTML += `
            <li onclick = "playSong(${index}, event)">${index + 1} <img src = "${track.contributors[0].picture_small}" /> ${track.title }, ${track.rank}, ${Math.floor(track.duration / 60)}:${Math.floor(track.duration % 60) < 10 ? '0' + Math.floor(track.duration % 60) : Math.floor(track.duration % 60)}</li>
        `;
        });
    
      }
      let num = 5
      async function loadAlbums(trackId, num) {
        const promises = [];
        let myArtist;

        
        promises.push(
            fetchArtist(trackId).then((artist) => {
                myArtist = artist
            }),
            fetchAlbum(trackId, num).then((album) => {
                console.log("Canozoniiiii", album.data[0].title);
                traksArray.length = 0
                album.data.forEach((tracks) => {
                    traksArray.push(tracks);
                });
            })
        );
        
        await Promise.all(promises);
        displayAlbum(myArtist);
        hero.style.setProperty('--my-var', 'url(' + myArtist.picture_xl +')');
        console.log('merdamerdosa', myArtist.picture_medium)
        displayTracks(traksArray);
        
        
        
        
        console.log("album appiattito", promises);
    }
    
    const seeOther = document.getElementById('seeOther')
    seeOther.addEventListener('click', function (){
        num += 5
        loadAlbums(myId, num)
        })
      // Carica 10 album a partire dall'ID specificato
      loadAlbums(myId, num);
    
      const searchButton = document.getElementById("searchButton");
      const searchBar = document.getElementsByClassName("hidden")[0];
      const searchInput = document.getElementById("searchInput");
    
      searchButton.addEventListener("click", () => {
        searchBar.classList.toggle("hidden");
        if (!searchBar.classList.contains("hidden")) {
          searchInput.focus();
        } else {
          searchInput.value = "";
        }
      });
    
      searchInput.addEventListener("keyup", async (event) => {
        if (event.key === "Enter") {
          const query = searchInput.value.trim();
          if (query) {
            await loadAlbums(query, 6);
          }
        }
      });
    });
    const videoPlayer = document.getElementById("audioPlayer");
    const playPauseButton = document.getElementById("playPause");
    
    playPauseButton.addEventListener("click", function (e) {
      console.log(videoPlayer.paused);
      if (videoPlayer.paused) {
        e.preventDefault();
        console.log("entra per play");
        videoPlayer.play();
        playPauseButton.classList.remove("fa-play");
        playPauseButton.classList.add("fa-pause");
      } else {
        e.preventDefault();
        console.log("entra per pausa");
        videoPlayer.pause();
        playPauseButton.classList.remove("fa-pause");
        playPauseButton.classList.add("fa-play");
      }
    });
    function playSong(index, e) {
      e.preventDefault();
    
      const backwardButton = document.getElementById("backward");
      const forwardButton = document.getElementById("forward");
      const progressBar = document.getElementById("progressBar");
      const currentTimeSpan = document.getElementById("currentTime");
      const durationSpan = document.getElementById("duration");
      const volumerBar = document.getElementById("volumeBar");
      videoPlayer.volume = volumerBar.value / 100;
    
      const footer = document.getElementsByTagName("footer")[0];
      footer.classList.remove("hidden");
      const imgPlayer = document.getElementById("imgPlayer");
      imgPlayer.setAttribute("src", `${traksArray[index].album.cover_small}`);
      const titlePlayer = document.getElementById("titlePlayer");
      titlePlayer.innerText = `${traksArray[index].title}`;
    
      const artistPlayer = document.getElementById("artistPlayer");
      artistPlayer.innerText = `${traksArray[index].artist.name}`;
    
      videoPlayer.innerHTML = `<source src = "${traksArray[index].preview}" type="audio/mp3"></source>`;
      videoPlayer.load();
      videoPlayer.play();
      playPauseButton.classList.remove("fa-play");
      playPauseButton.classList.add("fa-pause");
    
    
      backwardButton.addEventListener("click", () => {
        videoPlayer.currentTime -= 10;
      });
    
      forwardButton.addEventListener("click", () => {
        videoPlayer.currentTime += 10;
      });
    
      videoPlayer.addEventListener("timeupdate", () => {
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressBar.value = progress;
        currentTimeSpan.textContent = formatTime(videoPlayer.currentTime);
      });
    
      videoPlayer.addEventListener("loadedmetadata", () => {
        durationSpan.textContent = formatTime(videoPlayer.duration);
      });
    
      progressBar.addEventListener("input", () => {
        const newTime = (progressBar.value / 100) * videoPlayer.duration;
        videoPlayer.currentTime = newTime;
      });
    
      volumerBar.addEventListener("input", () => {
        videoPlayer.volume = volumerBar.value / 100;
      });
    
      function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
      }
    }

    let sum
    function visualizzaAltro(){
        sum += 5
        return sum
    }
    