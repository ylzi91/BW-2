
    const traksArray = [];
    function goAlbum(id) {
      window.open(`./album2.html?myId=${id}`, "_blank");
    }
    function goArtist(id) {
      window.open(`./artist2.html?myId=${id}`, "_blank");
    }
    
    document.addEventListener("DOMContentLoaded", () => {
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
        console.log(myArtist)
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
 hero2.style.backgroundImage=`url(${
    myArtist.picture_xl
  })`   

console.log(hero2.style)
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

                    <span class="material-symbols-outlined fs-1 p-2 ps-0 ">
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
sfondomobile.style.backgroundImage=`url(${
    myArtist.picture_xl
  })`   
}

    function displayTracks(traksArray) {
        brani2.innerHTML = '';
        branimobile2.innerHTML="";
        traksArray.forEach((track, index) => {
            console.log(track)
            let nomi="";
            for (let i =0; i<track.contributors.length; i++) 
            {
                nomi+=track.contributors[i].name+" "
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
                    <p class="m-0 fw-light ps-3 ">${track.title }</p>
                     <p class="m-0 fw-light ps-3 gray ">${nomi }</p>
                   
                  </div>
                  <div class="riga-rip2 d-flex justify-content-end align-items-center"><p class="m-0  fw-light gray ps-3">${track.rank}</p> </div>
                  <div class="riga-tempo2 d-flex justify-content-center align-items-center"><p class="m-0  fw-light gray ps-3">${Math.floor(track.duration / 60)}:${Math.floor(track.duration % 60) < 10 ? '0' + Math.floor(track.duration % 60) : Math.floor(track.duration % 60)}</p> </div>
                 
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
                <p class="m-0 fw-light ps-3 ">${track.title }</p>
                <p class="m-0  fw-light gray ps-3">${nomi }</p>
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
       
        displayTracks(traksArray);
        
        
        
        
        console.log("album appiattito", promises);
    }
    
    // const seeOther = document.getElementById('seeOther')
    // seeOther.addEventListener('click', function (){
    //     num += 5
    //     loadAlbums(myId, num)
    //     })
      // Carica 10 album a partire dall'ID specificato
      loadAlbums(myId, num);
    
})
    