import { useCallback } from 'react';

// Mapping from finger number to label
const FINGER_LABELS = {
  1: 'Index',
  2: 'Middle',
  3: 'Ring',
  4: 'Pinky',
};

// Shared inline styles for finger circles
const fingerCircleStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  fontSize: 11,
  fontWeight: 600,
  color: 'var(--text-primary)',
  position: 'relative',
};

const fingerLabelStyle = {
  position: 'absolute',
  bottom: -16,
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: 9,
  color: 'var(--text-secondary)',
  whiteSpace: 'nowrap',
};

/**
 * ExerciseCard — displays a single exercise with play controls.
 *
 * Shows the exercise name, description, finger-pattern visualisation
 * (small numbered circles with labels), and a play/stop button.
 */
export default function ExerciseCard({
  exercise,
  rootNote,
  isPlaying,
  onPlay,
  onStop,
}) {
  const handlePlay = useCallback(() => onPlay(exercise), [onPlay, exercise]);

  // Deduplicate finger pattern for display (e.g. [1,2,3,4] stays, [1,2,1,2] → [1,2])
  const uniqueFingers = [...new Set(exercise.fingerPattern)];

  return (
    <div className={`exercise-card card${isPlaying ? ' playing' : ''}`}>
      {/* ── Header ───────────────────────────────────────────── */}
      <h3>{exercise.name}</h3>

      {/* ── Description ──────────────────────────────────────── */}
      <p>{exercise.description}</p>

      {/* ── Finger Pattern ───────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        {uniqueFingers.map((finger) => (
          <div key={finger} style={fingerCircleStyle}>
            {finger}
            <span style={fingerLabelStyle}>
              {FINGER_LABELS[finger] || `F${finger}`}
            </span>
          </div>
        ))}
      </div>

      {/* ── Play / Stop button ───────────────────────────────── */}
      {isPlaying ? (
        <button type="button" className="stop-btn" onClick={onStop}>
          ■ Stop
        </button>
      ) : (
        <button type="button" className="play-btn" onClick={handlePlay}>
          ▶ Play Exercise
        </button>
      )}
    </div>
  );
}
