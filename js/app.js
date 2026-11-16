/**
 * MindSolace - Main Application Router & Entry Point
 * Tagline: "Share Your Feelings, Vent, and Find Comfort with AI & Peer Listeners"
 */

const Quotes = [
  { text: "Share Your Feelings, Vent, and Find Comfort with AI & Peer Listeners.", author: "MindSolace Philosophy" },
  { text: "You don't have to carry your emotional burden alone. We are always here to listen.", author: "MindSolace Solace" },
  { text: "It is okay to express vulnerability. Venting out feelings is the first step toward healing.", author: "MindSolace Care" },
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
  { text: "Out of your vulnerabilities will come your strength.", author: "Sigmund Freud" },
  { text: "There is hope, even when your brain tells you there isn't.", author: "John Green" }
];

class App {
  constructor() {
    this.activeTab = 'dashboard';
  }

  init() {
    // 1. Initialize Theme & Language
    const settings = db.getSettings();
    document.documentElement.setAttribute('data-theme', settings.theme || 'dark');
    if (typeof i18n !== 'undefined') {
      i18n.applyTranslations();
    }

    // 2. Check Auth State
    if (!auth.isLoggedIn()) {
      this.showAuthScreen();
    } else {
      this.hideAuthScreen();
      this.updateUserHeader();
      this.initQuote();
      this.updateDashboardStats();

      // Initialize Module Controllers
      chatController.init();
      moodController.init();
      journalController.init();
      profileController.init();
      peersController.init();

      if (typeof i18n !== 'undefined') {
        i18n.applyTranslations();
      }
    }
  }

  switchTab(tabName) {
    this.activeTab = tabName;

    // Update Nav active classes
    const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
    navItems.forEach(item => {
      if (item.dataset.tab === tabName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update Page Views
    const pageViews = document.querySelectorAll('.page-view');
    pageViews.forEach(view => {
      if (view.id === `${tabName}View`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Page Specific Triggers
    const pageTitleElem = document.getElementById('pageTitle');
    const titleKeyMap = {
      dashboard: 'titleDashboard',
      chat: 'titleChat',
      peers: 'titlePeers',
      mood: 'titleMood',
      analytics: 'titleAnalytics',
      journal: 'titleJournal',
      profile: 'titleProfile'
    };
    if (pageTitleElem) {
      if (typeof i18n !== 'undefined' && titleKeyMap[tabName]) {
        pageTitleElem.textContent = i18n.get(titleKeyMap[tabName]);
      } else {
        const titles = {
          dashboard: 'Dashboard Overview',
          chat: 'AI Empathy Console (Talk to AI)',
          peers: 'Peer Listening Circle (Talk to Real Peers)',
          mood: 'Daily Mood Tracker',
          analytics: 'Mood & Emotion Analytics',
          journal: 'Personal Thought Journal',
          profile: 'User Profile & Settings'
        };
        pageTitleElem.textContent = titles[tabName] || 'MindSolace';
      }
    }

    if (tabName === 'analytics') {
      analyticsController.render();
    } else if (tabName === 'peers') {
      peersController.init();
    } else if (tabName === 'dashboard') {
      this.updateDashboardStats();
    }

    // Close mobile sidebar if open
    this.toggleMobileSidebar(false);
  }

  updateUserHeader() {
    const u = auth.currentUser;
    if (!u) return;

    const userNameElems = document.querySelectorAll('.user-name-display');
    const avatarElems = document.querySelectorAll('.user-avatar-display');

    userNameElems.forEach(e => e.textContent = u.name);
    avatarElems.forEach(e => e.textContent = u.avatar || 'U');
  }

  initQuote() {
    const quoteElem = document.getElementById('dailyQuoteText');
    const authorElem = document.getElementById('dailyQuoteAuthor');

    const randomQuote = Quotes[Math.floor(Math.random() * Quotes.length)];
    if (quoteElem) quoteElem.textContent = `"${randomQuote.text}"`;
    if (authorElem) authorElem.textContent = `— ${randomQuote.author}`;
  }

  updateDashboardStats() {
    if (!auth.currentUser) return;
    const moods = db.getMoods(auth.currentUser.id);
    const journals = db.getJournals(auth.currentUser.id);

    let streak = 0;
    if (moods.length > 0) {
      streak = Math.min(moods.length, 7);
    }

    const streakElem = document.getElementById('dashStreakVal');
    const journalCountElem = document.getElementById('dashJournalVal');
    const todayMoodElem = document.getElementById('dashTodayMoodVal');

    if (streakElem) streakElem.textContent = `${streak} Days 🔥`;
    if (journalCountElem) journalCountElem.textContent = journals.length;

    if (todayMoodElem) {
      const todayStr = new Date().toISOString().slice(0, 10);
      const todayLog = moods.find(m => m.date.slice(0, 10) === todayStr);
      todayMoodElem.textContent = todayLog ? `${todayLog.emotion}` : 'Not Checked-in';
    }
  }

  showAuthScreen() {
    const authOverlay = document.getElementById('authOverlay');
    if (authOverlay) authOverlay.classList.add('active');
  }

  hideAuthScreen() {
    const authOverlay = document.getElementById('authOverlay');
    if (authOverlay) authOverlay.classList.remove('active');
  }

  toggleMobileSidebar(forceState) {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    if (forceState !== undefined) {
      if (forceState) sidebar.classList.add('open');
      else sidebar.classList.remove('open');
    } else {
      sidebar.classList.toggle('open');
    }
  }

  // Auth Submit Handlers
  handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPassword').value;

    try {
      auth.login(email, pass);
      this.hideAuthScreen();
      this.init();
    } catch (err) {
      alert(err.message);
    }
  }

  handleRegisterSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPassword').value;

    try {
      auth.register(name, email, pass);
      this.hideAuthScreen();
      this.init();
    } catch (err) {
      alert(err.message);
    }
  }

  handleAnonymousLogin() {
    auth.loginAnonymous();
    this.hideAuthScreen();
    this.init();
  }
}

const app = new App();

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
