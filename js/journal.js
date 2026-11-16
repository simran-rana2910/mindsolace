/**
 * MindConsole AI - Journal & AI Reflection Reframer Controller
 */

class JournalController {
  constructor() {
    this.activeJournalId = null;
  }

  init() {
    this.loadJournals();
  }

  loadJournals(filterSearch = '', filterCategory = 'All') {
    const listContainer = document.getElementById('journalList');
    if (!listContainer || !auth.currentUser) return;

    let journals = db.getJournals(auth.currentUser.id);

    if (filterCategory !== 'All') {
      journals = journals.filter(j => j.category === filterCategory);
    }

    if (filterSearch) {
      const search = filterSearch.toLowerCase();
      journals = journals.filter(j => j.title.toLowerCase().includes(search) || j.content.toLowerCase().includes(search));
    }

    listContainer.innerHTML = '';

    if (journals.length === 0) {
      listContainer.innerHTML = `<div style="color: var(--text-muted); padding: 1rem;">No journal entries found.</div>`;
      return;
    }

    journals.forEach(j => {
      const card = document.createElement('div');
      card.className = `journal-card ${this.activeJournalId === j.id ? 'active' : ''}`;
      card.onclick = () => this.selectJournal(j.id);

      const dateStr = new Date(j.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem;">${j.title || 'Untitled Entry'}</h4>
          <span class="prompt-chip" style="font-size: 0.7rem;">${j.category || 'Personal'}</span>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">${dateStr}</div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-clamp: 2; -webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;">${j.content}</p>
      `;

      listContainer.appendChild(card);
    });
  }

  selectJournal(id) {
    this.activeJournalId = id;
    const journals = db.getJournals(auth.currentUser.id);
    const journal = journals.find(j => j.id === id);

    if (journal) {
      document.getElementById('journalTitleInput').value = journal.title;
      document.getElementById('journalCategorySelect').value = journal.category || 'Reflection';
      document.getElementById('journalContentInput').value = journal.content;
      
      const aiBox = document.getElementById('aiReframingResult');
      if (aiBox) {
        if (journal.aiReframing) {
          aiBox.style.display = 'block';
          aiBox.innerHTML = `<strong>AI Reframing:</strong> ${journal.aiReframing}`;
        } else {
          aiBox.style.display = 'none';
        }
      }
    }

    this.loadJournals();
  }

  createNewEntry() {
    this.activeJournalId = null;
    document.getElementById('journalTitleInput').value = '';
    document.getElementById('journalCategorySelect').value = 'Reflection';
    document.getElementById('journalContentInput').value = '';
    
    const aiBox = document.getElementById('aiReframingResult');
    if (aiBox) aiBox.style.display = 'none';

    this.loadJournals();
  }

  saveJournal() {
    if (!auth.currentUser) return;

    const title = document.getElementById('journalTitleInput').value.trim();
    const category = document.getElementById('journalCategorySelect').value;
    const content = document.getElementById('journalContentInput').value.trim();

    if (!content) {
      alert('Please write something in your journal before saving.');
      return;
    }

    // Generate AI Reframing
    const aiReframingText = nlpEngine.generateJournalReframing(content);

    if (this.activeJournalId) {
      // Update existing entry
      const journals = db.getJournals(auth.currentUser.id);
      const existing = journals.find(j => j.id === this.activeJournalId);
      if (existing) {
        existing.title = title || 'Untitled Entry';
        existing.category = category;
        existing.content = content;
        existing.aiReframing = aiReframingText;
        localStorage.setItem('mindcare_journals', JSON.stringify(journals));
      }
    } else {
      // Create new entry
      const newJournal = db.addJournal({
        userId: auth.currentUser.id,
        title: title || 'Untitled Entry',
        category: category,
        content: content,
        aiReframing: aiReframingText
      });
      this.activeJournalId = newJournal.id;
    }

    alert('Journal entry saved with AI reflection! 📝');
    this.selectJournal(this.activeJournalId);
  }

  deleteCurrentJournal() {
    if (!this.activeJournalId) return;

    if (confirm('Are you sure you want to delete this journal entry?')) {
      db.deleteJournal(this.activeJournalId);
      this.createNewEntry();
    }
  }

  requestAIReframing() {
    const content = document.getElementById('journalContentInput').value.trim();
    if (!content) {
      alert('Please write some content first to receive AI reflection.');
      return;
    }

    const aiReframingText = nlpEngine.generateJournalReframing(content);
    const aiBox = document.getElementById('aiReframingResult');
    if (aiBox) {
      aiBox.style.display = 'block';
      aiBox.innerHTML = `<strong>AI Positive Reframing:</strong> ${aiReframingText}`;
    }
  }
}

const journalController = new JournalController();
