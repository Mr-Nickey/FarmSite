
function toggleDyslexiaMode() {
    const body = document.body;
    body.classList.toggle('dyslexia-mode');
    
    const isDyslexia = body.classList.contains('dyslexia-mode');
    localStorage.setItem('dyslexiaMode', isDyslexia ? 'true' : 'false');
    updateDyslexiaButtonText(isDyslexia);
}

function applyDyslexiaMode() {
    const isDyslexiaMode = localStorage.getItem('dyslexiaMode');
    const isDyslexia = isDyslexiaMode === 'true' || isDyslexiaMode === 'on';
    if (isDyslexia) {
        document.body.classList.add('dyslexia-mode');
    }
    updateDyslexiaButtonText(isDyslexia);
}

function updateDyslexiaButtonText(isDyslexia) {
    const button = document.getElementById('dyslexia-toggle');
    if (button) {
        button.textContent = isDyslexia ? 'Dyslexia Font: On' : 'Dyslexia Font: Off';
    }
}

document.addEventListener('DOMContentLoaded', applyDyslexiaMode);
