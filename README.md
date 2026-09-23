# BDigital Tech — The Operating System for Modern Business

An Awwwards Site-of-the-Day caliber digital showcase engineered for **BDigital Tech**. Grounded in what the company actually does: connecting the separate systems a business runs on into one synchronized digital nervous system.

---

## The Creative Concept

The entire 3D world is a **single glowing node network** (digital nervous system). The experience is driven by one continuous camera flight from the central glowing nucleus to four distinct pillar constellations, settling calmly at the footer:

1. **Business Operations Suite** (Indigo `#4F5BFF`) — ERP · HRMS · Payroll · Attendance · Accounting
2. **Customer & Revenue Tools** (Teal `#2BE8D9`) — CRM · WhatsApp CRM · E-commerce · Appointment Scheduling
3. **Industry Solutions** (Neutral & Cyan) — Healthcare · Real Estate · Restaurant · Salon & Spa · Logistics
4. **Platform & Digital Engineering** (Violet `#9B5CFF`) — SaaS Platforms · Workflow Automation · Analytics · Mobile Apps · Web Applications

---

## Design System: "Synapse"

- **Background**: `#06070D` (deep, blue-tinted near-black)
- **Surfaces**: `#0D0F1C`
- **Synapse Gradient**: `linear-gradient(135deg, #4F5BFF 0%, #9B5CFF 55%, #2BE8D9 100%)`
- **Typography**:
  - Display: **Clash Display** (600, 700) via Fontshare
  - Body: **Switzer** (400, 500) via Fontshare
- **Craft Standards**:
  - Zero generic AI tells (no tracked-out all-caps labels, no decorative 01/02 numbering, no arrows on every button).
  - Physical 3D hover-tilt cards with cursor spotlights.
  - Custom magnetic cursor with action verbs (*View*, *Connect*, *Examine*).
  - Floating WhatsApp button with 1.5s delayed entrance, gentle pulse, and slide-out hover label.

---

## Directory Structure

```
d:/Rudransh Development/Perojects/Bdigital tech/
├── index.html            # Main semantic HTML structure, typography imports
├── css/
│   ├── tokens.css        # "Synapse" palette, typography scale, 8px grid, radii
│   └── style.css         # Glassmorphism, 3D tilt, cursor verbs, animations
├── js/
│   ├── scene.js          # Three.js node network & camera journey
│   ├── scroll.js         # GSAP ScrollTrigger timelines, Lenis smooth scroll
│   └── whatsapp.js       # WhatsApp conversion logic & floating button
└── README.md             # Project documentation
```

---

## How to Run Locally

You can serve this static site using any local HTTP server:

### Option A: Using Node.js
```bash
node server/index.js
```
Open **`http://localhost:5000`** in your browser.

### Option B: Using Python
```bash
python -m http.server 8080
```
Open **`http://localhost:8080`** in your browser.

### Option C: Using npx serve
```bash
npx -y serve .
```

---

## Deployment

This is a 100% self-contained static site. Deploy directly to **Netlify**, **Vercel**, or **GitHub Pages** by dragging and dropping or pushing this repository.
