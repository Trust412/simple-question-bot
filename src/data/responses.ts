export const feelingKeywords = [
  {
    keywords: [
      "happy",
      "joy",
      "excited",
      "cheerful",
      "elated",
      "joyful",
      "delighted",
      "thrilled",
      "ecstatic",
      "blissful",
      "content",
      "pleased",
      "satisfied",
      "upbeat",
      "optimistic",
      "radiant",
      "gleeful",
      "jubilant",
      "merry",
      "sunny",
      "euphoric",
      "exhilarated",
      "overjoyed",
      "blessed",
      "fortunate",
      "lucky",
      "grateful",
      "thankful",
      "appreciative",
      "fulfilled",
    ],
  },
  {
    keywords: [
      "sad",
      "down",
      "unhappy",
      "depressed",
      "blue",
      "grief",
      "gloomy",
      "melancholy",
      "heartbroken",
      "disheartened",
      "despondent",
      "dejected",
      "miserable",
      "sorrowful",
      "tearful",
      "weepy",
      "despair",
      "hopeless",
      "low",
      "downcast",
      "devastated",
      "crushed",
      "defeated",
      "disappointed",
      "discouraged",
      "dismayed",
      "distressed",
      "anguished",
      "tormented",
      "wretched",
    ],
  },
  {
    keywords: [
      "angry",
      "frustrated",
      "annoyed",
      "irritated",
      "mad",
      "rage",
      "furious",
      "enraged",
      "outraged",
      "indignant",
      "resentful",
      "bitter",
      "hostile",
      "aggressive",
      "temper",
      "irate",
      "livid",
      "seething",
      "incensed",
      "provoked",
      "infuriated",
      "exasperated",
      "aggravated",
      "vexed",
      "displeased",
      "disgruntled",
      "upset",
      "offended",
      "insulted",
      "betrayed",
    ],
  },
  {
    keywords: [
      "anxious",
      "worried",
      "nervous",
      "stressed",
      "uneasy",
      "tense",
      "apprehensive",
      "fearful",
      "panicked",
      "overwhelmed",
      "jittery",
      "edgy",
      "restless",
      "agitated",
      "concerned",
      "fretful",
      "troubled",
      "disturbed",
      "perturbed",
      "frightened",
      "scared",
      "terrified",
      "alarmed",
      "dread",
      "insecure",
      "vulnerable",
      "exposed",
      "threatened",
    ],
  },
  {
    keywords: [
      "tired",
      "exhausted",
      "drained",
      "fatigue",
      "weary",
      "burnout",
      "spent",
      "depleted",
      "worn out",
      "drowsy",
      "sleepy",
      "lethargic",
      "listless",
      "sluggish",
      "dull",
      "heavy",
      "run down",
      "overworked",
      "strained",
      "sapped",
      "weakened",
      "debilitated",
      "enervated",
      "prostrate",
    ],
  },
  {
    keywords: [
      "confused",
      "uncertain",
      "unsure",
      "lost",
      "puzzled",
      "bewildered",
      "perplexed",
      "disoriented",
      "discombobulated",
      "muddled",
      "baffled",
      "mystified",
      "disconcerted",
      "mixed up",
      "at sea",
      "in a fog",
      "dazed",
      "stumped",
      "flummoxed",
      "bamboozled",
      "befuddled",
      "confounded",
      "nonplussed",
      "stymied",
      "thwarted",
    ],
  },
  {
    keywords: [
      "hopeful",
      "optimistic",
      "expectant",
      "encouraged",
      "positive",
      "upbeat",
      "confident",
      "assured",
      "buoyant",
      "sanguine",
      "bright",
      "inspired",
      "motivated",
      "determined",
      "resolute",
      "eager",
      "enthusiastic",
      "keen",
      "aspiring",
      "ambitious",
      "driven",
      "focused",
      "purposeful",
      "committed",
      "dedicated",
      "devoted",
      "passionate",
      "zealous",
    ],
  },
  {
    keywords: [
      "grateful",
      "thankful",
      "appreciative",
      "blessed",
      "content",
      "fulfilled",
      "gratified",
      "indebted",
      "obliged",
      "pleased",
      "touched",
      "moved",
      "heartened",
      "cherished",
      "valued",
      "acknowledged",
      "recognized",
      "honored",
      "privileged",
      "favored",
      "beholden",
    ],
  },
  {
    keywords: [
      "peaceful",
      "calm",
      "serene",
      "tranquil",
      "relaxed",
      "centered",
      "balanced",
      "grounded",
      "composed",
      "collected",
      "unruffled",
      "placid",
      "still",
      "quiet",
      "undisturbed",
      "unperturbed",
      "untroubled",
      "at ease",
      "comfortable",
      "secure",
      "harmonious",
      "equanimous",
      "poised",
      "stable",
      "steady",
      "settled",
      "unflappable",
    ],
  },
  {
    keywords: [
      "lonely",
      "isolated",
      "alone",
      "disconnected",
      "separated",
      "detached",
      "alienated",
      "estranged",
      "forsaken",
      "abandoned",
      "deserted",
      "solitary",
      "lonesome",
      "forlorn",
      "desolate",
      "remote",
      "distant",
      "withdrawn",
      "secluded",
      "cut off",
      "excluded",
      "ostracized",
      "rejected",
      "unwanted",
      "unloved",
      "neglected",
      "ignored",
      "forgotten",
    ],
  },
];

