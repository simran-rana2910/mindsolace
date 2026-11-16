/**
 * MindSolace - Peer Community, Friends List & Direct Messaging Engine
 */

const DefaultOnlinePeers = [
  { id: 'peer-1', name: 'Priya Sharma', avatar: 'P', status: 'Available to Listen 🟢', mood: 'Peaceful', bio: 'Here to listen without judgment whenever you feel lonely.' },
  { id: 'peer-2', name: 'Aarav Patel', avatar: 'A', status: 'Seeking Comfort 💬', mood: 'Anxious', bio: 'Preparing for exams. Looking for a peer to share feelings with.' },
  { id: 'peer-3', name: 'Rohan Verma', avatar: 'R', status: 'Online Peer Listener 🟢', mood: 'Hopeful', bio: 'Learning to overcome stress step by step.' },
  { id: 'peer-4', name: 'Ananya Sen', avatar: 'N', status: 'Listening Buddy 🟢', mood: 'Calm', bio: 'Always happy to offer a supportive ear when you need solace.' }
];

class PeersController {
  constructor() {
    this.broadcastChannel = null;
    this.activePeerChatId = null;
    this.initBroadcastChannel();
  }

  init() {
    this.renderFriendsList();
    this.renderCommunityDirectory();
  }

  initBroadcastChannel() {
    if ('BroadcastChannel' in window) {
      this.broadcastChannel = new BroadcastChannel('mindsolace_peer_channel');
      this.broadcastChannel.onmessage = (event) => {
        const { type, message } = event.data;
        if (type === 'NEW_PEER_MESSAGE') {
          if (auth.currentUser && (message.receiverId === auth.currentUser.id || message.senderId === auth.currentUser.id)) {
            this.handleIncomingBroadcastMessage(message);
          }
        }
      };
    }
  }

