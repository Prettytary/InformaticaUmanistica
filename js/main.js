// Funzione per attivare l'effetto scroll reveal
document.addEventListener('DOMContentLoaded', function() {
    // Seleziona tutti gli elementi con la classe scroll-reveal
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    // Funzione per verificare se un elemento è visibile
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    };
    
    // Funzione per rivelare gli elementi quando sono visibili
    const revealElement = () => {
        scrollElements.forEach((el) => {
            if (isElementInViewport(el)) {
                el.classList.add('revealed');
            }
        });
    };
    
    // Aggiungi l'evento scroll
    window.addEventListener('scroll', revealElement);
    
    // Esegui la funzione anche al caricamento della pagina
    revealElement();
    
    // Aggiungi la classe scroll-reveal a tutti gli album-card
    document.querySelectorAll('.album-card').forEach(card => {
        card.classList.add('scroll-reveal');
    });
});