# GeoGestures 🪨✋🌀

> *The only geological interpretation tool that's 100% peer-reviewable by emoji.*

GeoGestures translates your verbose, polysyllabic geological descriptions into the universal language of hand gestures and expressive emojis. Because sometimes "listric normal fault detaching on basal shale" really does need to be communicated as `🫶 🌀 ↘️ 🫲 📐 🫴 🤚 🙌`.

**Live app:** [nsuurmey.github.io/GeoGestures](https://nsuurmey.github.io/GeoGestures/geogestures/)

---

## What is this?

You know that thing geologists do in the field where they wave their hands around to explain structural geometry? GeoGestures digitizes that ancient art form.

Type in any geological description — a fault system, a stratigraphic sequence, a migration pathway — and watch as 60+ geological keywords get mapped to carefully curated emoji sequences. The result is scientifically meaningless but emotionally resonant.

It's also *deterministic*, which means your "four-way dip closure with structural trap" will always produce the same gesture sequence. Reproducibility is a cornerstone of good science.

---

## Features

**Style Presets** — Filter the emoji pool by subdiscipline so your gestures stay on-brand:
- **Auto** — The full geological vocabulary, no discrimination
- **Structural** — Faults, folds, and everything that's been squished or pulled apart
- **Sedimentary** — Layers, beds, and the slow drama of deposition
- **Petroleum** — Reservoirs, traps, seals, and the whole upstream value chain
- **Geophysics** — Velocities, gradients, and models of uncertain provenance

**Dramatic Mode** — For when normal handwaving just isn't enough. Activates chaos emoji, purple gradients, floating animations, and the phrase "Maximum handwaving engaged. ¡Ay caramba!" The `🌋` button pulses. You will feel things.

**Regenerate** — Same input, new variation. Like running the same seismic inversion with a different starting model.

**Random Phrase** — Don't have a geological description handy? The app ships with 12 curated classics, including:
- *"salt withdrawal minibasin with halokinetic sequences"*
- *"sub-unconformity truncation trap beneath angular unconformity"*
- *"regressive shallowing upward carbonate sequence"*

**Copy to clipboard** — Paste your gesture sequence into your next conference abstract, Slack message, or peer review response.

**⌘+Enter** — For the keyboard-shortcut devotees.

---

## How it works

Under the hood, GeoGestures uses:

1. **FNV-1a hashing** to turn your input text into a deterministic seed
2. **A linear congruential generator** for seeded randomness (same input → same output, always)
3. **Keyword matching** against 60+ geological terms, each mapped to a curated emoji set
4. **Stopword filtering** because "the", "a", and "and" don't deserve emojis
5. **Run deduplication** to prevent the same emoji appearing three times in a row (geological processes have *some* variety)

The chaos/filler emoji pool gets biased toward explosions and vortices in Dramatic Mode. This is not configurable. It is non-negotiable.

---

## Tech stack

- **React 19** + **Vite 7** — because geology moves fast
- **Tailwind CSS v4** — available if you want to extend the UI
- **GitHub Pages** — deployed at `/geogestures/`
- **Zero external runtime dependencies** — all the randomness is homegrown

---

## Local development

```bash
cd geogestures
npm install
npm run dev
```

Then open `http://localhost:5173/geogestures/` and start handwaving.

```bash
npm run build    # production build
npm run preview  # preview the built app
```

---

## Deployment

Pushes to `main` automatically deploy via GitHub Actions to GitHub Pages. The workflow lives at `.github/workflows/deploy.yml`.

To enable: go to your repo **Settings → Pages** and set the source to **GitHub Actions**.

---

## Geology disclaimer

GeoGestures is lovingly poking fun at geologists (including ourselves). The emoji mappings represent a genuine attempt to capture the *spirit* of each geological concept. Any resemblance to actual peer-reviewed interpretation workflows is purely coincidental and probably a bad sign.

`👐 🪨 ✋ 🌀 🤌 🫶`
