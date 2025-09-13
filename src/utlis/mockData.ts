import { ToneAnalysis, ModelPerformance, EmailData } from '../types';

export const mockToneAnalysis = (text: string): ToneAnalysis => {
  // Simulate ML model prediction based on text characteristics
  const length = text.length;
  const hasExclamation = text.includes('!');
  const hasQuestion = text.includes('?');
  const hasPlease = text.toLowerCase().includes('please');
  const hasThank = text.toLowerCase().includes('thank');
  const hasUrgent = text.toLowerCase().includes('urgent') || text.toLowerCase().includes('asap');
  const hasApology = text.toLowerCase().includes('sorry') || text.toLowerCase().includes('apologize');

  let baseConfidence = 0.7 + Math.random() * 0.25;
  let politeness = 0.5;
  let formality = 0.5;
  let urgency = 0.3;

  if (hasPlease || hasThank) politeness += 0.3;
  if (hasApology) politeness += 0.2;
  if (hasExclamation) urgency += 0.2;
  if (hasUrgent) urgency += 0.4;
  if (length > 200) formality += 0.2;

  const emotions = {
    joy: hasThank ? 0.7 + Math.random() * 0.2 : Math.random() * 0.4,
    anger: hasExclamation && !hasPlease ? 0.3 + Math.random() * 0.4 : Math.random() * 0.2,
    fear: hasUrgent ? 0.2 + Math.random() * 0.3 : Math.random() * 0.15,
    sadness: hasApology ? 0.2 + Math.random() * 0.3 : Math.random() * 0.15,
    analytical: formality > 0.6 ? 0.6 + Math.random() * 0.3 : Math.random() * 0.4,
    confident: length > 100 && !hasQuestion ? 0.5 + Math.random() * 0.3 : Math.random() * 0.4,
    tentative: hasQuestion ? 0.4 + Math.random() * 0.3 : Math.random() * 0.3,
  };

  let tone = 'neutral';
  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';

  if (politeness > 0.7) {
    tone = 'polite';
    sentiment = 'positive';
  } else if (emotions.anger > 0.5) {
    tone = 'aggressive';
    sentiment = 'negative';
  } else if (emotions.joy > 0.6) {
    tone = 'friendly';
    sentiment = 'positive';
  } else if (urgency > 0.6) {
    tone = 'urgent';
    sentiment = 'negative';
  } else if (formality > 0.7) {
    tone = 'formal';
  }

  return {
    tone,
    confidence: Math.min(baseConfidence, 0.95),
    sentiment,
    emotions,
    politeness: Math.min(politeness, 1),
    formality: Math.min(formality, 1),
    urgency: Math.min(urgency, 1),
  };
};

export const modelPerformanceData: ModelPerformance[] = [
  {
    name: 'BERT-based Transformer',
    accuracy: 0.94,
    precision: 0.92,
    recall: 0.93,
    f1Score: 0.925,
    confusionMatrix: [[156, 8, 2], [7, 148, 12], [3, 9, 162]]
  },
  {
    name: 'RoBERTa Fine-tuned',
    accuracy: 0.91,
    precision: 0.89,
    recall: 0.90,
    f1Score: 0.895,
    confusionMatrix: [[151, 12, 3], [11, 142, 14], [8, 13, 156]]
  },
  {
    name: 'CNN-BiLSTM',
    accuracy: 0.87,
    precision: 0.85,
    recall: 0.86,
    f1Score: 0.855,
    confusionMatrix: [[142, 18, 6], [15, 135, 17], [12, 21, 144]]
  },
  {
    name: 'SVM + TF-IDF',
    accuracy: 0.82,
    precision: 0.80,
    recall: 0.81,
    f1Score: 0.805,
    confusionMatrix: [[132, 24, 10], [22, 128, 17], [18, 28, 131]]
  }
];

export const sampleEmails: EmailData[] = [
  {
    id: '1',
    subject: 'Quarterly Report Submission',
    content: 'Hi team, I hope this email finds you well. I wanted to follow up on the quarterly report submission deadline. Please ensure all sections are completed by Friday. Thank you for your attention to this matter.',
    timestamp: new Date('2024-01-15T10:30:00'),
  },
  {
    id: '2',
    subject: 'URGENT: Server Maintenance',
    content: 'URGENT!! The server will be down for maintenance tonight. This is critical and cannot be postponed. All users must save their work immediately!',
    timestamp: new Date('2024-01-16T14:45:00'),
  },
  {
    id: '3',
    subject: 'Thank you for your support',
    content: 'Dear colleagues, I wanted to express my heartfelt gratitude for your incredible support during this project. Your dedication has been truly inspiring!',
    timestamp: new Date('2024-01-17T09:15:00'),
  }
];

export const edaChartData = {
  toneDistribution: {
    labels: ['Polite', 'Neutral', 'Urgent', 'Friendly', 'Aggressive', 'Formal'],
    datasets: [{
      data: [32, 28, 15, 12, 8, 5],
      backgroundColor: [
        '#10B981',
        '#6B7280',
        '#F59E0B',
        '#3B82F6',
        '#EF4444',
        '#8B5CF6'
      ]
    }]
  },
  sentimentTrend: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Positive',
      data: [65, 68, 72, 70, 75, 78],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
    }, {
      label: 'Neutral',
      data: [25, 23, 20, 22, 18, 15],
      borderColor: '#6B7280',
      backgroundColor: 'rgba(107, 114, 128, 0.1)',
    }, {
      label: 'Negative',
      data: [10, 9, 8, 8, 7, 7],
      borderColor: '#EF4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
    }]
  }
};