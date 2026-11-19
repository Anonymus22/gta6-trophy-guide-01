// The source registry: every guide in data/trophies.json names its sources, and this file maps each
// cited name to the page it came from, so the guide panel and the Sources view can link them.
// The app itself never fetches these — a link opens only when the reader follows it.

export const SOURCE_LINKS = {
  'Exophase — GTA VI trophy list (PS5)': null,
  'PSNProfiles — GTA VI trophy list': null,
  'Output Lag — GTA 6 Trophy List': 'https://outputlag.com/guides/gta-6-trophy-list/',
  'GTABase — GTA 6 Trophy Guide': 'https://www.gtabase.com/articles/gta-6/gta-6-achievements-trophies-list-ps5-xbox-series',
  'KeenGamer — GTA 6 Platinum Roadmap': 'https://www.keengamer.com/articles/guides/gta-6-trophy-guide-platinum-roadmap-all-55-trophies/',
  'LF Carry — GTA 6 Platinum Trophy Guide': 'https://lfcarry.com/guides/gta-6-platinum-trophy-guide',
  'GTA Vibes — GTA 6 Trophy List': 'https://www.gtavibes.com/guides/gta-6-trophy-list-achievements',
  'Of Zen and Computing — GTA 6 Trophy List': 'https://www.ofzenandcomputing.com/gta-6-trophy-list-trophies-achievements/',
};

export const SOURCE_NOTES = {
  'Exophase — GTA VI trophy list (PS5)': 'Carrier of the official PlayStation 5 trophy list: the 55 names, descriptions and grades, and which trophies are hidden. Cited by name, as in the bounty kit itself.',
  'PSNProfiles — GTA VI trophy list': 'Second carrier of the official list; the kit notes Exophase and PSNProfiles agree on every name, description and grade. Cited by name.',
  'Output Lag — GTA 6 Trophy List': 'Launch-day full list with the visible/hidden split, the missable balcony meditation, the no-mission-replay save rules and most of the unlock methods used here.',
  'GTABase — GTA 6 Trophy Guide': 'Trophy guide and roadmap: the 100% checklist structure, the two-step story-then-cleanup order, and the same single-missable warning.',
  'KeenGamer — GTA 6 Platinum Roadmap': 'Platinum roadmap with difficulty (4/10), time (~200 hours) and missable estimates, plus the WAiNK scanning habit.',
  'LF Carry — GTA 6 Platinum Trophy Guide': 'Roadmap staging (campaign, then vaults and strangers, then the 100% sweep) and 100% checklist breakdowns.',
  'GTA Vibes — GTA 6 Trophy List': 'Full list coverage used to cross-check challenge categories and the roadmap order.',
  'Of Zen and Computing — GTA 6 Trophy List': 'Full list with roadmap and missable warnings, used to cross-check the hidden set and the story-first order.',
};

export function sourceLink(name) {
  return SOURCE_LINKS[name] ?? null;
}
