# SYSTEM REQUIREMENT SPECIFICATIONS (SRS) / SYNOPSIS

**Project Title:** MindSolace — Share Your Feelings, Vent, and Find Comfort with AI & Peer Listeners  
**Sub-title:** An Empathetic AI & Peer Emotional Support Platform for Lonely, Stressed & Depressed Individuals  
**Course:** Master of Computer Applications (MCA)  
**Subject Code:** MCA 306 (Minor Project)  

**Submitted By (Project Group):**
1. **Vinay Gehlot** (Enrollment No: 2504MCAAIML0070)
2. **Jhalak Jaiswal** (Enrollment No: 2504MCACS0008)
3. **Swati Bhadoriya** (Enrollment No: 2504MCAAIML0058)
4. **Simran** (Enrollment No: 2504MCACS0019)

---

## 1. Title Page

* **Project Name:** MindSolace
* **Tagline:** Share Your Feelings, Vent, and Find Comfort with AI & Peer Listeners.
* **Domain:** Web Application / Artificial Intelligence / Healthcare & Mental Wellness
* **Project Team:**
  * **Vinay Gehlot** — 2504MCAAIML0070 (MCA Candidate)
  * **Jhalak Jaiswal** — 2504MCACS0008 (MCA Candidate)
  * **Swati Bhadoriya** — 2504MCAAIML0058 (MCA Candidate)
  * **Simran** — 2504MCACS0019 (MCA Candidate)
* **Submitted To:** Department of Computer Applications

---

## 2. Introduction (Problem Statement)

In today's fast-paced digital era, issues such as academic pressure, competitive examinations, career uncertainty, social isolation, anxiety, and depression have become increasingly prevalent among students and young adults. Many individuals experience intense emotional distress, loneliness, or burnout, yet they often lack access to an immediate, safe, and non-judgmental outlet to express their feelings.

### Key Problem Challenges:
1. **Social Stigma & Hesitation:** People frequently hesitate to discuss mental health concerns with family or peers due to fear of being judged, misunderstood, or stigmatized.
2. **Lack of Immediate Availability:** Traditional counseling services require appointments, fees, and travel, making them unavailable during late-night panic attacks or sudden emotional crises.
3. **Privacy Concerns:** Users fear data leakage regarding their personal emotional struggles and intimate thoughts.
4. **Absence of Peer Connection:** Individuals feeling lonely lack a platform to connect anonymously with empathetic peers facing similar challenges.

**MindSolace** addresses these challenges by offering a comprehensive, 100% private, client-side encrypted web platform. When someone feels lonely, stressed, or depressed and has nobody around to talk to, **MindSolace** allows them to express their feelings freely to either an **Empathetic AI Companion** or **Real Available Peer Listeners**. It integrates a 24/7 AI Empathy Console, real-time Emotion Detection, a Peer-to-Peer Listening Community, daily Mood Tracking with Chart.js Analytics, a Personal Journal with AI Positive Reflection, and a Safety SOS Crisis Intervention System with 4-7-8 breathing exercises.

---

## 3. Description of Project

**MindSolace** is an interactive, responsive web application engineered using modern web technologies (HTML5, CSS3 Glassmorphism, ES6+ JavaScript, Lucide Icons, Chart.js, LocalStorage API, and Web BroadcastChannel API). 

### Core System Architecture:
* **Dual Conversational Channels:** Users can chat with either **RC Companion AI** (an offline rule-based NLP empathy engine with optional Google Gemini LLM integration) or **Real-Time Online Peers** (listening buddies).
* **Automated Emotion Detection:** Analyzes input messages in real-time and tags them into emotional categories (*Sadness, Anxiety, Loneliness, Anger, Hopeful, Neutral*).
* **Crisis Safety & SOS Engine:** Scans messages for high-risk self-harm or suicide keywords, triggering instant emergency modal overlays with verified 24/7 Indian helplines (Tele-MANAS `14416`, Vandrevala Foundation, NIMHANS) and interactive 4-7-8 guided breathing relaxation tools.
* **Mental Wellness Tracking & Analytics:** Users log daily mood scores (1-5), emotion tags, and stress triggers (*Studies, Exams, Family, Sleep, Isolation*). Visualized via interactive trend curves and doughnut charts.
* **Private Thought Journal:** A personal diary featuring an *"AI Positive Reflection Reframer"* that automatically generates gentle, non-judgmental reframing feedback.

---

## 4. Intended Audience

The primary target audience for **MindSolace** includes:
1. **University & College Students:** Experiencing exam pressure, assignment stress, career anxiety, or hostel loneliness.
2. **Young Professionals:** Dealing with workplace burnout, work-life balance struggles, or isolation.
3. **Individuals Experiencing Loneliness & Depression:** People who need an empathetic, non-judgmental listener at any hour.
4. **Anxiety & Panic Attack Sufferers:** Users in need of immediate grounding exercises (4-7-8 breathing technique) and crisis helplines.
5. **Privacy-Conscious Users:** Individuals seeking mental support without creating mandatory accounts or revealing personal identities (via **Anonymous Guest Mode**).

---

## 5. Functional Requirements

