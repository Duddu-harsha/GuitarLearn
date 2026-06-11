import React from 'react';

/**
 * ClassicalGuitar — A detailed SVG illustration of a classical / Spanish guitar.
 *
 * Features:
 *  - Elegant narrow waist, rounded bouts
 *  - Ornate multi-ring rosette around the soundhole
 *  - Classical-style tie bridge (no pins)
 *  - Slotted headstock
 *  - Cedar / spruce top colouring
 *
 * @param {string}  [className]  CSS class for the root SVG
 * @param {object}  [style]      Inline styles for the root SVG
 * @param {string}  [accent]     Rosette / decorative colour (default #C4622D)
 */
const ClassicalGuitar = ({ className, style, accent = '#C4622D' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 500"
    className={className}
    style={style}
    aria-label="Classical guitar illustration"
    role="img"
  >
    <defs>
      {/* Spruce / cedar top gradient */}
      <radialGradient id="cg-top-grad" cx="50%" cy="46%" r="52%">
        <stop offset="0%" stopColor="#F2D8A8" />
        <stop offset="55%" stopColor="#DEBA7A" />
        <stop offset="100%" stopColor="#C8A05A" />
      </radialGradient>

      {/* Back / side mahogany gradient */}
      <linearGradient id="cg-side-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8B5E3C" />
        <stop offset="100%" stopColor="#5C3317" />
      </linearGradient>

      {/* Neck gradient */}
      <linearGradient id="cg-neck-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#6B3A20" />
        <stop offset="50%" stopColor="#7D4E2A" />
        <stop offset="100%" stopColor="#6B3A20" />
      </linearGradient>

      {/* Headstock gradient */}
      <linearGradient id="cg-head-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3E1F0D" />
        <stop offset="50%" stopColor="#4D2A14" />
        <stop offset="100%" stopColor="#3E1F0D" />
      </linearGradient>

      {/* Soundhole depth */}
      <radialGradient id="cg-hole-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0E0500" />
        <stop offset="100%" stopColor="#2A1200" />
      </radialGradient>

      {/* Wood grain pattern */}
      <pattern id="cg-grain" width="200" height="14" patternUnits="userSpaceOnUse">
        <path d="M0 4 Q55 2 110 5 T200 3" fill="none" stroke="#8B5E3C" strokeWidth="0.45" opacity="0.10" />
        <path d="M0 10 Q45 8 100 11 T200 9" fill="none" stroke="#6B3A20" strokeWidth="0.35" opacity="0.08" />
      </pattern>
    </defs>

    {/* ───────── Body ───────── */}
    {/* Classical body — narrower waist than dreadnought, rounder bouts */}
    <path
      d="
        M100 158
        C 65 158, 44 185, 42 210
        C 40 235, 42 250, 44 262
        C 46 272, 55 272, 55 272
        C 45 280, 34 295, 30 320
        C 26 355, 36 395, 56 418
        C 76 442, 100 452, 100 452
        C 100 452, 124 442, 144 418
        C 164 395, 174 355, 170 320
        C 166 295, 155 280, 145 272
        C 145 272, 154 272, 156 262
        C 158 250, 160 235, 158 210
        C 156 185, 135 158, 100 158
        Z
      "
      fill="url(#cg-side-grad)"
      stroke="#4A2810"
      strokeWidth="1.5"
    />

    {/* Spruce top face */}
    <path
      d="
        M100 162
        C 68 162, 48 188, 46 212
        C 44 236, 46 251, 48 262
        C 49 270, 56 270, 56 270
        C 48 278, 38 296, 34 322
        C 30 356, 40 392, 58 414
        C 77 438, 100 448, 100 448
        C 100 448, 123 438, 142 414
        C 160 392, 170 356, 166 322
        C 162 296, 152 278, 144 270
        C 144 270, 151 270, 152 262
        C 154 251, 156 236, 154 212
        C 152 188, 132 162, 100 162
        Z
      "
      fill="url(#cg-top-grad)"
    />

    {/* Wood grain overlay */}
    <path
      d="
        M100 162
        C 68 162, 48 188, 46 212
        C 44 236, 46 251, 48 262
        C 49 270, 56 270, 56 270
        C 48 278, 38 296, 34 322
        C 30 356, 40 392, 58 414
        C 77 438, 100 448, 100 448
        C 100 448, 123 438, 142 414
        C 160 392, 170 356, 166 322
        C 162 296, 152 278, 144 270
        C 144 270, 151 270, 152 262
        C 154 251, 156 236, 154 212
        C 152 188, 132 162, 100 162
        Z
      "
      fill="url(#cg-grain)"
    />

    {/* Body binding highlight */}
    <path
      d="
        M100 158
        C 65 158, 44 185, 42 210
        C 40 235, 42 250, 44 262
        C 46 272, 55 272, 55 272
        C 45 280, 34 295, 30 320
        C 26 355, 36 395, 56 418
        C 76 442, 100 452, 100 452
        C 100 452, 124 442, 144 418
        C 164 395, 174 355, 170 320
        C 166 295, 155 280, 145 272
        C 145 272, 154 272, 156 262
        C 158 250, 160 235, 158 210
        C 156 185, 135 158, 100 158
        Z
      "
      fill="none"
      stroke="#F5DEB3"
      strokeWidth="0.8"
      opacity="0.30"
    />

    {/* ───────── Rosette ───────── */}
    {/* Multi-ring decorative rosette — concentric circles in accent color */}
    <circle cx="100" cy="255" r="36" fill="none" stroke={accent} strokeWidth="2.5" opacity="0.55" />
    <circle cx="100" cy="255" r="33.5" fill="none" stroke="#3E1F0D" strokeWidth="0.8" opacity="0.4" />
    <circle cx="100" cy="255" r="32" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.7" />
    <circle cx="100" cy="255" r="30" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
    <circle cx="100" cy="255" r="28.5" fill="none" stroke="#3E1F0D" strokeWidth="0.6" opacity="0.35" />
    <circle cx="100" cy="255" r="27" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.6" />

    {/* Tiny decorative dots around rosette */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      return (
        <circle
          key={`dot-${i}`}
          cx={100 + Math.cos(angle) * 34.5}
          cy={255 + Math.sin(angle) * 34.5}
          r="0.8"
          fill={accent}
          opacity="0.5"
        />
      );
    })}

    {/* Soundhole */}
    <circle cx="100" cy="255" r="25" fill="url(#cg-hole-grad)" />

    {/* ───────── Bridge (classical tie bridge) ───────── */}
    <rect x="70" y="365" width="60" height="12" rx="4" fill="#2A1200" />

    {/* Saddle */}
    <rect x="74" y="366.5" width="52" height="2.8" rx="1" fill="#FFFFF0" opacity="0.85" />

    {/* String tie holes */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <circle
        key={`tie-${i}`}
        cx={80 + i * 8}
        cy="373"
        r="1.2"
        fill="#0E0500"
      />
    ))}

    {/* ───────── Strings on body ───────── */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line
        key={`str-${i}`}
        x1={80 + i * 8}
        y1="373"
        x2={91 + i * 3.6}
        y2="158"
        stroke={i < 3 ? '#D4C5A0' : '#E8DCC0'}
        strokeWidth={i < 3 ? 0.7 - i * 0.05 : 0.45}
        opacity="0.50"
      />
    ))}

    {/* ───────── Neck ───────── */}
    <rect x="87" y="48" width="26" height="115" rx="2" fill="url(#cg-neck-grad)" />

    {/* Fretboard — slightly wider for classical */}
    <rect x="89" y="48" width="22" height="115" rx="1" fill="#1E0F08" />

    {/* Fret wires */}
    {[64, 80, 95, 108, 120, 131, 141, 150].map((y, i) => (
      <line
        key={`fret-${i}`}
        x1="89"
        y1={y}
        x2="111"
        y2={y}
        stroke="#B0A080"
        strokeWidth="0.9"
        opacity="0.6"
      />
    ))}

    {/* Fret markers — classical often has none, but we add subtle side dots */}
    <circle cx="112.5" cy="87.5" r="1.2" fill="#FFFFF0" opacity="0.3" />
    <circle cx="112.5" cy="114" r="1.2" fill="#FFFFF0" opacity="0.3" />
    <circle cx="112.5" cy="136" r="1.2" fill="#FFFFF0" opacity="0.3" />

    {/* Nut */}
    <rect x="88" y="47" width="24" height="3" rx="1" fill="#FFFFF0" opacity="0.8" />

    {/* Strings on neck — nylon strings are thicker & more transparent */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line
        key={`nstr-${i}`}
        x1={91 + i * 3.6}
        y1="48"
        x2={91 + i * 3.6}
        y2="162"
        stroke={i < 3 ? '#D4C5A0' : '#F0E8D8'}
        strokeWidth={i < 3 ? 0.7 - i * 0.05 : 0.45}
        opacity="0.45"
      />
    ))}

    {/* ───────── Slotted Headstock ───────── */}
    <path
      d="
        M87 48
        L85 44
        L83 18
        C 82 8, 87 2, 100 0
        C 113 2, 118 8, 117 18
        L115 44
        L113 48
        Z
      "
      fill="url(#cg-head-grad)"
      stroke="#2A1200"
      strokeWidth="0.8"
    />

    {/* Headstock slots (2 open slots for tuning pegs) */}
    <rect x="88" y="10" width="10" height="16" rx="2" fill="#0E0500" opacity="0.8" />
    <rect x="102" y="10" width="10" height="16" rx="2" fill="#0E0500" opacity="0.8" />

    {/* Slot divider / centre piece */}
    <rect x="98" y="8" width="4" height="20" rx="1" fill="#4D2A14" />

    {/* Tuning rollers in left slot */}
    {[14, 20, 26].map((y, i) => (
      <React.Fragment key={`rl-${i}`}>
        <line x1="88" y1={y} x2="98" y2={y} stroke="#C0C0C0" strokeWidth="1.5" opacity="0.7" />
        {/* Tuning buttons — left side */}
        <rect x="78" y={y - 2.5} width="10" height="5" rx="2" fill="#C0C0C0" stroke="#999" strokeWidth="0.4" />
      </React.Fragment>
    ))}

    {/* Tuning rollers in right slot */}
    {[14, 20, 26].map((y, i) => (
      <React.Fragment key={`rr-${i}`}>
        <line x1="102" y1={y} x2="112" y2={y} stroke="#C0C0C0" strokeWidth="1.5" opacity="0.7" />
        {/* Tuning buttons — right side */}
        <rect x="112" y={y - 2.5} width="10" height="5" rx="2" fill="#C0C0C0" stroke="#999" strokeWidth="0.4" />
      </React.Fragment>
    ))}

    {/* Strings from nut up to tuning rollers */}
    {[0, 1, 2].map((i) => (
      <line
        key={`hsl-${i}`}
        x1={91 + i * 3.6}
        y1="48"
        x2={93}
        y2={14 + i * 6}
        stroke="#D4C5A0"
        strokeWidth={0.55 - i * 0.05}
        opacity="0.35"
      />
    ))}
    {[0, 1, 2].map((i) => (
      <line
        key={`hsr-${i}`}
        x1={101.8 + i * 3.6}
        y1="48"
        x2={107}
        y2={14 + i * 6}
        stroke="#E8DCC0"
        strokeWidth="0.4"
        opacity="0.35"
      />
    ))}

    {/* ───────── Extra grain lines ───────── */}
    <path d="M52 210 Q100 206 148 214" fill="none" stroke="#8B5E3C" strokeWidth="0.4" opacity="0.07" />
    <path d="M42 310 Q100 305 158 314" fill="none" stroke="#8B5E3C" strokeWidth="0.4" opacity="0.07" />
    <path d="M40 360 Q100 355 160 363" fill="none" stroke="#8B5E3C" strokeWidth="0.4" opacity="0.06" />
    <path d="M48 400 Q100 396 152 403" fill="none" stroke="#8B5E3C" strokeWidth="0.4" opacity="0.06" />
  </svg>
);

export default ClassicalGuitar;
