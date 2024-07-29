document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`;
    const artistContainer = document.getElementById('artist-details');

    function createAlbumElement(album) {
        const albumDiv = document.createElement('div');
        albumDiv.className = 'album';
        albumDiv.innerHTML = `
            <img src="${album.cover}" alt="${album.title}">
            <h4>${album.title}</h4>
            <a href="album.html?id=${album.id}">View Details</a>
        `;
        return albumDiv;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const artist = data;
            artistContainer.innerHTML = `
                <h1>${artist.name}</h1>
                <img src="${artist.picture}" alt="${artist.name}">
                <div class="albums">
                    ${artist.albums.data.map(album => createAlbumElement(album).outerHTML).join('')}
                </div>
            `;
        })
        .catch(error => console.error('Error:', error));
});
