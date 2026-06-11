import { useMemo, useCallback } from 'react';

/* ============================================================
   GuitarFretboard — Interactive SVG Fretboard Component
   The visual centerpiece of GuitarLearn.
   24 frets + open position, 6 visible strings, clickable notes,
   logarithmic fret spacing, note highlighting, and playback state.
   ============================================================ */

/* ── Layout Constants ──────────────────────────────────────── */
const SVG_WIDTH = 1680;
const SVG_HEIGHT = 280;
const NUT_X = 100;                // x position of the nut
const NECK_LENGTH = 2060;         // usable neck length in SVG units
const TOP_PADDING = 50;           // top margin above first string
const BOTTOM_PADDING = 50;        // bottom margin below last string
const STRING_AREA_HEIGHT = SVG_HEIGHT - TOP_PADDING - BOTTOM_PADDING;
const STRING_COUNT = 6;
const STRING_SPACING = STRING_AREA_HEIGHT / (STRING_COUNT - 1);
const OPEN_LABEL_X = 40;          // x position for open-string note labels
const FRET_COUNT = 24;

/* ── String labels & thicknesses (low E → high e, top → bottom in SVG) */
const STRING_LABELS = ['E', 'A', 'D', 'G', 'B', 'e'];
const STRING_WIDTHS = [3.5, 3, 2.4, 1.8, 1.2, 0.9];
const STRING_COLORS_DARK = [
  '#C8C8C8', '#D0D0D0', '#D8D8D8', '#DCDCDC', '#E0E0E0', '#E4E4E4'
];
const STRING_COLORS_LIGHT = [
  '#888888', '#909090', '#989898', '#A0A0A0', '#A8A8A8', '#B0B0B0'
];

/* ── Open string note names with octave ── */
const OPEN_STRING_NOTES = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];

/* ── Fret marker positions ─────────────────────────────────── */
const SINGLE_DOT_FRETS = [3, 5, 7, 9, 15, 17, 19, 21];
const DOUBLE_DOT_FRETS = [12, 24];

/* ── Guitar-type color palettes ────────────────────────────── */
const THEME = {
  acoustic: {
    fretboardBg: '#2C1810',
    grainFrom: '#3D2212',
    grainTo: '#2C1810',
    nutColor: '#FFFDD0',
    dotFill: 'rgba(255,253,208,0.12)',
    dotStroke: 'rgba(255,253,208,0.18)',
    fretNumberColor: '#9E8E7E',
    isLightBoard: false,
    openLabelBg: '#1A0F08',
  },
  classical: {
    fretboardBg: '#1A0F08',
    grainFrom: '#2A1508',
    grainTo: '#1A0F08',
    nutColor: '#F5E6C8',
    dotFill: 'rgba(245,230,200,0.10)',
    dotStroke: 'rgba(245,230,200,0.16)',
    fretNumberColor: '#8E7E6E',
    isLightBoard: false,
    openLabelBg: '#0E0804',
  },
  electric: {
    fretboardBg: '#E8D5A3',
    grainFrom: '#E0C8A8',
    grainTo: '#D4B896',
    nutColor: '#F8F0E0',
    dotFill: 'rgba(30,20,10,0.10)',
    dotStroke: 'rgba(30,20,10,0.18)',
    fretNumberColor: '#7A6A50',
    isLightBoard: true,
    openLabelBg: '#C4A878',
  },
};

/* ── Geometry Helpers ──────────────────────────────────────── */

/** Logarithmic fret position (realistic guitar spacing) */
function getFretX(fretNumber) {
  if (fretNumber === 0) return NUT_X;
  return NUT_X + NECK_LENGTH * (1 - 1 / Math.pow(2, fretNumber / 12));
}

/** Center X of the space between fret (n-1) and fret n */
function getFretCenterX(fretNumber) {
  if (fretNumber === 0) return OPEN_LABEL_X;
  const left = fretNumber === 1 ? NUT_X : getFretX(fretNumber - 1);
  const right = getFretX(fretNumber);
  return (left + right) / 2;
}

