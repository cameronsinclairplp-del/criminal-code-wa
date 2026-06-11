# Criminal Code · WA — one-tap reference app

The whole *Criminal Code* (WA), compilation **01 May 2026** (PCO 19-aq0-00), as a single
self-contained web app: 472 Code sections plus the front provisions and Schedule 1,
verbatim from the exam-copy PDF. Search by section number or words, browse by Part and
Chapter, bookmarks, dark mode, offline.

## Put it on your iPhone/iPad (GitHub Pages)

1. Create a new GitHub repository (e.g. `criminal-code-wa`). Public or private — Pages works with both on your plan.
2. Upload **everything in this folder** (`index.html`, `manifest.webmanifest`, `sw.js`, `icons/`) to the repo root.
3. Repo **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
4. Wait ~1 minute, then open `https://<your-username>.github.io/criminal-code-wa/` in **Safari**.
5. **Share → Add to Home Screen → Add.**

It opens full-screen with its own icon, loads instantly, and keeps working offline
(the service worker caches everything after the first visit).

## Updating the data

Re-run the build in `../build/` after replacing the source markdown:

```
python3 parse_code.py   # md → data.json (validated, verbatim fidelity check)
python3 build_app.py    # data + css + js → index.html
```

Then replace `index.html` in the repo. Bump `VERSION` in `sw.js` whenever you update,
so installed copies fetch the new build.

## Notes

- Tip: in the app, search "371" jumps straight to the section; "/" focuses search on iPad with a keyboard.
- Each section shows its exam-copy PDF page, so you can pivot to the paper copy in the exam.
- Haptics: real on Android; on iOS, Apple removed the programmatic haptic workaround in 26.5 —
  the settings switch still gives a genuine tick when tapped directly.
- Study aid only — verify against the official compilation before quoting in evidence/court.
