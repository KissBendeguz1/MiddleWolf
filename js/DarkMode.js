function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') == 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    setupDarkModeCheckbox();
    setupSettingsToggle();
}

function setupDarkModeCheckbox() {
    const checkbox = document.getElementById('dark-mode-toggle');
    if (checkbox) {
        checkbox.checked = document.body.classList.contains('dark-mode');
        checkbox.addEventListener('change', toggleDarkMode);
    }
}

function setupSettingsToggle() {
    const settingImg = document.getElementById('sidebar-setting');
    const settingsDiv = document.querySelector('.sidebar-settings div');
    
    if (settingImg && settingsDiv) {
        settingImg.style.cursor = 'pointer';
        settingImg.addEventListener('click', function() {
            settingsDiv.classList.toggle('show');
        });
    }
}

function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
    initDarkMode();
}
