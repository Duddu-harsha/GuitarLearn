// =============================================================================
// guitarTypes.js — Guitar type definitions with themes and sampler configs
// =============================================================================

export const GUITAR_TYPES = {
  acoustic: {
    id: 'acoustic',
    name: 'acoustic',
    label: 'Acoustic Guitar',

    // ── Color Theme ──────────────────────────────────────────────────────
    accent: '#E8A020',
    accentGlow: 'rgba(232, 160, 32, 0.35)',
    fretboardBg: '#2C1810',
    neckGrain: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 40%, rgba(0,0,0,0.05) 100%)',

    // ── Tone.js Sampler Configuration ────────────────────────────────────
    samplerConfig: {
      urls: {
        A2: 'A2.mp3',
        A3: 'A3.mp3',
        A4: 'A4.mp3',
        C3: 'C3.mp3',
        C4: 'C4.mp3',
        C5: 'C5.mp3',
        E2: 'E2.mp3',
        E3: 'E3.mp3',
        E4: 'E4.mp3',
        G2: 'G2.mp3',
        G3: 'G3.mp3',
        G4: 'G4.mp3',
      },
      release: 1.2,
      baseUrl:
        'https://nbrosowsky.github.io/tonejs-instruments/samples/guitar-acoustic/',
    },

    // ── SVG Body Colors ──────────────────────────────────────────────────
    bodyColors: {
      top: '#D4A056',
      sides: '#8B5E34',
      soundhole: '#1A0F08',
      rosette: '#C49A3C',
      bridge: '#2C1810',
      pickguard: '#1C1208',
      binding: '#FFFFF0',
    },
  },

  classical: {
    id: 'classical',
    name: 'classical',
    label: 'Classical Guitar',

    // ── Color Theme ──────────────────────────────────────────────────────
    accent: '#C4622D',
    accentGlow: 'rgba(196, 98, 45, 0.35)',
    fretboardBg: '#1A0F08',
    neckGrain: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 50%, rgba(0,0,0,0.06) 100%)',

    // ── Tone.js Sampler Configuration ────────────────────────────────────
    samplerConfig: {
      urls: {
        A2: 'A2.mp3',
        A3: 'A3.mp3',
        A4: 'A4.mp3',
        C3: 'C3.mp3',
        C4: 'C4.mp3',
        C5: 'C5.mp3',
        E2: 'E2.mp3',
        E3: 'E3.mp3',
        E4: 'E4.mp3',
        G2: 'G2.mp3',
        G3: 'G3.mp3',
        G4: 'G4.mp3',
      },
      release: 1.5,
      baseUrl:
        'https://nbrosowsky.github.io/tonejs-instruments/samples/guitar-nylon/',
    },

    // ── SVG Body Colors ──────────────────────────────────────────────────
    bodyColors: {
      top: '#E8C88A',
      sides: '#6B3A20',
      soundhole: '#0E0804',
      rosette: '#C4622D',
      bridge: '#1A0F08',
      pickguard: null, // classical guitars typically have no pickguard
      binding: '#F5E6C8',
    },
  },

  electric: {
    id: 'electric',
    name: 'electric',
    label: 'Electric Guitar',

    // ── Color Theme ──────────────────────────────────────────────────────
    accent: '#4A9EFF',
    accentGlow: 'rgba(74, 158, 255, 0.35)',
    fretboardBg: '#D4B896', // maple fretboard
    neckGrain: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 35%, rgba(0,0,0,0.03) 100%)',

    // ── Tone.js Sampler Configuration ────────────────────────────────────
    samplerConfig: {
      urls: {
        A2: 'A2.mp3',
        A3: 'A3.mp3',
        A4: 'A4.mp3',
        C3: 'C3.mp3',
        C4: 'C4.mp3',
        C5: 'C5.mp3',
        E2: 'E2.mp3',
        E3: 'E3.mp3',
        E4: 'E4.mp3',
        G2: 'G2.mp3',
        G3: 'G3.mp3',
        G4: 'G4.mp3',
      },
      release: 0.8,
      baseUrl:
        'https://nbrosowsky.github.io/tonejs-instruments/samples/guitar-electric/',
    },

    // ── SVG Body Colors ──────────────────────────────────────────────────
    bodyColors: {
      top: '#1E1E2E',
      sides: '#141420',
      pickupNeck: '#C0C0C0',
      pickupBridge: '#C0C0C0',
      pickguard: '#F0F0F0',
      bridge: '#A0A0A0',
      knobs: '#2A2A2A',
      binding: '#4A9EFF',
    },
  },
};

export default GUITAR_TYPES;
