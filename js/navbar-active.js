document.addEventListener('DOMContentLoaded', function() {
    // Ottieni il nome del file corrente
    const currentPage = window.location.pathname.split('/').pop();
    
    // Rimuovi la classe active da tutti gli elementi
    document.querySelectorAll('.navbar-nav .nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Imposta la classe active in base alla pagina corrente
    switch(currentPage) {
        case 'index.html':
        case '':
            document.getElementById('nav-home').classList.add('active');
            break;
        case 'storia.html':
            document.getElementById('nav-storia').classList.add('active');
            break;
        case 'catalogo.html':
            document.getElementById('nav-catalogo').classList.add('active');
            break;
        case 'producer.html':
            document.getElementById('nav-producer').classList.add('active');
            break;
        case 'moda.html':
            document.getElementById('nav-moda').classList.add('active');
            break;
        case 'contatti.html':
            document.getElementById('nav-contatti').classList.add('active');
            break;
    }
});