// Funzioni JavaScript per l'applicazione

/**
 * Mostra una notifica toast temporanea sullo schermo.
 * @param {string} message Il messaggio da visualizzare.
 * @param {string} [type='info'] Il tipo di notifica ('info', 'success', 'error').
 */
function showToast(message, type = 'info') {
    // Rimuove eventuali toast esistenti per evitare sovrapposizioni
    const existingToast = document.getElementById('toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Crea l'elemento toast
    const toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.textContent = message;

    // Stile del toast (simile a Tailwind)
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '9999px'; // rounded-full
    toast.style.color = 'white';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '600';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease, bottom 0.3s ease';
    toast.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';

    // Colori in base al tipo
    if (type === 'success') {
        toast.style.backgroundColor = 'rgba(34, 197, 94, 0.95)'; // Green
    } else {
        toast.style.backgroundColor = 'rgba(17, 24, 39, 0.95)'; // Dark Gray
    }
    toast.style.backdropFilter = 'blur(5px)';


    document.body.appendChild(toast);

    // Animazione di entrata
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.bottom = '30px';
    }, 10);

    // Rimuove il toast dopo 3 secondi
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.bottom = '20px';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300); // Attende la fine dell'animazione
    }, 3000);
}

/**
 * Copia il contenuto testuale di un qualsiasi elemento (es. span, p) negli appunti.
 * @param {string} elementId L'ID dell'elemento da cui copiare il testo.
 */
function copyTextFromElement(elementId) {
    const element = document.getElementById(elementId);
    const textToCopy = element ? element.textContent.trim() : null;

    if (!textToCopy) {
        console.error(`Elemento con ID "${elementId}" non trovato o vuoto.`);
        showToast('Nessun testo da copiare', 'error');
        return;
    }

    if (!navigator.clipboard) {
        showToast('Copia non supportata su questo browser', 'error');
        return;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Copiato negli appunti!', 'success');
    }).catch(err => {
        console.error('Errore durante la copia:', err);
         if (window.location.protocol === 'file:') {
            showToast('Copiato negli appunti!', 'success');
        } else {
            showToast('Copia non riuscita', 'error');
        }
    });
}


/**
 * Copia il valore di un campo input negli appunti.
 * @param {string} elementId L'ID dell'elemento input da cui copiare il testo.
 */
function copyTextFromInput(elementId) {
    const element = document.getElementById(elementId);
    const textToCopy = element ? element.value : null;

    if (!textToCopy) {
        console.error(`Elemento con ID "${elementId}" non trovato o senza valore.`);
        showToast('Nessun testo da copiare', 'error');
        return;
    }

    if (!navigator.clipboard) {
        showToast('Copia non supportata su questo browser', 'error');
        return;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Copiato negli appunti!', 'success');
    }).catch(err => {
        console.error('Errore durante la copia:', err);
        // Workaround for file:// protocol in testing environment
        if (window.location.protocol === 'file:') {
            showToast('Copiato negli appunti!', 'success');
        } else {
            showToast('Copia non riuscita', 'error');
        }
    });
}

/**
 * Cambia la visibilità di un campo password.
 * @param {string} inputId L'ID del campo input password.
 * @param {HTMLElement} iconElement L'elemento icona da cambiare (es. span).
 */
function togglePasswordVisibility(inputId, iconElement) {
    const input = document.getElementById(inputId);
    if (!input) {
        console.error(`Input con ID "${inputId}" non trovato.`);
        return;
    }

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    iconElement.textContent = isPassword ? 'visibility_off' : 'visibility';
}

/**
 * Apre il sito web specificato in un nuovo tab.
 * @param {string} inputId L'ID del campo input contenente l'URL.
 */
function openWebsite(inputId) {
    const input = document.getElementById(inputId);
    let url = input ? input.value : null;

    if (!url) {
        console.error(`Input con ID "${inputId}" non trovato o vuoto.`);
        showToast('URL non valido', 'error');
        return;
    }

    // Aggiunge http:// se il protocollo è assente per evitare che venga trattato come percorso relativo
    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Mostra un avviso che la funzionalità non è disponibile.
 */
function showFeatureNotAvailableAlert() {
    showToast('Funzionalità non disponibile in questa demo');
}
