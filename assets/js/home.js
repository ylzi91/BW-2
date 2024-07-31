

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


    function goAlbum(id){
      window.open(`./album.html?myId=${id}`, '_blank')
    }
    function goArtist(id){
      window.open(`./artist.html?myId=${id}`, '_blank')
    }

document.addEventListener("DOMContentLoaded", () => {
  const albumContainer = document.getElementsByClassName("albumSilenteList")[0];
  const hero = document.getElementsByClassName('hero')[0];
  const list = document.getElementsByClassName('list')[0];
  const list2 = document.getElementsByClassName('list')[1];

  const startId = "rock"; // ID da cui iniziare
  const numberOfAlbums = 6;

 

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

    hero.innerHTML = `
                <div class="heroImg">
          <a href = "./album.html?myId=${albums[indexRand].album.id} " target = "_blank">  <img src="${albums[indexRand].album.cover_medium}" alt="" /> </a>
          </div>
          <div class="central">
            <p>ALBUM</p>
           <a href = "./album.html?myId=${albums[indexRand].album.id}" target = "_blank">  <h1 title="${albums[indexRand].title}">${albums[indexRand].title}</h1> </a>
            <p><a href = "./artist.html?myId=${albums[indexRand].artist.id}" target = "_blank">${albums[indexRand].artist.name}</a> </p>
            <p>Ascoltalo subbbbbito</p>
            <div>
              <button id = "btnPlay">Play</button>
              <button>Salva</button>
              <span>. . .</span>
            </div>
          </div>
          <div class="annunced"><span>Nascondi annunci</span></div>
    `

    albumContainer.innerHTML = "";
    albums.forEach((album) => {
      console.log(album);
        albumContainer.innerHTML += `
                  
                    <div class="albumSilente" onclick = "goAlbum(${album.album.id})">
                        <img src="${album.album.cover_small}"/>
                        <h5>${album.album.title}</h5>
                    </div>
                `;
               

    
    });
    list.innerHTML = ''
    playlistDown.forEach ((itemList) => {
        list.innerHTML += ` <div class="item" onclick = "goArtist(${itemList.artist.id})">
              <img
                src="${itemList.artist.picture_medium}"
              />
              <div class="play">
                <span class="fa fa-play"></span>
              </div>
              <h4>${itemList.artist.name}</h4>
            </div>`
    })
    list2.innerHTML = ''
    otherAlbums.forEach((itemList) => {
        list2.innerHTML += `
         <div class="item" onclick = "goAlbum(${itemList.album.id})">
              <img
                src="${itemList.album.cover_medium}"
              />
              <div class="play">
                <span class="fa fa-play"></span>
              </div>
              <h4>${itemList.album.title}</h4>
              <p>${itemList.artist.name}</p>
            </div>

        `
    })

    const btnPlay = document.getElementById('btnPlay')
    btnPlay.addEventListener('click', function (){
        const footer = document.getElementsByTagName('footer')[0]
        footer.classList.remove('hidden')
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

    for (let i = 0; i < numberOfAlbums; i++) {
      promises.push(
        fetchAlbum(currentId).then((data) => {
            albums.push(data.data);
          
        })
      );
    }

    await Promise.all(promises);
    console.log("album appiattito", albums);
    displayAlbums(albums.flat().splice(0, 6), albums.flat().splice(7, 10), albums.flat().splice(17, 8));
  }

  // Carica 10 album a partire dall'ID specificato
  loadAlbums(startId, numberOfAlbums);

const searchButton = document.getElementById('searchButton')
const searchBar = document.getElementsByClassName('hidden')[0]
const searchInput = document.getElementById('searchInput')

searchButton.addEventListener('click', () => {
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) {
      searchInput.focus();
    } else {
      searchInput.value = '';
    }
  });

  searchInput.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      console.log(query)
      if (query) {

        await loadAlbums(query, 6);
      }
    }
  });







  const videoPlayer = document.getElementById('audioPlayer');
  const playPauseButton = document.getElementById('playPause');
  const backwardButton = document.getElementById('backward');
  const forwardButton = document.getElementById('forward');
  const progressBar = document.getElementById('progressBar');
  const currentTimeSpan = document.getElementById('currentTime');
  const durationSpan = document.getElementById('duration');
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
    currentTimeSpan.textContent = formatTime(videoPlayer.currentTime);
  });

  videoPlayer.addEventListener('loadedmetadata', () => {
    durationSpan.textContent = formatTime(videoPlayer.duration);
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






