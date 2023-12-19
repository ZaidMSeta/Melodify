document.addEventListener('DOMContentLoaded', function () {
  const modeToggle = document.getElementById('modeToggle');
  const modeText = document.getElementById('modeText');

  modeToggle.addEventListener('change', () => {
      document.body.classList.toggle('light-mode', modeToggle.checked);
      modeText.innerText = modeToggle.checked ? 'Light Mode' : 'Dark Mode';

      // Save user's preference to localStorage
      localStorage.setItem('lightMode', modeToggle.checked ? 'enabled' : null);
  });

  // Check the user's preference from previous visits (if available)
  const storedLightMode = localStorage.getItem('lightMode');
  if (storedLightMode === 'enabled') {
      document.body.classList.add('light-mode');
      modeToggle.checked = true;
      modeText.innerText = 'Dark Mode';
  }
});
