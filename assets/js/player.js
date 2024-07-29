document.addEventListener('DOMContentLoaded', () => {
    const playButtons = document.querySelectorAll('.track .play');

    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const trackId = button.getAttribute('data-id');
            // Esegui la logica per aggiornare il player qui
            console.log(`Play track with ID: ${trackId}`);
        });
    });
});
