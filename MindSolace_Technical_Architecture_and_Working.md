# MINDSOLACE — TECHNICAL ARCHITECTURE & WORKING MECHANISM DOCUMENTATION

**Project Title:** MindSolace — Share Your Feelings, Vent, and Find Comfort with AI & Peer Listeners  
**Subject:** MCA Minor Project (MCA 306) Technical Documentation & Viva Reference  
**Project Team:**
* Vinay Gehlot (Enrollment No: 2504MCAAIML0070)
* Jhalak Jaiswal (Enrollment No: 2504MCACS0008)
* Swati Bhadoriya (Enrollment No: 2504MCAAIML0058)
* Simran (Enrollment No: 2504MCACS0019)  

---

## 1. LANGUAGES & TECHNOLOGIES USED

| Technology / Tool | Type | Role & Function in MindSolace |
|---|---|---|
| **HTML5** | Markup Language | Structural framework for the Single-Page Application (SPA) shell, semantic sections, forms, audio/speech inputs, accessible modal overlays, and responsive view containers. |
| **CSS3 (Glassmorphism)** | Styling & Animations | Custom design system using CSS variables (`:root`) for Midnight Dark and Soft Cloud Light themes, backdrop blur effects (`backdrop-filter: blur(16px)`), CSS keyframe animations for guided 4-7-8 breathing circles and SOS glowing pulses, Flexbox, Grid, and mobile navigation. |
| **JavaScript (ES6+)** | Core Logic | Object-oriented client-side architecture using modular ES6 classes (`App`, `DatabaseManager`, `NLPEngine`, `ChatController`, `PeersController`, `MoodController`, `AnalyticsController`, `JournalController`, `SafetyController`, `ProfileController`). |
| **LocalStorage API (`MindCareDB`)** | Web Storage Database | Client-side reactive database manager storing users, chats, mood logs, journal entries, friends lists, direct messages, and settings with 100% data privacy. |
| **Web Speech API** | Browser Native API | Enables Voice Speech-to-Text (`webkitSpeechRecognition`) for microphone input and Text-to-Speech (`speechSynthesis`) for reading AI responses aloud in a soothing voice. |
| **BroadcastChannel API** | Real-time Web API | Syncs Direct Messages live across multiple open browser tabs in real-time (`new BroadcastChannel('mindsolace_peer_channel')`). |
| **Chart.js (v4 CDN)** | Data Visualization | Renders dynamic HTML5 Canvas charts: 7-Day Mood Trend Curve (Line Chart), Emotion Distribution (Doughnut Chart), and Stress Triggers Breakdown (Bar Chart). |
| **Lucide Icons (CDN)** | Vector Iconography | Provides clean SVG icons for UI navigation and status indicators. |
| **Google Gemini API (Optional)** | Generative LLM API | Connects to Google's Gemini REST API when an API key is configured for advanced generative conversational therapy. |
| **Python 3 (`http.server`)** | Local Web Server | Serves the local development web server at `http://localhost:8000`. |

---

## 2. FILE-BY-FILE BREAKDOWN (WHAT EACH FILE ACTUALLY DOES)

### 1. `index.html` — The Single-Page Application (SPA) Shell
* Serves as the central interface shell containing all 7 view sections (`#dashboardView`, `#chatView`, `#peersView`, `#moodView`, `#analyticsView`, `#journalView`, `#profileView`) and 3 modal overlays (`#sosModal`, `#breathingModal`, `#authOverlay`).
* Enables instant zero-reload navigation by toggling view visibility classes dynamically.

### 2. `css/styles.css` — The Design System
* Defines CSS design tokens for colors, shadows, border-radii, and glassmorphism properties.
* Implements theme switching variables (`[data-theme="light"]` vs default dark).
* Contains keyframe animations for the 4-7-8 breathing circle expansion/contraction and pulse alerts.

### 3. `js/db.js` — Client-Side Database Manager (`MindCareDB`)
* Encapsulates LocalStorage access for tables: `mindsolace_users`, `mindsolace_session`, `mindsolace_moods`, `mindsolace_journals`, `mindsolace_chats`, `mindsolace_friends_*`, `mindsolace_dms_*`, `mindsolace_settings`.
* Automatically seeds realistic default data on first launch so the platform is immediately functional.

### 4. `js/auth.js` — Authentication & Anonymous Mode Controller
* Manages user registration, login verification, session storage, and 1-click **Anonymous Guest Mode** (creates a transient guest session without email requirements).

