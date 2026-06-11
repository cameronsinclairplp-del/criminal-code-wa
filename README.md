# WA Legislation — one-tap reference app (v2)

Live at: **https://cameronsinclairplp-del.github.io/criminal-code-wa/**

23 Acts · 5,191 provisions · verbatim text · fully offline once installed.
One adaptive app: iPhone (bottom dock), iPad (split-view sidebar), Mac (keyboard-first, ⌘K).

## What's in this folder (everything the website needs)

| File | What it is |
|---|---|
| `index.html` | The app shell (UI + topic hub + act manifest) |
| `data/*.json` | One file per Act — verbatim sections, pre-rendered |
| `sw.js` | Service worker — precaches everything for offline (auto-versioned) |
| `manifest.webmanifest` | PWA manifest ("WA Legislation") |
| `icons/` | App icons |

## Deploying an update (2 minutes)

1. Open https://github.com/cameronsinclairplp-del/criminal-code-wa
2. **Add file → Upload files** → drag in `index.html`, `sw.js`, `manifest.webmanifest` → **Commit changes**
3. Open the `data` folder in the repo (or type `data/` in the upload path to create it) → upload all 23 `.json` files from this folder's `data/` → **Commit changes**
4. Done. GitHub Pages republishes in ~1 minute. Installed copies pick up the new version on next launch with internet (the service worker re-caches automatically).

Icons only need uploading once (already there from v1).

## Installing on a device

- **iPhone / iPad**: open the link in Safari → Share → **Add to Home Screen** → Add.
  (Re-add it to refresh the icon label to "Legislation".)
- **Mac**: open in Safari → File → **Add to Dock**. Or just bookmark it — ⌘K searches.

## Rebuilding from source (when a new compilation is published)

From `../build/`:

```
python3 parse_v2.py        # 17 sectioned acts  → out/*.json   (expect "fails 0" everywhere)
python3 parse_archive.py   # 6 page-archive acts → out/*.json  (expect "render-fallbacks 0")
python3 build_v2.py        # assembles this folder; bumps the SW version automatically
```

Source markdown lives in `Legislation Master/Legislation - Markdown`. Per-act parse logs
are written to `build/out/report-*.txt`. The build fails loudly if a topic link stops
resolving. Verbatim rule: any section that can't be rendered with 100% fidelity ships as
plain verbatim text instead — never edited, never paraphrased.

## Notes

- Search understands act prefixes: `cia 128`, `mda 11`, `ea 106A`. Enter opens the top hit.
- Every section shows its source PDF page, so you can pivot to the paper exam copy.
- Study aid only — verify against the official compilation before quoting in evidence/court.
