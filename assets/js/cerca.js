

const searchInput = document.getElementById('searchInput')
const riga =document.getElementById("riga")

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

  

    riga.innerHTML = "";
    albums.forEach((album) => {
      console.log(album);
        riga.innerHTML += `
                  
                    



                      <div class="albumSilente col-6 col-md-4 col-xl-3  ">
                        <div class="d-flex flex-column justify-content-center align-items-start gradient-card rounded">
                       <a href = "./album2.html?myId=${album.album.id} " target = "_blank" class="text-decoration-none text-white"><img src="${album.album.cover_medium}" class="m-0 img-fluid rounded w-100 "> </a>   
                         
                        </div>
                      </div>
                `;
               

    
    });
   

    
    

  }
async function loadAlbums(query, numberOfAlbums) {
    const albums = [];
    const promises = [];
    

    for (let i = 0; i < numberOfAlbums; i++) {
      promises.push(
        fetchAlbum(query).then((data) => {
            albums.push(data.data);
          
        })
      );
    }

    await Promise.all(promises);
    console.log("album appiattito", albums);
    displayAlbums(albums.flat().splice(0, 8));
  }
  searchInput.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        await loadAlbums(query, 8);
      }
    }
  });