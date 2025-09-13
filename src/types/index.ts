export interface ToneAnalysis {
  tone: string;
  confidence: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  emotions: {
    joy: number;
    anger: number;
    fear: number;
    sadness: number;
    analytical: number;
    confident: number;
    tentative: number;
  };
  politeness: number;
  formality: number;
  urgency: number;
}

export interface EmailData {
  id: string;
  content: string;
  subject: string;
  timestamp: Date;
  analysis?: ToneAnalysis;
}

export interface ModelPerformance {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: number[][];
}

export interface ToneRewriteRequest {
  originalText: string;
  targetTone: string;
  formality: 'casual' | 'professional' | 'formal';
  length: 'shorter' | 'same' | 'longer';
}