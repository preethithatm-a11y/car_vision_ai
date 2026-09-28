# CarVision AI – AI-Powered Car Vision & Safety Assistant

> **"See Your Car. Understand Your Car. Drive Safer."**

CarVision AI is a modern, responsive web application designed to empower everyday drivers with instant exterior bodywork analysis, damage classification, and practical preventative road safety insights using advanced computer vision heuristics.

---

## 🌟 Key Features

1. **AI Car Detection & Recognition**
   - Classifies vehicle body style (Sedan, SUV, Hatchback, Coupe, Truck) and color profile.
   - Computes make/model estimation and visual confidence scores.

2. **Damage Detection Breakdown**
   - Identifies scratches, dents, bumper misalignments, broken/hazed lights, windshield chips, and other issues.
   - Assigns severity status ratings: **Good**, **Attention**, or **Critical**.

3. **Interactive HUD Hotspot Overlay**
   - Visual inspection pins directly on top of the car image with click-to-inspect tooltips and bounding boxes.

4. **Multi-Source Image Input**
   - High-resolution drag & drop / file picker (JPG, JPEG, PNG, WEBP).
   - Live Webcam & Mobile Camera capture modal with alignment guides, flip camera, and countdown shutter timer.
   - Built-in Preset Demo Vehicles for instant 1-click test scenarios.

5. **AI Safety Recommendations & 60-Second Walkaround Checklist**
   - Translates cosmetic exterior defects into actionable preventative maintenance alerts.
   - Comprehensive safety archives across 8 categories: Before Driving, Tires, Brakes, Lights, Mirrors, Windshield, Seat Belts, and Emergency Kits.

6. **Local-First Privacy & Scan History**
   - Saves vehicle scan records in browser `localStorage`.
   - Search, filter by severity, view detailed reports, and export data in JSON.

7. **Synthesized Web Audio Feedback**
   - High-tech laser radar scan tones and confirmation chimes synthesized with the native Web Audio API (zero external audio file dependencies).

---

## 🚀 Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm or yarn / pnpm

### Installation Steps

1. Clone or navigate to the project directory:
   ```bash
   cd car_vision_ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000`.

---

## 📦 Building for Production

To compile the TypeScript code and generate an optimized production bundle:

```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## ☁️ Deploying to Vercel

CarVision AI is pre-configured for instant deployment on [Vercel](https://vercel.com/):

### Option 1: Vercel CLI (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Vercel Dashboard (Git Integration)
1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **"New Project"**.
3. Import your `car_vision_ai` repository.
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

*(Optional)* You can set an environment variable `VITE_GEMINI_API_KEY` in Vercel settings if you wish to use your own Google AI Studio key for live Google Gemini 1.5 Flash Vision calls.

---

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS with custom futuristic dark glassmorphism design system
- **Icons**: Lucide React
- **Sound Engine**: Web Audio API (Synthesized oscillators)
- **Persistence**: Browser LocalStorage API

---

## 📄 License & Disclaimer

**CarVision AI provides visual estimates for informational purposes only. It does not replace a certified mechanic, professional vehicle inspection, or emergency service.**

© 2026 CarVision AI. All rights reserved.
