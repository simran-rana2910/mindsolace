/**
 * MindSolace - Internationalization & Multi-Language Engine (i18n)
 * Supported Languages: English (en), Hindi (hi - हिंदी), Hinglish (hinglish)
 */

const Translations = {
  en: {
    // Brand & Header
    brandSubtitle: "Talk, Vent & Find Comfort",
    headerTagline: "MindSolace — Share Your Feelings, Vent, and Find Comfort with AI & Peer Listeners",
    sosHelp: "SOS Help",
    breathingToolTitle: "4-7-8 Breathing Relaxation Tool",
    userBadge: "MindSolace Member",
    logout: "Logout",

    // Navigation
    navDashboard: "Dashboard",
    navChat: "Talk to AI (AI Console)",
    navPeers: "Talk to Peers & Friends",
    navMood: "Mood Tracker",
    navAnalytics: "Mood Analytics",
    navJournal: "Personal Journal",
    navProfile: "Profile & Settings",

    // Page Titles
    titleDashboard: "Dashboard Overview",
    titleChat: "AI Empathy Console (Talk to AI)",
    titlePeers: "Peer Listening Circle (Talk to Real Peers)",
    titleMood: "Daily Mood Tracker",
    titleAnalytics: "Mood & Emotion Analytics",
    titleJournal: "Personal Thought Journal",
    titleProfile: "User Profile & Settings",

    // Dashboard
    dashWelcome: "Welcome to",
    dashSubtitle: "When you feel stressed, lonely, or depressed, you are never alone. Talk freely to our AI companion or connected peer listeners.",
    dashStreak: "Logging Streak",
    dashTodayMood: "Today's Mood",
    dashJournalCount: "Journal Entries",
    dashQuickActions: "Quick Actions",
    actionChatTitle: "Talk to AI Companion",
    actionChatDesc: "Express your thoughts freely 24/7 with your non-judgmental AI console.",
    actionPeersTitle: "Talk to Real Peer Listeners",
    actionPeersDesc: "Connect with compassionate online peers, chat 1-on-1, and add friends.",
    actionJournalTitle: "Write in Journal",
    actionJournalDesc: "Vent out personal feelings and receive AI positive reframing notes.",

    // Chat
    chatActiveAI: "● Empathetic AI Console Active (24/7 Listener)",
    chatSwitchPeer: "Talk to Real Peers",
    chatClear: "Clear Chat",
    chatBackAI: "← Back to AI Console",
    chatPlaceholder: "Share what's on your heart...",
    chatSend: "Send",
    chipLonely: "💬 I feel lonely",
    chipExam: "📚 Exam stress",
    chipComfort: "🌸 Need encouragement",
    chipSleep: "🌙 Can't sleep",
    chatThinking: "Thinking with care... 🍃",

    // Peers
    peerMyFriends: "My Support Friends",
    peerOnlineDirectory: "Available Online Peers (Listening Buddies)",
    peerDirectoryDesc: "Connect with compassionate peers online right now when you feel lonely or stressed. Click 'Add Friend' or 'Chat' to start a private conversation.",
    peerChatBtn: "💬 Chat",
    peerAddBtn: "+ Add Friend",
    peerFriendBadge: "✓ Friend",

    // Mood
    moodQuestion: "How are you feeling right now?",
    moodDesc: "Select your current mood score and life triggers.",
    moodTriggerLabel: "What is affecting your mood today? (Triggers)",
    moodNoteLabel: "Personal Reflection Note (Optional)",
    moodNotePlaceholder: "Write a brief note about your day...",
    moodSaveBtn: "Save Daily Mood Check-in",
    moodPastLogs: "Past Mood Logs",
    moodScoreLabels: { 1: "Terrible", 2: "Sad/Low", 3: "Neutral", 4: "Good", 5: "Great" },
    triggers: ["Studies", "Exams", "Work", "Family", "Relationships", "Loneliness", "Sleep", "Health", "Money", "Isolation"],

    // Analytics
    analyticsAvg: "Average Mood Score",
    analyticsTop: "Most Frequent Emotion",
    analyticsTotal: "Total Mood Logs",
    chartMoodTrend: "Mood Trend Curve",
    chartEmotionDist: "Emotion Distribution",
    chartTriggerBreakdown: "Stress & Life Triggers Breakdown",

    // Journal
    journalNewBtn: "New Journal Entry",
    journalTitlePlaceholder: "Entry Title...",
    journalContentPlaceholder: "Write your thoughts freely here...",
    journalAIReflectBtn: "AI Positive Reflection",
    journalSaveBtn: "Save Entry",
    journalDeleteBtn: "Delete",

    // Profile & Settings
    profileTitle: "User Information",
    profileNameLabel: "Display Name",
    profileEmailLabel: "Email Address",
    profileSaveBtn: "Save Profile Info",
    settingsTitle: "Application Settings",
    settingsThemeLabel: "UI Theme",
    settingsThemeDark: "Calming Midnight (Dark)",
    settingsThemeLight: "Soft Cloud (Light)",
    settingsVoiceLabel: "Enable Voice Speech Playback",
    settingsExportBtn: "Export Data (JSON)",
    settingsResetBtn: "Reset App Data",

    // SOS Modal
    sosTitle: "Safety & Emergency Helplines",
    sosDesc: "If you are in distress or need someone urgent to talk to, please reach out to these free 24/7 confidential helplines right away.",
    sosBreathingBtn: "Try 4-7-8 Breathing Relaxation",

    // Breathing Tool
    breathingTitle: "4-7-8 Guided Breathing Tool",
    breathingDesc: "Focus on the expanding and contracting circle to ease anxiety.",
    breathingInhale: "Inhale slowly...",
    breathingHold: "Hold breath...",
    breathingExhale: "Exhale softly...",
    breathingClose: "Close Tool"
  },

  hi: {
    // Brand & Header
    brandSubtitle: "बात करें, दिल हल्का करें और सुकून पाएं",
    headerTagline: "माइंडसोलेस — अपनी भावनाएं साझा करें और AI या साथियों से सहारा पाएं",
    sosHelp: "🚨 आपातकालीन मदद (SOS)",
    breathingToolTitle: "4-7-8 ब्रीदिंग रिलैक्सेशन टूल",
    userBadge: "माइंडसोलेस सदस्य",
    logout: "लॉगआउट",

    // Navigation
    navDashboard: "डैशबोर्ड (होम)",
    navChat: "AI साथी से बात करें",
    navPeers: "साथियों और दोस्तों से बात करें",
    navMood: "मूड ट्रैकर",
    navAnalytics: "मूड ग्राफ और विश्लेषण",
    navJournal: "पर्सनल डायरी / जर्नल",
    navProfile: "प्रोफाइल और सेटिंग्स",

    // Page Titles
    titleDashboard: "डैशबोर्ड अवलोकन",
    titleChat: "AI सहानुभूति कंसोल (AI से बात करें)",
    titlePeers: "साथी श्रोता मंडल (असली लोगों से बात करें)",
    titleMood: "दैनिक मूड ट्रैकर",
    titleAnalytics: "मूड और भावना विश्लेषण",
    titleJournal: "पर्सनल डायरी / विचार",
    titleProfile: "उपयोगकर्ता प्रोफाइल और सेटिंग्स",

    // Dashboard
    dashWelcome: "माइंडसोलेस में आपका स्वागत है,",
    dashSubtitle: "जब आप तनावग्रस्त, अकेले या उदास महसूस करें, तो याद रखें कि आप कभी अकेले नहीं हैं। हमारे AI साथी या ऑनलाइन साथियों से खुलकर बात करें।",
    dashStreak: "दैनिक स्ट्रीक",
    dashTodayMood: "आज का मूड",
    dashJournalCount: "डायरी प्रविष्टियाँ",
    dashQuickActions: "त्वरित विकल्प (शॉर्टकट)",
    actionChatTitle: "AI साथी से बात करें",
    actionChatDesc: "24/7 बिना किसी डर या जजमेंट के अपने विचार खुलकर साझा करें।",
    actionPeersTitle: "सच्चे साथियों से बात करें",
    actionPeersDesc: "सहानुभूतिपूर्ण ऑनलाइन साथियों से 1-on-1 बात करें और दोस्त बनाएं।",
    actionJournalTitle: "डायरी में लिखें",
    actionJournalDesc: "अपने व्यक्तिगत विचार लिखें और AI से सकारात्मक व कोमल मार्गदर्शन पाएं।",

    // Chat
    chatActiveAI: "● AI साथी सक्रिय है (24/7 आपकी बात सुनने के लिए तैयार)",
    chatSwitchPeer: "असली साथियों से बात करें",
    chatClear: "चैट मिटाएं",
    chatBackAI: "← AI कंसोल पर वापस जाएं",
    chatPlaceholder: "अपने दिल की बात यहाँ साझा करें...",
    chatSend: "भेजें",
    chipLonely: "💬 मुझे अकेलापन लग रहा है",
    chipExam: "📚 परीक्षा का बहुत तनाव है",
    chipComfort: "🌸 मुझे थोड़े हौसले की जरूरत है",
    chipSleep: "🌙 बेचैनी के कारण नींद नहीं आ रही",
    chatThinking: "प्यार और समझदारी से सोच रहा हूँ... 🍃",

    // Peers
    peerMyFriends: "मेरे सहयोगी दोस्त",
    peerOnlineDirectory: "उपलब्ध साथी श्रोता (Listening Buddies)",
    peerDirectoryDesc: "जब भी आप अकेला या तनावग्रस्त महसूस करें, ऑनलाइन उपलब्ध साथियों से जुड़ें। निजी बातचीत शुरू करने के लिए 'दोस्त बनाएं' या 'चैट' पर क्लिक करें।",
    peerChatBtn: "💬 चैट करें",
    peerAddBtn: "+ दोस्त बनाएं",
    peerFriendBadge: "✓ दोस्त है",

    // Mood
    moodQuestion: "आप इस समय कैसा महसूस कर रहे हैं?",
    moodDesc: "अपना मूड स्कोर और इसका कारण (ट्रिगर) चुनें।",
    moodTriggerLabel: "आज आपके मूड पर किस बात का सबसे ज्यादा असर पड़ा?",
    moodNoteLabel: "व्यक्तिगत विचार नोट (वैकल्पिक)",
    moodNotePlaceholder: "अपने दिन के बारे में एक छोटी सी बात लिखें...",
    moodSaveBtn: "दैनिक मूड चेक-इन सेव करें",
    moodPastLogs: "पिछले मूड रिकॉर्ड्स",
    moodScoreLabels: { 1: "बहुत खराब", 2: "उदास / कम", 3: "सामान्य", 4: "अच्छा", 5: "बहुत बढ़िया" },
    triggers: ["पढ़ाई", "परीक्षाएं", "काम/करियर", "परिवार", "रिश्ते", "अकेलापन", "नींद की कमी", "स्वास्थ्य", "पैसा/खर्च", "अलगाव"],

    // Analytics
    analyticsAvg: "औसत मूड स्कोर",
    analyticsTop: "सबसे प्रमुख भावना",
    analyticsTotal: "कुल मूड रिकॉर्ड",
    chartMoodTrend: "मूड सुधार ट्रेंड कर्व (ग्राफ)",
    chartEmotionDist: "भावनाओं का प्रतिशत वितरण",
    chartTriggerBreakdown: "तनाव के मुख्य कारणों का विश्लेषण",

    // Journal
    journalNewBtn: "+ नई डायरी प्रविष्टि",
    journalTitlePlaceholder: "शीर्षक लिखें...",
    journalContentPlaceholder: "अपने दिल के विचार यहाँ बिना किसी संकोच के लिखें...",
    journalAIReflectBtn: "✨ AI सकारात्मक मार्गदर्शन",
    journalSaveBtn: "सेव करें",
    journalDeleteBtn: "हटाएं",

    // Profile & Settings
    profileTitle: "उपयोगकर्ता जानकारी",
    profileNameLabel: "प्रदर्शित नाम (Display Name)",
    profileEmailLabel: "ईमेल पता",
    profileSaveBtn: "प्रोफाइल सेव करें",
    settingsTitle: "एप्लिकेशन सेटिंग्स",
    settingsThemeLabel: "रंग थीम (Theme)",
    settingsThemeDark: "शांत रात (Dark Theme)",
    settingsThemeLight: "हल्के बादल (Light Theme)",
    settingsVoiceLabel: "आवाज से जवाब सुनना चालू रखें",
    settingsExportBtn: "डेटा बैकअप डाउनलोड करें (JSON)",
    settingsResetBtn: "सारा डेटा रीसेट करें",

    // SOS Modal
    sosTitle: "सुरक्षा और 24/7 आपातकालीन हेल्पलाइन",
    sosDesc: "यदि आप गहरे तनाव, संकट या निराशा में हैं, तो कृपया इन मुफ्त और गोपनीय 24/7 राष्ट्रीय हेल्पलाइनों पर तुरंत संपर्क करें। आप अकेले नहीं हैं।",
    sosBreathingBtn: "4-7-8 रिलेक्सेशन ब्रीदिंग शुरू करें",

    // Breathing Tool
    breathingTitle: "4-7-8 गाइडेड ब्रीदिंग टूल",
    breathingDesc: "घबराहट और चिंता को शांत करने के लिए फैलते और सिकुड़ते वृत्त पर ध्यान केंद्रित करें।",
    breathingInhale: "धीरे-धीरे सांस अंदर लें...",
    breathingHold: "सांस रोक कर रखें...",
    breathingExhale: "मुंह से धीरे-धीरे सांस छोड़ें...",
    breathingClose: "टूल बंद करें"
  },

  hinglish: {
    // Brand & Header
    brandSubtitle: "Baat karein, dil halka karein aur sukoon paayein",
    headerTagline: "MindSolace — Apni feelings share karein aur AI ya peers se comfort paayein",
    sosHelp: "🚨 SOS Help",
    breathingToolTitle: "4-7-8 Breathing Relaxation Tool",
    userBadge: "MindSolace Member",
    logout: "Logout",

    // Navigation
    navDashboard: "Dashboard",
    navChat: "AI Companion se baat karein",
    navPeers: "Peers & Friends se baat karein",
    navMood: "Mood Tracker",
    navAnalytics: "Mood Analytics & Graph",
    navJournal: "Personal Journal / Diary",
    navProfile: "Profile & Settings",

    // Page Titles
    titleDashboard: "Dashboard Overview",
    titleChat: "AI Companion Console (Talk to AI)",
    titlePeers: "Peer Support Circle (Real Peers se baat karein)",
    titleMood: "Daily Mood Tracker",
    titleAnalytics: "Mood & Emotion Analytics",
    titleJournal: "Personal Thought Journal",
    titleProfile: "Profile & Settings",

    // Dashboard
    dashWelcome: "Welcome to MindSolace,",
    dashSubtitle: "Jab bhi aap stressed, lonely ya depressed feel karein, yaad rakhein aap akele nahi hain. AI buddy ya online peers se dil khol kar baat karein.",
    dashStreak: "Check-in Streak",
    dashTodayMood: "Aaj ka Mood",
    dashJournalCount: "Journal Entries",
    dashQuickActions: "Quick Shortcuts",
    actionChatTitle: "Talk to AI Companion",
    actionChatDesc: "24/7 bina kisi hesitation ke apni baat share karein, non-judgmental sunne wala companion.",
    actionPeersTitle: "Talk to Real Peer Listeners",
    actionPeersDesc: "Online helpful peers se 1-on-1 connect karein, chat karein aur friends banayein.",
    actionJournalTitle: "Write in Journal",
    actionJournalDesc: "Apne personal thoughts likhein aur AI se positive & gentle perspective paayein.",

    // Chat
    chatActiveAI: "● AI Companion Active hai (24/7 aapki baat sunne ke liye ready)",
    chatSwitchPeer: "Real Peers se baat karein",
    chatClear: "Chat Clear karein",
    chatBackAI: "← Back to AI Console",
    chatPlaceholder: "Apne dil ki baat yahan share karein...",
    chatSend: "Send karein",
    chipLonely: "💬 Bohat lonely feel ho raha hai",
    chipExam: "📚 Exams ka kaafi stress hai",
    chipComfort: "🌸 Thoda encouragement chahiye",
    chipSleep: "🌙 Overthinking ki wajah se neend nahi aa rahi",
    chatThinking: "Care ke saath soch raha hoon... 🍃",

    // Peers
    peerMyFriends: "Mere Support Friends",
    peerOnlineDirectory: "Available Online Peers (Listening Buddies)",
    peerDirectoryDesc: "Jab bhi akelapan ya tension lage, online peers se connect karein. Private chat shuru karne ke liye '+ Add Friend' ya 'Chat' par click karein.",
    peerChatBtn: "💬 Chat karein",
    peerAddBtn: "+ Add Friend",
    peerFriendBadge: "✓ Friend",

    // Mood
    moodQuestion: "Aap abhi kaisa feel kar rahe hain?",
    moodDesc: "Apna mood score aur trigger select karein.",
    moodTriggerLabel: "Aaj aapke mood par kis baat ka sabse zyada asar pada? (Triggers)",
    moodNoteLabel: "Personal Reflection Note (Optional)",
    moodNotePlaceholder: "Apne din ke baare me kuch chhota sa likhein...",
    moodSaveBtn: "Daily Mood Check-in Save karein",
    moodPastLogs: "Past Mood History",
    moodScoreLabels: { 1: "Bohat bura", 2: "Udaas / Low", 3: "Normal / Neutral", 4: "Accha", 5: "Bohat accha" },
    triggers: ["Studies", "Exams", "Career/Job", "Family", "Relationships", "Loneliness", "Sleep issue", "Health", "Money", "Isolation"],

    // Analytics
    analyticsAvg: "Average Mood Score",
    analyticsTop: "Top Emotion",
    analyticsTotal: "Total Mood Logs",
    chartMoodTrend: "Mood Trend Curve (Pichle Dinon ka Graph)",
    chartEmotionDist: "Emotion Percentage Distribution",
    chartTriggerBreakdown: "Stress Triggers ka Breakdown",

    // Journal
    journalNewBtn: "+ New Journal Entry",
    journalTitlePlaceholder: "Title likhein...",
    journalContentPlaceholder: "Apne dil ke thoughts yahan freely likhein...",
    journalAIReflectBtn: "✨ AI Positive Reflection",
    journalSaveBtn: "Entry Save karein",
    journalDeleteBtn: "Delete",

    // Profile & Settings
    profileTitle: "User Information",
    profileNameLabel: "Display Name",
    profileEmailLabel: "Email Address",
    profileSaveBtn: "Profile Info Save karein",
    settingsTitle: "Application Settings",
    settingsThemeLabel: "UI Theme",
    settingsThemeDark: "Calming Midnight (Dark)",
    settingsThemeLight: "Soft Cloud (Light)",
    settingsVoiceLabel: "Voice Speech Playback on rakhein",
    settingsExportBtn: "Data Backup Download karein (JSON)",
    settingsResetBtn: "Sara Data Reset karein",

    // SOS Modal
    sosTitle: "Safety & Emergency Helplines (24/7)",
    sosDesc: "Agar aap bohot deep distress ya sankat me hain, toh bina dare in 100% free & confidential 24/7 national helplines par call karein. Aap akele nahi hain.",
    sosBreathingBtn: "4-7-8 Breathing Relaxation shuru karein",

    // Breathing Tool
    breathingTitle: "4-7-8 Guided Breathing Tool",
    breathingDesc: "Panic aur anxiety kam karne ke liye expanding aur contracting circle par focus karein.",
    breathingInhale: "Dheere se saans andar lein...",
    breathingHold: "Saans rok kar rakhein...",
    breathingExhale: "Dheere se saans bahar chhodein...",
    breathingClose: "Tool band karein"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('mindsolace_lang') || 'en';
  }

  setLanguage(lang) {
    if (!Translations[lang]) lang = 'en';
    this.currentLang = lang;
    localStorage.setItem('mindsolace_lang', lang);
    this.applyTranslations();

    // Re-render mood options with translated labels
    if (typeof moodController !== 'undefined') {
      moodController.renderMoodOptions();
      moodController.renderTriggerTags();
    }
    // Update daily quote if on dashboard
    if (typeof app !== 'undefined') {
      app.initQuote();
    }
  }

  get(key) {
    const dict = Translations[this.currentLang] || Translations.en;
    return dict[key] || Translations.en[key] || key;
  }

  applyTranslations() {
    const lang = this.currentLang;
    const t = Translations[lang] || Translations.en;

    // Update Language Dropdown Selector in Header if exists
    const selector = document.getElementById('langSelector');
    if (selector && selector.value !== lang) {
      selector.value = lang;
    }

    // Header & Brand
    const subtitle = document.querySelector('.brand-subtitle');
    if (subtitle) subtitle.textContent = t.brandSubtitle;

    const tagline = document.querySelector('.top-header [style*="italic"]');
    if (tagline) tagline.textContent = t.headerTagline;

    const sosBtnText = document.querySelector('.btn-sos span');
    if (sosBtnText) sosBtnText.textContent = t.sosHelp;

    // Navigation Labels
    const desktopNav = document.querySelectorAll('.sidebar .nav-item');
    desktopNav.forEach(item => {
      const tab = item.dataset.tab;
      const span = item.querySelector('span');
      if (!span) return;
      if (tab === 'dashboard') span.textContent = t.navDashboard;
      if (tab === 'chat') span.textContent = t.navChat;
      if (tab === 'peers') span.textContent = t.navPeers;
      if (tab === 'mood') span.textContent = t.navMood;
      if (tab === 'analytics') span.textContent = t.navAnalytics;
      if (tab === 'journal') span.textContent = t.navJournal;
      if (tab === 'profile') span.textContent = t.navProfile;
    });

    // Mobile Nav
    const mobileNav = document.querySelectorAll('.mobile-nav .mobile-nav-item');
    mobileNav.forEach(item => {
      const tab = item.dataset.tab;
      const span = item.querySelector('span');
      if (!span) return;
      if (tab === 'dashboard') span.textContent = t.navDashboard;
      if (tab === 'chat') span.textContent = (lang === 'hi' ? 'AI चैट' : (lang === 'hinglish' ? 'AI Chat' : 'AI Chat'));
      if (tab === 'peers') span.textContent = (lang === 'hi' ? 'साथी' : (lang === 'hinglish' ? 'Peers' : 'Peers'));
      if (tab === 'mood') span.textContent = (lang === 'hi' ? 'मूड' : 'Mood');
      if (tab === 'journal') span.textContent = (lang === 'hi' ? 'डायरी' : 'Journal');
    });

    // Page Title
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle && typeof app !== 'undefined') {
      const titles = {
        dashboard: t.titleDashboard,
        chat: t.titleChat,
        peers: t.titlePeers,
        mood: t.titleMood,
        analytics: t.titleAnalytics,
        journal: t.titleJournal,
        profile: t.titleProfile
      };
      pageTitle.textContent = titles[app.activeTab] || 'MindSolace';
    }

    // Dashboard View Text
    const dashHeroH2 = document.querySelector('.dashboard-hero h2');
    if (dashHeroH2) {
      dashHeroH2.innerHTML = `${t.dashWelcome} <span style="color: var(--accent-indigo);">MindSolace</span>, <span class="user-name-display">${(auth && auth.currentUser) ? auth.currentUser.name : 'User'}</span> 🌿`;
    }
    const dashHeroP = document.querySelector('.dashboard-hero p');
    if (dashHeroP) dashHeroP.textContent = t.dashSubtitle;

    const streakLabel = document.querySelectorAll('.stat-card .stat-label');
    if (streakLabel.length >= 3) {
      streakLabel[0].textContent = t.dashStreak;
      streakLabel[1].textContent = t.dashTodayMood;
      streakLabel[2].textContent = t.dashJournalCount;
    }

    const quickActionsH3 = document.querySelector('#dashboardView h3');
    if (quickActionsH3) quickActionsH3.textContent = t.dashQuickActions;

    const actionCards = document.querySelectorAll('.action-card');
    if (actionCards.length >= 3) {
      const c1H4 = actionCards[0].querySelector('h4');
      const c1P = actionCards[0].querySelector('p');
      if (c1H4) c1H4.textContent = t.actionChatTitle;
      if (c1P) c1P.textContent = t.actionChatDesc;

      const c2H4 = actionCards[1].querySelector('h4');
      const c2P = actionCards[1].querySelector('p');
      if (c2H4) c2H4.textContent = t.actionPeersTitle;
      if (c2P) c2P.textContent = t.actionPeersDesc;

      const c3H4 = actionCards[2].querySelector('h4');
      const c3P = actionCards[2].querySelector('p');
      if (c3H4) c3H4.textContent = t.actionJournalTitle;
      if (c3P) c3P.textContent = t.actionJournalDesc;
    }

    // Chat View Text
    const chatInput = document.getElementById('chatInput');
    if (chatInput) chatInput.placeholder = t.chatPlaceholder;

    const chips = document.querySelectorAll('.prompt-suggestions .prompt-chip');
    if (chips.length >= 4) {
      chips[0].textContent = t.chipLonely;
      chips[1].textContent = t.chipExam;
      chips[2].textContent = t.chipComfort;
      chips[3].textContent = t.chipSleep;
    }

    const aiStatus = document.querySelector('#chatHeaderAI [style*="color: var(--emotion-happy)"]');
    if (aiStatus) aiStatus.textContent = t.chatActiveAI;

    // Mood View Text
    const moodH3 = document.querySelector('#moodView h3');
    if (moodH3) moodH3.textContent = t.moodQuestion;
    const moodP = document.querySelector('#moodView p');
    if (moodP) moodP.textContent = t.moodDesc;
    const triggerLabel = document.querySelector('#moodView .form-label');
    if (triggerLabel) triggerLabel.textContent = t.moodTriggerLabel;
    const noteLabel = document.querySelector('#moodView .form-group .form-label');
    if (noteLabel) noteLabel.textContent = t.moodNoteLabel;
    const moodNoteInput = document.getElementById('moodNote');
    if (moodNoteInput) moodNoteInput.placeholder = t.moodNotePlaceholder;
    const saveMoodBtn = document.querySelector('#moodView .btn-primary');
    if (saveMoodBtn) saveMoodBtn.innerHTML = `<i data-lucide="check-circle-2"></i> ${t.moodSaveBtn}`;
    const pastLogsH3 = document.querySelectorAll('#moodView h3')[1];
    if (pastLogsH3) pastLogsH3.textContent = t.moodPastLogs;

    // Peers View Text
    const friendsH3 = document.querySelector('#peersView .glass-card h3');
    if (friendsH3) friendsH3.innerHTML = `<i data-lucide="user-check"></i> ${t.peerMyFriends}`;
    const peerDirectoryH3 = document.querySelectorAll('#peersView .glass-card h3')[1];
    if (peerDirectoryH3) peerDirectoryH3.innerHTML = `<i data-lucide="globe"></i> ${t.peerOnlineDirectory}`;
    const peerDirectoryP = document.querySelector('#peersView .glass-card p');
    if (peerDirectoryP) peerDirectoryP.textContent = t.peerDirectoryDesc;

    // Journal View Text
    const newJournalBtn = document.querySelector('#journalView .btn-primary');
    if (newJournalBtn) newJournalBtn.innerHTML = `<i data-lucide="plus"></i> ${t.journalNewBtn}`;
    const journalTitle = document.getElementById('journalTitleInput');
    if (journalTitle) journalTitle.placeholder = t.journalTitlePlaceholder;
    const journalContent = document.getElementById('journalContentInput');
    if (journalContent) journalContent.placeholder = t.journalContentPlaceholder;
    const aiReflectBtn = document.querySelector('#journalView .btn-secondary[onclick*="requestAIReframing"]');
    if (aiReflectBtn) aiReflectBtn.innerHTML = `<i data-lucide="sparkles"></i> ${t.journalAIReflectBtn}`;

    // Re-initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

const i18n = new I18nManager();