  // Manage Friends
  getFriends() {
    if (!auth.currentUser) return [];
    const key = `mindsolace_friends_${auth.currentUser.id}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  saveFriends(friends) {
    if (!auth.currentUser) return;
    const key = `mindsolace_friends_${auth.currentUser.id}`;
    localStorage.setItem(key, JSON.stringify(friends));
  }

  isFriend(peerId) {
    const friends = this.getFriends();
    return friends.some(f => f.id === peerId);
  }

  addFriend(peer) {
    const friends = this.getFriends();
    if (!this.isFriend(peer.id)) {
      friends.push(peer);
      this.saveFriends(friends);
      alert(`${peer.name} has been added to your Friends List! 🤝`);
      this.renderFriendsList();
      this.renderCommunityDirectory();
    }
  }

  removeFriend(peerId) {
    let friends = this.getFriends();
    friends = friends.filter(f => f.id !== peerId);
    this.saveFriends(friends);
    this.renderFriendsList();
    this.renderCommunityDirectory();
  }

  // Direct Messaging
  getDirectMessages(peerId) {
    if (!auth.currentUser) return [];
    const key = `mindsolace_dms_${auth.currentUser.id}_${peerId}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  saveDirectMessage(peerId, msg) {
    if (!auth.currentUser) return;
    const key = `mindsolace_dms_${auth.currentUser.id}_${peerId}`;
    const msgs = this.getDirectMessages(peerId);
    msgs.push(msg);
    localStorage.setItem(key, JSON.stringify(msgs));
  }

  startDirectChat(peerId) {
    const peer = DefaultOnlinePeers.find(p => p.id === peerId) || this.getFriends().find(f => f.id === peerId);
    if (!peer) return;

    this.activePeerChatId = peerId;

    // Switch chat tab to Peer Chat mode
    app.switchTab('chat');
    this.setChatMode('peer', peer);
    this.loadDirectChatMessages(peerId);
  }

  setChatMode(mode, peer = null) {
    const aiHeader = document.getElementById('chatHeaderAI');
    const peerHeader = document.getElementById('chatHeaderPeer');

    if (mode === 'peer' && peer) {
      if (aiHeader) aiHeader.style.display = 'none';
      if (peerHeader) {
        peerHeader.style.display = 'flex';
        document.getElementById('peerChatName').textContent = peer.name;
        document.getElementById('peerChatStatus').textContent = peer.status;
      }
    } else {
      if (aiHeader) aiHeader.style.display = 'flex';
      if (peerHeader) peerHeader.style.display = 'none';
      this.activePeerChatId = null;
      chatController.loadHistory();
    }
  }

  loadDirectChatMessages(peerId) {
    const container = document.getElementById('chatMessages');
    if (!container || !auth.currentUser) return;

    container.innerHTML = '';
    const msgs = this.getDirectMessages(peerId);

    if (msgs.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); margin-top: 2rem;">
          <div>🤝 You are now connected with this peer listener.</div>
          <div style="font-size: 0.85rem; margin-top: 0.35rem;">Send a message to share your feelings and start chatting!</div>
        </div>
      `;
      return;
    }

    msgs.forEach(m => {
      const isMe = m.senderId === auth.currentUser.id;
      chatController.renderMessage(isMe ? 'user' : 'ai', m.text, m.emotion, m.timestamp);
    });
  }

  async sendPeerMessage(text) {
    if (!this.activePeerChatId || !auth.currentUser || !text) return;

    const msgObj = {
      id: 'dm-' + Date.now(),
      senderId: auth.currentUser.id,
      senderName: auth.currentUser.name,
      receiverId: this.activePeerChatId,
      text: text,
      timestamp: new Date().toISOString()
    };

    // Save locally for current user
    this.saveDirectMessage(this.activePeerChatId, msgObj);
    chatController.renderMessage('user', text, 'Peer Message');

    // Broadcast message to other open tabs
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type: 'NEW_PEER_MESSAGE', message: msgObj });
    }

    // Simulate reply from simulated online buddies if talking to demo peer
    const targetPeer = DefaultOnlinePeers.find(p => p.id === this.activePeerChatId);
    if (targetPeer) {
      chatController.showTypingIndicator();
      await new Promise(res => setTimeout(res, 1200));
      chatController.removeTypingIndicator();

      const replies = [
        `Thank you for sharing with me! I completely understand how you feel. We are in this together. 🌸`,
        `That sounds really stressful, but please know you are doing great. I am here listening whenever you need to vent! 🌿`,
        `I appreciate you opening up. Take a deep breath — you are not alone. ✨`
      ];
      const replyText = replies[Math.floor(Math.random() * replies.length)];

      const replyObj = {
        id: 'dm-' + Date.now(),
        senderId: targetPeer.id,
        senderName: targetPeer.name,
        receiverId: auth.currentUser.id,
        text: replyText,
        timestamp: new Date().toISOString()
      };

      this.saveDirectMessage(targetPeer.id, replyObj);
      chatController.renderMessage('ai', replyText, 'Peer Reply');
    }
  }

  handleIncomingBroadcastMessage(msg) {
    if (this.activePeerChatId === msg.senderId) {
      chatController.renderMessage('ai', msg.text, 'Peer Message');
    }
  }

  // Render UI Components
  renderCommunityDirectory() {
    const container = document.getElementById('communityPeersContainer');
    if (!container) return;

    container.innerHTML = DefaultOnlinePeers.map(p => {
      const added = this.isFriend(p.id);
      return `
        <div class="glass-card" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; margin-bottom: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div class="avatar-circle" style="background: linear-gradient(135deg, var(--accent-teal), var(--accent-indigo));">${p.avatar}</div>
            <div>
              <div style="font-weight: 700; font-size: 0.95rem;">${p.name}</div>
              <div style="font-size: 0.75rem; color: var(--emotion-happy);">${p.status} • Mood: ${p.mood}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">"${p.bio}"</div>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-secondary" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;" onclick="peersController.startDirectChat('${p.id}')">
              💬 Chat
            </button>
            ${added ? `
              <button class="btn btn-secondary" style="padding: 0.4rem 0.85rem; font-size: 0.8rem; color: var(--accent-teal);" disabled>
                ✓ Friend
              </button>
            ` : `
              <button class="btn btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;" onclick="peersController.addFriend({ id: '${p.id}', name: '${p.name}', avatar: '${p.avatar}', status: '${p.status}' })">
                + Add Friend
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  renderFriendsList() {
    const container = document.getElementById('friendsListContainer');
    if (!container) return;

    const friends = this.getFriends();
    if (friends.length === 0) {
      container.innerHTML = `<div style="color: var(--text-muted); padding: 0.5rem;">No friends added yet. Connect with online peer listeners in the directory!</div>`;
      return;
    }

    container.innerHTML = friends.map(f => `
      <div class="glass-card" style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem; margin-bottom: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div class="avatar-circle" style="width: 36px; height: 36px; font-size: 0.9rem;">${f.avatar || 'F'}</div>
          <div>
            <div style="font-weight: 600; font-size: 0.9rem;">${f.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${f.status || 'Listening Buddy'}</div>
          </div>
        </div>
        <div style="display: flex; gap: 0.35rem;">
          <button class="btn btn-primary" style="padding: 0.3rem 0.7rem; font-size: 0.75rem;" onclick="peersController.startDirectChat('${f.id}')">💬 Chat</button>
          <button class="icon-btn" style="width: 30px; height: 30px; color: var(--accent-rose);" onclick="peersController.removeFriend('${f.id}')" title="Remove Friend">✕</button>
        </div>
      </div>
    `).join('');
  }
}

const peersController = new PeersController();
