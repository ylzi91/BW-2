




const spinner = document.getElementById("spinner")



    function goAlbum(id){
      window.open(`./album2.html?myId=${id}`, '_blank')
    }
    function goArtist(id){
      window.open(`./artist2.html?myId=${id}`, '_blank')
    }

document.addEventListener("DOMContentLoaded", () => {
  const albumContainer = document.getElementsByClassName("albumSilenteList")[0];
  const hero = document.getElementsByClassName('hero')[0];
  const list = document.getElementsByClassName('list')[0];
  const list2 = document.getElementsByClassName('list')[1];
  const time =document.getElementById("time")

  const startId = "rock"; // ID da cui iniziare
  const numberOfAlbums = 6;

  const orario= new Date ().getHours();

  if(orario>=12) {
    time.innerText="Buonasera"
  }
  else {time.innerText="Buongiorno"}

  function fetchAlbum(id) {
    return fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${id}`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error("Error fetching album:", error);
        return null;
      });
  }

  function displayAlbums(albums, playlistDown, otherAlbums) {
    if (albums.length === 0) {
      albumContainer.innerHTML = "<p>No albums found.</p>";
      return;
    }

    indexRand = Math.floor(Math.random() * 6);
    console.log('indexranf', indexRand)
    console.log('albumindex',albums[indexRand])

    hero.innerHTML = ` <div class="heroImg">
           <a href = "./album2.html?myId=${albums[indexRand].album.id} " target = "_blank">  <img src="${albums[indexRand].album.cover_medium}" alt="" /> </a>
          </div>
          <div class="p-2 hero-content">
            <p class="m-0 p-2">Album</p>
           <a class="text-decoration-none text-white"  href = "./album2.html?myId=${albums[indexRand].album.id}" target = "_blank"> <h1 class="m-0 p-2">${albums[indexRand].title}</h1></a>
           <a class="text-decoration-none text-white"  href = "./artist2.html?myId=${albums[indexRand].artist.id}" target = "_blank"> <p class="m-0 p-2">${albums[indexRand].artist.name}</p></a>
            <p class="m-0 p-2"  >Ascoltalo subbbbbito</p>
            <div class="m-0 p-2 d-flex justify-content-between">
              <div class="d-grid gap-2 d-md-block">
                <button class="btn  m-0" type="button" id="btnPlay">Play</button>
                <button class="btn  m-0" type="button">Salva</button>
              </div>
            </div>
          </div>
          <div class="annunced text-center"><span>Nascondi annunci</span></div>
          `;

    albumContainer.innerHTML = "";
    albums.forEach((album) => {
      console.log(album);
        albumContainer.innerHTML += `
                  
                    
                          <div class="albumSilente col-6 col-md-4  ">
              <div class="d-flex justify-content-center align-items-center gradient-card rounded div-card pointer" onclick = "goAlbum(${album.album.id})">
                <img src="${album.album.cover}" class="m-0  rounded-start card-img w-25 " />
                <p class=" m-0 p-2 flex-grow-1"><a href = "./album2.html?myId=${album.album.id} " target = "_blank" class="text-decoration-none text-white"> ${album.album.title}</a></p>
              </div>
            </div>
                      `;
               

    
    });
    list.innerHTML = ''
        list2.innerHTML = ''
        playlistDown.forEach((itemList) => {
            console.log(itemList)
            list.innerHTML += `
                   
                  
                   <div onclick = "goAlbum(${itemList.album.id})" class="albumSilente col-6 col-lg-2 ">
              <div class="d-flex flex-column justify-content-center align-items-start gradient-card rounded div-card2 pointer">
                <img src="${itemList.artist.picture_medium}" class="m-0  rounded w-100 card-img2 " />
                <p class=" m-0 p-2 flex-grow-1"> ${itemList.album.title}</p>
              </div>
            </div>
                  `
                  list2.innerHTML += `
                   
                   <div  class="item col-12 col-md-6 ">
              <div class="gradient-card rounded">
                <div class=" d-sm-flex col-12 p-3 " onclick = "goAlbum(${itemList.album.id})">
                  <img src="${itemList.artist.picture_big}" class="m-0 img-fluid w-50  " />
                  <div class="play d-sm-none">
                    <span class="fa fa-play"></span>
                  </div>
                  <div class="flex-grow-1 ps-3">
                    <p class="m-0 p-2 fw-light gray">${itemList.artist.name}</p>
                    <p class="m-0 p-2 "> ${itemList.album.title}</p>

                  </div>
                </div>
                <div class="navigation p-3 pt-0 d-flex justify-content-between align-items-center ">
                  <ul class=" p-0 m-0 d-flex ">
                    <li class="list-group-item">

                      <span class="material-symbols-outlined fs-1 p-2" id="heart${itemList.album.id}"  onclick="like(${itemList.album.id})">
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

                      <p class=" align-content-center m-0 p-2 fw-light gray ">${itemList.album.type}</p>

                    </li>
                    <li class="list-group-item">
                      <span class="material-symbols-outlined fs-1 p-2">
                        play_circle
                      </span>

                    </li>

                  </ul>
                </div>
              </div>
            </div>
                  
                 `
        })
        
    
        const btnPlay = document.getElementById('btnPlay')
        btnPlay.addEventListener('click', function (){
           
            const play = document.getElementById('play')
            play.style.display="block"
            const audioPlayer = document.getElementById('audioPlayer')
            audioPlayer.setAttribute('autoplay', '')
            audioPlayer.load()
            console.log(albums[indexRand].preview)
            const imgPlayer = document.getElementById('imgPlayer')
            imgPlayer.setAttribute('src', `${albums[indexRand].album.cover_medium}`)
            const titlePlayer = document.getElementById('titlePlayer')
            titlePlayer.innerText = `${albums[indexRand].title}`
    
            const artistPlayer = document.getElementById('artistPlayer')
            artistPlayer.innerText = `${albums[indexRand].artist.name}`
            audioPlayer.innerHTML = `<source src = "${albums[indexRand].preview}"  type="audio/mp3"></source>`
    
            const playPauseButton = document.getElementById('playPause');
            playPauseButton.classList.remove('fa-play');
            playPauseButton.classList.add('fa-pause');
          
            
        })   

  }

  async function loadAlbums(startId, numberOfAlbums) {
    const albums = [];
    const promises = [];
    let currentId = startId;
spinner.classList.remove("d-none")
    for (let i = 0; i < numberOfAlbums; i++) {
      promises.push(
        fetchAlbum(currentId).then((data) => {
            albums.push(data.data);
          
        })
      );
    }

    await Promise.all(promises);
    console.log("album appiattito", albums);
    displayAlbums(albums.flat().splice(0, 6), albums.flat().splice(7, 18), albums.flat().splice(17, 8));

    spinner.classList.add("d-none")
  }
 
  // Carica 10 album a partire dall'ID specificato
  loadAlbums(startId, numberOfAlbums);



  const videoPlayer = document.getElementById('audioPlayer');
  const playPauseButton = document.getElementById('playPause');
  const backwardButton = document.getElementById('backward');
  const forwardButton = document.getElementById('forward');
  const progressBar = document.getElementById('progressBar');
  //const currentTimeSpan = document.getElementById('currentTime');
  //const durationSpan = document.getElementById('duration');
  const volumerBar = document.getElementById('volumeBar');
  videoPlayer.volume = volumerBar.value / 100;


  playPauseButton.addEventListener('click', () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
      playPauseButton.classList.remove('fa-play');
      playPauseButton.classList.add('fa-pause');
    } else {
      videoPlayer.pause();
      playPauseButton.classList.remove('fa-pause');
      playPauseButton.classList.add('fa-play');
    }
  });

  backwardButton.addEventListener('click', () => {
    videoPlayer.currentTime -= 10;
  });

  forwardButton.addEventListener('click', () => {
    videoPlayer.currentTime += 10;
  });

  videoPlayer.addEventListener('timeupdate', () => {
    const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.value = progress;
    //currentTimeSpan.textContent = formatTime(videoPlayer.currentTime);
  });

  videoPlayer.addEventListener('loadedmetadata', () => {
    //durationSpan.textContent = formatTime(videoPlayer.duration);
  });

  progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * videoPlayer.duration;
    videoPlayer.currentTime = newTime;
  });

  volumerBar.addEventListener('input', () => {
    videoPlayer.volume = volumerBar.value / 100
  })


  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }





  

});

function like (id) { 
  const cuore =document.getElementById("heart"+id)
  console.log(cuore.style.color)
  if (cuore.style.color==="rgb(29, 185, 84)") {
    cuore.style.color="white"
  }
  else{cuore.style.color="rgb(29, 185, 84)"}
  
  
  
}







