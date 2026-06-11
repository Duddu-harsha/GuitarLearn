/**
 * audioEngine.js
 * 
 * Core audio engine for GuitarLearn — manages Tone.js samplers,
 * metronome, and sequenced playback of guitar notes.
 */
import * as Tone from 'tone';

// ---------------------------------------------------------------------------
// Sampler cache & creation
// ---------------------------------------------------------------------------

/** Cache of loaded Tone.Sampler instances, keyed by guitar type name */
const samplerCache = {};

/** Track which samplers have finished loading all buffers */
const samplerLoaded = {};

/**
 * Creates a Tone.Sampler from a guitar-type configuration object.
 * @param {{ urls: Record<string,string>, release: number, baseUrl: string }} config
 * @returns {Tone.Sampler}
 */
export function createSampler(config) {
  const sampler = new Tone.Sampler({
    urls: config.urls,
    release: config.release ?? 1,
    baseUrl: config.baseUrl,
    onload: () => {
      // Mark this sampler as fully loaded
      for (const [key, cached] of Object.entries(samplerCache)) {
        if (cached === sampler) {
          samplerLoaded[key] = true;
        }
      }
    },
  }).toDestination();

  return sampler;
}

/**
 * Returns a cached sampler for the given guitar type, or creates &
 * caches a new one using the matching entry in `guitarTypesData`.
 */
export function getSampler(guitarType, guitarTypesData) {
  if (samplerCache[guitarType]) {
    return samplerCache[guitarType];
  }

  const config = guitarTypesData[guitarType];
  if (!config) {
    throw new Error(`Unknown guitar type: "${guitarType}"`);
  }

  const sampler = createSampler(config.samplerConfig || config);
  samplerCache[guitarType] = sampler;
  samplerLoaded[guitarType] = false;
  return sampler;
}

/**
 * Checks if a specific guitar type's sampler is fully loaded.
 */
export function isSamplerLoaded(guitarType) {
  return !!samplerLoaded[guitarType];
}

/**
 * Waits until every queued Tone.js buffer has finished loading.
 * @returns {Promise<void>}
 */
export function waitForLoad() {
  return Tone.loaded();
}

// ---------------------------------------------------------------------------
// Single note playback (for clicking on fretboard/open strings)
// ---------------------------------------------------------------------------

/**
 * Play a single note on the given sampler.
 * Safely handles the case where buffers aren't loaded yet.
 */
export function playNote(noteName, sampler) {
  if (!sampler) return;
  try {
    sampler.triggerAttackRelease(noteName, '8n');
  } catch (err) {
    console.warn('Could not play note:', noteName, err.message);
  }
}

// ---------------------------------------------------------------------------
// Playback engine state
// ---------------------------------------------------------------------------

/** ID returned by Tone.Transport.scheduleRepeat — used to cancel playback */
let currentScheduleId = null;

/** Whether the engine is currently stepping through a note sequence */
let isCurrentlyPlaying = false;

/**
 * Starts sequenced playback of a note array.
 */
export async function startPlayback({
  notes,
  bpm,
  sampler,
  onStep,
  onComplete,
}) {
  // Satisfy the browser autoplay policy
  await Tone.start();

  // Stop any previous playback first
  stopPlayback();

  // Wait for all buffers to load before starting
  await Tone.loaded();

  Tone.Transport.bpm.value = bpm;
  isCurrentlyPlaying = true;

  let stepIndex = 0;
  const totalSteps = notes.length;

  currentScheduleId = Tone.Transport.scheduleRepeat((time) => {
    if (stepIndex >= totalSteps) {
      // Sequence complete — clean up on the next draw frame
      Tone.Draw.schedule(() => {
        stopPlayback();
        if (onComplete) onComplete();
      }, time);
      return;
    }

    const currentNote = notes[stepIndex];
    const idx = stepIndex; // capture for closure

    // Trigger the guitar note (with safety check)
    if (currentNote && currentNote.note) {
      try {
        sampler.triggerAttackRelease(currentNote.note, '4n', time);
      } catch (err) {
        // Buffer might not be loaded for this specific note — skip it
        console.warn('Skipping note:', currentNote.note, err.message);
      }
    }

    // UI callback — run inside Draw.schedule so it fires on the
    // animation frame closest to the audio event
    Tone.Draw.schedule(() => {
      if (onStep) onStep(idx);
    }, time);

    stepIndex++;
  }, '4n'); // one note per quarter-note

  Tone.Transport.start();
}

/**
 * Immediately stops playback, clears the scheduled sequence,
 * and resets internal state.
 */
export function stopPlayback() {
  if (currentScheduleId !== null) {
    Tone.Transport.clear(currentScheduleId);
    currentScheduleId = null;
  }

  Tone.Transport.stop();
  Tone.Transport.cancel(); // remove all remaining scheduled events
  isCurrentlyPlaying = false;
}

/**
 * Updates the Transport BPM in real-time (even while playing).
 */
export function setBpm(bpm) {
  Tone.Transport.bpm.value = bpm;
}

/**
 * @returns {boolean} Whether the engine is currently playing.
 */
export function isPlaying() {
  return isCurrentlyPlaying;
}

/**
 * Ensures the Web Audio context has been started (required after a
 * user gesture in most browsers).
 */
export async function ensureAudioContext() {
  if (Tone.context.state !== 'running') {
    await Tone.start();
  }
}
