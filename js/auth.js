/**
 * MindConsole AI - Authentication & Anonymous Guest Mode Controller
 */

class AuthController {
  constructor() {
    this.currentUser = db.getCurrentUser();
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  isAnonymous() {
    return this.currentUser ? this.currentUser.isAnonymous : false;
  }

  // Register New User
  register(name, email, password) {
    if (!name || !email || !password) {
      throw new Error('Please fill in all fields.');
    }

    const users = db.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('Email is already registered. Please log in.');
    }

    const newUser = {
      id: 'user-' + Date.now(),
      name: name,
      email: email,
      passwordHash: password,
      isAnonymous: false,
      avatar: name.charAt(0).toUpperCase(),
      createdAt: new Date().toISOString()
    };

    db.saveUser(newUser);
    db.setCurrentUser(newUser);
    this.currentUser = newUser;
    return newUser;
  }

  // Login Existing User
  login(email, password) {
    if (!email || !password) {
      throw new Error('Please provide email and password.');
    }

    const users = db.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === password);

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    db.setCurrentUser(user);
    this.currentUser = user;
    return user;
  }

  // One-Click Anonymous Guest Mode
  loginAnonymous() {
    const anonymousUser = {
      id: 'anon-' + Date.now(),
      name: 'Anonymous Guest',
      email: 'anonymous@guest.local',
      isAnonymous: true,
      avatar: '🔒',
      createdAt: new Date().toISOString()
    };

    db.setCurrentUser(anonymousUser);
    this.currentUser = anonymousUser;
    return anonymousUser;
  }

  // Logout
  logout() {
    db.clearSession();
    this.currentUser = null;
    window.location.reload();
  }

  updateProfile(name, email) {
    if (!this.currentUser) return;
    this.currentUser.name = name;
    if (email) this.currentUser.email = email;
    this.currentUser.avatar = name.charAt(0).toUpperCase();

    if (!this.currentUser.isAnonymous) {
      db.saveUser(this.currentUser);
    }
    db.setCurrentUser(this.currentUser);
  }
}

const auth = new AuthController();
