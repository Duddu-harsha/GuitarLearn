/**
 * noteUtils.js
 *
 * Utility functions for note / fretboard calculations used
 * throughout the GuitarLearn app.
 */
import { Scale, Note } from 'tonal';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Chromatic note names (sharps only, no enharmonic flats) */
export const NOTE_NAMES = [
  'C', 'C#', 'D', 'D#', 'E', 'F',
  'F#', 'G', 'G#', 'A', 'A#', 'B',
];

/**
 * MIDI note numbers for each open string (standard tuning).
 * Index 0 = highest-pitched string (high-e / E4),
 * index 5 = lowest-pitched string (low-E / E2).
 */
export const OPEN_STRING_MIDI = [64, 59, 55, 50, 45, 40];

/** Human-readable names for each string (index 0–5) */
export const STRING_NAMES = ['e', 'B', 'G', 'D', 'A', 'E'];

// ---------------------------------------------------------------------------
// MIDI ↔ Note conversions
// ---------------------------------------------------------------------------

/**
 * Converts a MIDI note number to a note name with octave (e.g. 60 → 'C4').
 * @param {number} midi
 * @returns {string}
 */
export function midiToNote(midi) {
  const octave = Math.floor(midi / 12) - 1;
  const noteIndex = midi % 12;
  return `${NOTE_NAMES[noteIndex]}${octave}`;
}

/**
 * Converts a note name (e.g. 'C4') to its MIDI number.
 * Falls back to a manual calculation if Tonal returns null.
 * @param {string} noteName
 * @returns {number|null}
 */
export function noteToMidi(noteName) {
  const midi = Note.midi(noteName);
  return midi !== undefined ? midi : null;
}

// ---------------------------------------------------------------------------
// String / fret helpers
// ---------------------------------------------------------------------------

/**
 * Returns the note name (with octave) for a given string and fret.
 * @param {number} stringIdx — 0 = high-e … 5 = low-E
 * @param {number} fret      — 0-24
 * @returns {string}
 */
export function stringFretToNote(stringIdx, fret) {
  const midi = OPEN_STRING_MIDI[stringIdx] + fret;
  return midiToNote(midi);
}

/**
 * Returns the MIDI number for a given string and fret.
 * @param {number} stringIdx
 * @param {number} fret
 * @returns {number}
 */
export function stringFretToMidi(stringIdx, fret) {
  return OPEN_STRING_MIDI[stringIdx] + fret;
}

// ---------------------------------------------------------------------------
// Position finding
// ---------------------------------------------------------------------------

/**
 * Finds ALL (string, fret) positions on the guitar where a given
 * note (with octave, e.g. 'E4') can be played. Searches frets 0–24.
 *
 * @param {string} noteName — e.g. 'C4'
 * @returns {{ string: number, fret: number, stringName: string }[]}
 */
export function findNotePositions(noteName) {
  const targetMidi = noteToMidi(noteName);
  if (targetMidi === null) return [];

  const positions = [];

  for (let s = 0; s < 6; s++) {
    const fret = targetMidi - OPEN_STRING_MIDI[s];
    if (fret >= 0 && fret <= 24) {
      positions.push({
        string: s,
        fret,
        stringName: STRING_NAMES[s],
      });
    }
  }

  return positions;
}

/**
 * Picks the single "best" position for a note — preferring positions
 * close to `lastPosition` (for natural fretting-hand movement) and
 * optionally a `preferredString`.
 *
 * @param {string}  noteName
 * @param {number|null}  preferredString — string index to prefer, or null
 * @param {{ string: number, fret: number }|null} lastPosition
 * @returns {{ string: number, fret: number, stringName: string }|null}
 */
export function findBestPosition(noteName, preferredString = null, lastPosition = null) {
  const positions = findNotePositions(noteName);
  if (positions.length === 0) return null;
  if (positions.length === 1) return positions[0];

  // Score each position — lower is better
  let best = positions[0];
  let bestScore = Infinity;

  for (const pos of positions) {
    let score = 0;

    // Prefer the requested string
    if (preferredString !== null && pos.string !== preferredString) {
      score += 5;
    }

    // Prefer positions close to the last played fret
    if (lastPosition) {
      score += Math.abs(pos.fret - lastPosition.fret) * 2;
      score += Math.abs(pos.string - lastPosition.string);
    }

    // Slightly prefer lower frets (open strings / first position playing)
    score += pos.fret * 0.1;

    if (score < bestScore) {
      bestScore = score;
      best = pos;
    }
  }

  return best;
}

