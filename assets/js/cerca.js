const searchButton = document.getElementById('searchButton')
const searchBar = document.getElementsByClassName('hidden')[0]
const searchInput = document.getElementById('searchInput')

searchButton.addEventListener('click', () => {
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) {
      searchInput.focus();
    } else {
      searchInput.value = '';
    }
  });

  searchInput.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        await loadAlbums(query, 6);
      }
    }
  });