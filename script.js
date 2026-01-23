
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

// Dark Mode Functions
function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButtonText(isDark);
}
function updateThemeButtonText(isDark) {
    const button = document.getElementById('theme-toggle');
    if (button) {
        button.innerHTML = isDark ? '☀️ Toggle Theme 🌙' : '🌙 Toggle Theme ☀️';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyDyslexiaMode();

    // Update theme button text based on the theme set by the inline script
    updateThemeButtonText(document.documentElement.classList.contains('dark'));

    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
});
