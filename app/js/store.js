// Progress store: which trophies are earned, plus the spoiler setting, kept in localStorage.
// Export downloads the same JSON shape that Import reads back, so progress can move between browsers.

const STORAGE_KEY = 'leonida-trophy-atlas-v1';

export function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    return {
      earned: new Set(Array.isArray(raw.earned) ? raw.earned : []),
      spoiler: raw.spoiler === true,
    };
  } catch {
    return { earned: new Set(), spoiler: false };
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ earned: [...state.earned], spoiler: state.spoiler }));
}

export function toggleEarned(state, name) {
  if (state.earned.has(name)) state.earned.delete(name);
  else state.earned.add(name);
  saveState(state);
}

export function exportProgress(state) {
  const payload = JSON.stringify({ app: 'leonida-trophy-atlas', earned: [...state.earned], spoiler: state.spoiler }, null, 2);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
  a.download = 'leonida-trophy-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

export function importProgress(state, file, onDone) {
  file.text().then((text) => {
    const parsed = JSON.parse(text);
    const names = Array.isArray(parsed) ? parsed : parsed.earned;
    if (!Array.isArray(names)) throw new Error('no earned list in file');
    state.earned = new Set(names.filter((n) => typeof n === 'string'));
    if (typeof parsed.spoiler === 'boolean') state.spoiler = parsed.spoiler;
    saveState(state);
    onDone(null);
  }).catch((err) => onDone(err));
}

export function resetProgress(state) {
  state.earned = new Set();
  saveState(state);
}
