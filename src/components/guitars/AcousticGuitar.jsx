import React from 'react';

/**
 * AcousticGuitar — A detailed SVG illustration of an acoustic dreadnought guitar.
 *
 * Features:
 *  - Large lower bout, smaller upper bout, waist indentation
 *  - Round soundhole with concentric ring rosette decoration
 *  - Bridge with saddle and 6 bridge pins
 *  - Neck extending upward with fret markers
 *  - Headstock with 3+3 tuning machines
 *  - Subtle wood grain lines at low opacity
 *
 * @param {string}  [className]  CSS class for the root SVG
 * @param {object}  [style]      Inline styles for the root SVG
 * @param {string}  [accent]     Highlight / decorative colour (default #E8A020)
 */
const AcousticGuitar = ({ className, style, accent = '#E8A020' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 500"
    className={className}
    style={style}
    aria-label="Acoustic guitar illustration"
    role="img"
  >
    <defs>
      {/* Spruce top gradient — lighter centre fading to amber edges */}
      <radialGradient id="ag-top-grad" cx="50%" cy="48%" r="50%">
        <stop offset="0%" stopColor="#F5DEB3" />
        <stop offset="60%" stopColor="#E8C77B" />
        <stop offset="100%" stopColor="#C8893A" />
      </radialGradient>

      {/* Back / side wood gradient */}
      <linearGradient id="ag-side-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C8893A" />
        <stop offset="100%" stopColor="#A0622A" />
      </linearGradient>

      {/* Neck wood gradient */}
      <linearGradient id="ag-neck-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#A0622A" />
        <stop offset="50%" stopColor="#B87333" />
        <stop offset="100%" stopColor="#A0622A" />
      </linearGradient>

      {/* Headstock gradient */}
      <linearGradient id="ag-head-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5C3317" />
        <stop offset="50%" stopColor="#6B3A20" />
        <stop offset="100%" stopColor="#5C3317" />
      </linearGradient>

      {/* Soundhole shadow */}
      <radialGradient id="ag-hole-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1A0A00" />
        <stop offset="100%" stopColor="#3B1A00" />
      </radialGradient>

      {/* Wood grain pattern */}
      <pattern id="ag-grain" width="200" height="12" patternUnits="userSpaceOnUse">
        <path d="M0 3 Q50 1 100 4 T200 3" fill="none" stroke="#A0622A" strokeWidth="0.5" opacity="0.12" />
        <path d="M0 8 Q60 6 120 9 T200 7" fill="none" stroke="#8B5E3C" strokeWidth="0.4" opacity="0.10" />
      </pattern>
    </defs>

    {/* ───────── Body ───────── */}
    {/* Main body outline — dreadnought shape */}
    <path
      d="
        M100 160
        C 60 160, 38 190, 36 220
        C 34 250, 30 275, 28 310
        C 26 350, 35 390, 55 415
        C 75 440, 100 450, 100 450
        C 100 450, 125 440, 145 415
        C 165 390, 174 350, 172 310
        C 170 275, 166 250, 164 220
        C 162 190, 140 160, 100 160
        Z
      "
      fill="url(#ag-side-grad)"
      stroke="#7A4A1E"
      strokeWidth="1.5"
    />

    {/* Spruce top face (slightly inset) */}
    <path
      d="
        M100 164
        C 63 164, 42 192, 40 222
        C 38 252, 34 276, 32 312
        C 30 350, 39 388, 57 412
        C 76 436, 100 446, 100 446
        C 100 446, 124 436, 143 412
        C 161 388, 170 350, 168 312
        C 166 276, 162 252, 160 222
        C 158 192, 137 164, 100 164
        Z
      "
      fill="url(#ag-top-grad)"
    />

    {/* Wood grain overlay on body */}
    <path
      d="
        M100 164
        C 63 164, 42 192, 40 222
        C 38 252, 34 276, 32 312
        C 30 350, 39 388, 57 412
        C 76 436, 100 446, 100 446
        C 100 446, 124 436, 143 412
        C 161 388, 170 350, 168 312
        C 166 276, 162 252, 160 222
        C 158 192, 137 164, 100 164
        Z
      "
      fill="url(#ag-grain)"
    />

    {/* Subtle body binding (edge highlight) */}
    <path
      d="
        M100 160
        C 60 160, 38 190, 36 220
        C 34 250, 30 275, 28 310
        C 26 350, 35 390, 55 415
        C 75 440, 100 450, 100 450
        C 100 450, 125 440, 145 415
        C 165 390, 174 350, 172 310
        C 170 275, 166 250, 164 220
        C 162 190, 140 160, 100 160
        Z
      "
      fill="none"
      stroke="#F5DEB3"
      strokeWidth="1"
      opacity="0.35"
    />

    {/* ───────── Soundhole + Rosette ───────── */}
    {/* Outer rosette ring */}
    <circle cx="100" cy="260" r="32" fill="none" stroke={accent} strokeWidth="3" opacity="0.7" />
    <circle cx="100" cy="260" r="29" fill="none" stroke="#5C3317" strokeWidth="1" opacity="0.5" />
    <circle cx="100" cy="260" r="35" fill="none" stroke="#5C3317" strokeWidth="1" opacity="0.4" />

    {/* Inner decorative rings */}
    <circle cx="100" cy="260" r="27" fill="none" stroke={accent} strokeWidth="1" opacity="0.45" />
    <circle cx="100" cy="260" r="25.5" fill="none" stroke="#5C3317" strokeWidth="0.6" opacity="0.35" />

    {/* Soundhole */}
    <circle cx="100" cy="260" r="24" fill="url(#ag-hole-grad)" />

    {/* ───────── Bridge ───────── */}
    <rect x="72" y="360" width="56" height="14" rx="3" fill="#3B1A00" />

    {/* Saddle (white strip) */}
    <rect x="76" y="362" width="48" height="3" rx="1" fill="#FFFFF0" opacity="0.9" />

    {/* Bridge pins — 6 evenly spaced */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <circle
        key={`pin-${i}`}
        cx={81 + i * 7.6}
        cy="371"
        r="2"
        fill="#FFFFF0"
        stroke="#3B1A00"
        strokeWidth="0.5"
      />
    ))}

    {/* ───────── Strings on body ───────── */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line
        key={`str-${i}`}
        x1={81 + i * 7.6}
        y1="371"
        x2={91 + i * 3.6}
        y2="160"
        stroke="#D4C5A0"
        strokeWidth={0.6 - i * 0.05}
        opacity="0.55"
      />
    ))}

    {/* ───────── Pickguard ───────── */}
    <path
      d="
        M65 265
        C 55 280, 55 310, 60 330
        C 64 345, 75 355, 88 355
        C 92 355, 95 350, 95 340
        C 95 320, 70 300, 65 265
        Z
      "
      fill="#3B1A00"
      opacity="0.35"
    />

    {/* ───────── Neck ───────── */}
    <rect x="88" y="50" width="24" height="115" rx="2" fill="url(#ag-neck-grad)" />

    {/* Fretboard overlay */}
    <rect x="90" y="50" width="20" height="115" rx="1" fill="#2C1810" />

    {/* Fret wires */}
    {[65, 82, 97, 110, 122, 133, 143, 152].map((y, i) => (
      <line
        key={`fret-${i}`}
        x1="90"
        y1={y}
        x2="110"
        y2={y}
        stroke="#C0C0C0"
        strokeWidth="1"
        opacity="0.7"
      />
    ))}

    {/* Fret markers (dots) */}
    <circle cx="100" cy="89.5" r="1.8" fill="#FFFFF0" opacity="0.6" />
    <circle cx="100" cy="116" r="1.8" fill="#FFFFF0" opacity="0.6" />
    <circle cx="100" cy="138" r="1.8" fill="#FFFFF0" opacity="0.6" />

    {/* Nut */}
    <rect x="89" y="49" width="22" height="3" rx="1" fill="#FFFFF0" opacity="0.85" />

    {/* Strings on neck */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line
        key={`nstr-${i}`}
        x1={91 + i * 3.6}
        y1="50"
        x2={91 + i * 3.6}
        y2="165"
        stroke="#D4C5A0"
        strokeWidth={0.6 - i * 0.05}
        opacity="0.55"
      />
    ))}

    {/* ───────── Headstock ───────── */}
    <path
      d="
        M88 50
        L86 46
        L84 20
        C 83 10, 88 4, 100 2
        C 112 4, 117 10, 116 20
        L114 46
        L112 50
        Z
      "
      fill="url(#ag-head-grad)"
      stroke="#3B1A00"
      strokeWidth="0.8"
    />

    {/* Headstock logo area */}
    <ellipse cx="100" cy="22" rx="10" ry="5" fill={accent} opacity="0.15" />

    {/* Tuning machines — left side (bass strings) */}
    {[16, 28, 40].map((y, i) => (
      <React.Fragment key={`tl-${i}`}>
        {/* Post */}
        <circle cx={90 + i * 2} cy={y} r="2" fill="#C0C0C0" stroke="#888" strokeWidth="0.5" />
        {/* Gear / button */}
        <rect x={76 + i * 2} y={y - 2} width="10" height="4" rx="1.5" fill="#C0C0C0" stroke="#999" strokeWidth="0.4" />
      </React.Fragment>
    ))}

    {/* Tuning machines — right side (treble strings) */}
    {[16, 28, 40].map((y, i) => (
      <React.Fragment key={`tr-${i}`}>
        <circle cx={110 - i * 2} cy={y} r="2" fill="#C0C0C0" stroke="#888" strokeWidth="0.5" />
        <rect x={114 - i * 2} y={y - 2} width="10" height="4" rx="1.5" fill="#C0C0C0" stroke="#999" strokeWidth="0.4" />
      </React.Fragment>
    ))}

    {/* Strings from nut to headstock tuners */}
    {[0, 1, 2].map((i) => (
      <line
        key={`hsl-${i}`}
        x1={91 + i * 3.6}
        y1="50"
        x2={90 + i * 2}
        y2={16 + i * 12}
        stroke="#D4C5A0"
        strokeWidth={0.6 - i * 0.05}
        opacity="0.4"
      />
    ))}
    {[0, 1, 2].map((i) => (
      <line
        key={`hsr-${i}`}
        x1={101.8 + i * 3.6}
        y1="50"
        x2={110 - i * 2}
        y2={16 + i * 12}
        stroke="#D4C5A0"
        strokeWidth={0.45 - i * 0.05}
        opacity="0.4"
      />
    ))}

    {/* ───────── Subtle grain lines (extra detail) ───────── */}
    <path d="M50 220 Q100 215 150 225" fill="none" stroke="#A0622A" strokeWidth="0.4" opacity="0.08" />
    <path d="M45 280 Q100 274 155 284" fill="none" stroke="#A0622A" strokeWidth="0.4" opacity="0.08" />
    <path d="M40 340 Q100 335 160 342" fill="none" stroke="#A0622A" strokeWidth="0.4" opacity="0.08" />
    <path d="M45 390 Q100 385 155 393" fill="none" stroke="#A0622A" strokeWidth="0.4" opacity="0.07" />
    <path d="M55 410 Q100 406 145 413" fill="none" stroke="#A0622A" strokeWidth="0.4" opacity="0.06" />
  </svg>
);

export default AcousticGuitar;
