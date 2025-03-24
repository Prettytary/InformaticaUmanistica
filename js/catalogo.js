document.addEventListener('DOMContentLoaded', function() {
    // Gestione del modal dinamico per gli artisti
    $('#artistModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        const artistName = button.data('artist');
        const modal = $(this);
        
        // Aggiorna il titolo del modal
        modal.find('.modal-title').text(artistName);
        
        // Dati specifici per gli artisti aggiunti
        let artistData = {};
        
        // Aggiungiamo dati per i nuovi artisti featured
        artistData['Lauryn Hill'] = {
            bio: "Cantante, rapper e attrice americana, ex membro dei Fugees. Il suo album 'The Miseducation of Lauryn Hill' è considerato uno dei migliori album hip hop di tutti i tempi.",
            albums: ["The Miseducation of Lauryn Hill (1998)", "MTV Unplugged No. 2.0 (2002)"],
            facts: "Ha vinto 5 Grammy Awards in una sola notte per il suo album di debutto, stabilendo un record. È nota per aver fuso hip hop, R&B e reggae in uno stile unico."
        };
        
        artistData['Kanye West'] = {
            bio: "Rapper, produttore e designer americano, noto per il suo approccio innovativo alla musica hip hop e la sua influenza sulla moda.",
            albums: ["The College Dropout (2004)", "Late Registration (2005)", "Graduation (2007)", "My Beautiful Dark Twisted Fantasy (2010)", "Yeezus (2013)"],
            facts: "Ha rivoluzionato il suono dell'hip hop più volte durante la sua carriera. È anche fondatore del brand di moda Yeezy."
        };
        
        artistData['Ice Cube'] = {
            bio: "Rapper, attore e regista americano, ex membro degli N.W.A., pioniere del gangsta rap della West Coast.",
            albums: ["AmeriKKKa's Most Wanted (1990)", "Death Certificate (1991)", "The Predator (1992)"],
            facts: "Dopo la carriera con gli N.W.A., ha avuto successo sia come solista che come attore in film come 'Boyz n the Hood' e la serie 'Friday'."
        };
        
        artistData['Rakim'] = {
            bio: "Considerato uno dei più grandi MC di tutti i tempi, ha rivoluzionato il flow e la tecnica lirica nell'hip hop come parte del duo Eric B. & Rakim.",
            albums: ["Paid in Full (1987, con Eric B.)", "Follow the Leader (1988, con Eric B.)", "The 18th Letter (1997)"],
            facts: "Il suo stile lirico complesso e il suo flow innovativo hanno influenzato generazioni di rapper. È noto per aver elevato l'hip hop a una forma d'arte più sofisticata."
        };
        
        // Contenuto del modal
        let artistContent = '';
        
        // Se abbiamo dati specifici per questo artista, usiamoli
        if (artistData[artistName]) {
            artistContent = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="img/${artistName.toLowerCase().replace(/ /g, '')}.jpg" alt="${artistName}" class="img-fluid" onerror="this.src='https://picsum.photos/400/400?random=${Math.floor(Math.random() * 100)}'">
                    </div>
                    <div class="col-md-8">
                        <h4>Biografia</h4>
                        <p>${artistData[artistName].bio}</p>
                        
                        <h4>Album principali</h4>
                        <ul>
                            ${artistData[artistName].albums.map(album => `<li>${album}</li>`).join('')}
                        </ul>
                        
                        <h4>Curiosità</h4>
                        <p>${artistData[artistName].facts}</p>
                    </div>
                </div>
            `;
        } else {
            // Contenuto generico per gli altri artisti
            artistContent = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="img/${artistName.toLowerCase().replace(/ /g, '')}.jpg" alt="${artistName}" class="img-fluid" onerror="this.src='https://picsum.photos/400/400?random=${Math.floor(Math.random() * 100)}'">
                    </div>
                    <div class="col-md-8">
                        <h4>Biografia</h4>
                        <p>Informazioni biografiche su ${artistName}...</p>
                        
                        <h4>Album principali</h4>
                        <ul>
                            <li>Album 1</li>
                            <li>Album 2</li>
                            <li>Album 3</li>
                        </ul>
                        
                        <h4>Curiosità</h4>
                        <p>Fatti interessanti su ${artistName} e il suo impatto sulla cultura hip hop.</p>
                    </div>
                </div>
            `;
        }
        
        modal.find('.modal-body').html(artistContent);
    });
    
    // Gestione del click sugli elementi della lista artisti
    document.querySelectorAll('.artist-list li').forEach(item => {
        item.addEventListener('click', function() {
            const artistName = this.textContent.substring(this.textContent.indexOf('. ') + 2);
            
            // Apri il modal con i dati dell'artista
            $('#artistModal').modal('show');
            $('#artistModal').find('.modal-title').text(artistName);
            
            // Contenuto di esempio
            let artistContent = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="img/artist-placeholder.jpg" alt="${artistName}" class="img-fluid" onerror="this.src='https://picsum.photos/400/400?random=${Math.floor(Math.random() * 100)}'">
                    </div>
                    <div class="col-md-8">
                        <h4>Biografia</h4>
                        <p>Informazioni biografiche su ${artistName}...</p>
                        
                        <h4>Album principali</h4>
                        <ul>
                            <li>Album 1</li>
                            <li>Album 2</li>
                            <li>Album 3</li>
                        </ul>
                        
                        <h4>Curiosità</h4>
                        <p>Fatti interessanti su ${artistName} e il suo impatto sulla cultura hip hop.</p>
                    </div>
                </div>
            `;
            
            $('#artistModal').find('.modal-body').html(artistContent);
        });
    });
});