// localStorage — current user + persistent demo state
const USER_KEY = 'mohalla_user';
const DEMO_KEY = 'mohalla_demo_state';
const PHONE_KEY = 'mohalla_pending_phone';

const DEFAULT_DEMO = {
  adityaOnboarded: false,
  adityaCoins: 0,
  adityaContributions: [],
  inviteSent: false,
  inviteCode: 'MOH-7X2K',
  sunitaClaimed: false,
  sunitaOnboarded: false,
  connectionMade: false,
  acceptedJobs: [],
  passedJobs: [],
  reportedAlerts: [],
  helpedFavours: []
};

export function loadDemo() {
  try {
    const raw = localStorage.getItem(DEMO_KEY);
    if (!raw) return { ...DEFAULT_DEMO };
    return { ...DEFAULT_DEMO, ...JSON.parse(raw) };
  } catch { return { ...DEFAULT_DEMO }; }
}

export function saveDemo(state) {
  localStorage.setItem(DEMO_KEY, JSON.stringify(state));
}

export function patchDemo(patch) {
  const cur = loadDemo();
  const next = { ...cur, ...patch };
  saveDemo(next);
  return next;
}

export function loadUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function logoutUser() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(PHONE_KEY);
}

export function setPendingPhone(p) { localStorage.setItem(PHONE_KEY, p); }
export function getPendingPhone() { return localStorage.getItem(PHONE_KEY) || ''; }

// Full reset (only used in /me Reset demo)
export function fullReset() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(DEMO_KEY);
  localStorage.removeItem(PHONE_KEY);
}
