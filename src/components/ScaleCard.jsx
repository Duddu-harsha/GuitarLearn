import { useMemo, useCallback } from 'react';
import { getScaleNoteNames } from '../utils/noteUtils';

// Badge colour mapping
const DIFFICULTY_COLORS = {
  Beginner:     { bg: 'rgba(34,197,94,0.15)',  color: '#22C55E' },
  Intermediate: { bg: 'rgba(234,179,8,0.15)',  color: '#EAB308' },
  Advanced:     { bg: 'rgba(239,68,68,0.15)',  color: '#EF4444' },
};

/**
 * ScaleCard — displays a single scale with play controls.
 *
 * Shows the scale name, difficulty badge, one-line description,
 * computed note names for the current root, a play/stop button,
 * and a collapsible "Did you know?" trivia section.
 *
 * Clicking the card body (not buttons) selects it to preview
 * positions on the fretboard.
 */
export default function ScaleCard({
  scale,
  rootNote,
  isPlaying,
  isSelected,
  onPlay,
  onStop,
  onSelect,
}) {
  // ── Derived note names ──────────────────────────────────────
  const noteNames = useMemo(
    () => getScaleNoteNames(rootNote, scale.tonalName),
    [rootNote, scale.tonalName],
  );

  // ── Handlers ────────────────────────────────────────────────
  const handlePlay = useCallback((e) => {
    e.stopPropagation();
    onPlay(scale);
  }, [onPlay, scale]);

  const handleStop = useCallback((e) => {
    e.stopPropagation();
    onStop();
  }, [onStop]);

  const handleCardClick = useCallback(() => {
    if (onSelect) onSelect(scale);
  }, [onSelect, scale]);

  // ── Difficulty badge class ──────────────────────────────────
  const diffClass = scale.difficulty.toLowerCase();

  // ── Card classes ────────────────────────────────────────────
  const cardClasses = [
    'scale-card',
    'card',
    isPlaying ? 'playing' : '',
    isSelected && !isPlaying ? 'selected' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={handleCardClick}>
      {/* ── Header row ───────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <h3>{scale.name}</h3>
        <span className={`difficulty-badge ${diffClass}`}>
          {scale.difficulty}
        </span>
      </div>

      {/* ── Description ──────────────────────────────────────── */}
      <p>{scale.description}</p>

      {/* ── Scale notes ──────────────────────────────────────── */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 14,
          color: 'var(--text-mono)',
          marginBottom: 14,
          letterSpacing: '0.04em',
        }}
      >
        {noteNames.join('  ')}
      </div>

      {/* ── Play / Stop button ───────────────────────────────── */}
      {isPlaying ? (
        <button type="button" className="stop-btn" onClick={handleStop}>
          ■ Stop
        </button>
      ) : (
        <button type="button" className="play-btn" onClick={handlePlay}>
          ▶ Play Scale
        </button>
      )}

      {/* ── Did You Know? ────────────────────────────────────── */}
      {scale.didYouKnow && (
        <details className="did-you-know" style={{ marginTop: 14 }} onClick={(e) => e.stopPropagation()}>
          <summary>Did you know?</summary>
          <p style={{ margin: 0 }}>{scale.didYouKnow}</p>
        </details>
      )}
    </div>
  );
}
