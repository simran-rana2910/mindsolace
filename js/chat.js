/**
 * MINDTRACE - RC Chat & Peer Chat Controller
 */

class ChatController {
  constructor() {
    this.messagesContainer = null;
    this.chatForm = null;
    this.chatInput = null;
    this.isRecording = false;
    this.recognition = null;
    this.initSpeechRecognition();
  }

  init() {
    this.messagesContainer = document.getElementById('chatMessages');
    this.chatForm = document.getElementById('chatForm');
    this.chatInput = document.getElementById('chatInput');

    if (this.chatForm) {
      this.chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSend();
      });
    }

    this.loadHistory();
  }

  initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (this.chatInput) {
          this.chatInput.value = transcript;
        }
        this.toggleVoiceInput(false);
      };

      this.recognition.onerror = () => {
        this.toggleVoiceInput(false);
      };

      this.recognition.onend = () => {
        this.toggleVoiceInput(false);
      };
    }
  }

  toggleVoiceInput(forceState) {
    const micBtn = document.getElementById('micBtn');
    if (!this.recognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    // Set recognition language according to active i18n setting
    if (typeof i18n !== 'undefined') {
      if (i18n.currentLang === 'hi') {
        this.recognition.lang = 'hi-IN';
      } else if (i18n.currentLang === 'hinglish') {
        this.recognition.lang = 'en-IN';
      } else {
        this.recognition.lang = 'en-US';
      }
    }

    this.isRecording = forceState !== undefined ? forceState : !this.isRecording;

    if (this.isRecording) {
      if (micBtn) micBtn.classList.add('recording');
      try {
        this.recognition.start();
      } catch (e) {}
    } else {
      if (micBtn) micBtn.classList.remove('recording');
      try {
        this.recognition.stop();
      } catch (e) {}
    }
  }

  loadHistory() {
    if (!this.messagesContainer || !auth.currentUser) return;
    const chats = db.getChats(auth.currentUser.id);
    this.messagesContainer.innerHTML = '';

    chats.forEach(chat => {
      this.renderMessage(chat.sender, chat.text, chat.emotion, chat.timestamp);
    });

    this.scrollToBottom();
  }

  renderMessage(sender, text, emotionLabel, timestamp) {
    if (!this.messagesContainer) return;

    const wrapper = document.createElement('div');
    wrapper.className = `message-wrapper ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = `chat-avatar ${sender}`;
    avatar.textContent = sender === 'user' ? (auth.currentUser ? auth.currentUser.avatar : 'U') : 'AI';

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    
    // Main text
    const textNode = document.createElement('div');
    textNode.textContent = text;
    bubble.appendChild(textNode);

    // Emotion Tag if available
    if (emotionLabel) {
      const tag = document.createElement('div');
      tag.className = 'emotion-tag';
      tag.style.background = 'rgba(255,255,255,0.15)';
      tag.textContent = `Tag: ${emotionLabel}`;
      bubble.appendChild(tag);
    }

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);

    this.messagesContainer.appendChild(wrapper);
    this.scrollToBottom();
  }

  async handleSend() {
    const text = this.chatInput.value.trim();
    if (!text || !auth.currentUser) return;

    // 1. Clear Input
    this.chatInput.value = '';

    // If currently in Direct Peer Chat mode, defer to peersController!
    if (typeof peersController !== 'undefined' && peersController.activePeerChatId) {
      peersController.sendPeerMessage(text);
      return;
    }

    // 2. Emotion & Crisis Check for AI Chat
    const emotionResult = nlpEngine.detectEmotion(text);
    const crisisResult = nlpEngine.detectCrisisRisk(text);

    // 3. Save & Render User Message
    db.addChat({
      userId: auth.currentUser.id,
      sender: 'user',
      text: text,
      emotion: emotionResult.label
    });
    this.renderMessage('user', text, emotionResult.label);

    // 4. Trigger Crisis SOS Modal if high-risk text detected
    if (crisisResult.isCrisis) {
      safetyController.triggerSOSModal(crisisResult);
    }

    // 5. Generate AI Response
    this.showTypingIndicator();

    const settings = db.getSettings();
    let aiResponseText = '';

    if (settings.geminiApiKey) {
      try {
        aiResponseText = await this.fetchGeminiResponse(text, settings.geminiApiKey);
      } catch (err) {
        aiResponseText = nlpEngine.generateEmpatheticResponse(text, emotionResult);
      }
    } else {
      await new Promise(res => setTimeout(res, 800));
      aiResponseText = nlpEngine.generateEmpatheticResponse(text, emotionResult);
    }

    this.removeTypingIndicator();

    // 6. Save & Render AI Message
    db.addChat({
      userId: auth.currentUser.id,
      sender: 'ai',
      text: aiResponseText,
      emotion: 'Empathy'
    });
    this.renderMessage('ai', aiResponseText, 'Empathy');

    // 7. Optional Text-to-Speech Playback
    if (settings.enableVoice) {
      this.speakText(aiResponseText);
    }
  }

  showTypingIndicator() {
    const wrapper = document.createElement('div');
    wrapper.id = 'typingIndicator';
    wrapper.className = 'message-wrapper ai';
    wrapper.innerHTML = `
      <div class="chat-avatar ai">AI</div>
      <div class="chat-bubble" style="color: var(--text-muted); font-style: italic;">
        ${(typeof i18n !== 'undefined' ? i18n.get('chatThinking') : 'Thinking with care... 🍃')}
      </div>
    `;
    this.messagesContainer.appendChild(wrapper);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
  }

  async fetchGeminiResponse(prompt, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are MindSolace AI Companion, a compassionate, empathetic mental health assistant for lonely or stressed users. Respond warmly, non-judgmentally, and concisely in 2-3 supportive sentences in the EXACT same language as the user (Devanagari Hindi, Roman Hinglish, or English). User message: "${prompt}"`
          }]
        }]
      })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  speakText(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      // Auto-detect Hindi characters or Hinglish mode
      const isHindiScript = /[\u0900-\u097F]/.test(text);
      const isHinglish = typeof i18n !== 'undefined' && i18n.currentLang === 'hinglish';
      
      if (isHindiScript) {
        utterance.lang = 'hi-IN';
      } else if (isHinglish) {
        utterance.lang = 'en-IN';
      } else {
        utterance.lang = 'en-US';
      }

      // Pick best matching voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const matchingVoice = voices.find(v => v.lang.startsWith(utterance.lang.split('-')[0]));
        if (matchingVoice) utterance.voice = matchingVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  }

  sendPromptChip(promptText) {
    if (this.chatInput) {
      this.chatInput.value = promptText;
      this.handleSend();
    }
  }

  clearChat() {
    if (confirm('Clear chat conversation history?')) {
      db.clearChats(auth.currentUser.id);
      this.loadHistory();
    }
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }
}

const chatController = new ChatController();