### 5. `js/nlpEngine.js` — Emotion Classifier & Crisis Safety Engine
* **`detectEmotion(text)`**: Scans text against keyword dictionaries to classify emotions into *Sadness, Anxiety, Loneliness, Anger, Hopeful, Neutral*.
* **`detectCrisisRisk(text)`**: Scans text for high-risk self-harm or suicide phrases (*kill myself, end it all, cut myself, etc.*).
* **`generateEmpatheticResponse(text, emotion)`**: Generates contextual offline empathetic console replies.
* **`generateJournalReframing(content)`**: Produces positive reframing feedback for journal entries.

### 6. `js/chat.js` — Talk to AI Console
* Controls the AI Chat interface. Handles message rendering, typing indicators, microphone voice recognition (`webkitSpeechRecognition`), text-to-speech synthesis (`speechSynthesis`), prompt suggestion chips, and Gemini API integration.

### 7. `js/peers.js` — Talk to Peers & Friends List
* Manages the online peer directory (*Priya, Aarav, Rohan, Ananya*), adding/removing friends, direct messaging, and broadcasting messages across open tabs via `BroadcastChannel`.

### 8. `js/mood.js` — Daily Mood Tracker
* Captures score (1-5), emotion label, life triggers (*Studies, Exams, Sleep, Isolation*), and personal notes. Calculates logging streaks.

### 9. `js/analytics.js` — Chart.js Visualization Engine
* Processes mood logs and feeds data into Chart.js to render 3 interactive charts (Line Trend, Emotion Doughnut, Trigger Bar).

### 10. `js/journal.js` — Personal Journal & AI Reframing
* Handles writing, editing, filtering, searching diary entries, and triggering the AI Positive Reflection Reframer.

### 11. `js/safety.js` — Safety SOS & 4-7-8 Breathing Tool
* Launches crisis helpline overlays (**Tele-MANAS 14416**, Vandrevala, NIMHANS) and controls the interactive 4-7-8 animated breathing timer (Inhale 4s → Hold 7s → Exhale 8s).

### 12. `js/profile.js` — Profile & Settings Controller
* Updates user details, theme selection (Midnight Dark vs Soft Cloud Light), API key configuration, and **JSON Data Export** (`MindCare_Export.json`).

### 13. `js/app.js` — Main Router & Orchestrator
* Handles tab switching (`switchTab`), quote generation, header updates, and initializes all controllers when the application loads.

---

## 3. HOW EVERYTHING WORKS TOGETHER (STEP-BY-STEP EXECUTION FLOW)

### 💬 Scenario A: User sends a message in "Talk to AI"
1. User types *"I feel very anxious about my exams"* in `chatView`.
2. `chat.js` captures input on form submit.
3. `nlpEngine.js` analyzes the text:
   * `detectEmotion()` identifies keywords ("anxious", "exams") and tags it as **Anxiety ⚡**.
   * `detectCrisisRisk()` verifies no self-harm phrases exist.
4. `db.js` saves the user message to `LocalStorage`.
5. `nlpEngine.js` generates a comforting response acknowledging exam stress and suggesting a slow breath.
6. `chat.js` renders the AI response bubble with emotion tags and plays the response aloud using `speechSynthesis`.

---

### 🚨 Scenario B: High-Risk Emergency Trigger
1. User types a high-distress message like *"I want to give up on life"*.
2. `nlpEngine.detectCrisisRisk()` detects high-risk keywords and flags `isCrisis: true`.
3. `chat.js` immediately signals `safety.js`.
4. `safety.js` pops open the **Safety SOS Modal** showing 24/7 helplines (**Tele-MANAS 14416**, **Vandrevala Foundation**, **NIMHANS**) and offers the **4-7-8 Breathing Relaxation Tool**.

---

### 👥 Scenario C: User chats with a Real Peer Listener
1. User goes to **"Talk to Peers & Friends"** tab and selects *Priya Sharma*.
2. `peers.js` switches the chat view header to **Peer Chat Mode**.
3. User sends a message.
4. `peers.js` saves the DM in `db.js` and broadcasts it live using `BroadcastChannel`.
5. If another browser window is open, it receives the message in real-time; otherwise, the demo listening buddy sends a warm peer reply!

---

### 📊 Scenario D: User logs daily mood & views analytics
1. User opens **Mood Tracker**, selects Mood `4/5`, tags `Exams`, and saves.
2. `mood.js` saves the record in `db.js`.
3. When user switches to **Mood Analytics**, `analytics.js` reads all logs from `db.js` and recalculates the average score, top emotion, and re-renders Chart.js line and doughnut graphs instantly.

---

*Documentation Generated For:* **Simran, Jhalak Jaiswal, Swati Bhadoriya, Vinay Gehlot**  
*Project Name:* **MindSolace** (MCA 306 Minor Project)