| Requirement ID | Module Name | Functional Specification |
|---|---|---|
| **FR-01** | **Authentication & Anonymous Mode** | System shall allow registration, login, logout, and 1-click Anonymous Guest access without requiring email verification. |
| **FR-02** | **RC Chat AI Console** | System shall provide a 24/7 empathetic conversational AI companion with text-to-speech voice playback and voice speech recognition. |
| **FR-03** | **Emotion Detection Engine** | System shall analyze user input text in real-time using keyword NLP heuristics and display color-coded emotion tags. |
| **FR-04** | **Peer Community & Friends Circle** | System shall display available online listening peers, allow sending friend requests, and enable 1-on-1 direct messaging synced across browser tabs using `BroadcastChannel`. |
| **FR-05** | **Daily Mood Tracker** | System shall capture daily mood scores (1 to 5), emotion labels, life triggers, and personal notes. |
| **FR-06** | **Mood & Emotion Analytics** | System shall generate dynamic Chart.js trend curves, emotion distribution pie charts, and stress trigger bar charts. |
| **FR-07** | **Personal Thought Journal** | System shall allow creation, editing, category tagging, search filtering, and AI positive reframing notes for diary entries. |
| **FR-08** | **Safety SOS Crisis Intervention** | System shall detect high-risk distress phrases, launch instant emergency modal overlays with verified helplines (*Tele-MANAS 14416*, *Vandrevala*). |
| **FR-09** | **4-7-8 Breathing Tool** | System shall feature an interactive animated expanding/contracting breathing circle with real-time countdown timers. |
| **FR-10** | **Profile & Settings** | System shall enable profile updates, UI theme toggling (*Calming Midnight Dark* vs. *Soft Cloud Light*), Google Gemini API key configuration, and JSON data export/reset. |

---

## 6. Non-Functional Requirements

### 6.1 Performance Requirements
* **Instant System Response:** Page rendering and navigation transition time shall be less than 200ms.
* **Real-time Chat Processing:** Local NLP emotion classification and AI responses shall generate within 800ms.

### 6.2 Security & Data Privacy
* **100% Client-Side Data Storage:** All user journals, mood logs, and chat histories are stored exclusively in the user's browser `LocalStorage` (`MindCareDB`).
* **Zero Tracking in Guest Mode:** Anonymous mode creates transient sessions without capturing personal identifiers or email addresses.

### 6.3 Usability & Accessibility
* **Calming Aesthetic Design:** Glassmorphic UI with soft dark/light themes designed to minimize cognitive strain and visual anxiety.
* **Mobile Responsiveness:** Includes a dedicated bottom navigation bar for seamless smartphone usability.

### 6.4 Reliability & Availability
* **Offline Operation:** The entire core platform (NLP emotion detection, mood tracker, journal, breathing tool, offline empathetic chat) functions without requiring active internet access.
* **Cross-Browser Compatibility:** Fully supported across Chrome, Firefox, Edge, Safari, and Brave browsers.

---

## 7. Hardware and Software Specifications

### 7.1 Hardware Requirements (Developer & End User)
* **Processor:** Intel Core i3 / AMD Ryzen 3 or higher.
* **System RAM:** Minimum 4 GB (8 GB recommended).
* **Storage Space:** Minimum 100 MB free disk space.
* **Display:** 1024x768 resolution or higher (Mobile / Desktop).

### 7.2 Software Requirements
* **Operating System:** Windows 10/11, Linux, or macOS.
* **Development IDE:** Visual Studio Code / Antigravity Agent.
* **Runtime Environment:** Any standard Web Browser (Google Chrome v90+, Mozilla Firefox v88+, Microsoft Edge).
* **Languages & Frameworks:**
  * **Markup & Styling:** HTML5, CSS3 (Glassmorphism design system).
  * **Client Logic:** Vanilla ES6+ JavaScript.
  * **Libraries & APIs:** Lucide Icons CDN, Chart.js CDN, Web Speech API (SpeechRecognition & SpeechSynthesis), Web BroadcastChannel API, LocalStorage API.
  * **Web Server (Optional):** Python 3.x (`python -m http.server 8000`).

---

## 8. Scope of the Project

### 8.1 Current Scope (Minor Project Level)
* Full implementation of all 13 core modules: Auth, Anonymous Mode, Dashboard, RC Chat AI, Emotion Classifier, Peer Community & Friends List, Mood Tracker, Chart.js Analytics, Personal Journal with AI Reframing, Safety SOS, 4-7-8 Breathing Tool, Profile Settings, and LocalStorage Database.
* High aesthetic quality, responsive mobile layout, and zero-dependency execution.

### 8.2 Future Scope & Enhancements
* **WebSockets / Firebase Integration:** Expanding peer-to-peer messaging to global real-time user matching across external servers.
* **Machine Learning Sentiment Analysis:** Replacing rule-based NLP with fine-tuned TensorFlow.js sentiment models.
* **Voice Pitch & Acoustic Emotion Classifier:** Detecting anxiety and depression levels from user voice pitch during speech input.
* **Native Mobile Applications:** Packaging the platform as native Android/iOS apps using React Native or Flutter.

---

## 9. Result / Conclusion

The **MindSolace** platform successfully meets all specified objectives for the MCA Minor Project. By bridging the gap between artificial intelligence, community peer support, data visualization, and psychological grounding techniques, **MindSolace** delivers a holistic, empathetic, and privacy-focused mental wellness platform.

The system empowers users to *"Share Your Feelings, Vent, and Find Comfort with AI & Peer Listeners,"* providing immediate solace during times of distress, depression, and loneliness while promoting long-term emotional self-awareness.

---

**Submitted By (Group Members):**
1. **Vinay Gehlot** (Enrollment No: 2504MCAAIML0070)
2. **Jhalak Jaiswal** (Enrollment No: 2504MCACS0008)
3. **Swati Bhadoriya** (Enrollment No: 2504MCAAIML0058)
4. **Simran** (Enrollment No: 2504MCACS0019)

*Project Name:* **MindSolace**  
*Course:* MCA 306 - Minor Project
