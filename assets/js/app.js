// Funzione per mostrare un alert "Funzionalità non disponibile"
function showFeatureNotAvailableAlert() {
  alert("Questa funzionalità non è ancora disponibile.");
}

// Funzione universale per copiare il testo da qualsiasi elemento (input, span, etc.)
function copyTextFromElement(elementId) {
  const element = document.getElementById(elementId);
  let textToCopy = '';

  if (!element) {
    console.error(`Elemento con ID "${elementId}" non trovato.`);
    alert("Errore: impossibile trovare l'elemento da cui copiare.");
    return;
  }

  // Controlla se l'elemento è un campo di input/textarea o un altro elemento
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    textToCopy = element.value;
  } else {
    textToCopy = element.textContent || element.innerText;
  }

  if (textToCopy) {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert("Testo copiato negli appunti!");
      })
      .catch(err => {
        console.error("Errore durante la copia del testo: ", err);
        // Fallback per ambienti non sicuri (come file://)
        try {
          const textArea = document.createElement("textarea");
          textArea.value = textToCopy;
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert("Testo copiato negli appunti!");
        } catch (fallbackErr) {
          console.error("Errore fallback: ", fallbackErr);
          alert("Impossibile copiare il testo.");
        }
      });
  } else {
    console.warn(`Nessun testo da copiare dall'elemento con ID "${elementId}".`);
  }
}


// Funzione per alternare la visibilità di un campo password
function togglePasswordVisibility(passwordInputId, toggleIconId) {
    const passwordInput = document.getElementById(passwordInputId);
    const toggleIcon = document.getElementById(toggleIconId);

    if (passwordInput && toggleIcon) {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleIcon.textContent = "visibility"; // Icona per "nascondi"
        } else {
            passwordInput.type = "password";
            toggleIcon.textContent = "visibility_off"; // Icona per "mostra"
        }
    } else {
        if (!passwordInput) console.error(`Campo password con ID "${passwordInputId}" non trovato.`);
        if (!toggleIcon) console.error(`Icona con ID "${toggleIconId}" non trovata.`);
    }
}

// Funzione generica per aprire un link
function openLink(url) {
  if (url) {
    window.location.href = url;
  } else {
    console.error("URL non fornito alla funzione openLink.");
  }
}