/** Y position for a given string index (0 = low E at top of SVG) */
function getStringY(stringIndex) {
  return TOP_PADDING + stringIndex * STRING_SPACING;
}


/* ── Component ─────────────────────────────────────────────── */

function GuitarFretboard({
  guitarType = 'acoustic',
  scalePositions = [],
  activeStep = null,
  playbackNotes = [],
  showNoteLabels = true,
  isLeftHanded = false,
  onPlayNote = null,
}) {
  const theme = THEME[guitarType] || THEME.acoustic;
  const stringColors = theme.isLightBoard ? STRING_COLORS_LIGHT : STRING_COLORS_DARK;

  /* ── Pre-compute fret X positions ─────────────────────────── */
  const fretPositions = useMemo(() => {
    const positions = [];
    for (let f = 0; f <= FRET_COUNT; f++) {
      positions.push({
        fret: f,
        x: getFretX(f),
        centerX: getFretCenterX(f),
      });
    }
    return positions;
  }, []);

  /* ── Active note from playback ────────────────────────────── */
  const activeNote = useMemo(() => {
    if (activeStep === null || activeStep === undefined) return null;
    return playbackNotes[activeStep] || null;
  }, [activeStep, playbackNotes]);

  /* ── Build a lookup for quick hit-testing ──────────────────── */
  const playbackLookup = useMemo(() => {
    const map = new Map();
    playbackNotes.forEach((n, idx) => {
      const key = `${n.string}-${n.fret}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(idx);
    });
    return map;
  }, [playbackNotes]);

  /* ── Unique ID prefix for SVG defs (avoid collisions) ────── */
  const uid = useMemo(() => `fb-${Math.random().toString(36).slice(2, 8)}`, []);

  /* ── Handle clicking an open string note ─────────────────── */
  const handleOpenStringClick = useCallback((stringIdx) => {
    if (onPlayNote) {
      onPlayNote(OPEN_STRING_NOTES[stringIdx]);
    }
  }, [onPlayNote]);

  /* ── Handle clicking a note dot on the fretboard ─────────── */
  const handleNoteDotClick = useCallback((noteName) => {
    if (onPlayNote && noteName) {
      onPlayNote(noteName);
    }
  }, [onPlayNote]);

  /* ── Render ───────────────────────────────────────────────── */
  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      className="guitar-fretboard-svg"
      role="img"
      aria-label={`${guitarType} guitar fretboard with 24 frets`}
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        transform: isLeftHanded ? 'scaleX(-1)' : undefined,
      }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── SVG Definitions ──────────────────────────────────── */}
      <defs>
        {/* Wood-grain background gradient */}
        <linearGradient id={`${uid}-grain`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.grainFrom} />
          <stop offset="35%" stopColor={theme.fretboardBg} />
          <stop offset="65%" stopColor={theme.fretboardBg} />
          <stop offset="100%" stopColor={theme.grainFrom} />
        </linearGradient>

        {/* Subtle wood-grain noise pattern */}
        <pattern id={`${uid}-wood`} width="200" height="6" patternUnits="userSpaceOnUse">
          <rect width="200" height="6" fill={theme.fretboardBg} />
          <line x1="0" y1="1" x2="200" y2="1.5" stroke={theme.grainFrom} strokeWidth="0.5" opacity="0.3" />
          <line x1="0" y1="3.5" x2="200" y2="3" stroke={theme.grainFrom} strokeWidth="0.4" opacity="0.2" />
          <line x1="0" y1="5" x2="200" y2="5.5" stroke={theme.grainFrom} strokeWidth="0.3" opacity="0.15" />
        </pattern>

        {/* Fret wire gradient (chrome effect) */}
        <linearGradient id={`${uid}-fretwire`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A8A8A8" />
          <stop offset="40%" stopColor="#E0E0E0" />
          <stop offset="60%" stopColor="#E0E0E0" />
          <stop offset="100%" stopColor="#A0A0A0" />
        </linearGradient>

        {/* Nut gradient (ivory) */}
        <linearGradient id={`${uid}-nut`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={theme.nutColor} stopOpacity="0.6" />
          <stop offset="50%" stopColor={theme.nutColor} />
          <stop offset="100%" stopColor={theme.nutColor} stopOpacity="0.7" />
        </linearGradient>

        {/* Active note glow filter */}
        <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft shadow for note dots */}
        <filter id={`${uid}-dot-shadow`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
        </filter>

        {/* String highlight glow */}
        <filter id={`${uid}-string-glow`} x="-2%" y="-100%" width="104%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
      </defs>

      {/* ── Fretboard Background ─────────────────────────────── */}
      <rect
        x={NUT_X - 2}
        y={TOP_PADDING - 14}
        width={SVG_WIDTH - NUT_X + 2}
        height={STRING_AREA_HEIGHT + 28}
        rx="3"
        fill={`url(#${uid}-grain)`}
      />
      {/* Wood texture overlay */}
      <rect
        x={NUT_X - 2}
        y={TOP_PADDING - 14}
        width={SVG_WIDTH - NUT_X + 2}
        height={STRING_AREA_HEIGHT + 28}
        rx="3"
        fill={`url(#${uid}-wood)`}
        opacity="0.5"
      />

      {/* ── Open string area background ──────────────────────── */}
      <rect
        x={0}
        y={TOP_PADDING - 14}
        width={NUT_X - 4}
        height={STRING_AREA_HEIGHT + 28}
        rx="3"
        fill={theme.openLabelBg}
        opacity="0.5"
      />

      {/* ── Fret Markers (Dots) ──────────────────────────────── */}
      {fretPositions.map(({ fret, centerX }) => {
        if (fret > FRET_COUNT) return null;

        if (SINGLE_DOT_FRETS.includes(fret)) {
          const cy = TOP_PADDING + STRING_AREA_HEIGHT / 2;
          return (
            <circle
              key={`dot-${fret}`}
              cx={centerX}
              cy={cy}
              r={fret > 12 ? 3.5 : 4.5}
              fill={theme.dotFill}
              stroke={theme.dotStroke}
              strokeWidth="0.5"
            />
          );
        }

        if (DOUBLE_DOT_FRETS.includes(fret)) {
          const cy1 = getStringY(1) + STRING_SPACING / 2;
          const cy2 = getStringY(3) + STRING_SPACING / 2;
          const r = fret > 12 ? 3.5 : 4.5;
          return (
            <g key={`dot-${fret}`}>
              <circle cx={centerX} cy={cy1} r={r} fill={theme.dotFill} stroke={theme.dotStroke} strokeWidth="0.5" />
              <circle cx={centerX} cy={cy2} r={r} fill={theme.dotFill} stroke={theme.dotStroke} strokeWidth="0.5" />
            </g>
          );
        }

        return null;
      })}

      {/* ── Fret Wires ───────────────────────────────────────── */}
      {fretPositions.map(({ fret, x }) => {
        if (fret === 0) return null;
        const width = fret <= 12 ? 2.5 : 1.5;
        return (
          <rect
            key={`fret-${fret}`}
            x={x - width / 2}
            y={TOP_PADDING - 12}
            width={width}
            height={STRING_AREA_HEIGHT + 24}
            fill={`url(#${uid}-fretwire)`}
            rx="0.5"
          />
        );
      })}

      {/* ── Nut ──────────────────────────────────────────────── */}
      <rect
        x={NUT_X - 3}
        y={TOP_PADDING - 14}
        width={6}
        height={STRING_AREA_HEIGHT + 28}
        rx="1.5"
        fill={`url(#${uid}-nut)`}
      />

      {/* ── Strings (visible metallic lines) ─────────────────── */}
      {Array.from({ length: STRING_COUNT }).map((_, i) => {
        const y = getStringY(i);
        return (
          <g key={`string-group-${i}`}>
            {/* String shadow/glow for visibility */}
            <line
              x1={OPEN_LABEL_X + 25}
              y1={y}
              x2={SVG_WIDTH}
              y2={y}
              stroke={theme.isLightBoard ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.08)'}
              strokeWidth={STRING_WIDTHS[i] + 2}
              strokeLinecap="round"
            />
            {/* Main string line */}
            <line
              x1={OPEN_LABEL_X + 25}
              y1={y}
              x2={SVG_WIDTH}
              y2={y}
              stroke={stringColors[i]}
              strokeWidth={STRING_WIDTHS[i]}
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Specular highlight on string */}
            <line
              x1={OPEN_LABEL_X + 25}
              y1={y - STRING_WIDTHS[i] * 0.25}
              x2={SVG_WIDTH}
              y2={y - STRING_WIDTHS[i] * 0.25}
              stroke={theme.isLightBoard ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)'}
              strokeWidth={STRING_WIDTHS[i] * 0.3}
              strokeLinecap="round"
            />
          </g>
        );
      })}

      {/* ── Open String Labels (clickable) ────────────────────── */}
      <g>
        {STRING_LABELS.map((label, i) => {
          const y = getStringY(i);
          const noteName = OPEN_STRING_NOTES[i];
          return (
            <g
              key={`open-${i}`}
              onClick={() => handleOpenStringClick(i)}
              style={{ 
                cursor: 'pointer',
                transform: isLeftHanded ? 'scaleX(-1)' : undefined,
                transformOrigin: `${OPEN_LABEL_X}px ${y}px`
              }}
              role="button"
              aria-label={`Play open ${noteName}`}
            >
              {/* Background circle */}
              <circle
                cx={OPEN_LABEL_X}
                cy={y}
                r={13}
                fill={theme.isLightBoard ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'}
                stroke={theme.isLightBoard ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.10)'}
                strokeWidth="1"
                className="open-string-btn"
              />
              {/* Note name */}
              <text
                x={OPEN_LABEL_X}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={theme.isLightBoard ? '#5A4A30' : '#D0D0D0'}
                fontSize="12"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="600"
                pointerEvents="none"
              >
                {label}
              </text>
              {/* Subscript octave */}
              <text
                x={OPEN_LABEL_X + 9}
                y={y + 5}
                textAnchor="middle"
                dominantBaseline="central"
                fill={theme.isLightBoard ? '#8A7A60' : '#888'}
                fontSize="7"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="400"
                pointerEvents="none"
              >
                {noteName.slice(-1)}
              </text>
            </g>
          );
        })}
      </g>

      {/* ── Fret Numbers (below fretboard) ───────────────────── */}
      <g>
        {fretPositions.map(({ fret, centerX }) => {
          if (fret === 0) return null;
          // Only show certain fret numbers to avoid clutter
          const showNumber = fret <= 12 || fret === 15 || fret === 17 || fret === 19 || fret === 21 || fret === 24;
          if (!showNumber) return null;
          const yPos = TOP_PADDING + STRING_AREA_HEIGHT + 28;
          return (
            <text
              key={`fnum-${fret}`}
              x={centerX}
              y={yPos}
              textAnchor="middle"
              dominantBaseline="central"
              fill={theme.fretNumberColor}
              fontSize={fret > 12 ? '8' : '9'}
              fontFamily="'Inter', sans-serif"
              fontWeight="500"
              opacity="0.7"
              style={isLeftHanded ? { transform: 'scaleX(-1)', transformOrigin: `${centerX}px ${yPos}px` } : undefined}
            >
              {fret}
            </text>
          );
        })}
      </g>

      {/* ── Scale/Exercise Position Highlights ─────────────────── */}
      {scalePositions.map((pos, idx) => {
        const { note, string: str, fret, isRoot } = pos;
        // noteUtils uses string 0 = high-e (E4), but the fretboard SVG
        // renders string 0 as low-E at the top, so we flip the index.
        const displayString = 5 - str;
        const cx = getFretCenterX(fret);
        const cy = getStringY(displayString);
        const key = `${str}-${fret}`;

        // Strip octave from note for display label
        const noteLabel = note ? note.replace(/\d+$/, '') : '';

        // Determine if this note is the active playback note
        const isActive =
          activeNote &&
          activeNote.string === str &&
          activeNote.fret === fret;

        // Determine playback queue status
        const playbackIndices = playbackLookup.get(key) || [];
        const isQueued =
          !isActive &&
          playbackIndices.some((pi) => activeStep !== null && pi > activeStep);

        // Sizing — slightly smaller for higher frets
        const sizeScale = fret > 12 ? 0.85 : 1;
        const baseRadius = (isActive ? 11 : isRoot ? 9 : 7.5) * sizeScale;
        const dotOpacity = isActive ? 1 : isQueued ? 0.35 : isRoot ? 0.92 : 0.7;

        return (
          <g
            key={`pos-${idx}`}
            onClick={() => handleNoteDotClick(note)}
            style={{ cursor: onPlayNote ? 'pointer' : 'default' }}
          >
            {/* Root note: diamond (rotated square) */}
            {isRoot && !isActive ? (
              <rect
                x={cx - baseRadius}
                y={cy - baseRadius}
                width={baseRadius * 2}
                height={baseRadius * 2}
                rx="2"
                transform={`rotate(45 ${cx} ${cy})`}
                fill="var(--accent)"
                fillOpacity={dotOpacity}
                stroke="var(--accent)"
                strokeWidth="1.2"
                strokeOpacity="0.8"
                filter={`url(#${uid}-dot-shadow)`}
              />
            ) : (
              <circle
                cx={cx}
                cy={cy}
                r={baseRadius}
                fill={isActive ? 'var(--accent)' : isQueued ? 'transparent' : 'var(--accent)'}
                fillOpacity={isActive ? 1 : isQueued ? 0 : dotOpacity}
                stroke={isQueued ? 'var(--accent)' : 'none'}
                strokeWidth={isQueued ? '1.2' : '0'}
                strokeOpacity={isQueued ? 0.5 : 1}
                strokeDasharray={isQueued ? '3 2' : 'none'}
                filter={isActive ? `url(#${uid}-glow)` : `url(#${uid}-dot-shadow)`}
                className={isActive ? 'note-active' : undefined}
              />
            )}

            {/* Note label text */}
            {(showNoteLabels || isActive) && noteLabel && (
              <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                fill={
                  isActive
                    ? '#000'
                    : isRoot
                    ? (theme.isLightBoard ? '#3A2A10' : '#FFF')
                    : (theme.isLightBoard ? '#5A4A30' : '#E0E0E0')
                }
                fontSize={isActive ? '9' : fret > 12 ? '7' : '8'}
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="600"
                opacity={isQueued && !isActive ? 0.5 : 1}
                style={isLeftHanded ? { transform: 'scaleX(-1)', transformOrigin: `${cx}px ${cy}px` } : undefined}
                pointerEvents="none"
              >
                {noteLabel}
              </text>
            )}
          </g>
        );
      })}

      {/* ── CSS for active note pulse animation ──────────────── */}
      <style>{`
        .note-active {
          animation: svg-note-pulse 0.8s ease-in-out infinite;
        }
        @keyframes svg-note-pulse {
          0%, 100% { r: ${11}; opacity: 1; }
          50%      { r: ${13}; opacity: 0.85; }
        }
        .open-string-btn {
          transition: all 0.15s ease;
        }
        .open-string-btn:hover {
          fill: var(--accent) !important;
          fill-opacity: 0.25;
          stroke: var(--accent) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .note-active { animation: none; }
        }
      `}</style>
    </svg>
  );
}

export default GuitarFretboard;
