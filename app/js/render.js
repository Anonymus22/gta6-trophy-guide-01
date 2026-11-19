// Rendering: turns data/trophies.json plus the progress store into the four views.
// Everything is built with textContent so trophy data can never inject markup.

import { SOURCE_LINKS, SOURCE_NOTES, sourceLink } from './sources.js';
import { SAVE_DISCIPLINE, ROADMAP_STAGES, MISSABLE_NOTES } from './roadmap.js';

export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function isMasked(trophy, state) {
  return state.spoiler && trophy.kind === 'story' && !state.earned.has(trophy.name);
}

export function displayName(trophy, state) {
  return isMasked(trophy, state) ? 'Hidden story trophy' : trophy.name;
}

export function displayDescription(trophy, state) {
  return isMasked(trophy, state) ? 'Hidden until earned — spoiler protection is on.' : trophy.description;
}

export function gradeChip(trophy) {
  return el('span', `grade-chip grade-${trophy.grade}`, trophy.grade.toUpperCase());
}

function kindLabel(trophy) {
  return trophy.kind === 'platinum' ? 'Platinum' : trophy.kind[0].toUpperCase() + trophy.kind.slice(1);
}

function sourceList(names) {
  const wrap = el('div', 'guide-sources');
  wrap.append(el('h4', null, 'Sources'));
  const ul = el('ul');
  for (const name of names) {
    const li = el('li');
    const url = sourceLink(name);
    if (url) {
      const a = el('a', null, name);
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.append(a);
    } else {
      li.append(el('span', null, name));
    }
    ul.append(li);
  }
  wrap.append(ul);
  return wrap;
}

export function renderProgress(doc, state) {
  const total = doc.trophies.length;
  const earnedCount = doc.trophies.filter((t) => state.earned.has(t.name)).length;
  document.getElementById('progress-label').textContent = `${earnedCount} of ${total} earned`;
  const pct = total === 0 ? 0 : Math.round((earnedCount / total) * 100);
  document.getElementById('progress-pct').textContent = `${pct}%`;
  document.getElementById('progress-fill').style.width = `${pct}%`;
  const tallies = document.getElementById('grade-tallies');
  tallies.replaceChildren();
  for (const grade of ['platinum', 'gold', 'silver', 'bronze']) {
    const all = doc.trophies.filter((t) => t.grade === grade);
    const got = all.filter((t) => state.earned.has(t.name)).length;
    const span = el('span', 'tally', `${grade[0].toUpperCase() + grade.slice(1)} ${got}/${all.length}`);
    tallies.append(span);
  }
}

function trophyRow(trophy, state, ui, onSelect, onToggle) {
  const row = el('div', 'trophy-row');
  if (state.earned.has(trophy.name)) row.classList.add('earned');
  if (ui.selectedId === trophy.id) row.classList.add('selected');
  row.dataset.id = String(trophy.id);

  const box = document.createElement('input');
  box.type = 'checkbox';
  box.checked = state.earned.has(trophy.name);
  box.setAttribute('aria-label', `Mark ${trophy.name} as earned`);
  box.addEventListener('change', () => onToggle(trophy));
  row.append(box);

  const main = el('div', 'row-main');
  const nameLine = el('div', 'row-name-line');
  nameLine.append(el('span', 'row-name', displayName(trophy, state)));
  if (trophy.missable) nameLine.append(el('span', 'badge badge-missable', 'MISSABLE'));
  if (trophy.timeSensitive) nameLine.append(el('span', 'badge badge-time', 'TIME-SENSITIVE'));
  if (trophy.hidden && !isMasked(trophy, state)) nameLine.append(el('span', 'badge badge-hidden', 'HIDDEN'));
  main.append(nameLine);
  main.append(el('p', 'row-desc', displayDescription(trophy, state)));
  const meta = el('div', 'row-meta');
  meta.append(el('span', 'meta-tag', kindLabel(trophy)));
  if (trophy.count) meta.append(el('span', 'meta-tag', `Tracks to ${trophy.count}`));
  meta.append(el('span', 'meta-tag', `Roadmap stage ${trophy.stage}`));
  main.append(meta);
  row.append(main);

  row.append(gradeChip(trophy));
  row.addEventListener('click', (event) => {
    if (event.target !== box) onSelect(trophy.id);
  });
  return row;
}

