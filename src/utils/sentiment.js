// Expanded AFINN dictionary with Nietzsche-specific terms
const afinn = {
  'abyss': -3, 'overcome': 2, 'nihilism': -3, 'will': 2, 'power': 3,
  'ubermensch': 4, 'eternal': 3, 'recurrence': 1, 'suffering': -3,
  'meaning': 2, 'god': -4, 'death': -3, 'life': 3, 'value': 2,
  'truth': 1, 'lie': -2, 'morality': -1, 'free': 2, 'spirit': 2,
  'affirm': 3, 'deny': -3, 'strength': 3, 'weak': -2, 'noble': 3,
  'slave': -2, 'dionysian': 4, 'apollonian': 2, 'eternity': 3,
  'transcend': 3, 'despair': -4, 'joy': 4, 'pain': -3, 'create': 3,
  'destroy': -3, 'superior': 3, 'inferior': -2, 'virtue': 2,
  'resentment': -3, 'amor fati': 4
};

// Handle negation words
const negators = ['not', 'never', 'no', 'none', 'nobody', 'nothing'];

export const analyzeSentiment = (text) => {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  let score = 0;
  let negation = false;

  words.forEach(word => {
    // Handle negators
    if (negators.includes(word)) {
      negation = true;
      return;
    }

    if (afinn[word]) {
      const termScore = afinn[word];
      score += negation ? -termScore : termScore;
      negation = false; // Reset negation after one word
    }
  });

  // Normalize to [-1, 1] range with sigmoid function
  return 2 / (1 + Math.exp(-score / 5)) - 1;
};