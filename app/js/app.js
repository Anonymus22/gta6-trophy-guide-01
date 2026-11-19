// Leonida Trophy Atlas — bootstrap: load the trophy data, wire the controls, render the views.
// Static and offline: the only file fetched is the app's own data/trophies.json.

import { loadState, saveState, toggleEarned, exportProgress, importProgress, resetProgress } from './store.js';
import { renderProgress, renderChecklist, renderGuidePanel, renderRoadmap, renderMissables, renderSources } from './render.js';

const doc = await (await fetch('data/trophies.json')).json();
const state = loadState();
const ui = { view: 'checklist', kind: 'all', grade: 'all', query: '', hideEarned: false, selectedId: 28 };

function renderAll() {
  renderProgress(doc, state);
  renderChecklist(doc, state, ui, selectTrophy, onToggle);
  renderGuidePanel(doc, state, ui, onToggle);
  renderRoadmap(doc, state, jumpToTrophy);
  renderMissables(doc, state, jumpToTrophy);
  renderSources(doc);
  document.getElementById('spoiler-note').hidden = !state.spoiler;
  document.getElementById('spoiler-toggle').checked = state.spoiler;
}

function selectTrophy(id) {
  ui.selectedId = id;
  renderAll();
}

function onToggle(trophy) {
  toggleEarned(state, trophy.name);
  renderAll();
}

function jumpToTrophy(id) {
  ui.selectedId = id;
  switchView('checklist');
  renderAll();
}

function switchView(view) {
  ui.view = view;
  for (const tab of document.querySelectorAll('#view-tabs .tab')) {
    tab.classList.toggle('active', tab.dataset.view === view);
  }
  for (const section of document.querySelectorAll('main .view')) {
    section.classList.toggle('active', section.id === `view-${view}`);
  }
}

for (const tab of document.querySelectorAll('#view-tabs .tab')) {
  tab.addEventListener('click', () => switchView(tab.dataset.view));
}
for (const chip of document.querySelectorAll('#kind-filters .chip')) {
  chip.addEventListener('click', () => {
    ui.kind = chip.dataset.kind;
    for (const c of document.querySelectorAll('#kind-filters .chip')) c.classList.toggle('active', c === chip);
    renderAll();
  });
}
document.getElementById('grade-filter').addEventListener('change', (event) => {
  ui.grade = event.target.value;
  renderAll();
});
document.getElementById('search-input').addEventListener('input', (event) => {
  ui.query = event.target.value.trim();
  renderAll();
});
document.getElementById('hide-earned-toggle').addEventListener('change', (event) => {
  ui.hideEarned = event.target.checked;
  renderAll();
});
document.getElementById('spoiler-toggle').addEventListener('change', (event) => {
  state.spoiler = event.target.checked;
  saveState(state);
  renderAll();
});
document.getElementById('export-btn').addEventListener('click', () => exportProgress(state));
document.getElementById('import-input').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  importProgress(state, file, (err) => {
    if (err) alert('That file could not be read as trophy progress.');
    event.target.value = '';
    renderAll();
  });
});
document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm('Reset all earned trophies? This cannot be undone.')) {
    resetProgress(state);
    renderAll();
  }
});

renderAll();