function cleanInput(input: string): string {
  // Remove common words and clean up the input 
  const wordsToRemove = ['i', 'am', 'feel', 'feeling', 'was', 'my', 'going to', 'to'];
  const words = input.toLowerCase().split(' ');
  return words.filter(word => !wordsToRemove.includes(word)).join(' ');
}

function findMatchingKeywords(input: string, keywords: string[]):string[] {
  const lowerInput = input.toLowerCase();
  const inputWords = lowerInput.split(/\s+/); // Split input into words
  return keywords.filter(keyword => inputWords.includes(keyword.toLowerCase()));
}
function formatKeywords(keywords: string[]):string[] {
  if (keywords.length === 0) return [];
  if (keywords.length === 1) return [keywords[0]];
  if (keywords.length === 2) return [`${keywords[0]} and ${keywords[1]}`];
  return [...keywords.slice(0, -1), 'and ' + keywords[keywords.length - 1]];
}
function processComplexSentences(input: string):string {
  const sentences = input.split(/,/).filter(s => s.trim().length > 0);
  if (sentences.length <= 1) return input;
  const firstSentence = cleanInput(sentences[0]);
  const remainingSentences = sentences.slice(1).map(s => {
    return s.replace(/\bI\b/g, 'you')
           .replace(/\bam\b/g, 'are')
           .replace(/\bwas\b/g, 'were');
  });

  return [firstSentence, ...remainingSentences].join('. ');
}

export function generateFeelingQuestions(input: string):{ question1: string; question3: string; question4: string; questionCycle: string; questionCycle2: string } {
  const processedInput = processComplexSentences(input);
  const matchingKeywords = findMatchingKeywords(processedInput, feelingKeywords.flatMap(r => r.keywords));
  const formattedKeywords = formatKeywords(matchingKeywords);
  if (matchingKeywords.length === 0) {  
    return {
      question1: `Feel ${processedInput} — what does ${processedInput} feel like?`,
      question3: `Where and how do you feel ${processedInput} now?`,
      question4: `What would it feel like to be ${processedInput}?`,
      questionCycle: `Do you still feel ${processedInput}?`,
      questionCycle2: `If you don't feel ${processedInput} anymore, you can leave the chat. Wish you a successful day! 😁😁😁`,
    };
  } else {
    return {
      question1: `Feel ${formattedKeywords} — what does ${formattedKeywords} feel like?`,
      question3: `Where and how do you feel ${formattedKeywords} now?`,
      question4: `What would it feel like to be ${formattedKeywords}?`,
      questionCycle: `Do you still feel ${formattedKeywords}?`,
      questionCycle2: `If you don't feel ${formattedKeywords} anymore, you can leave the chat. Wish you a successful day! 😁😁😁`,
    };
  }
}

// Function to generate goal questions
export function generateGoalQuestions(input: string):{ question1: string; question2: string; question4: string; question5: string} {
  const processedInput = processComplexSentences(input);
  console.log('processedInput------------------------>', processedInput);
  const matchingKeywords = findMatchingKeywords(processedInput, feelingKeywords.flatMap(r => r.keywords));
  console.log('matchingKeywords------------------------>', matchingKeywords);
  if (matchingKeywords.length === 0) {
    return {
      question1: `What would it feel like to ${processedInput}?`,
      question2: `Feel ${processedInput} — what does ${processedInput} feel like?`,
      question4: `Where and how do you feel ${processedInput} now?`,
      question5: `What would it feel like to be ${processedInput}?`,
    };
  } 
  else {
    const formattedKeywords = formatKeywords(matchingKeywords);
    return {
      question1: `What would it feel like to ${formattedKeywords}?`,
      question2: `Feel ${formattedKeywords} — what does ${formattedKeywords} feel like?`,
      question4: `Where and how do you feel ${formattedKeywords} now?`,
      question5: `What would it feel like to be ${formattedKeywords}?`,
    };
  }
}
