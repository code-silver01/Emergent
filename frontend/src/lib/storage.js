// localStorage helpers for Mohalla
const KEY = 'mohalla_state_v1';

const DEFAULT_STATE = {
  user: null,         // { name, phone, flat, building, role, coins, trustScore }
  acceptedJobs: [],
  passedJobs: [],
  postedBarters: [],
  confirmedBarters: [],
  reportedAlerts: []
};

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function patchState(patch) {
  const cur = loadState();
  const next = { ...cur, ...patch };
  saveState(next);
  return next;
}

export function setUser(user) {
  return patchState({ user });
}

export function getUser() {
  return loadState().user;
}

export function clearAll() {
  localStorage.removeItem(KEY);
}

export function addCoins(delta) {
  const s = loadState();
  if (!s.user) return s;
  s.user.coins = (s.user.coins || 0) + delta;
  saveState(s);
  return s;
}
