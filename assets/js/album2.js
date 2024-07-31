
    const traksArray = [];
    function goAlbum(id) {
      window.open(`./album2.html?myId=${id}`, "_blank");
    }
    function goArtist(id) {
      window.open(`./artist2.html?myId=${id}`, "_blank");
    }
    
    document.addEventListener("DOMContentLoaded", () => {
      const heromobile =document.getElementById("hero-mobile");
      const hero=document.getElementById("hero");
      const brani=document.getElementById("brani");
      const heromobile2 =document.getElementById("hero-mobile2");
      
      const startId = "rock"; // ID da cui iniziare
      const numberOfAlbums = 6;
    
      const myId = new URLSearchParams(location.search).get("myId");
      function fetchAlbum(id) {
        return fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`
        )
          .then((response) => response.json())
          .then((data) => data)
          .catch((error) => {
            console.error("Error fetching album:", error);
            return null;
          });
      }
    
      function displayAlbum(nameAl, tracks) {
        heromobile.innerHTML = `
           
       <div class="item col-12 col-md-12 ">
            <div class=" rounded">
              <div class=" d-sm-flex flex-column col-12 p-3 ">
                <img
                  src="${
                    nameAl.cover_medium
                  }"
                  class="m-0 img-fluid w-50 align-self-center  ">
                <div class="play d-sm-none ">
                  <span class="fa fa-play" aria-hidden="true"></span>
                </div>
                <div class="flex-grow-1  pt-3">
                  <h2 class="m-0 p-1 fs-1">${nameAl.title}</h2>
                  <p class="m-0 p-1 ">${
                    nameAl.artist.name
                  }</p>
                  <p class="m-0 p-1 fw-light gray">${nameAl.release_date}</p>


                </div>
              </div>
              <div class="navigation p-3 pt-0 d-flex justify-content-between align-items-center ">
                <ul class=" p-0 m-0 d-flex ">
                  <li class="list-group-item">

                    <span class="material-symbols-outlined fs-1 p-2 ps-0 ">
                      favorite
                    </span>

                  </li>
                  <li class="list-group-item">

                    <span class="material-symbols-outlined fs-1 p-2 gray">
                      download
                    </span>
                  </li>
                  <li class="list-group-item">
                    <span class="material-symbols-outlined fs-1 p-2 gray">
                      more_vert
                    </span>

                  </li>

                </ul>
                <ul class=" p-0 m-0 d-flex ">
                  <li class="list-group-item d-flex">
                    <span class="material-symbols-outlined  fs-1 p-2">
                      pause_circle
                    </span>
                  </li>
                  <li class="list-group-item">
                    <span class="material-symbols-outlined fs-1 p-2 pe-0">
                      autoplay
                    </span>



                  </li>

                </ul>
              </div>
            </div>
          </div>
    
    `;
    hero.innerHTML = `
           
     <div class="heroImg">
            <a href="./album.html?myId=970410 " target="_blank"> <img
                src="${
                  nameAl.cover_medium
                }"
                alt=""> </a>
          </div>
          <div class="p-2 hero-content">
            <p class="m-0 p-2">Album</p>
            <a class="text-decoration-none text-white" href="./album.html?myId=970410" target="_blank">
              <h1 class="m-0 p-2">${nameAl.title}</h1>
            </a>
            <a class="text-decoration-none text-white" href="./artist.html?myId=1147" target="_blank">
              <p class="m-0 p-2">${
                nameAl.artist.name
              }</p>
            </a>

            <div class="m-0 p-2 d-flex justify-content-between">

            </div>
          </div>
 
 `;
        brani.innerHTML = ''
        heromobile2.innerHTML = ''
        tracks.forEach ((track, index) => {
            brani.innerHTML += `
            



            <div class="col-12">
                <div class="navigation  d-flex justify-content-between align-items-center">
                  <div class="riga-numero d-flex justify-content-center align-items-center ">
                    <p class="m-0 fw-light ">${index+1}</p>
                    
                  </div>
                  <div class="riga-titolo d-flex flex-column justify-content-center ">
                    <p class="m-0 fw-light ">${track.title}</p>
                    <p class="m-0  fw-light gray ">${track.artist.name}</p>
                  </div>
                  <div class="riga-rip d-flex justify-content-end align-items-center"> <p class="m-0 fw-light ">${track.rank}</p></div>
                  <div class="riga-tempo d-flex justify-content-center align-items-center"> <p class="m-0 fw-light ">${Math.floor(track.duration / 60)}:${Math.floor(track.duration % 60)}</p></div>

                 
                </div>
            </div>
        `


        heromobile2.innerHTML += `
            



       <div class="item col-12 col-md-12 ">
            <div class="navigation p-3 d-flex justify-content-between align-items-center">
              <div class="">
                <p class="m-0 p-1 ">${track.title}</p>
                <p class="m-0 p-1 fw-light gray ">${track.artist.name}</p>
              </div>
              <ul class=" m-0 d-flex ">
                <li class="list-group-item">

                  <span class="material-symbols-outlined fs-1 p-2 ">
                    more_vert
                  </span>
                </li>

              </ul>
            </div>
          </div>
    `

        })
       
      }
    
      async function loadAlbums(startId) {
        let nameAlbum;
        const promises = [];
    
        let currentId = startId;
    
        promises.push(
          fetchAlbum(currentId).then((album) => {
            nameAlbum = album;
            console.log("Canozoniiiii", album.tracks.data[0].title);
            album.tracks.data.forEach((tracks) => {
              traksArray.push(tracks);
            });
            console.log("TRACKSARRAY", traksArray);
          })
        );
    
        await Promise.all(promises);
        console.log("album appiattito", promises);
        displayAlbum(nameAlbum, traksArray);
      }
    
      // Carica 10 album a partire dall'ID specificato
      loadAlbums(myId, numberOfAlbums);
    
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
    
    function playSong(index){
        
    
      const videoPlayer = document.getElementById("audioPlayer");
      const playPauseButton = document.getElementById("playPause");
      const backwardButton = document.getElementById("backward");
      const forwardButton = document.getElementById("forward");
      const progressBar = document.getElementById("progressBar");
      const currentTimeSpan = document.getElementById("currentTime");
      const durationSpan = document.getElementById("duration");
      const volumerBar = document.getElementById("volumeBar");
      videoPlayer.volume = volumerBar.value / 100;
    
      const footer = document.getElementsByTagName('footer')[0]
        footer.classList.remove('hidden')
    
        const artistPlayer = document.getElementById('artistPlayer')
        artistPlayer.innerText = `${traksArray[index].artist.name}`
      
        videoPlayer.innerHTML = `<source src = "${traksArray[index].preview}" type="audio/mp3"></source>`
        videoPlayer.setAttribute('autoplay','')
        videoPlayer.load()
        playPauseButton.classList.remove("fa-play");
        playPauseButton.classList.add("fa-pause");
    
    
      playPauseButton.addEventListener("click", () => {
        if (videoPlayer.paused) {
            console.log('entra per play')
          videoPlayer.play();
          playPauseButton.classList.remove("fa-play");
          playPauseButton.classList.add("fa-pause");
        } else if(videoPlayer.played) {
            console.log('entra per pausa')
          videoPlayer.pause();
          playPauseButton.classList.remove("fa-pause");
          playPauseButton.classList.add("fa-play");
        }
      });
    
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