import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './App.css';

// Data imports
import { GUITAR_TYPES } from './data/guitarTypes';
import { SCALES } from './data/scales';
import { EXERCISES } from './data/exercises';

// Audio engine
import {
  getSampler,
  waitForLoad,
  startPlayback,
  stopPlayback,
  setBpm,
  isPlaying as isAudioPlaying,
  ensureAudioContext,
  playNote,
} from './audio/audioEngine';

// Utilities
import {
  NOTE_NAMES,
  buildScaleSequence,
  buildScalePositions,
} from './utils/noteUtils';

// Components
import Header from './components/Header';
import ControlsBar from './components/ControlsBar';
import ContentTabs from './components/ContentTabs';
import ScaleCard from './components/ScaleCard';
import ExerciseCard from './components/ExerciseCard';
import GuitarFretboard from './components/GuitarFretboard';
import { AcousticGuitar } from './components/guitars';

/* ─── Guitar illustration lookup ─── */
const GUITAR_ILLUSTRATIONS = {
  acoustic: AcousticGuitar,
};

/* ─── Group items by category (preserving insertion order) ─── */
function groupByCategory(items) {
  const groups = {};
  items.forEach((item) => {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  });
  return groups;
}

/* ─── Build exercise positions for fretboard display ─── */
function buildExercisePositions(exercise) {
  try {
    const seq = exercise.generateSequence();
    if (!seq || seq.length === 0) return [];

    // Deduplicate by string+fret, mark first occurrence as root
    const seen = new Map();
    seq.forEach((step) => {
      const key = `${step.string}-${step.fret}`;
      if (!seen.has(key)) {
        seen.set(key, {
          note: step.note,
          string: step.string,
          fret: step.fret,
          isRoot: false,
        });
      }
    });

    // Mark the first note position as "root" for visual distinction
    const positions = Array.from(seen.values());
    if (positions.length > 0) positions[0].isRoot = true;
    return positions;
  } catch {
    return [];
  }
}

/* ════════════════════════════════════════
   Main App Component
   ════════════════════════════════════════ */
