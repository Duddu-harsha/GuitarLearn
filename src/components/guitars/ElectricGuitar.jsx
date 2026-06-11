import React from 'react';

/**
 * ElectricGuitar — A detailed SVG illustration of a Stratocaster-style electric guitar.
 *
 * Features:
 *  - Offset double-cutaway body shape
 *  - Three single-coil pickups with pole-piece dots
 *  - Volume knob + two tone knobs
 *  - 5-way pickup selector switch
 *  - Contoured body edge highlight
 *  - Jack output at edge
 *  - Tremolo bridge with saddle lines
 *
 * @param {string}  [className]  CSS class for the root SVG
 * @param {object}  [style]      Inline styles for the root SVG
 * @param {string}  [accent]     LED / glow highlight colour (default #4A9EFF)
 */
const ElectricGuitar = ({ className, style, accent = '#4A9EFF' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 500"
    className={className}
    style={style}
    aria-label="Electric guitar illustration"
    role="img"
  >
    <defs>
      {/* Body gradient — deep charcoal / midnight blue */}
      <radialGradient id="eg-body-grad" cx="45%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#2A3555" />
        <stop offset="50%" stopColor="#1A2035" />
        <stop offset="100%" stopColor="#0D1321" />
      </radialGradient>

      {/* Body contour highlight — subtle edge glow */}
      <radialGradient id="eg-contour" cx="35%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#3A4A70" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#0D1321" stopOpacity="0" />
      </radialGradient>

      {/* Chrome / metallic gradient for hardware */}
      <linearGradient id="eg-chrome" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E8E8E8" />
        <stop offset="40%" stopColor="#C0C0C0" />
        <stop offset="100%" stopColor="#909090" />
      </linearGradient>

      {/* Neck gradient */}
      <linearGradient id="eg-neck-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#B07840" />
        <stop offset="50%" stopColor="#C8893A" />
        <stop offset="100%" stopColor="#B07840" />
      </linearGradient>

      {/* Headstock gradient */}
      <linearGradient id="eg-head-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1A2035" />
        <stop offset="50%" stopColor="#243050" />
        <stop offset="100%" stopColor="#1A2035" />
      </linearGradient>

      {/* Pickup glow filter */}
      <filter id="eg-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Knob gradient */}
      <radialGradient id="eg-knob-grad" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#F0F0F0" />
        <stop offset="50%" stopColor="#C0C0C0" />
        <stop offset="100%" stopColor="#808080" />
      </radialGradient>
    </defs>

    {/* ───────── Body — Strat-style double cutaway ───────── */}
    <path
      d="
        M100 170
        C 88 170, 72 172, 60 180
        C 48 188, 38 198, 35 215
        C 32 235, 30 252, 30 268
        C 30 276, 34 282, 38 288
        C 44 296, 56 298, 60 298
        C 56 304, 45 315, 35 332
        C 25 350, 22 375, 26 400
        C 30 425, 42 440, 60 450
        C 78 460, 100 462, 120 458
        C 140 454, 155 445, 165 430
        C 175 415, 178 395, 176 375
        C 174 355, 170 340, 168 328
        C 167 322, 170 316, 172 310
        C 176 298, 178 288, 176 278
        C 174 268, 168 258, 160 248
        C 155 242, 150 238, 148 230
        C 146 222, 144 210, 140 200
        C 136 188, 120 175, 100 170
        Z
      "
      fill="url(#eg-body-grad)"
      stroke="#0A0E18"
      strokeWidth="1.5"
    />

    {/* Body contour highlight */}
    <path
      d="
        M100 170
        C 88 170, 72 172, 60 180
        C 48 188, 38 198, 35 215
        C 32 235, 30 252, 30 268
        C 30 276, 34 282, 38 288
        C 44 296, 56 298, 60 298
        C 56 304, 45 315, 35 332
        C 25 350, 22 375, 26 400
        C 30 425, 42 440, 60 450
        C 78 460, 100 462, 120 458
        C 140 454, 155 445, 165 430
        C 175 415, 178 395, 176 375
        C 174 355, 170 340, 168 328
        C 167 322, 170 316, 172 310
        C 176 298, 178 288, 176 278
        C 174 268, 168 258, 160 248
        C 155 242, 150 238, 148 230
        C 146 222, 144 210, 140 200
        C 136 188, 120 175, 100 170
        Z
      "
      fill="url(#eg-contour)"
    />

    {/* Inner body edge bevel */}
    <path
      d="
        M100 175
        C 90 175, 76 177, 64 184
        C 54 191, 44 200, 40 216
        C 37 232, 35 250, 35 266
        C 35 274, 38 278, 42 284
        C 48 292, 58 294, 62 294
      "
      fill="none"
      stroke="#3A4A70"
      strokeWidth="0.8"
      opacity="0.25"
    />

    {/* ───────── Pickguard ───────── */}
    <path
      d="
        M97 178
        C 84 178, 68 182, 58 190
        C 48 198, 42 210, 40 228
        C 38 248, 38 265, 38 275
        C 38 280, 40 284, 44 288
        C 48 292, 55 294, 60 294
        C 56 300, 48 312, 40 328
        C 32 348, 30 368, 32 388
        C 33 396, 36 404, 42 412
        C 52 404, 60 388, 56 370
        C 55 358, 60 350, 70 344
        L 84 340
        L 88 318
        L 86 300
        C 82 290, 82 282, 84 274
        C 86 266, 90 260, 94 254
        L 98 232
        L 100 210
        L 97 178
        Z
      "
      fill="#1A2035"
      opacity="0.35"
      stroke="#2A3555"
      strokeWidth="0.5"
    />

    {/* ───────── Pickups — three single-coil ───────── */}
    {/* Neck pickup */}
    <g transform="translate(72, 250) rotate(-8)">
      <rect x="0" y="0" width="52" height="12" rx="2" fill="#222" stroke="#444" strokeWidth="0.8" />
      <rect x="2" y="2" width="48" height="8" rx="1" fill="#1A1A1A" />
      {/* Pole pieces */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={`np-${i}`} cx={9 + i * 7} cy="6" r="1.8" fill="#888" stroke="#666" strokeWidth="0.4" />
      ))}
    </g>

    {/* Middle pickup */}
    <g transform="translate(70, 290) rotate(-8)">
      <rect x="0" y="0" width="52" height="12" rx="2" fill="#222" stroke="#444" strokeWidth="0.8" />
      <rect x="2" y="2" width="48" height="8" rx="1" fill="#1A1A1A" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={`mp-${i}`} cx={9 + i * 7} cy="6" r="1.8" fill="#888" stroke="#666" strokeWidth="0.4" />
      ))}
    </g>

    {/* Bridge pickup */}
    <g transform="translate(68, 330) rotate(-12)">
      <rect x="0" y="0" width="52" height="12" rx="2" fill="#222" stroke="#444" strokeWidth="0.8" />
      <rect x="2" y="2" width="48" height="8" rx="1" fill="#1A1A1A" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={`bp-${i}`} cx={9 + i * 7} cy="6" r="1.8" fill="#888" stroke="#666" strokeWidth="0.4" />
      ))}
    </g>

    {/* Active pickup LED glow (accent) */}
    <circle cx="100" cy="296" r="3" fill={accent} opacity="0.20" filter="url(#eg-glow)" />

    {/* ───────── Tremolo Bridge ───────── */}
    <g transform="translate(68, 350) rotate(-5)">
      <rect x="0" y="0" width="56" height="22" rx="2" fill="url(#eg-chrome)" stroke="#888" strokeWidth="0.8" />
      {/* Saddle grooves */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <React.Fragment key={`sad-${i}`}>
          <rect x={5 + i * 8} y="2" width="5" height="10" rx="1" fill="#A0A0A0" stroke="#888" strokeWidth="0.3" />
          <line x1={7.5 + i * 8} y1="3" x2={7.5 + i * 8} y2="11" stroke="#777" strokeWidth="0.5" />
        </React.Fragment>
      ))}
      {/* Tremolo arm mount */}
      <circle cx="52" cy="18" r="3" fill="#C0C0C0" stroke="#999" strokeWidth="0.5" />
    </g>

    {/* Tremolo arm */}
    <line x1="118" y1="367" x2="150" y2="410" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round" />
    <circle cx="150" cy="410" r="3.5" fill="#E0E0E0" stroke="#999" strokeWidth="0.5" />

    {/* ───────── Controls ───────── */}
    {/* Volume knob */}
    <circle cx="56" cy="380" r="9" fill="url(#eg-knob-grad)" stroke="#888" strokeWidth="0.8" />
    <circle cx="56" cy="380" r="6" fill="none" stroke="#999" strokeWidth="0.3" />
    <circle cx="56" cy="380" r="1.5" fill="#666" />
    {/* Knob pointer */}
    <line x1="56" y1="380" x2="56" y2="373" stroke="#666" strokeWidth="1" />

    {/* Tone knob 1 */}
    <circle cx="48" cy="406" r="8" fill="url(#eg-knob-grad)" stroke="#888" strokeWidth="0.8" />
    <circle cx="48" cy="406" r="5.5" fill="none" stroke="#999" strokeWidth="0.3" />
    <circle cx="48" cy="406" r="1.3" fill="#666" />
    <line x1="48" y1="406" x2="48" y2="400" stroke="#666" strokeWidth="0.8" />

    {/* Tone knob 2 */}
    <circle cx="58" cy="428" r="8" fill="url(#eg-knob-grad)" stroke="#888" strokeWidth="0.8" />
    <circle cx="58" cy="428" r="5.5" fill="none" stroke="#999" strokeWidth="0.3" />
    <circle cx="58" cy="428" r="1.3" fill="#666" />
    <line x1="58" y1="428" x2="58" y2="422" stroke="#666" strokeWidth="0.8" />

    {/* 5-way pickup selector switch */}
    <rect x="44" y="340" width="6" height="20" rx="2" fill="#333" stroke="#555" strokeWidth="0.5" />
    <rect x="43" y="346" width="8" height="5" rx="1.5" fill="#DDD" stroke="#AAA" strokeWidth="0.4" />

    {/* Output jack — on body edge */}
    <circle cx="148" cy="445" r="5" fill="#333" stroke="#888" strokeWidth="1" />
    <circle cx="148" cy="445" r="2.5" fill="#0D1321" stroke="#666" strokeWidth="0.5" />

    {/* ───────── Strings on body ───────── */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line
        key={`bstr-${i}`}
        x1={73 + i * 8}
        y1="356"
        x2={92 + i * 3.2}
        y2="170"
        stroke="#C0C0C0"
        strokeWidth={0.55 - i * 0.04}
        opacity="0.35"
      />
    ))}

    {/* ───────── Neck ───────── */}
    <rect x="88" y="48" width="24" height="126" rx="2" fill="url(#eg-neck-grad)" />

    {/* Fretboard — maple/rosewood */}
    <rect x="90" y="48" width="20" height="126" rx="1" fill="#1E0F08" />

    {/* Fret wires */}
    {[60, 72, 83, 93, 102, 110, 118, 125, 132, 139, 146, 152, 157, 162, 167, 171].map((y, i) => (
      <line
        key={`fret-${i}`}
        x1="90"
        y1={y}
        x2="110"
        y2={y}
        stroke="#C0C0C0"
        strokeWidth="0.8"
        opacity="0.65"
      />
    ))}

    {/* Fret markers (dots) — at standard positions */}
    <circle cx="100" cy="77.5" r="1.8" fill="#FFFFF0" opacity="0.55" />
    <circle cx="100" cy="98" r="1.8" fill="#FFFFF0" opacity="0.55" />
    <circle cx="100" cy="114" r="1.8" fill="#FFFFF0" opacity="0.55" />
    <circle cx="100" cy="128.5" r="1.8" fill="#FFFFF0" opacity="0.55" />
    {/* Double dot at 12th fret */}
    <circle cx="97" cy="149.5" r="1.5" fill="#FFFFF0" opacity="0.55" />
    <circle cx="103" cy="149.5" r="1.5" fill="#FFFFF0" opacity="0.55" />

    {/* Nut */}
    <rect x="89" y="47" width="22" height="3" rx="1" fill="#FFFFF0" opacity="0.85" />

    {/* Strings on neck */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line
        key={`nstr-${i}`}
        x1={92 + i * 3.2}
        y1="48"
        x2={92 + i * 3.2}
        y2="174"
        stroke="#C0C0C0"
        strokeWidth={0.55 - i * 0.04}
        opacity="0.35"
      />
    ))}

    {/* ───────── Headstock — Strat-style (6-in-line) ───────── */}
    <path
      d="
        M88 48
        L86 44
        L85 32
        L82 18
        C 80 8, 84 2, 92 0
        L 110 3
        C 116 5, 118 10, 117 16
        L 115 32
        L 114 44
        L 112 48
        Z
      "
      fill="url(#eg-head-grad)"
      stroke="#0A0E18"
      strokeWidth="0.8"
    />

    {/* Headstock logo glow */}
    <ellipse cx="98" cy="18" rx="12" ry="4" fill={accent} opacity="0.10" />

    {/* 6-in-line tuning machines (all on one side) */}
    {[8, 15, 22, 29, 36, 43].map((y, i) => (
      <React.Fragment key={`tm-${i}`}>
        {/* String post */}
        <circle cx={88 + i * 0.5} cy={y} r="2" fill="#C0C0C0" stroke="#999" strokeWidth="0.4" />
        {/* Tuning button */}
        <rect
          x={74 + i * 0.5}
          y={y - 2}
          width="10"
          height="4"
          rx="1.5"
          fill="url(#eg-chrome)"
          stroke="#999"
          strokeWidth="0.3"
        />
      </React.Fragment>
    ))}

    {/* Strings to tuners */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line
        key={`hstr-${i}`}
        x1={92 + i * 3.2}
        y1="48"
        x2={88 + i * 0.5}
        y2={8 + i * 7}
        stroke="#C0C0C0"
        strokeWidth={0.45 - i * 0.03}
        opacity="0.30"
      />
    ))}

    {/* ───────── Accent glow on body edge ───────── */}
    <path
      d="
        M100 172
        C 88 172, 74 174, 62 182
      "
      fill="none"
      stroke={accent}
      strokeWidth="1"
      opacity="0.12"
    />
    <path
      d="
        M32 330
        C 26 350, 24 375, 28 400
      "
      fill="none"
      stroke={accent}
      strokeWidth="1"
      opacity="0.10"
    />
  </svg>
);

export default ElectricGuitar;
