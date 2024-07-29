document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    const artistDetails = document.getElementById('artist-details');
    const artistAlbums = document.getElementById('artist-albums');

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
        .then(response => response.json())
        .then(data => {
            // Display artist details
            artistDetails.innerHTML = `
                <img src="${data.picture_xl}" alt="${data.name}">
                <h2>${data.name}</h2>
                <p>Top Tracks</p>
            `;

            // Display artist albums
            fetch(data.tracklist)
                .then(response => response.json())
                .then(trackData => {
                    artistAlbums.innerHTML = ''; // Clear previous results
                    trackData.data.forEach(track => {
                        const albumItem = document.createElement('div');
                        albumItem.className = 'album-item';
                        albumItem.innerHTML = `
                            <img src="${track.album.cover_medium}" alt="${track.album.title}">
                            <h4>${track.album.title}</h4>
                            <p>${track.album.artist.name}</p>
                        `;
                        albumItem.addEventListener('click', () => {
                            window.location.href = `album.html?id=${track.album.id}`;
                        });
                        artistAlbums.appendChild(albumItem);
                    });
                })
                .catch(error => console.error('Error fetching artist albums:', error));
        })
        .catch(error => console.error('Error fetching artist:', error));
});
