const spinner = document.getElementById("spinner")


const traksArray = [];
function goAlbum(id) {
  window.open(`./album2.html?myId=${id}`, "_blank");
}
function goArtist(id) {
  window.open(`./artist2.html?myId=${id}`, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  const heroArtist = document.getElementsByClassName("heroArtist")[0];
  const hero2 = document.getElementById("hero2");
  const heromobile2 = document.getElementById("heromobile2");
  const branimobile2 = document.getElementById("branimobile2");
  const brani2 = document.getElementById("brani2");

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
    console.log(myArtist);
    hero2.innerHTML = `
           
      <div class="p-2 hero-content">
           
            <a class="text-decoration-none text-white" href="#" target="_blank">
              <h1 class="m-0 p-2">${myArtist.name}</h1>
            </a>
            <a class="text-decoration-none text-white" href="#" target="_blank">
              <p class="m-0 p-2">${myArtist.nb_fan}</p>
            </a>

         
          </div>
    
    `;
    hero2.style.backgroundImage = `url(${myArtist.picture_xl})`;

    console.log(hero2.style);
    heromobile2.innerHTML = `
           
   <div class="item col-12 col-md-12 ">
            <div class="gradient-card rounded">
              <div class=" d-sm-flex  col-12 p-3 sfondo" id="sfondomobile">
                
                <div class="play d-sm-none">
                  <span class="fa fa-play" aria-hidden="true"></span>
                </div>
                <div class="align-content-end  pt-3">
                  <h2 class="m-0 p-1 fs-1">${myArtist.name}</h2>
                  <p class="m-0 p-1 ">${myArtist.nb_fan}</p>
                  

                </div>
              </div>
              <div class="navigation p-3  d-flex justify-content-between align-items-center ">
                <ul class=" p-0 m-0 d-flex ">
                  <li class="list-group-item">

                    <span class="material-symbols-outlined fs-1 p-2 ps-0 " id="heart-mobile" onclick="like()">
                      favorite
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
    const sfondomobile = document.getElementById("sfondomobile");
    sfondomobile.style.backgroundImage = `url(${myArtist.picture_xl})`;
  }

  function displayTracks(traksArray) {
    brani2.innerHTML = "";
    branimobile2.innerHTML = "";
    traksArray.forEach((track, index) => {
      console.log(track);
      let nomi = "";
      for (let i = 0; i < track.contributors.length; i++) {
        nomi += track.contributors[i].name + " ";
      }
      brani2.innerHTML += `
           


 <div class="col-12 p-1">
                <div class="navigation  d-flex justify-content-between align-items-center">
                  <div class="riga-numero2 d-flex justify-content-center align-items-center ">
                    <p class="m-0 fw-light ">${index + 1}</p>
                    
                  </div>
                  <div class="riga-img2 d-flex align-content-center justify-content-center">
                    <img src="${track.album.cover_small}" class="img-fluid">
                  </div>
                  <div class="riga-titolo2 d-flex flex-column justify-content-center ">
                    <p onclick = "playSong(${index}, event)" class="m-0 fw-light ps-3 ">${track.title}</p>
                     <p class="m-0 fw-light ps-3 gray ">${nomi}</p>
                   
                  </div>
                  <div class="riga-rip2 d-flex justify-content-end align-items-center"><p class="m-0  fw-light gray ps-3">${
                    track.rank
                  }</p> </div>
                  <div class="riga-tempo2 d-flex justify-content-center align-items-center"><p class="m-0  fw-light gray ps-3">${Math.floor(
                    track.duration / 60
                  )}:${Math.floor(track.duration % 60) < 10? "0" + Math.floor(track.duration % 60) : Math.floor(track.duration % 60)}</p> </div>
                 
                </div>
              </div>
             


        `;

      branimobile2.innerHTML += `
           


        <div class="item col-12 col-md-12 p-2">
            <div class="navigation  d-flex justify-content-between align-items-center">
              <div class="riga-numero1 d-flex justify-content-center align-items-center ">
                <p class="m-0 fw-light ">${index + 1}</p>
                
              </div>
              <div class="riga-img1 d-flex align-content-center justify-content-center" >
                <img src="${track.album.cover_small}" class="img-fluid">
              </div>
              <div class="riga-titolo1 d-flex flex-column justify-content-center ">
                <p class="m-0 fw-light ps-3 " onclick = "playSong(${index}, event)">${track.title}</p>
                <p class="m-0  fw-light gray ps-3">${nomi}</p>
              </div>
              <div class="riga-rip1 d-flex justify-content-end align-items-center"> <ul class=" m-0 d-flex ">
                <li class="list-group-item">

                  <span class="material-symbols-outlined fs-1 p-2 ">
                    more_vert
                  </span>
                </li>

              </ul></div>
             
             
            </div>
          </div>
                      
                    
       
       
               `;
    });
  }
  let num = 5;
  async function loadAlbums(trackId, num) {
    const promises = [];
    let myArtist;
    spinner.classList.remove("d-none")
    promises.push(
      fetchArtist(trackId).then((artist) => {
        myArtist = artist;
      }),
      fetchAlbum(trackId, num).then((album) => {
        console.log("Canozoniiiii", album.data[0].title);
        traksArray.length = 0;
        album.data.forEach((tracks) => {
          traksArray.push(tracks);
        });
      })
    );

    await Promise.all(promises);
    displayAlbum(myArtist);
    displayTracks(traksArray);
    heroArtist.style.setProperty(
      "--my-var",
      "url(" + myArtist.picture_xl + ")"
    );
    spinner.classList.add("d-none")
    console.log("album appiattito", promises);
  }

    const seeOther = document.getElementById('seeOther')
    seeOther.addEventListener('click', function (){
      console.log(seeOther)
      if (seeOther.innerText === 'VISUALIZZA ALTRO'){
        num += 10
        loadAlbums(myId, num)
        seeOther.innerText = 'NASCONDI'
      }
      else if (seeOther.innerText === 'NASCONDI'){
        num -=10
        loadAlbums (myId, num)
        seeOther.innerText = 'VISUALIZZA ALTRO'
      }
       
      })

  loadAlbums(myId, num);
});
const videoPlayer = document.getElementById("audioPlayer");
const playPauseButton = document.getElementById("playPause");
playPauseButton.addEventListener("click", () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playPauseButton.classList.remove("fa-play");
    playPauseButton.classList.add("fa-pause");
  } else {
    videoPlayer.pause();
    playPauseButton.classList.remove("fa-pause");
    playPauseButton.classList.add("fa-play");
  }
});

function playSong(index) {
 
  const backwardButton = document.getElementById("backward");
  const forwardButton = document.getElementById("forward");
  const progressBar = document.getElementById("progressBar");
  //const currentTimeSpan = document.getElementById("currentTime");
  //const durationSpan = document.getElementById("duration");
  const volumerBar = document.getElementById("volumeBar");
  videoPlayer.volume = volumerBar.value / 100;
  const play = document.getElementById("play");
  play.style.display = "block";
  const imgPlayer = document.getElementById("imgPlayer");
  imgPlayer.setAttribute("src", `${traksArray[index].album.cover_medium}`);
  const artistPlayer = document.getElementById("artistPlayer");
  artistPlayer.innerText = `${traksArray[index].artist.name}`;
  const titlePlayer = document.getElementById('titlePlayer')
  titlePlayer.innerText = `${traksArray[index].title}`

  videoPlayer.innerHTML = `<source src = "${traksArray[index].preview}" type="audio/mp3"></source>`;
  videoPlayer.setAttribute("autoplay", "");
  videoPlayer.load();
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
   // currentTimeSpan.textContent = formatTime(videoPlayer.currentTime);
  });

  videoPlayer.addEventListener("loadedmetadata", () => {
    //durationSpan.textContent = formatTime(videoPlayer.duration);
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


function like () { 
  const cuore =document.getElementById("heart-artist")
  const cuoreMobile =document.getElementById("heart-mobile")
  console.log(cuore.style.color)
  if (cuore.style.color==="rgb(29, 185, 84)"||cuoreMobile.style.color==="rgb(29, 185, 84)" ) {
    cuore.style.color="white"
    cuoreMobile.style.color="white"
  }
  else{cuore.style.color="rgb(29, 185, 84)"
    cuoreMobile.style.color="rgb(29, 185, 84)"
  }
  
  
  
}