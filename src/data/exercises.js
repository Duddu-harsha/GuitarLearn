// =============================================================================
// exercises.js — Exercise definitions with sequence generators
// =============================================================================
// Each exercise includes a `generateSequence(rootNote)` function that returns
// an array of { note, string, fret, finger, duration } objects.
//
// String indices: 0 = high E (E4), 1 = B, 2 = G, 3 = D, 4 = A, 5 = low E (E2)
// Standard tuning MIDI values: [64, 59, 55, 50, 45, 40]
// =============================================================================

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const openStringMidi = [64, 59, 55, 50, 45, 40];

/** Convert a MIDI number to scientific pitch notation (e.g. 60 → 'C4'). */
function midiToNote(midi) {
  return NOTE_NAMES[midi % 12] + Math.floor(midi / 12 - 1);
}

/** Get the note name for a given string index and fret number. */
function stringFretToNote(stringIdx, fret) {
  return midiToNote(openStringMidi[stringIdx] + fret);
}

// =============================================================================
// Exercises
// =============================================================================

export const EXERCISES = [
  // ═══════════════════════════════════════════════════════════════════════════
  // DEXTERITY & FINGER INDEPENDENCE
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'chromatic-crawl',
    name: 'Chromatic Crawl',
    category: 'Dexterity & Finger Independence',
    description:
      'Build finger independence by playing frets 1-2-3-4 ascending across all strings, then 4-3-2-1 descending.',
    fingerPattern: [1, 2, 3, 4],
    generateSequence() {
      const seq = [];
      // Ascending: low E (5) → high E (0), frets 1-2-3-4
      for (let s = 5; s >= 0; s--) {
        for (let fret = 1; fret <= 4; fret++) {
          seq.push({
            note: stringFretToNote(s, fret),
            string: s,
            fret,
            finger: fret,
            duration: '8n',
          });
        }
      }
      // Descending: high E (0) → low E (5), frets 4-3-2-1
      for (let s = 0; s <= 5; s++) {
        for (let fret = 4; fret >= 1; fret--) {
          seq.push({
            note: stringFretToNote(s, fret),
            string: s,
            fret,
            finger: fret,
            duration: '8n',
          });
        }
      }
      return seq;
    },
  },

  {
    id: 'spider-walk',
    name: 'Spider Walk',
    category: 'Dexterity & Finger Independence',
    description:
      'Improve stretch and coordination with shifting 4-note patterns that move up the neck on each string.',
    fingerPattern: [1, 2, 3, 4],
    generateSequence() {
      const seq = [];
      const patterns = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        [4, 5, 6, 7],
      ];
      // Play each pattern on strings 5 → 0
      for (const pattern of patterns) {
        for (let s = 5; s >= 0; s--) {
          for (let i = 0; i < pattern.length; i++) {
            seq.push({
              note: stringFretToNote(s, pattern[i]),
              string: s,
              fret: pattern[i],
              finger: i + 1,
              duration: '8n',
            });
          }
        }
      }
      return seq;
    },
  },

  {
    id: 'reverse-spider',
    name: 'Reverse Spider',
    category: 'Dexterity & Finger Independence',
    description:
      'The spider walk in reverse — descending fret patterns on each string to build backward finger control.',
    fingerPattern: [4, 3, 2, 1],
    generateSequence() {
      const seq = [];
      const patterns = [
        [4, 3, 2, 1],
        [5, 4, 3, 2],
        [6, 5, 4, 3],
        [7, 6, 5, 4],
      ];
      for (const pattern of patterns) {
        for (let s = 5; s >= 0; s--) {
          for (let i = 0; i < pattern.length; i++) {
            seq.push({
              note: stringFretToNote(s, pattern[i]),
              string: s,
              fret: pattern[i],
              finger: 4 - i,
              duration: '8n',
            });
          }
        }
      }
      return seq;
    },
  },

  {
    id: 'string-skip-1-3',
    name: 'String Skip 1-3',
    category: 'Dexterity & Finger Independence',
    description:
      'Practice skipping between strings 0 (high E) and 2 (G) at various frets to build accuracy.',
    fingerPattern: [1, 2, 3, 4],
    generateSequence() {
      const seq = [];
      for (let fret = 1; fret <= 5; fret++) {
        // high E
        seq.push({
          note: stringFretToNote(0, fret),
          string: 0,
          fret,
          finger: fret <= 4 ? fret : 4,
          duration: '8n',
        });
        // G string
        seq.push({
          note: stringFretToNote(2, fret),
          string: 2,
          fret,
          finger: fret <= 4 ? fret : 4,
          duration: '8n',
        });
      }
      // Descend
      for (let fret = 5; fret >= 1; fret--) {
        seq.push({
          note: stringFretToNote(2, fret),
          string: 2,
          fret,
          finger: fret <= 4 ? fret : 4,
          duration: '8n',
        });
        seq.push({
          note: stringFretToNote(0, fret),
          string: 0,
          fret,
          finger: fret <= 4 ? fret : 4,
          duration: '8n',
        });
      }
      return seq;
    },
  },

  {
    id: 'string-skip-2-4',
    name: 'String Skip 2-4',
    category: 'Dexterity & Finger Independence',
    description:
      'Practice skipping between strings 1 (B) and 3 (D) at various frets for pick-hand accuracy.',
    fingerPattern: [1, 2, 3, 4],
    generateSequence() {
      const seq = [];
      for (let fret = 1; fret <= 5; fret++) {
        // B string
        seq.push({
          note: stringFretToNote(1, fret),
          string: 1,
          fret,
          finger: fret <= 4 ? fret : 4,
          duration: '8n',
        });
        // D string
        seq.push({
          note: stringFretToNote(3, fret),
          string: 3,
          fret,
          finger: fret <= 4 ? fret : 4,
          duration: '8n',
        });
      }
      for (let fret = 5; fret >= 1; fret--) {
        seq.push({
          note: stringFretToNote(3, fret),
          string: 3,
          fret,
          finger: fret <= 4 ? fret : 4,
          duration: '8n',
        });
        seq.push({
          note: stringFretToNote(1, fret),
          string: 1,
          fret,
          finger: fret <= 4 ? fret : 4,
          duration: '8n',
        });
      }
      return seq;
    },
  },

  {
    id: 'cross-string-crawl',
    name: 'Cross-String Crawl',
    category: 'Dexterity & Finger Independence',
    description:
      'Place each finger on a different string, then shift the entire shape up the neck for coordination.',
    fingerPattern: [1, 2, 3, 4],
    generateSequence() {
      const seq = [];
      // 4 positions shifting up the neck
      for (let baseFret = 1; baseFret <= 4; baseFret++) {
        // finger 1 on low E (string 5), finger 2 on A (4), finger 3 on D (3), finger 4 on G (2)
        const assignments = [
          { string: 5, fret: baseFret, finger: 1 },
          { string: 4, fret: baseFret + 1, finger: 2 },
          { string: 3, fret: baseFret + 2, finger: 3 },
          { string: 2, fret: baseFret + 3, finger: 4 },
        ];
        for (const a of assignments) {
          seq.push({
            note: stringFretToNote(a.string, a.fret),
            string: a.string,
            fret: a.fret,
            finger: a.finger,
            duration: '8n',
          });
        }
        // Reverse back down
        for (let i = assignments.length - 1; i >= 0; i--) {
          const a = assignments[i];
          seq.push({
            note: stringFretToNote(a.string, a.fret),
            string: a.string,
            fret: a.fret,
            finger: a.finger,
            duration: '8n',
          });
        }
      }
      return seq;
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SCALES AS EXERCISES
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'one-string-major',
    name: 'One String Major Scale',
    category: 'Scales as Exercises',
    description:
      'Play the C major scale entirely on the B string to learn the whole/half step pattern linearly.',
    fingerPattern: [1, 2, 3, 4],
    generateSequence() {
      const seq = [];
      // C major intervals in semitones on the B string (string 1)
      // B string open = B3. C4 is fret 1.
      // C major: C D E F G A B C  → frets: 1 3 5 6 8 10 12 13
      const frets = [1, 3, 5, 6, 8, 10, 12, 13];
      const fingerMap = [1, 3, 1, 1, 3, 1, 3, 4]; // simplified fingering

      // Ascending
      for (let i = 0; i < frets.length; i++) {
        seq.push({
          note: stringFretToNote(1, frets[i]),
          string: 1,
          fret: frets[i],
          finger: fingerMap[i],
          duration: '8n',
        });
      }
      // Descending
      for (let i = frets.length - 2; i >= 0; i--) {
        seq.push({
          note: stringFretToNote(1, frets[i]),
          string: 1,
          fret: frets[i],
          finger: fingerMap[i],
          duration: '8n',
        });
      }
      return seq;
    },
  },

  {
    id: 'two-string-pentatonic',
    name: 'Two-String Pentatonic',
    category: 'Scales as Exercises',
    description:
      'Practice the A minor pentatonic across only the A and low E strings for focused fretboard learning.',
    fingerPattern: [1, 3, 4],
    generateSequence() {
      const seq = [];
      // A minor pentatonic: A C D E G
      // Low E string (5): A=fret 5, C=fret 8
      // A string (4): D=fret 5, E=fret 7, G=fret 10 (a bit far, let's use open + frets)
      // Practical pattern:
      // String 5 (E2): frets 0 (E), 3 (G) — or start from A at fret 5
      // Let's do A minor pent starting on low E open position:
      // String 5: E2(0), G2(3)
      // String 4: A2(0), C3(3), D3(5)
      // Then descend

      const notes = [
        { string: 5, fret: 0, finger: 0 },  // E2 (open)
        { string: 5, fret: 3, finger: 3 },  // G2
        { string: 4, fret: 0, finger: 0 },  // A2 (open)
        { string: 4, fret: 2, finger: 2 },  // B2 — wait, that's not pentatonic
      ];

      // Correct A minor pentatonic on strings 4 and 5:
      // A C D E G A C D E
      // String 5: A(5), C(8)
      // String 4: D(5), E(7), G(10) — stretch, but valid
      const pattern = [
        { string: 5, fret: 5, finger: 1 },   // A2
        { string: 5, fret: 8, finger: 4 },   // C3
        { string: 4, fret: 5, finger: 1 },   // D3
        { string: 4, fret: 7, finger: 3 },   // E3
        { string: 4, fret: 10, finger: 1 },  // G3 (shift)
        { string: 4, fret: 12, finger: 3 },  // A3
      ];

      // Ascending
      for (const p of pattern) {
        seq.push({
          note: stringFretToNote(p.string, p.fret),
          string: p.string,
          fret: p.fret,
          finger: p.finger,
          duration: '8n',
        });
      }
      // Descending
      for (let i = pattern.length - 2; i >= 0; i--) {
        seq.push({
          note: stringFretToNote(pattern[i].string, pattern[i].fret),
          string: pattern[i].string,
          fret: pattern[i].fret,
          finger: pattern[i].finger,
          duration: '8n',
        });
      }
      return seq;
    },
  },

  {
    id: 'position-shift',
    name: 'Position Shift Exercise',
    category: 'Scales as Exercises',
    description:
      'Play a C major fragment in a 3-fret box, then shift the entire hand up one fret and repeat.',
    fingerPattern: [1, 2, 3],
    generateSequence() {
      const seq = [];
      // C major fragments shifting up: start at fret 0, go through fret 7
      // On the G string (2): play 3 chromatic-ish frets each position, shifting up
      for (let pos = 0; pos <= 4; pos++) {
        // 3 notes per position on strings 2 and 1
        for (let finger = 0; finger < 3; finger++) {
          const fret = pos + finger;
          seq.push({
            note: stringFretToNote(2, fret),
            string: 2,
            fret,
            finger: finger + 1,
            duration: '8n',
          });
        }
        for (let finger = 0; finger < 3; finger++) {
          const fret = pos + finger;
          seq.push({
            note: stringFretToNote(1, fret),
            string: 1,
            fret,
            finger: finger + 1,
            duration: '8n',
          });
        }
      }
      return seq;
    },
  },

  {
    id: 'three-note-per-string-major',
    name: 'Three-Note-Per-String Major',
    category: 'Scales as Exercises',
    description:
      'Play the major scale with exactly 3 notes on each string for efficient position-based playing.',
    fingerPattern: [1, 2, 4],
    generateSequence() {
      const seq = [];
      // G major, 3 notes per string, starting from string 5 (low E)
      // String 5 (E2): G(3) A(5) B(7)   → fingers 1 3 4  (or 1 2 4)
      // String 4 (A2): C(3) D(5) E(7)
      // String 3 (D3): F#(4) G(5) A(7)
      // String 2 (G3): B(4) C(5) D(7)
      // String 1 (B3): E(5) F#(7) G(8)
      // String 0 (E4): A(5) B(7) C(8)

      const patterns = [
        { string: 5, frets: [3, 5, 7] },
        { string: 4, frets: [3, 5, 7] },
        { string: 3, frets: [4, 5, 7] },
        { string: 2, frets: [4, 5, 7] },
        { string: 1, frets: [5, 7, 8] },
        { string: 0, frets: [5, 7, 8] },
      ];

      const fingerForSpread = (frets) => {
        const span = frets[2] - frets[0];
        if (span <= 3) return [1, 2, 4];
        return [1, 3, 4];
      };

      // Ascending
      for (const p of patterns) {
        const fingers = fingerForSpread(p.frets);
        for (let i = 0; i < 3; i++) {
          seq.push({
            note: stringFretToNote(p.string, p.frets[i]),
            string: p.string,
            fret: p.frets[i],
            finger: fingers[i],
            duration: '8n',
          });
        }
      }
      // Descending
      for (let pi = patterns.length - 1; pi >= 0; pi--) {
        const p = patterns[pi];
        const fingers = fingerForSpread(p.frets);
        for (let i = 2; i >= 0; i--) {
          seq.push({
            note: stringFretToNote(p.string, p.frets[i]),
            string: p.string,
            fret: p.frets[i],
            finger: fingers[i],
            duration: '8n',
          });
        }
      }
      return seq;
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECHNIQUE BUILDERS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'hammer-on-pattern',
    name: 'Hammer-On Pattern',
    category: 'Technique Builders',
    description:
      'Pick a note then hammer onto the next fret — builds left-hand strength and legato technique.',
    fingerPattern: [1, 2],
    generateSequence() {
      const seq = [];
      // Hammer-on pairs on strings 5 → 0, frets 5→6, 6→7, 7→8
      for (let s = 5; s >= 2; s--) {
        for (let baseFret = 5; baseFret <= 7; baseFret++) {
          // Pick
          seq.push({
            note: stringFretToNote(s, baseFret),
            string: s,
            fret: baseFret,
            finger: 1,
            duration: '8n',
            technique: 'pick',
          });
          // Hammer-on
          seq.push({
            note: stringFretToNote(s, baseFret + 1),
            string: s,
            fret: baseFret + 1,
            finger: 2,
            duration: '8n',
            technique: 'hammer-on',
          });
        }
      }
      return seq;
    },
  },

  {
    id: 'pull-off-pattern',
    name: 'Pull-Off Pattern',
    category: 'Technique Builders',
    description:
      'Pick a note then pull off to the previous fret — complements hammer-ons for smooth legato.',
    fingerPattern: [2, 1],
    generateSequence() {
      const seq = [];
      // Pull-off pairs on strings 5 → 2, frets 8→7, 7→6, 6→5
      for (let s = 5; s >= 2; s--) {
        for (let baseFret = 8; baseFret >= 6; baseFret--) {
          // Pick
          seq.push({
            note: stringFretToNote(s, baseFret),
            string: s,
            fret: baseFret,
            finger: 2,
            duration: '8n',
            technique: 'pick',
          });
          // Pull-off
          seq.push({
            note: stringFretToNote(s, baseFret - 1),
            string: s,
            fret: baseFret - 1,
            finger: 1,
            duration: '8n',
            technique: 'pull-off',
          });
        }
      }
      return seq;
    },
  },

  {
    id: 'trill-exercise',
    name: 'Trill Exercise',
    category: 'Technique Builders',
    description:
      'Rapidly alternate between two adjacent frets on one string to develop speed and finger stamina.',
    fingerPattern: [1, 2],
    generateSequence() {
      const seq = [];
      // Trill: 4 rapid alternations per string, on strings 5 → 2
      const trillFrets = [5, 7, 9]; // three positions
      for (const baseFret of trillFrets) {
        for (let s = 5; s >= 2; s--) {
          // 4 alternations = 8 notes
          for (let rep = 0; rep < 4; rep++) {
            seq.push({
              note: stringFretToNote(s, baseFret),
              string: s,
              fret: baseFret,
              finger: 1,
              duration: '16n',
              technique: rep === 0 ? 'pick' : 'hammer-on',
            });
            seq.push({
              note: stringFretToNote(s, baseFret + 1),
              string: s,
              fret: baseFret + 1,
              finger: 2,
              duration: '16n',
              technique: 'pull-off',
            });
          }
        }
      }
      return seq;
    },
  },

  {
    id: 'alternate-picking',
    name: 'Alternate Picking Pattern',
    category: 'Technique Builders',
    description:
      'Chromatic scale with strict down-up picking notation to develop even, controlled picking.',
    fingerPattern: [1, 2, 3, 4],
    generateSequence() {
      const seq = [];
      // Chromatic frets 5-8 on strings 5 → 0, with picking direction
      let downstroke = true;
      for (let s = 5; s >= 0; s--) {
        for (let fret = 5; fret <= 8; fret++) {
          seq.push({
            note: stringFretToNote(s, fret),
            string: s,
            fret,
            finger: fret - 4,
            duration: '8n',
            technique: downstroke ? 'downstroke' : 'upstroke',
          });
          downstroke = !downstroke;
        }
      }
      return seq;
    },
  },

  {
    id: 'legato-run',
    name: 'Legato Run',
    category: 'Technique Builders',
    description:
      'Play a G major scale using only hammer-ons ascending and pull-offs descending for smooth legato.',
    fingerPattern: [1, 2, 4],
    generateSequence() {
      const seq = [];
      // G major 3-note-per-string ascending with hammer-ons
      const patterns = [
        { string: 5, frets: [3, 5, 7] },
        { string: 4, frets: [3, 5, 7] },
        { string: 3, frets: [4, 5, 7] },
        { string: 2, frets: [4, 5, 7] },
      ];

      // Ascending — pick first note of each string, hammer the rest
      for (const p of patterns) {
        for (let i = 0; i < 3; i++) {
          seq.push({
            note: stringFretToNote(p.string, p.frets[i]),
            string: p.string,
            fret: p.frets[i],
            finger: i === 0 ? 1 : i === 1 ? 2 : 4,
            duration: '8n',
            technique: i === 0 ? 'pick' : 'hammer-on',
          });
        }
      }

      // Descending — pick first note of each string, pull off the rest
      for (let pi = patterns.length - 1; pi >= 0; pi--) {
        const p = patterns[pi];
        for (let i = 2; i >= 0; i--) {
          seq.push({
            note: stringFretToNote(p.string, p.frets[i]),
            string: p.string,
            fret: p.frets[i],
            finger: i === 0 ? 1 : i === 1 ? 2 : 4,
            duration: '8n',
            technique: i === 2 ? 'pick' : 'pull-off',
          });
        }
      }
      return seq;
    },
  },

  {
    id: 'vibrato-prep',
    name: 'Vibrato Prep',
    category: 'Technique Builders',
    description:
      'Play single notes with longer durations to practice controlled vibrato technique.',
    fingerPattern: [1, 2, 3],
    generateSequence() {
      const seq = [];
      // Long sustained notes on different strings and frets
      const targets = [
        { string: 2, fret: 5, finger: 1 },  // G string, fret 5 = C4
        { string: 2, fret: 7, finger: 3 },  // G string, fret 7 = D4
        { string: 1, fret: 5, finger: 1 },  // B string, fret 5 = E4
        { string: 1, fret: 7, finger: 3 },  // B string, fret 7 = F#4
        { string: 0, fret: 5, finger: 1 },  // high E string, fret 5 = A4
        { string: 0, fret: 7, finger: 3 },  // high E string, fret 7 = B4
        { string: 0, fret: 8, finger: 4 },  // high E string, fret 8 = C5
        { string: 3, fret: 7, finger: 3 },  // D string, fret 7 = A3
        { string: 3, fret: 5, finger: 1 },  // D string, fret 5 = G3
        { string: 2, fret: 7, finger: 3 },  // G string, fret 7 = D4
        { string: 2, fret: 5, finger: 1 },  // G string, fret 5 = C4
        { string: 1, fret: 5, finger: 1 },  // B string, fret 5 = E4
      ];

      for (const t of targets) {
        seq.push({
          note: stringFretToNote(t.string, t.fret),
          string: t.string,
          fret: t.fret,
          finger: t.finger,
          duration: '2n', // half note — hold for vibrato
          technique: 'vibrato',
        });
      }
      return seq;
    },
  },
];

export default EXERCISES;
