// Configurazione per l'API di Spotify
const clientId = 'TUO_CLIENT_ID'; // Sostituisci con il tuo Client ID
const clientSecret = 'TUO_CLIENT_SECRET'; // Sostituisci con il tuo Client Secret

// Funzione per ottenere il token di accesso
async function getAccessToken() {
    try {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    } catch (error) {
        console.error('Errore nell\'ottenere il token:', error);
        throw error;
    }
}

// Funzione per chiamare l'API di Spotify
async function fetchWebApi(endpoint, method, token) {
    try {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method
        });
        return await res.json();
    } catch (error) {
        console.error('Errore nella chiamata API:', error);
        throw error;
    }
}

// Funzione per ottenere le playlist Hip Hop
async function getHipHopPlaylists() {
    try {
        const token = await getAccessToken();
        // Cerchiamo playlist di Hip Hop
        const result = await fetchWebApi(
            'v1/browse/categories/hiphop/playlists?limit=3', 'GET', token
        );
        
        return result.playlists?.items || [];
    } catch (error) {
        console.error('Errore nel recupero delle playlist:', error);
        return [];
    }
}

// Funzione per visualizzare le playlist nella pagina
async function displayPlaylists() {
    const container = document.getElementById('spotify-content');
    
    try {
        const playlists = await getHipHopPlaylists();
        
        if (playlists.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-danger">Nessuna playlist trovata. Verifica le credenziali API.</p>
                    <button class="btn btn-primary mt-3" onclick="displayPlaylists()">Riprova</button>
                </div>`;
            return;
        }
        
        let html = '';
        
        playlists.forEach(playlist => {
            const imageUrl = playlist.images[0]?.url || 'img/default-playlist.jpg';
            
            html += `
            <div class="col-md-4 mb-4">
                <div class="card spotify-card">
                    <img src="${imageUrl}" class="card-img-top" alt="${playlist.name}">
                    <div class="card-body">
                        <h5 class="card-title">${playlist.name}</h5>
                        <p class="card-text">${playlist.description || 'Playlist Hip Hop'}</p>
                        <a href="${playlist.external_urls.spotify}" target="_blank" class="btn btn-spotify">
                            <i class="fab fa-spotify mr-2"></i>Ascolta su Spotify
                        </a>
                    </div>
                </div>
            </div>`;
        });
        
        container.innerHTML = html;
    } catch (error) {
        console.error('Errore nella visualizzazione delle playlist:', error);
        container.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Si è verificato un errore nel caricamento dei contenuti Spotify.</p>
                <p class="small text-muted">Dettaglio: ${error.message || 'Errore sconosciuto'}</p>
                <button class="btn btn-primary mt-3" onclick="displayPlaylists()">Riprova</button>
            </div>`;
    }
}

// Aggiungiamo anche una funzione per gestire gli errori
function handleSpotifyError() {
    const container = document.getElementById('spotify-content');
    container.innerHTML = `
        <div class="col-12 text-center">
            <p class="text-danger">Si è verificato un errore nel caricamento dei contenuti Spotify.</p>
            <button class="btn btn-primary mt-3" onclick="displayPlaylists()">Riprova</button>
        </div>`;
}

// Carica le playlist quando la pagina è pronta
document.addEventListener('DOMContentLoaded', function() {
    try {
        displayPlaylists();
    } catch (error) {
        console.error('Errore generale:', error);
        handleSpotifyError();
    }
});