export default function App() {
  /* ── Core State ── */
  const [guitarType, setGuitarType] = useState('acoustic');
  const [rootNote, setRootNote] = useState('C');
  const [bpm, setBpmState] = useState(80);
  const [activeTab, setActiveTab] = useState('scales');

  /* ── Playback State ── */
  const [playingItemId, setPlayingItemId] = useState(null);
  const [playingStep, setPlayingStep] = useState(null);
  const [totalSteps, setTotalSteps] = useState(0);
  const [currentNote, setCurrentNote] = useState(null);
  const [playbackNotes, setPlaybackNotes] = useState([]);

  /* ── Selected item for fretboard preview (even when not playing) ── */
  const [selectedScaleId, setSelectedScaleId] = useState(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);

  /* ── UI Toggles ── */
  const [showNoteLabels, setShowNoteLabels] = useState(true);
  const [isLeftHanded, setIsLeftHanded] = useState(false);

  /* ── Loading State ── */
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* ── Refs ── */
  const currentGuitarTypeRef = useRef(guitarType);

  /* ── Keep ref in sync ── */
  useEffect(() => {
    currentGuitarTypeRef.current = guitarType;
  }, [guitarType]);

  /* ── Set data-guitar-type on <html> for CSS theming ── */
  useEffect(() => {
    document.documentElement.setAttribute('data-guitar-type', guitarType);
  }, [guitarType]);

  /* ── Get current guitar config ── */
  const currentGuitar = useMemo(() => GUITAR_TYPES[guitarType], [guitarType]);

  /* ── Guitar type change handler ── */
  const handleGuitarTypeChange = useCallback(async (newType) => {
    if (isAudioPlaying()) {
      stopPlayback();
      setPlayingItemId(null);
      setPlayingStep(null);
      setCurrentNote(null);
      setPlaybackNotes([]);
    }

    setGuitarType(newType);
    setIsLoading(true);

    try {
      await ensureAudioContext();
      getSampler(newType, GUITAR_TYPES);
      await waitForLoad();
      setIsLoaded(true);
    } catch (err) {
      console.error('Failed to load sampler:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* ── BPM change handler ── */
  const handleBpmChange = useCallback((newBpm) => {
    setBpmState(newBpm);
    setBpm(newBpm);
  }, []);

  /* ── Build fretboard positions from either scales or exercises ── */
  const fretboardPositions = useMemo(() => {
    // Playing takes priority
    if (playingItemId) {
      // Check if it's a scale
      const scale = SCALES.find((s) => s.id === playingItemId);
      if (scale) {
        return buildScalePositions(rootNote, scale.tonalName);
      }
      // Check if it's an exercise
      const exercise = EXERCISES.find((e) => e.id === playingItemId);
      if (exercise) {
        return buildExercisePositions(exercise);
      }
    }

    // Not playing — show selected preview
    if (activeTab === 'scales' && selectedScaleId) {
      const scale = SCALES.find((s) => s.id === selectedScaleId);
      if (scale) {
        return buildScalePositions(rootNote, scale.tonalName);
      }
    }

    if (activeTab === 'exercises' && selectedExerciseId) {
      const exercise = EXERCISES.find((e) => e.id === selectedExerciseId);
      if (exercise) {
        return buildExercisePositions(exercise);
      }
    }

    // Default: show the C major scale positions
    return buildScalePositions(rootNote, 'major');
  }, [playingItemId, selectedScaleId, selectedExerciseId, activeTab, rootNote]);

  /* ── Play a single note (for clicking on fretboard/open strings) ── */
  const handlePlayNote = useCallback(async (noteName) => {
    try {
      await ensureAudioContext();
      const sampler = getSampler(currentGuitarTypeRef.current, GUITAR_TYPES);
      await waitForLoad();
      setIsLoaded(true);
      playNote(noteName, sampler);
    } catch (err) {
      console.error('Note play error:', err);
    }
  }, []);

  /* ── Play a scale ── */
  const handlePlayScale = useCallback(async (scale) => {
    try {
      if (isAudioPlaying()) {
        stopPlayback();
      }

      await ensureAudioContext();

      setIsLoading(true);
      const sampler = getSampler(currentGuitarTypeRef.current, GUITAR_TYPES);
      await waitForLoad();
      setIsLoading(false);
      setIsLoaded(true);

      const notes = buildScaleSequence(rootNote, scale.tonalName);
      if (!notes || notes.length === 0) {
        console.warn('No notes generated for scale:', scale.tonalName);
        return;
      }

      // Play scale

      setPlayingItemId(scale.id);
      setSelectedScaleId(scale.id);
      setPlaybackNotes(notes);
      setTotalSteps(notes.length);
      setPlayingStep(null);

      await startPlayback({
        notes,
        bpm,
        sampler,
        onStep: (stepIndex) => {
          setPlayingStep(stepIndex);
          setCurrentNote(notes[stepIndex]?.note || null);
        },
        onComplete: () => {
          setPlayingItemId(null);
          setPlayingStep(null);
          setCurrentNote(null);
          setPlaybackNotes([]);
          setTotalSteps(0);
        },
      });
    } catch (err) {
      console.error('Playback error:', err);
      setPlayingItemId(null);
      setPlayingStep(null);
      setIsLoading(false);
    }
  }, [rootNote, bpm]);

  /* ── Play an exercise ── */
  const handlePlayExercise = useCallback(async (exercise) => {
    try {
      if (isAudioPlaying()) {
        stopPlayback();
      }

      await ensureAudioContext();

      setIsLoading(true);
      const sampler = getSampler(currentGuitarTypeRef.current, GUITAR_TYPES);
      await waitForLoad();
      setIsLoading(false);
      setIsLoaded(true);

      const notes = exercise.generateSequence(rootNote);
      if (!notes || notes.length === 0) {
        console.warn('No notes generated for exercise:', exercise.id);
        return;
      }

      // Play exercise

      setPlayingItemId(exercise.id);
      setSelectedExerciseId(exercise.id);
      setPlaybackNotes(notes);
      setTotalSteps(notes.length);
      setPlayingStep(null);

      await startPlayback({
        notes,
        bpm,
        sampler,
        onStep: (stepIndex) => {
          setPlayingStep(stepIndex);
          setCurrentNote(notes[stepIndex]?.note || null);
        },
        onComplete: () => {
          setPlayingItemId(null);
          setPlayingStep(null);
          setCurrentNote(null);
          setPlaybackNotes([]);
          setTotalSteps(0);
        },
      });
    } catch (err) {
      console.error('Exercise playback error:', err);
      setPlayingItemId(null);
      setPlayingStep(null);
      setIsLoading(false);
    }
  }, [rootNote, bpm]);

  /* ── Stop handler ── */
  const handleStop = useCallback(() => {
    stopPlayback();
    setPlayingItemId(null);
    setPlayingStep(null);
    setCurrentNote(null);
    setPlaybackNotes([]);
    setTotalSteps(0);
  }, []);

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
        if (isAudioPlaying()) {
          handleStop();
        }
      }

      if (e.code === 'ArrowRight') {
        e.preventDefault();
        setRootNote((prev) => {
          const idx = NOTE_NAMES.indexOf(prev);
          return NOTE_NAMES[(idx + 1) % 12];
        });
      }
      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setRootNote((prev) => {
          const idx = NOTE_NAMES.indexOf(prev);
          return NOTE_NAMES[(idx - 1 + 12) % 12];
        });
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleStop]);

  /* ── Group scales and exercises by category ── */
  const groupedScales = useMemo(() => groupByCategory(SCALES), []);
  const groupedExercises = useMemo(() => groupByCategory(EXERCISES), []);

  /* ── Scale card click (select for preview) ── */
  const handleScaleCardClick = useCallback((scale) => {
    setSelectedScaleId(scale.id);
    setSelectedExerciseId(null);
  }, []);

  /* ── Exercise card click (select for preview) ── */
  const handleExerciseCardClick = useCallback((exercise) => {
    setSelectedExerciseId(exercise.id);
    setSelectedScaleId(null);
  }, []);

  /* ═══ RENDER ═══ */
  return (
    <div className="app">
      {/* Header */}
      <Header
        isLoading={isLoading}
      />

      <section className="hero-section" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="fretboard-container" style={{ width: '100%' }}>
          <GuitarFretboard
            guitarType={guitarType}
            scalePositions={fretboardPositions}
            activeStep={playingStep}
            playbackNotes={playbackNotes}
            showNoteLabels={showNoteLabels}
            isLeftHanded={isLeftHanded}
            onPlayNote={handlePlayNote}
          />
        </div>
      </section>

      {/* Controls Bar */}
      <ControlsBar
        rootNote={rootNote}
        onRootNoteChange={setRootNote}
        bpm={bpm}
        onBpmChange={handleBpmChange}
        isPlaying={!!playingItemId}
        onStop={handleStop}
        currentNote={currentNote}
        playingStep={playingStep}
        totalSteps={totalSteps}
        showNoteLabels={showNoteLabels}
        onToggleNoteLabels={() => setShowNoteLabels((v) => !v)}
        isLeftHanded={isLeftHanded}
        onToggleLeftHanded={() => setIsLeftHanded((v) => !v)}
      />

      {/* Content Tabs */}
      <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content Area */}
      <main className="content-area">
        {activeTab === 'scales' && (
          <div className="cards-container">
            {Object.entries(groupedScales).map(([category, scales]) => (
              <section key={category}>
                <h2 className="category-header">{category}</h2>
                <div className="cards-grid">
                  {scales.map((scale) => (
                    <ScaleCard
                      key={scale.id}
                      scale={scale}
                      rootNote={rootNote}
                      isPlaying={playingItemId === scale.id}
                      isSelected={selectedScaleId === scale.id}
                      onPlay={() => handlePlayScale(scale)}
                      onStop={handleStop}
                      onSelect={() => handleScaleCardClick(scale)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="cards-container">
            {Object.entries(groupedExercises).map(([category, exercises]) => (
              <section key={category}>
                <h2 className="category-header">{category}</h2>
                <div className="cards-grid">
                  {exercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      rootNote={rootNote}
                      isPlaying={playingItemId === exercise.id}
                      isSelected={selectedExerciseId === exercise.id}
                      onPlay={() => handlePlayExercise(exercise)}
                      onStop={handleStop}
                      onSelect={() => handleExerciseCardClick(exercise)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          🎸 GuitarLearn — Free browser-based guitar learning.
          <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
            Use ← → to change root note • Space to stop • Click open strings to hear them
          </span>
        </p>
      </footer>
    </div>
  );
}
