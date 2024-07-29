document.addEventListener('DOMContentLoaded', () => {
    const albumContainer = document.getElementById('album-container');
    const startId = 75621062; // ID da cui iniziare
    const numberOfAlbums = 10;

    function getNextAlbumId(currentId) {
        // Incrementa l'ID corrente per ottenere il prossimo
        return currentId;
    }

    function fetchAlbum(id) {
        return fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
            .then(response => response.json())
            .then(data => data)
            .catch(error => {
                console.error('Error fetching album:', error);
                return null;
            });
    }

    function displayAlbums(albums) {
        if (albums.length === 0) {
            albumContainer.innerHTML = '<p>No albums found.</p>';
            return;
        }

        albumContainer.innerHTML = '';
        albums.forEach(album => {
            if (album) {
                albumContainer.innerHTML += `
                    <div class="item">
                        <img src="${album.cover}" alt="${album.title}" />
                        <div class="play">
                            <span class="fa fa-play"></span>
                        </div>
                        <h4>${album.title}</h4>
                        <p>${album.artist.name}</p>
                    </div>
                `;
            }
        });
    }

    async function loadAlbums(startId, numberOfAlbums) {
        const albums = [];
        const promises = [];
        let currentId = startId;

        for (let i = 0; i < numberOfAlbums; i++) {
            promises.push(fetchAlbum(currentId).then(data => {
                if (data) {
                    albums.push(data);
                }
            }));
            currentId = getNextAlbumId(currentId); // Incrementa l'ID
        }

        await Promise.all(promises);
        displayAlbums(albums);
    }

    // Carica 10 album a partire dall'ID specificato
    loadAlbums(startId, numberOfAlbums);
});
