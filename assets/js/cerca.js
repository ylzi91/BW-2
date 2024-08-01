
const spinner = document.getElementById("spinner")
const searchInput = document.getElementById('searchInput')
const riga =document.getElementById("riga")
const riga2 =document.getElementById("riga2")

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


  function displayAlbums(albums) {
    if (albums.length === 0) {
      albumContainer.innerHTML = "<p>No albums found.</p>";
      return;
    }

    indexRand = Math.floor(Math.random() * 6);
    console.log('indexranf', indexRand)
    console.log('albumindex',albums[indexRand])

    const removeDup = (albums) => {
      const idUnic = new Set()
      console.log('id unic',idUnic)

    const albumsNoDupilicate = albums.filter ((obj) => {
      if(!idUnic.has(obj.album.id)){
        idUnic.add(obj.album.id)
        return true
      }
      else
      return false
    })
    console.log('albumsdentro remove',albumsNoDupilicate)
    return albumsNoDupilicate



  }
    const removeDupArt = (artist) => {
      const idUnic = new Set()
      console.log('id unic',idUnic)

    const artistNoDuplicate = artist.filter ((obj) => {
      if(!idUnic.has(obj.artist.id)){
        idUnic.add(obj.artist.id)
        return true
      }
      else
      return false
    })
    console.log('albumsdentro remove',albumsNoDupilicate)
    return artistNoDuplicate



  }
  const albumsNoDupilicate = removeDup(albums)
  const artistNoDuplicate = removeDupArt(albums)
  console.log('albumNo' ,albumsNoDupilicate)
  

    riga.innerHTML = "";
    riga2.innerHTML = '';
    let bool = true
    artistNoDuplicate.forEach((artist, index) => {

    
        console.log('artista', albums[index].artist.name, albums[0].artist.name)
        riga.innerHTML += `
                  
                      <div class="albumSilente col-6 col-md-4 col-xl-3 ">
                        <div class="d-flex flex-column justify-content-center align-items-center mb-5 rounded position-relative pointer ">
                       <a href = "./artist2.html?myId=${artist.artist.id} " target = "_blank" class="text-decoration-none text-white"><img src="${artist.artist.picture_medium}" class="m-0 img-fluid rounded">    
                       </a>
                       <label>${artist.artist.name}</label>
                        </div>
              
                      </div>
                `;
      
              });

        albumsNoDupilicate.forEach((album) => {
          riga2.innerHTML += `
                    
                        <div class="albumSilente col-6 col-md-4 col-xl-3 ">
                          <div class="d-flex flex-column justify-content-center align-items-center mb-5 rounded position-relative pointer ">
                         <a href = "./album2.html?myId=${album.album.id} " target = "_blank" class="text-decoration-none text-white"><img src="${album.album.cover_medium}" class="m-0 img-fluid rounded">    
                         </a>
                         <label>${album.album.title}</label>
                          </div>
                
                        </div>
                  `;


        })
      
      
      
    
   
   

    
    

  }
async function loadAlbums(query, numberOfAlbums) {
    const albums = [];
    const promises = [];
    spinner.classList.remove("d-none")

    for (let i = 0; i < numberOfAlbums; i++) {
      promises.push(
        fetchAlbum(query).then((data) => {
            albums.push(data.data);
          
        })
      );
    }

    await Promise.all(promises);
    console.log("album appiattito", albums);
   
      displayAlbums(albums.flat().splice(0, numberOfAlbums));
      spinner.classList.add("d-none")
  }
  searchInput.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        await loadAlbums(query, 12);
      }
    }


  });

  loadAlbums('pop', 12)