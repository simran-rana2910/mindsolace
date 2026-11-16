/**
 * MindConsole AI - Mood Tracker Controller
 */

class MoodController {
  constructor() {
    this.selectedScore = 3;
    this.selectedEmotion = 'Neutral';
    this.selectedTriggers = [];
  }

  init() {
    this.renderMoodOptions();
    this.renderTriggerTags();
    this.loadHistory();
  }

  selectMood(score, emotion) {
    this.selectedScore = score;
    this.selectedEmotion = emotion;

    const options = document.querySelectorAll('.mood-option');
    options.forEach(opt => {
      if (parseInt(opt.dataset.score) === score) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });
  }

  toggleTrigger(tagName, element) {
    if (this.selectedTriggers.includes(tagName)) {
      this.selectedTriggers = this.selectedTriggers.filter(t => t !== tagName);
      element.classList.remove('selected');
    } else {
      this.selectedTriggers.push(tagName);
      element.classList.add('selected');
    }
  }

  saveMood() {
    if (!auth.currentUser) return;

    const noteInput = document.getElementById('moodNote');
    const noteText = noteInput ? noteInput.value.trim() : '';

    const newMood = db.addMood({
      userId: auth.currentUser.id,
      score: this.selectedScore,
      emotion: this.selectedEmotion,
      triggers: this.selectedTriggers,
      note: noteText
    });

    if (noteInput) noteInput.value = '';
    this.selectedTriggers = [];

    // Reset UI selections
    const triggerBtns = document.querySelectorAll('.tag-btn');
    triggerBtns.forEach(b => b.classList.remove('selected'));

    alert('Mood logged successfully! 🌿');
    this.loadHistory();

    // Trigger update for analytics and dashboard stats
    if (typeof analyticsController !== 'undefined') {
      analyticsController.render();
    }
    if (typeof app !== 'undefined') {
      app.updateDashboardStats();
    }
  }

  loadHistory() {
    const listContainer = document.getElementById('moodHistoryList');
    if (!listContainer || !auth.currentUser) return;

    const moods = db.getMoods(auth.currentUser.id).reverse();
    listContainer.innerHTML = '';

    if (moods.length === 0) {
      listContainer.innerHTML = `<div style="color: var(--text-muted); padding: 1rem;">No mood entries logged yet.</div>`;
      return;
    }

    moods.forEach(m => {
      const card = document.createElement('div');
      card.className = 'glass-card';
      card.style.padding = '1rem';
      card.style.marginBottom = '0.75rem';

      const dateStr = new Date(m.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
      const emojiMap = { 1: '😫', 2: '🙁', 3: '😐', 4: '🙂', 5: '😁' };

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.8rem;">${emojiMap[m.score] || '😐'}</span>
            <div>
              <div style="font-weight: 700; font-size: 1rem;">${m.emotion}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${dateStr}</div>
            </div>
          </div>
          <div style="font-weight: 700; color: var(--accent-indigo);">Score: ${m.score}/5</div>
        </div>
        ${m.note ? `<div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem; font-style: italic;">"${m.note}"</div>` : ''}
        ${m.triggers && m.triggers.length > 0 ? `
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; margin-top: 0.5rem;">
            ${m.triggers.map(t => `<span class="prompt-chip" style="font-size: 0.7rem;">${t}</span>`).join('')}
          </div>
        ` : ''}
      `;

      listContainer.appendChild(card);
    });
  }

  renderMoodOptions() {
    const container = document.getElementById('moodOptionsContainer');
    if (!container) return;

    const labels = (typeof i18n !== 'undefined' && i18n.get('moodScoreLabels')) ? i18n.get('moodScoreLabels') : { 1: 'Terrible', 2: 'Sad/Low', 3: 'Neutral', 4: 'Good', 5: 'Great' };

    const moods = [
      { score: 1, emotion: labels[1] || 'Terrible', emoji: '😫' },
      { score: 2, emotion: labels[2] || 'Sad/Low', emoji: '🙁' },
      { score: 3, emotion: labels[3] || 'Neutral', emoji: '😐' },
      { score: 4, emotion: labels[4] || 'Good', emoji: '🙂' },
      { score: 5, emotion: labels[5] || 'Great', emoji: '😁' }
    ];

    container.innerHTML = moods.map(m => `
      <div class="mood-option ${m.score === this.selectedScore ? 'selected' : ''}" 
           data-score="${m.score}" 
           onclick="moodController.selectMood(${m.score}, '${m.emotion}')">
        <span class="mood-emoji">${m.emoji}</span>
        <span style="font-size: 0.85rem; font-weight: 600;">${m.emotion}</span>
      </div>
    `).join('');
  }

  renderTriggerTags() {
    const container = document.getElementById('triggerTagsContainer');
    if (!container) return;

    const tags = (typeof i18n !== 'undefined' && i18n.get('triggers')) ? i18n.get('triggers') : ['Studies', 'Exams', 'Work', 'Family', 'Relationships', 'Loneliness', 'Sleep', 'Health', 'Money', 'Isolation'];

    container.innerHTML = tags.map(t => `
      <button type="button" class="tag-btn ${this.selectedTriggers.includes(t) ? 'selected' : ''}" onclick="moodController.toggleTrigger('${t}', this)">${t}</button>
    `).join('');
  }
}

const moodController = new MoodController();
