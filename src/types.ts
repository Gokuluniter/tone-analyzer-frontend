// Defines a single tone prediction from the analyzer model
export interface Tone {
  label: string;
  score: number;
}

// Defines the shape of the OCEAN psychological traits data object
export interface OceanTraits {
  Openness: number;
  Conscientiousness: number;
  Extraversion: number;
  Agreeableness: number;
  Neuroticism: number;
}

// Defines the complete analysis object returned by the /analyze API endpoint
export interface ToneAnalysis {
  tone: string;
  confidence: number;
  allTones: Tone[];
  oceanTraits: OceanTraits; // The new psychological data from the v2 model
  sentiment: string;
}
