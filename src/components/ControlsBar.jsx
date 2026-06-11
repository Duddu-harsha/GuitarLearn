import { useCallback, useMemo } from 'react';
import { NOTE_NAMES } from '../utils/noteUtils';

/**
 * ControlsBar — horizontal bar of playback and display controls.
 *
 * Renders root-note dropdown, BPM slider, now-playing indicator,
 * stop button, three toggle pills, and a thin progress bar.
 */
export default function ControlsBar({
  rootNote,
  onRootNoteChange,
  bpm,
  onBpmChange,
  isPlaying,
  onStop,
  currentNote,
  playingStep,
  totalSteps,
  showNoteLabels,
  onToggleNoteLabels,
  isLeftHanded,
  onToggleLeftHanded,
}) {
  // ── Handlers ────────────────────────────────────────────────
  const handleRootChange = useCallback(
    (e) => onRootNoteChange(e.target.value),
    [onRootNoteChange],
  );

  const handleBpmChange = useCallback(
    (e) => onBpmChange(Number(e.target.value)),
    [onBpmChange],
  );

  // ── Progress ────────────────────────────────────────────────
  const progressPct = useMemo(() => {
    if (playingStep == null || !totalSteps) return 0;
    return Math.round((playingStep / totalSteps) * 100);
  }, [playingStep, totalSteps]);

  return (
    <div className="controls-bar">
      {/* ── Root Note Selector ──────────────────────────────── */}
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>
          Root
        </span>
        <select
          className="root-selector"
          value={rootNote}
          onChange={handleRootChange}
        >
          {NOTE_NAMES.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>

      {/* ── BPM Slider ─────────────────────────────────────── */}
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-mono)',
            minWidth: 72,
          }}
        >
          BPM: {bpm}
        </span>
        <input
          type="range"
          className="bpm-slider"
          min={40}
          max={180}
          value={bpm}
          onChange={handleBpmChange}
        />
      </label>

      {/* ── Now Playing Display ─────────────────────────────── */}
      <div className={`now-playing${isPlaying && currentNote ? ' active' : ''}`}>
        {isPlaying && currentNote ? `♪ ${currentNote}` : '\u00A0'}
      </div>

      {/* ── Stop Button ────────────────────────────────────── */}
      {isPlaying && (
        <button type="button" className="stop-btn" onClick={onStop}>
          ■ Stop
        </button>
      )}

      {/* ── Toggle Buttons ─────────────────────────────────── */}
      <button
        type="button"
        className={`toggle-btn${showNoteLabels ? ' active' : ''}`}
        onClick={onToggleNoteLabels}
      >
        🏷️ Labels
      </button>

      <button
        type="button"
        className={`toggle-btn${isLeftHanded ? ' active' : ''}`}
        onClick={onToggleLeftHanded}
      >
        🔄 Left-Hand
      </button>

      {/* ── Progress Bar ───────────────────────────────────── */}
      <div className="progress-bar" style={{ flexBasis: '100%' }}>
        <div
          className="fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}
