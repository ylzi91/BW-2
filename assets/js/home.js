

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




document.addEventListener("DOMContentLoaded", () => {
  const albumContainer = document.getElementsByClassName("albumSilenteList")[0];
  const hero = document.getElementsByClassName('hero')[0];
  const list = document.getElementsByClassName('list')[0];

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

  function displayAlbums(albums, playlistDown) {
    if (albums.length === 0) {
      albumContainer.innerHTML = "<p>No albums found.</p>";
      return;
    }

    indexRand = Math.floor(Math.random() * 6);
    console.log('indexranf', indexRand)
    console.log('albumindex',albums[indexRand])

    hero.innerHTML = `
                <div class="heroImg">
          <a href = "./album.html?myId=${albums[indexRand].id} " target = "_blank">  <img src="${albums[indexRand].album.cover_medium}" alt="" /> </a>
          </div>
          <div class="central">
            <p>ALBUM</p>
           <a href = "./album.html?myId=${albums[indexRand].id}" target = "_blank">  <h1 title="${albums[indexRand].title}">${albums[indexRand].title}</h1> </a>
            <p><a href = "./artist.html?myId=${albums[indexRand].artist.id}" target = "_blank">${albums[indexRand].artist.name}</a> </p>
            <p>Ascoltalo subbbbbito</p>
            <div>
              <button>Play</button>
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

                    <div class="albumSilente">
                        <img src="${album.album.cover_small}"/>
                        <h5>${album.album.title}</h5>
                    </div>
                `;


    
    });
    list.innerHTML = ''
    playlistDown.forEach ((itemList) => {
        list.innerHTML += ` <div class="item">
              <img
                src="${itemList.album.cover_medium}"
              />
              <div class="play">
                <span class="fa fa-play"></span>
              </div>
              <h4>${itemList.album.title}</h4>
              <p>${itemList.artist.name}</p>
            </div>`
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
    displayAlbums(albums.flat().splice(0, 6), albums.flat().splice(7, 16));
  }

  // Carica 10 album a partire dall'ID specificato
  loadAlbums(startId, numberOfAlbums);

const searchButton = document.getElementById('searchButton')
const searchBar = document.getElementsByClassName('hidden')[0]
const searchInput = document.getElementById('searchInput')
const searchResults = document.getElementById('searchResults')

searchButton.addEventListener('click', () => {
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) {
      searchInput.focus();
    } else {
      searchInput.value = '';
      searchResults.innerHTML = '';
    }
  });

  searchInput.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        await loadAlbums(query, 6);
      }
    }
  });


});




