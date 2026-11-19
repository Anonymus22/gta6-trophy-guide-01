# Leonida Trophy Atlas — GTA VI Trophy Guide & Tracker

[![Competition](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/c/gta6-trophy-guide-01) [![Rank](https://make.fun/badge/gta6-trophy-guide-01/Anonymus22/gta6-trophy-guide-01/rank.svg)](https://make.fun/c/gta6-trophy-guide-01) [![Reward](https://make.fun/badge/gta6-trophy-guide-01/Anonymus22/gta6-trophy-guide-01/reward.svg)](https://make.fun/c/gta6-trophy-guide-01)

An offline guide and tracker for all 55 Grand Theft Auto VI trophies on PlayStation 5. Every trophy is listed with its official name, description, and grade, alongside a guide written in our own words with its sources cited. Your progress is saved in the browser, so the atlas works as a long-term companion from your first trophy to the platinum.

## Features

- **Full checklist** — all 55 trophies (1 platinum, 2 gold, 6 silver, 46 bronze) with official names, descriptions, and grades
- **Progress that sticks** — check trophies off and the state is stored in `localStorage`; export it to a file and import it back on another machine
- **Filters** — narrow the list by kind (story, missable, collectibles, activities, online) or by grade, plus a text search
- **Spoiler protection** — story trophy names and descriptions stay hidden until you earn them or choose to reveal them
- **Platinum roadmap** — a staged route through the game that orders the trophies sensibly and calls out missables before they can be lost
- **Missables view** — every missable trophy in one place, with the point of no return for each
- **Cited guides** — a short, original guide per trophy naming where its facts come from
- **Fully offline** — plain static files, no build step, no network requests at run time

## Run it

Serve the `app/` folder with any static file server, for example:

```sh
npx serve app
```

or use the small server bundled with the repo:

```sh
node serve.ts
```

Then open the printed address in a desktop browser. No network connection is needed once the files are on your machine.

## Layout

- `app/` — the web app itself: `index.html`, styles, scripts, and `data/trophies.json` holding the trophy list and guides
- `screenshots/` — screenshots of the app taken in a browser
- `main.ts` — the hand-in program: copies `app/` and `screenshots/` to the output directory and writes the dossier
- `vendor/` — the kit's dossier library, used unchanged by `main.ts`

## License

MIT — see [LICENSE](LICENSE).
