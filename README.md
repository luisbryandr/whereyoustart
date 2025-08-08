# WhereYouStart 🚀

A personally customizable **New Tab start page**—your calm, private launchpad for the day.
Think *Notion-lite* meets *New Tab dashboard*: tiny widgets, local-first, and fast.

## ✨ Why

Open Chrome → see *only* what matters.
No rabbit holes. No logins. Just your links, notes, and a layout that sticks.

## 🧩 Current MVP Features

* **Draggable grid** (rearrange + resize)
* **Quick Links widget** – add/remove links, persists locally
* **Notes widget** – type-to-save, persists locally
* **Local-first storage** – works on localhost and as a Chrome extension (via fallback)
* **Layout persistence** – your grid stays put after refresh

> Early prototype. Expect rough edges. It’s already useful—and that’s the point.

## 🖼️ Screenshot

*Add a screenshot once you push*
`/docs/screenshot.png` (then embed it here)

```md
![WhereYouStart – early prototype](docs/screenshot.png)
```

---

## 🛠️ Tech Stack

* **React + Vite + TypeScript**
* **react-grid-layout** for the grid
* **localStorage / chrome.storage.local** (smart fallback)

---

## 🚀 Quick Start (Dev on localhost)

```bash
# 1) clone
git clone https://github.com/<YOUR-USERNAME>/whereyoustart.git
cd whereyoustart

# 2) install
npm install

# 3) run
npm run dev
```

Open the printed local URL (e.g. `http://localhost:5173`) in Chrome.

---

## 🧪 Try it as a Chrome New Tab (temporary dev)

> This project is set up to be a New Tab extension, but development is easiest on localhost first.

When you’re ready to test as a **New Tab**:

1. Ensure you have a `public/manifest.json` with:

   ```json
   {
     "manifest_version": 3,
     "name": "WhereYouStart",
     "description": "Your customizable New Tab dashboard",
     "version": "0.0.1",
     "chrome_url_overrides": { "newtab": "newtab.html" },
     "icons": { "128": "icon128.png" }
   }
   ```
2. Create a production `public/newtab.html` (or adapt build output) that loads your bundled JS (see “Packaging” below).
3. Go to `chrome://extensions` → enable **Developer mode** → **Load unpacked** → choose your project’s **build output** folder once you’ve built.

> ⚠️ Note: During dev (`npm run dev`), the app runs from Vite’s server, not as an extension. Packaging for extension requires a built `newtab.html` that references bundled assets.

---

## 📦 Packaging (WIP notes)

Vite expects an `index.html` as the entry. For a Chrome New Tab:

* Use a `newtab.html` template that loads your bundled JS from `dist/`.
* Copy `public/manifest.json` into `dist/` after build.
* Load `dist/` as your unpacked extension.

**Simple approach:**

1. Add a `newtab.html` in project root (or `public/`) that points to `/assets/main.js` (the Vite output).
2. Add a small postbuild script to copy `manifest.json` (and icons) into `dist/`.

Example scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build && node scripts/postbuild.cjs",
    "preview": "vite preview"
  }
}
```

*We’ll wire the postbuild script soon to make this one-command.*

---

## 🧱 Roadmap

* **Theme toggle (light/dark)** ✅ (next)
* **Mini Tasks widget (Inbox/Today)**
* **Mini Calendar (ICS first, Google later)**
* **Embed widget** (news, ESPN, etc.)
* **Export/Import board JSON**
* **Templates** (Focus / News / Family)
* **PWA or Chrome Web Store publish**
* **Cloud sync + Google Calendar (Pro)**
* **Widget/Template Marketplace**

---

## 🤝 Contributing

PRs and issues welcome!
This is an early prototype—clean code > clever code. Keep widgets small and composable.

**Propose:**

* A widget (self-contained, simple config, no heavy deps)
* A template (layout + default widgets)

---

## 🔒 Privacy

Default is **local-only**. No account required.
When cloud sync lands, it’ll be opt-in and transparent about what’s stored.

---

## 📄 License

MIT © You

---

## 🙌 Credits

Built with late-night focus, coffee, and a touch of vibe coding.
Vision by **Bryan**. Pair-built with a friendly AI.

