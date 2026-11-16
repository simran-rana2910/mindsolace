/**
 * MindConsole AI - Profile & Settings Controller
 */

class ProfileController {
  init() {
    this.loadProfile();
    this.loadSettings();
  }

  loadProfile() {
    if (!auth.currentUser) return;

    const nameInput = document.getElementById('profileNameInput');
    const emailInput = document.getElementById('profileEmailInput');
    const avatarBadge = document.getElementById('profileAvatarDisplay');

    if (nameInput) nameInput.value = auth.currentUser.name;
    if (emailInput) emailInput.value = auth.currentUser.email || '';
    if (avatarBadge) avatarBadge.textContent = auth.currentUser.avatar || 'U';
  }

  saveProfile() {
    const name = document.getElementById('profileNameInput').value.trim();
    const email = document.getElementById('profileEmailInput').value.trim();

    if (!name) {
      alert('Please enter a valid name.');
      return;
    }

    auth.updateProfile(name, email);
    alert('Profile updated successfully! 👤');
    this.loadProfile();

    if (typeof app !== 'undefined') {
      app.updateUserHeader();
    }
  }

  loadSettings() {
    const settings = db.getSettings();

    const themeSelect = document.getElementById('settingThemeSelect');
    const geminiKeyInput = document.getElementById('settingGeminiKeyInput');
    const enableVoiceToggle = document.getElementById('settingEnableVoiceToggle');

    if (themeSelect) themeSelect.value = settings.theme || 'dark';
    if (geminiKeyInput) geminiKeyInput.value = settings.geminiApiKey || '';
    if (enableVoiceToggle) enableVoiceToggle.checked = settings.enableVoice !== false;
  }

  saveSettings() {
    const theme = document.getElementById('settingThemeSelect').value;
    const geminiKey = document.getElementById('settingGeminiKeyInput').value.trim();
    const enableVoice = document.getElementById('settingEnableVoiceToggle').checked;

    const currentSettings = db.getSettings();
    const updated = {
      ...currentSettings,
      theme,
      geminiApiKey: geminiKey,
      enableVoice
    };

    db.saveSettings(updated);
    document.documentElement.setAttribute('data-theme', theme);

    alert('Settings saved! ⚙️');
  }

  exportJSON() {
    const data = db.exportAllData();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `MindCare_Export_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  clearAllData() {
    if (confirm('⚠️ Are you sure you want to reset all local data? This cannot be undone.')) {
      localStorage.clear();
      alert('All local data cleared. Refreshing application...');
      window.location.reload();
    }
  }
}

const profileController = new ProfileController();