export function matchesFilters(trophy, state, ui) {
  if (ui.kind === 'missable' && !trophy.missable) return false;
  if (ui.kind !== 'all' && ui.kind !== 'missable' && trophy.kind !== ui.kind) return false;
  if (ui.grade !== 'all' && trophy.grade !== ui.grade) return false;
  if (ui.hideEarned && state.earned.has(trophy.name)) return false;
  if (ui.query) {
    const q = ui.query.toLowerCase();
    const hay = `${trophy.name} ${trophy.description} ${trophy.guide}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

export function renderChecklist(doc, state, ui, onSelect, onToggle) {
  const list = document.getElementById('trophy-list');
  list.replaceChildren();
  if (ui.kind === 'online') {
    const empty = el('div', 'empty-state');
    empty.append(el('h3', null, 'No online trophies — by design'));
    empty.append(el('p', null, 'Grand Theft Auto VI has no online trophies at launch: all 55 trophies are single-player, so the Online filter is empty. Everything on this list can be earned offline, in one playthrough.'));
    empty.append(el('p', 'empty-src', 'Sources: Output Lag — GTA 6 Trophy List (FAQ); GTABase — GTA 6 Trophy Guide (roadmap: online trophies: none).'));
    list.append(empty);
    return;
  }
  const visible = doc.trophies.filter((t) => matchesFilters(t, state, ui));
  if (visible.length === 0) {
    list.append(el('p', 'empty-state', 'No trophies match these filters.'));
    return;
  }
  for (const trophy of visible) list.append(trophyRow(trophy, state, ui, onSelect, onToggle));
}

export function renderGuidePanel(doc, state, ui, onToggle) {
  const panel = document.getElementById('guide-panel');
  panel.replaceChildren();
  const trophy = doc.trophies.find((t) => t.id === ui.selectedId);
  if (!trophy) {
    panel.append(el('h3', null, 'Pick a trophy'));
    panel.append(el('p', null, 'Select any trophy in the checklist to read its full guide here — what to do, when it can be missed, and the sources each guide is built from.'));
    const missables = doc.trophies.filter((t) => t.missable).length;
    const hidden = doc.trophies.filter((t) => t.hidden).length;
    panel.append(el('p', 'panel-stat', `${doc.trophies.length} trophies · ${hidden} hidden · ${missables} missable · 0 online`));
    return;
  }
  if (isMasked(trophy, state)) {
    panel.append(el('h3', null, 'Hidden story trophy'));
    panel.append(el('p', null, 'Spoiler protection is on, so this story trophy stays masked until you earn it. Tick it off in the checklist — or turn spoiler protection off — to reveal its guide.'));
    return;
  }
  const head = el('div', 'guide-head');
  head.append(gradeChip(trophy));
  head.append(el('h3', null, trophy.name));
  panel.append(head);
  panel.append(el('p', 'guide-official-label', 'Official description'));
  panel.append(el('p', 'guide-official', `\u201C${trophy.description}\u201D`));
  const meta = el('div', 'row-meta');
  meta.append(el('span', 'meta-tag', kindLabel(trophy)));
  if (trophy.hidden) meta.append(el('span', 'meta-tag', 'Hidden on PlayStation until earned'));
  if (trophy.count) meta.append(el('span', 'meta-tag', `PlayStation tracks progress to ${trophy.count}`));
  meta.append(el('span', 'meta-tag', `Roadmap stage ${trophy.stage}`));
  panel.append(meta);
  if (trophy.missable) {
    const warn = el('div', 'warn-box');
    warn.append(el('strong', null, 'Missable — read before you play on. '));
    warn.append(el('span', null, trophy.missableNote ?? ''));
    panel.append(warn);
  }
  if (trophy.timeSensitive) {
    const warn = el('div', 'warn-box warn-time');
    warn.append(el('strong', null, 'Time-sensitive. '));
    warn.append(el('span', null, trophy.timeSensitiveNote ?? ''));
    panel.append(warn);
  }
  panel.append(el('h4', 'guide-heading', 'Guide'));
  panel.append(el('p', 'guide-text', trophy.guide));
  const toggleBtn = el('button', 'earned-toggle', state.earned.has(trophy.name) ? 'Earned ✓ — tap to undo' : 'Mark as earned');
  toggleBtn.type = 'button';
  toggleBtn.addEventListener('click', () => onToggle(trophy));
  panel.append(toggleBtn);
  panel.append(sourceList(trophy.sources));
}

export function renderRoadmap(doc, state, onJump) {
  const root = document.getElementById('roadmap-root');
  root.replaceChildren();
  const intro = el('div', 'card save-card');
  intro.append(el('h3', null, SAVE_DISCIPLINE.title));
  const ul = el('ul');
  for (const point of SAVE_DISCIPLINE.points) ul.append(el('li', null, point));
  intro.append(ul);
  root.append(intro);

  for (const stage of ROADMAP_STAGES) {
    const trophies = doc.trophies.filter((t) => t.stage === stage.stage);
    const got = trophies.filter((t) => state.earned.has(t.name)).length;
    const card = el('div', 'card stage-card');
    const head = el('div', 'stage-head');
    head.append(el('h3', null, stage.title));
    head.append(el('span', 'stage-count', `${got}/${trophies.length} earned`));
    card.append(head);
    card.append(el('p', 'stage-blurb', stage.blurb));
    const chips = el('div', 'stage-chips');
    for (const trophy of trophies) {
      const chip = el('button', 'stage-chip', `${state.earned.has(trophy.name) ? '✓ ' : ''}${displayName(trophy, state)}`);
      chip.type = 'button';
      if (state.earned.has(trophy.name)) chip.classList.add('done');
      if (trophy.missable) chip.classList.add('has-missable');
      chip.title = `${trophy.grade} — open in checklist`;
      chip.addEventListener('click', () => onJump(trophy.id));
      chips.append(chip);
    }
    card.append(chips);
    root.append(card);
  }
}

export function renderMissables(doc, state, onJump) {
  const root = document.getElementById('missables-root');
  root.replaceChildren();
  const intro = el('div', 'card');
  intro.append(el('h3', null, 'Missables: one real risk, and the save habits that cover it'));
  intro.append(el('p', null, 'Of the 55 trophies, exactly one is confirmed missable by the launch-week guides: Positive Mental Attitude, because of a single Chapter 1 moment and a game with no mission replay. Everything else either pops on the story path or stays available in free roam after the credits. This view collects the risk, the one time-sensitive strand, and the save discipline that makes the Platinum a one-playthrough job.'));
  root.append(intro);

  for (const trophy of doc.trophies.filter((t) => t.missable)) {
    const card = el('div', 'card missable-card');
    const head = el('div', 'guide-head');
    head.append(gradeChip(trophy));
    head.append(el('h3', null, trophy.name));
    card.append(head);
    card.append(el('p', 'guide-official', `\u201C${trophy.description}\u201D`));
    const warn = el('div', 'warn-box');
    warn.append(el('strong', null, 'Why it can be missed. '));
    warn.append(el('span', null, trophy.missableNote ?? ''));
    card.append(warn);
    card.append(el('p', 'guide-text', trophy.guide));
    const btn = el('button', 'earned-toggle', 'Open in checklist');
    btn.type = 'button';
    btn.addEventListener('click', () => onJump(trophy.id));
    card.append(btn);
    card.append(sourceList(trophy.sources));
    root.append(card);
  }

  for (const trophy of doc.trophies.filter((t) => t.timeSensitive)) {
    const card = el('div', 'card');
    card.append(el('h3', null, `Time-sensitive, not missable: ${trophy.name}`));
    card.append(el('p', null, trophy.timeSensitiveNote ?? ''));
    card.append(el('p', null, 'The strand itself is not a missable trophy, but one of its races is: Race Against Yago appears in Chapter 3 with an hourglass icon. Save first, then race it the moment it appears.'));
    root.append(card);
  }

  const save = el('div', 'card save-card');
  save.append(el('h3', null, SAVE_DISCIPLINE.title));
  const ul = el('ul');
  for (const point of SAVE_DISCIPLINE.points) ul.append(el('li', null, point));
  save.append(ul);
  root.append(save);

  for (const note of MISSABLE_NOTES) {
    const card = el('div', 'card');
    card.append(el('h3', null, note.title));
    card.append(el('p', null, note.text));
    root.append(card);
  }
}

export function renderSources(doc) {
  const root = document.getElementById('sources-root');
  root.replaceChildren();
  const intro = el('div', 'card');
  intro.append(el('h3', null, 'How this guide was built'));
  intro.append(el('p', null, doc.guideNote ?? ''));
  intro.append(el('p', null, 'Method: the official names, descriptions and grades are reproduced exactly as PlayStation publishes them. Roadmap order, missable flags and unlock methods were derived from those official descriptions and cross-checked against the launch-week guides below. No guide text was copied from any of them — sources are cited, never copied. Where no method is confirmed yet (five hidden trophies), the guide says so instead of guessing.'));
  const stats = el('p', 'panel-stat', '55 trophies: 1 Platinum · 2 Gold · 6 Silver · 46 Bronze · 28 hidden · 1 missable · 0 online');
  intro.append(stats);
  root.append(intro);

  const card = el('div', 'card');
  card.append(el('h3', null, 'Sources cited in the guides'));
  const ul = el('ul', 'sources-list');
  for (const name of Object.keys(SOURCE_LINKS)) {
    const li = el('li');
    const url = sourceLink(name);
    if (url) {
      const a = el('a', null, name);
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.append(a);
    } else {
      li.append(el('span', 'source-name', name));
      li.append(el('span', 'source-cited', ' (cited by name)'));
    }
    li.append(el('p', 'source-note', SOURCE_NOTES[name] ?? ''));
    ul.append(li);
  }
  card.append(ul);
  root.append(card);
}
