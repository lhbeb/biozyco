// Hardcoded credentials
const ADMIN_EMAIL = 'elmahboubimehdi@gmail.com';
const ADMIN_PASSWORD = 'Localserver!!2';

// Session key
const SESSION_KEY = 'biozy_admin_session';

// Session duration: 24 hours in milliseconds
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface SessionData {
  authenticated: boolean;
  timestamp: number;
  adminName?: string; // Track which admin is logged in
}

export function validateCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function setSession(adminName: string): void {
  if (typeof window !== 'undefined') {
    const sessionData: SessionData = {
      authenticated: true,
      timestamp: Date.now(),
      adminName: adminName,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  }
}

export function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function getCurrentAdmin(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const sessionDataStr = localStorage.getItem(SESSION_KEY);

    if (!sessionDataStr) {
      return null;
    }

    const sessionData: SessionData = JSON.parse(sessionDataStr);

    if (!sessionData.authenticated || !sessionData.adminName) {
      return null;
    }

    return sessionData.adminName;
  } catch (error) {
    console.error('Error reading admin name:', error);
    return null;
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const sessionDataStr = localStorage.getItem(SESSION_KEY);

    if (!sessionDataStr) {
      return false;
    }

    const sessionData: SessionData = JSON.parse(sessionDataStr);

    // Check if session data is valid
    if (!sessionData.authenticated || !sessionData.timestamp) {
      clearSession();
      return false;
    }

    // Check if session has expired (24 hours)
    const now = Date.now();
    const sessionAge = now - sessionData.timestamp;

    if (sessionAge > SESSION_DURATION) {
      // Session expired, clear it
      clearSession();
      return false;
    }

    // Session is valid
    return true;
  } catch (error) {
    // Invalid session data, clear it
    console.error('Error reading session data:', error);
    clearSession();
    return false;
  }
}

export function getSessionRemainingTime(): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  try {
    const sessionDataStr = localStorage.getItem(SESSION_KEY);

    if (!sessionDataStr) {
      return 0;
    }

    const sessionData: SessionData = JSON.parse(sessionDataStr);

    if (!sessionData.authenticated || !sessionData.timestamp) {
      return 0;
    }

    const now = Date.now();
    const sessionAge = now - sessionData.timestamp;
    const remainingTime = SESSION_DURATION - sessionAge;

    return remainingTime > 0 ? remainingTime : 0;
  } catch (error) {
    return 0;
  }
}