// ---------------------------------------------------------------------------
// Scale helpers
// ---------------------------------------------------------------------------

/**
 * Normalises a note name to sharp spelling so it matches NOTE_NAMES.
 * e.g. 'Db' → 'C#', 'Eb' → 'D#'
 * @param {string} note — note letter + optional accidental (no octave)
 * @returns {string}
 */
function normaliseToSharp(note) {
  // Use Tonal to get the chroma index, then map back through NOTE_NAMES
  const chroma = Note.chroma(note);
  if (chroma === undefined || chroma === null) return note;
  return NOTE_NAMES[chroma];
}

/**
 * Returns just the note names (without octave) in a scale.
 * @param {string} rootNote  — e.g. 'C'
 * @param {string} scaleName — e.g. 'major', 'minor pentatonic'
 * @returns {string[]}
 */
export function getScaleNoteNames(rootNote, scaleName) {
  const scale = Scale.get(`${rootNote} ${scaleName}`);
  if (!scale || scale.empty) return [];
  return scale.notes.map(normaliseToSharp);
}

/**
 * Builds a playable ascending + descending sequence for a scale,
 * mapping notes to concrete guitar positions.
 *
 * @param {string} rootNote  — e.g. 'C'
 * @param {string} scaleName — e.g. 'major'
 * @returns {{ note: string, string: number, fret: number }[]}
 */
export function buildScaleSequence(rootNote, scaleName) {
  const scale = Scale.get(`${rootNote} ${scaleName}`);
  if (!scale || scale.empty) return [];

  const scaleNotes = scale.notes.map(normaliseToSharp);

  // Build ascending notes across a comfortable guitar range.
  // We start from octave 2 and go up to octave 5 to cover
  // the typical E2–E5 guitar range.
  const ascendingNotes = [];
  const minMidi = noteToMidi('E2'); // 40
  const maxMidi = noteToMidi('E5'); // 76

  for (let octave = 2; octave <= 5; octave++) {
    for (const noteName of scaleNotes) {
      const fullNote = `${noteName}${octave}`;
      const midi = noteToMidi(fullNote);
      if (midi !== null && midi >= minMidi && midi <= maxMidi) {
        ascendingNotes.push(fullNote);
      }
    }
  }

  // Map each note to its best guitar position, walking naturally
  // up the fretboard.
  let lastPos = null;
  const ascending = ascendingNotes.map((note) => {
    const pos = findBestPosition(note, null, lastPos);
    if (pos) {
      lastPos = pos;
      return { note, string: pos.string, fret: pos.fret };
    }
    return { note, string: 0, fret: 0 };
  });

  // Descending = reversed without repeating the top note
  const descending = ascending.length > 1
    ? [...ascending].reverse().slice(1)
    : [];

  return [...ascending, ...descending];
}

/**
 * Returns ALL positions on the fretboard (frets 0–12) where any note
 * of the given scale can be found. Used for scale-overlay visualisation.
 *
 * @param {string} rootNote  — e.g. 'C'
 * @param {string} scaleName — e.g. 'major'
 * @returns {{ note: string, string: number, fret: number, isRoot: boolean }[]}
 */
export function buildScalePositions(rootNote, scaleName) {
  const scaleNotes = getScaleNoteNames(rootNote, scaleName);
  if (scaleNotes.length === 0) return [];

  const rootNorm = normaliseToSharp(rootNote);
  const positions = [];

  for (let s = 0; s < 6; s++) {
    for (let fret = 0; fret <= 24; fret++) {
      const fullNote = stringFretToNote(s, fret);
      // Strip octave to get the pitch class
      const pitchClass = fullNote.replace(/\d+$/, '');

      if (scaleNotes.includes(pitchClass)) {
        positions.push({
          note: fullNote,
          string: s,
          fret,
          isRoot: pitchClass === rootNorm,
        });
      }
    }
  }

  return positions;
}
