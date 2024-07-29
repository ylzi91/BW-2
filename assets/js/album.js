document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id');
    const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;
    const albumContainer = document.getElementById('album-details');

    function createTrackElement(track) {
        const trackDiv = document.createElement('div');
        trackDiv.className = 'track';
        trackDiv.innerHTML = `
            <div class="track-info">
                <h4>${track.title}</h4>
                <p>${track.artist.name}</p>
            </div>
            <button class="play" data-id="${track.id}">Play</button>
        `;
        return trackDiv;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const album = data;
            albumContainer.innerHTML = `
                <h1>${album.title}</h1>
                <img src="${album.cover}" alt="${album.title}">
                <p>By ${album.artist.name}</p>
                <div class="tracklist">
                    ${album.tracks.data.map(track => createTrackElement(track).outerHTML).join('')}
                </div>
            `;
        })
        .catch(error => console.error('Error:', error));
});
