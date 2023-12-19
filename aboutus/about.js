// about.js

document.addEventListener('DOMContentLoaded', function () {
    // Check the user's preference from previous visits (if available)
    const storedLightMode = localStorage.getItem('lightMode');
    if (storedLightMode === 'enabled') {
        document.body.classList.add('light-mode');
    }
});
