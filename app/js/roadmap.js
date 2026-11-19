// Roadmap data: the order to earn the Platinum in, built from the official descriptions and the
// launch-week roadmaps (GTABase, KeenGamer, Output Lag, LF Carry — see the Sources view).
// Each trophy in data/trophies.json carries a "stage" number that files it into one of these stages.

export const SAVE_DISCIPLINE = {
  title: 'Before you start: save discipline',
  points: [
    'There is no mission replay and no New Game Plus. The game gives you 15 manual save slots plus an autosave: keep one save at the start of every chapter and one untouched save from just before the final mission, and rotate the rest.',
    'Do Lucia\u2019s balcony meditation in Chapter 1 — it counts toward Positive Mental Attitude and disappears when the chapter ends (see Missables).',
    'Start hourglass (time-sensitive) strands the moment they appear — Race Against Yago in Chapter 3 is the known one.',
    'Never use cheats on your trophy save: cheats switch off trophies and saving for the session.',
    'Everything outside the story stays available after the credits — side-story finales and the whole 100% checklist included — so nothing else needs rushing.',
    'Scale of the job: about 200 hours, rated around 4/10 difficulty. It is long, not hard: no online, difficulty or mission-medal trophies.',
  ],
};

export const ROADMAP_STAGES = [
  {
    stage: 1,
    title: 'Stage 1 — Play the story: Prologue & Chapters 1–5',
    blurb: 'Finish the campaign first; every chapter and named-mission trophy pops along the way. Three things to catch inside the story rather than after it: the Chapter 1 balcony meditation (Positive Mental Attitude), the time-sensitive Race Against Yago in Chapter 3 (Strangers & Freaks), and the optional That\u2019s Where The Money Is near the end of Chapter 4, which unlocks bank vaults. Partner play opens during Chapter 2, which unlocks the duo trophies from then on.',
  },
  {
    stage: 2,
    title: 'Stage 2 — Side stories & stranger strands',
    blurb: 'Finish the six character questlines (Andy, Kenton, Billy, Randy, Tyrone and Bret\u2019s hunt) and complete 8 stranger mission strands for Strangers & Freaks. The finales stay open after the credits. Andy\u2019s, Billy\u2019s and Tyrone\u2019s strands carry their own trophies and do not count toward the 8 — check the trophy counter after each strand.',
  },
  {
    stage: 3,
    title: 'Stage 3 — Collectibles & the exploration sweep',
    blurb: 'Sweep Leonida region by region: 18 meditation spots, 3 Collectible Card sets, 100 WAiNK locations, 100 discovered vehicles, all 52 areas, then buy the 8 garages (about $160,000) and register 10 vehicles to the Scooter Bros app — garages first, because every registration needs a free space.',
  },
  {
    stage: 4,
    title: 'Stage 4 — Activities, heists & free-roam feats',
    blurb: 'The big activity block: 250 stunts, gold in all 42 Shooting Range challenges, a drone-race win at all 14 locations, 20 race wins, 50 Challenges, the robbery set (jewelry store unseen, 5 bank vaults, an armored truck, one illegal operation per gang), the partner feats, and the cryptic hidden trophies — a jet from a VCIA boarding bridge, a Rhino tank, five kills in one Combat Focus.',
  },
  {
    stage: 5,
    title: 'Stage 5 — 100% completion & the Platinum',
    blurb: 'Close out A Long Road on the in-game checklist (Progress > Stats > 100% Completion): 200 of 277 vehicles, 100 of 255 animals, 70 of 80 Challenges, all 8 bank vaults and 300 stunts are the published shape of it. When the last trophy lands, Vice Got a Price! — the Platinum — pops on its own.',
  },
];

export const MISSABLE_NOTES = [
  {
    title: 'Not missable, despite the story timing: Let\u2019s Go Bowling',
    text: 'Kingpin Bowling is an illegal operation visited in Chapter 2; if you leave any of its three key valuables behind, the operation returns later, so the trophy can still be earned afterwards.',
  },
  {
    title: 'Not missable: the six side-story finales',
    text: 'Andy, Kenton, Billy, Randy, Tyrone and Bret\u2019s finales all stay available after the credits, like everything outside the main story.',
  },
  {
    title: 'The honest unknowns',
    text: 'Five hidden trophies — In The Beginning\u2026, Capital Offense, Bad Luck, I Guess, The Truth Is Out There and Ten Pin — have no confirmed trigger at launch. Their guides in the checklist say so plainly instead of inventing a method, and none of them is known to be missable.',
  },
];
