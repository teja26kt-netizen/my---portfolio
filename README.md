# Alex Mercer — Premium Developer Portfolio

A futuristic, fully animated developer portfolio built with vanilla HTML, CSS, and JavaScript + Three.js.  
No build step. No frameworks. Just open `index.html` in a browser.

---

## 📁 Folder Structure

```
portfolio/
├── index.html              ← Main entry point
├── css/
│   └── style.css           ← All styles (variables, layout, components, responsive)
├── js/
│   ├── cursor.js           ← Custom dual-layer animated cursor
│   ├── nav.js              ← Mobile menu + active section highlight
│   ├── hero-bg.js          ← Canvas 2D tech background (hex grid, circuit traces,
│   │                          matrix rain, scanline sweep, ambient orbs)
│   ├── three-scene.js      ← Three.js 3D scene (DNA helix, orbiting icosahedra,
│   │                          floating octahedra, glowing ring halos)
│   ├── particles.js        ← Floating particle network overlay
│   ├── animations.js       ← Scroll reveal, skill bars, card tilt, project filter,
│   │                          smooth scroll
│   └── form.js             ← Contact form validation & submission handler
└── assets/
    ├── avatar.jpg          ← (Add your photo here)
    └── alex-mercer-resume.pdf  ← (Add your PDF resume here)
```

---

## 🚀 Getting Started

### Option A — Open directly
Just double-click `index.html`. Everything works without a server except for the resume download link (browser security blocks local file downloads).

### Option B — Local server (recommended)
```bash
# Python
python3 -m http.server 3000

# Node
npx serve .

# VS Code
Install "Live Server" extension → right-click index.html → Open with Live Server
```

Then visit `http://localhost:3000`

---

## ✏️ Personalisation Checklist

### 1. Your name & role
In `index.html` find and replace:
- `Alex Mercer` → your name
- `alex@mercer.dev` → your email
- `@alexmercer` → your GitHub handle
- `@alexm_dev` → your Twitter/X handle

### 2. Your photo
Replace the emoji avatar block:
```html
<!-- BEFORE -->
<div class="avatar-placeholder">🧑‍💻</div>

<!-- AFTER -->
<img src="assets/avatar.jpg" alt="Your Name" style="width:100%;height:100%;object-fit:cover;">
```

### 3. Resume download
1. Drop your PDF into `assets/`
2. Update the href in the Resume section:
```html
<a href="assets/YOUR-RESUME.pdf" download class="dl-resume-btn ...">
```

### 4. Projects
Each project card is a `<div class="project-card" data-cat="fullstack|frontend|ai|backend">`.  
Update the name, description, tags, and `href` links to GitHub/live URLs.

### 5. Social links
Update the `href` attributes in the Contact section and in the Resume sidebar.

### 6. Colour theme
All colours live in CSS custom properties at the top of `css/style.css`:
```css
:root {
  --c-cyan:   #00e5ff;   /* primary accent */
  --c-purple: #7c5cfc;   /* secondary accent */
  --c-violet: #a78bfa;   /* muted purple */
  --c-pink:   #f472b6;   /* highlight */
}
```

---

## 🌐 Deployment

### Vercel (recommended — free)
```bash
npm i -g vercel
vercel
```

### Netlify
Drag the entire `portfolio/` folder onto [netlify.com/drop](https://app.netlify.com/drop)

### GitHub Pages
Push to a repo → Settings → Pages → Source: main branch → root folder

---

## 🛠 Tech Used

| Layer | Technology |
|---|---|
| 3D Hero | Three.js r128 (CDN) |
| 2D Background | Canvas 2D API |
| Animations | CSS transitions + IntersectionObserver |
| Typography | Syne · Instrument Sans · DM Mono (Google Fonts) |
| Hosting | Any static host |

---

## 📝 Connecting the Contact Form

The form currently shows a success message after 1.5 s (simulated).  
To send real emails, replace the `setTimeout` in `js/form.js` with one of:

- **[EmailJS](https://emailjs.com)** — free tier, no backend needed
- **[Formspree](https://formspree.io)** — point the form action at your endpoint
- **Custom API** — `fetch('/api/contact', { method:'POST', body: formData })`

---

Made with ♥ and too much Three.js.
