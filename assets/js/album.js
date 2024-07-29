document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id');
    const albumDetails = document.getElementById('album-details');
    const trackList = document.getElementById('track-list');
    const player = document.getElementById('player');

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
        .then(response => response.json())
        .then(data => {
            // Display album details
            albumDetails.innerHTML = `
                <img src="${data.cover_xl}" alt="${data.title}">
                <h2>${data.title}</h2>
                <p>${data.artist.name}</p>
                <p>Released on: ${data.release_date}</p>
                <p>${data.nb_tracks} Tracks</p>
            `;

            // Display tracks
            fetch(data.tracklist)
                .then(response => response.json())
                .then(trackData => {
                    trackList.innerHTML = ''; // Clear previous results
                    trackData.data.forEach(track => {
                        const trackItem = document.createElement('div');
                        trackItem.className = 'track-item';
                        trackItem.innerHTML = `
                            <p>${track.title}</p>
                            <button onclick="playTrack('${track.preview}')">Play Preview</button>
                        `;
                        trackItem.addEventListener('click', () => {
                            player.innerHTML = `
                                <audio controls>
                                    <source src="${track.preview}" type="audio/mpeg">
                                    Your browser does not support the audio element.
                                </audio>
                                <p>${track.title} - ${track.artist.name}</p>
                            `;
                        });
                        trackList.appendChild(trackItem);
                    });
                })
                .catch(error => console.error('Error fetching tracks:', error));
        })
        .catch(error => console.error('Error fetching album:', error));

    window.playTrack = (previewUrl) => {
        player.innerHTML = `
            <audio controls>
                <source src="${previewUrl}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
    };
});
