# 🎸 GuitarLearn

A complete, free, browser-based guitar learning platform. GuitarLearn is designed as the spiritual successor to GarageBand's guitar interface, built entirely for *learning*: scales, finger exercises, and musical theory, all powered by real recorded guitar audio. No paywalls. Instant learning for anyone in the world.

## ✨ Features

- **Three Guitar Types**: Choose between Acoustic, Classical, and Electric guitars, each with a distinct visual identity, fretboard texture, and real multi-sampled audio.
- **Interactive SVG Fretboard**: A realistic, fully programmatic 24-fret fretboard with note highlighting synchronized with audio playback.
- **Scales Library**: Over 15 different scales (Major, Minor, Pentatonic, Modes, etc.) playable across all 12 root notes.
- **Finger Exercises**: 12+ technical exercises (Chromatic Crawl, Spider Walk, String Skipping) to build dexterity and speed, with adjustable tempo (40–180 BPM).
- **Audio Engine**: Powered by Tone.js with real recorded samples.
- **Extra Tools**: Left-handed mode, note label toggles, a metronome, and "Did you know?" facts for music theory context.

## 🛠 Tech Stack

- **Framework**: React 18 (Vite)
- **Audio Engine**: Tone.js (with real guitar samples)
- **Music Theory**: Tonal.js
- **Styling**: Tailwind CSS / Custom CSS with dynamic theming

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Duddu-harsha/GuitarLearn.git
   cd GuitarLearn/guitarlearn
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is open-source and free to use. The audio samples are provided by the [nbrosowsky/tonejs-instruments](https://github.com/nbrosowsky/tonejs-instruments) collection.
