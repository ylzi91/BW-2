document.addEventListener("DOMContentLoaded", () => {
    const albumList = document.getElementById('album-list');

    function fetchAlbums(query = 'album') {
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
            .then(response => response.json())
            .then(data => {
                const albums = data.data;
                albumList.innerHTML = ''; // Clear previous results
                albums.forEach(album => {
                    const albumItem = document.createElement('div');
                    albumItem.className = 'album-item';
                    albumItem.innerHTML = `
                        <img src="${album.cover_medium}" alt="${album.title}">
                        <h4>${album.title}</h4>
                        <p>${album.artist.name}</p>
                    `;
                    albumItem.addEventListener('click', () => {
                        window.location.href = `album.html?id=${album.id}`;
                    });
                    albumList.appendChild(albumItem);
                });
            })
            .catch(error => console.error('Error fetching albums:', error));
    }

    document.getElementById('search').addEventListener('input', (event) => {
        fetchAlbums(event.target.value);
    });

    fetchAlbums(); // Load default albums
});
