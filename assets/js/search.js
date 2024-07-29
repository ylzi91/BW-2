document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;

        function createSearchResultElement(result) {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'search-result';
            resultDiv.innerHTML = `
                <img src="${result.album.cover}" alt="${result.title}" />
                <div class="result-info">
                    <h4>${result.title}</h4>
                    <p>${result.artist.name}</p>
                </div>
                <a href="album.html?id=${result.album.id}" class="view-details">View Details</a>
            `;
            return resultDiv;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const results = data.data; // Modifica se la struttura dei dati è diversa
                resultsContainer.innerHTML = ''; // Pulisce i risultati precedenti
                results.forEach(result => {
                    const resultElement = createSearchResultElement(result);
                    resultsContainer.appendChild(resultElement);
                });
            })
            .catch(error => console.error('Error:', error));
    });
});
