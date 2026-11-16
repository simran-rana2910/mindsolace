/**
 * MindSolace - Database & LocalStorage State Manager (MindCareDB)
 */

const STORAGE_KEYS = {
  USERS: 'mindsolace_users',
  SESSION: 'mindsolace_session',
  MOODS: 'mindsolace_moods',
  JOURNALS: 'mindsolace_journals',
  CHATS: 'mindsolace_chats',
  CONTACTS: 'mindsolace_contacts',
  SETTINGS: 'mindsolace_settings'
};

const DefaultSeedData = {
  moods: [
    { id: 'm-1', userId: 'user-1', date: new Date(Date.now() - 4 * 86400000).toISOString(), score: 3, emotion: 'Neutral', triggers: ['Studies', 'Sleep'], note: 'Busy with project deadline. Feeling a bit tired.' },
    { id: 'm-2', userId: 'user-1', date: new Date(Date.now() - 3 * 86400000).toISOString(), score: 2, emotion: 'Anxiety', triggers: ['Exams', 'Overthinking'], note: 'Felt nervous about upcoming exams and future plans.' },
    { id: 'm-3', userId: 'user-1', date: new Date(Date.now() - 2 * 86400000).toISOString(), score: 2, emotion: 'Loneliness', triggers: ['Isolation'], note: 'Felt a little isolated in the evening. Needed someone to talk to.' },
    { id: 'm-4', userId: 'user-1', date: new Date(Date.now() - 1 * 86400000).toISOString(), score: 4, emotion: 'Happy', triggers: ['Friends', 'Exercise'], note: 'Talked to RC Chat AI and took a walk. Felt much lighter!' },
    { id: 'm-5', userId: 'user-1', date: new Date().toISOString(), score: 4, emotion: 'Hopeful', triggers: ['Achievement'], note: 'Started working on my MindSolace project!' }
  ],
  journals: [
    { id: 'j-1', userId: 'user-1', date: new Date(Date.now() - 2 * 86400000).toISOString(), title: 'Reflections on Stress', content: 'Sometimes work feels overwhelming, but I am learning to take things step by step. Breathing deeply really helps.', category: 'Reflection', aiReframing: 'Recognizing stress is a sign of courage. Remind yourself that you have overcome 100% of your hardest days.' },
    { id: 'j-2', userId: 'user-1', date: new Date(Date.now() - 1 * 86400000).toISOString(), title: 'Small Victories Today', content: 'Completed my project outline and drank plenty of water. Giving myself credit for small daily progress.', category: 'Grateful', aiReframing: 'Celebrating small wins builds emotional resilience. Keep honoring your journey!' }
  ],
  chats: [
    { id: 'c-1', userId: 'user-1', sender: 'ai', text: 'Hello! I am your RC Chat AI companion. I am always here for you when you need a safe, non-judgmental space to share your thoughts. How are you feeling today?', timestamp: new Date(Date.now() - 3600000).toISOString(), emotion: 'Neutral' },
    { id: 'c-2', userId: 'user-1', sender: 'user', text: 'I was feeling quite stressed about my exams and lonely earlier.', timestamp: new Date(Date.now() - 3500000).toISOString(), emotion: 'Anxiety' },
    { id: 'c-3', userId: 'user-1', sender: 'ai', text: 'I hear you. Exam pressure combined with loneliness can feel heavy. Please remember that your worth is not defined by grades, and you are never truly alone. Take a slow, deep breath with me right now. 🌿', timestamp: new Date(Date.now() - 3400000).toISOString(), emotion: 'Empathy' }
  ],
  contacts: [
    { id: 'helpline-1', name: 'Tele-MANAS (Govt of India Mental Health)', phone: '14416 / 1800-891-4416', type: '24/7 Helpline' },
    { id: 'helpline-2', name: 'Vandrevala Foundation Helpline', phone: '9999 666 555', type: '24/7 Crisis Support' },
    { id: 'helpline-3', name: 'NIMHANS Toll Free Support', phone: '080-46110007', type: 'National Helpline' }
  ],
  settings: {
    theme: 'dark',
    geminiApiKey: '',
    enableVoice: true,
    voiceSpeed: 1
  }
};

class DatabaseManager {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      const defaultUser = {
        id: 'user-1',
        name: 'User',
        email: 'user@mca.edu',
        passwordHash: 'demo123',
        isAnonymous: false,
        avatar: 'U',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([defaultUser]));
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(defaultUser));
    }

    if (!localStorage.getItem(STORAGE_KEYS.MOODS)) {
      localStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify(DefaultSeedData.moods));
    }

    if (!localStorage.getItem(STORAGE_KEYS.JOURNALS)) {
      localStorage.setItem(STORAGE_KEYS.JOURNALS, JSON.stringify(DefaultSeedData.journals));
    }

    if (!localStorage.getItem(STORAGE_KEYS.CHATS)) {
      localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(DefaultSeedData.chats));
    }

    if (!localStorage.getItem(STORAGE_KEYS.CONTACTS)) {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(DefaultSeedData.contacts));
    }

    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DefaultSeedData.settings));
    }
  }

  // Session Management
  getCurrentUser() {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    return session ? JSON.parse(session) : null;
  }

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
  }

  clearSession() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }

  // Users Management
  getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  }

  saveUser(user) {
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  // Mood Logs
  getMoods(userId) {
    const moods = JSON.parse(localStorage.getItem(STORAGE_KEYS.MOODS) || '[]');
    return userId ? moods.filter(m => m.userId === userId) : moods;
  }

  addMood(moodData) {
    const moods = this.getMoods();
    const newMood = {
      id: 'm-' + Date.now(),
      date: new Date().toISOString(),
      ...moodData
    };
    moods.push(newMood);
    localStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify(moods));
    return newMood;
  }

  // Journal Entries
  getJournals(userId) {
    const journals = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOURNALS) || '[]');
    return userId ? journals.filter(j => j.userId === userId) : journals;
  }

  addJournal(journalData) {
    const journals = this.getJournals();
    const newJournal = {
      id: 'j-' + Date.now(),
      date: new Date().toISOString(),
      ...journalData
    };
    journals.unshift(newJournal);
    localStorage.setItem(STORAGE_KEYS.JOURNALS, JSON.stringify(journals));
    return newJournal;
  }

  deleteJournal(id) {
    let journals = this.getJournals();
    journals = journals.filter(j => j.id !== id);
    localStorage.setItem(STORAGE_KEYS.JOURNALS, JSON.stringify(journals));
  }

  // Chat History
  getChats(userId) {
    const chats = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHATS) || '[]');
    return userId ? chats.filter(c => c.userId === userId) : chats;
  }

  addChat(chatData) {
    const chats = this.getChats();
    const newChat = {
      id: 'c-' + Date.now(),
      timestamp: new Date().toISOString(),
      ...chatData
    };
    chats.push(newChat);
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
    return newChat;
  }

  clearChats(userId) {
    let chats = this.getChats();
    chats = chats.filter(c => c.userId !== userId);
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
  }

  // Settings
  getSettings() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}');
  }

  saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }

  // Export / Import Data
  exportAllData() {
    return {
      users: this.getUsers(),
      moods: this.getMoods(),
      journals: this.getJournals(),
      chats: this.getChats(),
      settings: this.getSettings(),
      exportDate: new Date().toISOString()
    };
  }
}

const db = new DatabaseManager();
