// =============================================================================
// scales.js — Scale definitions for the GuitarLearn app
// =============================================================================
// Each scale maps to a Tonal.js scale name via `tonalName`.
// Usage:  Scale.get(`${rootNote} ${scale.tonalName}`)
// =============================================================================

export const SCALES = [
  // ═══════════════════════════════════════════════════════════════════════════
  // FUNDAMENTAL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'major',
    name: 'Major (Ionian)',
    category: 'Fundamental',
    difficulty: 'Beginner',
    tonalName: 'major',
    description:
      'The most common scale in Western music, forming the basis of countless melodies and harmonies.',
    didYouKnow:
      'The Beatles\' "Let It Be" is built entirely on the C major scale. "Ode to Joy" by Beethoven is one of the most recognizable major-scale melodies ever written. Most nursery rhymes like "Twinkle, Twinkle, Little Star" also use this scale.',
  },
  {
    id: 'natural-minor',
    name: 'Natural Minor (Aeolian)',
    category: 'Fundamental',
    difficulty: 'Beginner',
    tonalName: 'minor',
    description:
      'The foundation of sad and moody sounds in Western music, used extensively in rock and pop.',
    didYouKnow:
      'R.E.M.\'s "Losing My Religion" uses A natural minor throughout the verse. "Stairway to Heaven" by Led Zeppelin features the A minor scale prominently. The haunting melody of "House of the Rising Sun" by The Animals is also built on natural minor.',
  },
  {
    id: 'harmonic-minor',
    name: 'Harmonic Minor',
    category: 'Fundamental',
    difficulty: 'Intermediate',
    tonalName: 'harmonic minor',
    description:
      'A minor scale with a raised 7th degree, creating a distinctive exotic tension used in classical and metal.',
    didYouKnow:
      'Yngwie Malmsteen built his entire neoclassical metal career on the harmonic minor scale. "Hava Nagila," the famous Israeli folk song, uses this scale exclusively. Ritchie Blackmore\'s solo in Deep Purple\'s "Highway Star" features blistering harmonic minor runs.',
  },
  {
    id: 'melodic-minor',
    name: 'Melodic Minor',
    category: 'Fundamental',
    difficulty: 'Intermediate',
    tonalName: 'melodic minor',
    description:
      'A minor scale with raised 6th and 7th degrees ascending, widely used in jazz improvisation.',
    didYouKnow:
      'Jazz legend Pat Metheny frequently uses the melodic minor in his compositions like "Bright Size Life." The scale is a cornerstone of bebop, heard extensively in Charlie Parker\'s solos. Classical composers like Bach used it in pieces such as the Violin Sonata No. 1 in G minor.',
  },
  {
    id: 'chromatic',
    name: 'Chromatic',
    category: 'Fundamental',
    difficulty: 'Beginner',
    tonalName: 'chromatic',
    description:
      'All twelve semitones in an octave, used for warm-up exercises and creating tension in solos.',
    didYouKnow:
      'The opening of "Flight of the Bumblebee" by Rimsky-Korsakov is one of the most famous chromatic passages. Steve Vai uses chromatic runs extensively in "For the Love of God." Jazz saxophonist John Coltrane\'s "Giant Steps" features rapid chromatic movements.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PENTATONIC
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'major-pentatonic',
    name: 'Major Pentatonic',
    category: 'Pentatonic',
    difficulty: 'Beginner',
    tonalName: 'major pentatonic',
    description:
      'A five-note scale with a bright, happy sound commonly found in country, folk, and pop music.',
    didYouKnow:
      'The Allman Brothers\' "Jessica" features the major pentatonic scale throughout its iconic melody. "My Girl" by The Temptations has one of the most recognizable major pentatonic riffs in music history. Lynyrd Skynyrd\'s "Sweet Home Alabama" intro is pure major pentatonic.',
  },
  {
    id: 'minor-pentatonic',
    name: 'Minor Pentatonic',
    category: 'Pentatonic',
    difficulty: 'Beginner',
    tonalName: 'minor pentatonic',
    description:
      'The most popular scale for rock and blues guitar, providing a simple but powerful sound palette.',
    didYouKnow:
      'The opening riff of Led Zeppelin\'s "Whole Lotta Love" is one of the most iconic minor pentatonic riffs ever. "Back in Black" by AC/DC uses E minor pentatonic for its legendary main riff. Slash\'s solo in Guns N\' Roses\' "Sweet Child O\' Mine" heavily features A minor pentatonic.',
  },
  {
    id: 'blues',
    name: 'Blues Scale',
    category: 'Pentatonic',
    difficulty: 'Beginner',
    tonalName: 'blues',
    description:
      'The minor pentatonic with an added flat 5th "blue note," essential for blues and rock soloing.',
    didYouKnow:
      'B.B. King\'s entire soloing vocabulary in songs like "The Thrill Is Gone" is rooted in the blues scale. Jimi Hendrix\'s "Red House" is a masterclass in blues scale usage. Eric Clapton\'s "Crossroads" solo showcases the raw power of the blues scale in a rock context.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'dorian',
    name: 'Dorian',
    category: 'Modes',
    difficulty: 'Intermediate',
    tonalName: 'dorian',
    description:
      'A minor mode with a raised 6th degree, giving it a jazzy, sophisticated minor feel.',
    didYouKnow:
      'Miles Davis\'s "So What" is the quintessential Dorian composition and helped launch the modal jazz era. Pink Floyd\'s "Another Brick in the Wall" uses D Dorian for its haunting guitar parts. Carlos Santana frequently solos in Dorian mode, as heard in "Oye Como Va."',
  },
  {
    id: 'phrygian',
    name: 'Phrygian',
    category: 'Modes',
    difficulty: 'Intermediate',
    tonalName: 'phrygian',
    description:
      'A dark, exotic-sounding mode with a flat 2nd degree, popular in metal and flamenco.',
    didYouKnow:
      'Metallica\'s "Wherever I May Roam" features a Phrygian riff in its iconic intro. Flamenco legend Paco de Lucía used Phrygian mode as the foundation of his guitar style. The "Jaws" theme by John Williams uses the Phrygian half-step to create its sense of dread.',
  },
  {
    id: 'lydian',
    name: 'Lydian',
    category: 'Modes',
    difficulty: 'Intermediate',
    tonalName: 'lydian',
    description:
      'A major mode with a raised 4th degree, producing a dreamy, floating, ethereal quality.',
    didYouKnow:
      'Joe Satriani\'s "Flying in a Blue Dream" uses the Lydian mode to create its soaring, otherworldly atmosphere. The "Simpsons" theme by Danny Elfman is written in Lydian. Steve Vai\'s "The Riddle" showcases Lydian\'s unique raised-4th character throughout.',
  },
  {
    id: 'mixolydian',
    name: 'Mixolydian',
    category: 'Modes',
    difficulty: 'Intermediate',
    tonalName: 'mixolydian',
    description:
      'A major mode with a flat 7th degree, giving a bluesy, dominant feel perfect for rock and funk.',
    didYouKnow:
      'The Beatles\' "Norwegian Wood" is one of the most famous Mixolydian songs in popular music. "Sweet Child O\' Mine" by Guns N\' Roses shifts into Mixolydian during the verse sections. The Grateful Dead\'s "Fire on the Mountain" rides a Mixolydian groove throughout.',
  },
  {
    id: 'locrian',
    name: 'Locrian',
    category: 'Modes',
    difficulty: 'Advanced',
    tonalName: 'locrian',
    description:
      'The darkest mode with a flat 2nd and flat 5th, rarely used as a key center but crucial for diminished harmony.',
    didYouKnow:
      'Metallica\'s "Enter Sandman" flirts with Locrian tonality in its ominous main riff. The progressive metal band Dream Theater uses Locrian passages in songs like "The Glass Prison." It\'s the rarest mode in popular music because its diminished tonic chord lacks stability.',
  },
  {
    id: 'phrygian-dominant',
    name: 'Phrygian Dominant',
    category: 'Modes',
    difficulty: 'Advanced',
    tonalName: 'phrygian dominant',
    description:
      'The 5th mode of harmonic minor with a Middle Eastern/Spanish character, popular in metal and flamenco fusion.',
    didYouKnow:
      'Dick Dale\'s "Misirlou" (the Pulp Fiction surf guitar theme) is built on the Phrygian Dominant scale. Marty Friedman used it extensively during his time with Megadeth on songs like "Tornado of Souls." It\'s the scale that gives traditional Middle Eastern and Klezmer music its distinctive sound.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADVANCED
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'whole-tone',
    name: 'Whole Tone',
    category: 'Advanced',
    difficulty: 'Advanced',
    tonalName: 'whole tone',
    description:
      'A symmetrical scale of all whole steps, creating an ambiguous, dreamy, floating sound.',
    didYouKnow:
      'Claude Debussy used the whole tone scale extensively in pieces like "Voiles" to create impressionistic textures. Stevie Wonder\'s "You Are the Sunshine of My Life" features whole tone passages. Jazz pianist Thelonious Monk incorporated whole tone runs into many of his improvisations.',
  },
  {
    id: 'diminished-half-whole',
    name: 'Diminished (Half-Whole)',
    category: 'Advanced',
    difficulty: 'Advanced',
    tonalName: 'half-whole diminished',
    description:
      'An eight-note symmetrical scale alternating half and whole steps, used for creating tension over dominant chords.',
    didYouKnow:
      'Jazz guitarist Pat Martino is known for his masterful use of diminished scales in improvisations. Allan Holdsworth used diminished patterns to create his signature "outside" sound. The scale appears frequently in bebop, particularly in the playing of Charlie Parker and Dizzy Gillespie.',
  },
  {
    id: 'diminished-whole-half',
    name: 'Diminished (Whole-Half)',
    category: 'Advanced',
    difficulty: 'Advanced',
    tonalName: 'whole-half diminished',
    description:
      'An eight-note symmetrical scale alternating whole and half steps, used over diminished chords.',
    didYouKnow:
      'John Coltrane used the whole-half diminished scale in many of his compositions, including passages of "A Love Supreme." Chick Corea frequently employed this scale in fusion classics like those on the "Return to Forever" albums. It\'s a staple of jazz education, taught at Berklee College of Music as essential vocabulary.',
  },
  {
    id: 'hungarian-minor',
    name: 'Hungarian Minor',
    category: 'Advanced',
    difficulty: 'Advanced',
    tonalName: 'hungarian minor',
    description:
      'A dramatic scale with two augmented seconds, evoking Eastern European folk music and Romani tradition.',
    didYouKnow:
      'Franz Liszt used the Hungarian minor scale in his famous "Hungarian Rhapsodies" to evoke Romani musical traditions. Ritchie Blackmore occasionally incorporated it into Rainbow songs like "Gates of Babylon." Modern metal guitarist Marty Friedman uses it as part of his exotic-sounding melodic vocabulary.',
  },
  {
    id: 'japanese-in-sen',
    name: 'Japanese Pentatonic (In Sen)',
    category: 'Advanced',
    difficulty: 'Advanced',
    tonalName: 'in-sen',
    description:
      'A Japanese five-note scale with a haunting, sparse quality used in traditional and ambient music.',
    didYouKnow:
      'The In Sen scale gives traditional shakuhachi flute music its characteristic meditative quality. Composer Toru Takemitsu used Japanese pentatonic scales in his guitar piece "All in Twilight." Post-rock band Mono draws from Japanese scales to create their cinematic, atmospheric guitar textures.',
  },
];

export default SCALES;
