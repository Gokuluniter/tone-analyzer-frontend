import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, HelpCircle, Coffee, Brain, CheckSquare, Users, Heart, Frown, Smile } from 'lucide-react';
import { ToneAnalysis } from '../types';

// This config is kept for displaying the dominant tone's icon and color
const toneConfig: { [key: string]: { color: string; icon: React.ReactNode; barColor: string; } } = {
  Positive: { color: 'text-green-500', icon: <TrendingUp className="w-5 h-5" />, barColor: 'bg-green-500' },
  Negative: { color: 'text-red-500', icon: <Frown className="w-5 h-5" />, barColor: 'bg-red-500' },
  Agitated: { color: 'text-red-500', icon: <Zap className="w-5 h-5" />, barColor: 'bg-red-500' },
  Inquisitive: { color: 'text-blue-500', icon: <HelpCircle className="w-5 h-5" />, barColor: 'bg-blue-500' },
  Casual: { color: 'text-yellow-500', icon: <Coffee className="w-5 h-5" />, barColor: 'bg-yellow-500' },
  Neutral: { color: 'text-gray-500', icon: <Smile className="w-5 h-5" />, barColor: 'bg-gray-500' },
  default: { color: 'text-gray-500', icon: <HelpCircle className="w-5 h-5" />, barColor: 'bg-gray-500' },
};

// Configuration for the OCEAN psychological traits with icons and colors
const oceanConfig: { [key: string]: { color: string; icon: React.ReactNode; barColor: string; } } = {
  Openness: { color: 'text-purple-500', icon: <Brain className="w-5 h-5" />, barColor: 'bg-purple-500' },
  Conscientiousness: { color: 'text-blue-500', icon: <CheckSquare className="w-5 h-5" />, barColor: 'bg-blue-500' },
  Extraversion: { color: 'text-orange-500', icon: <Users className="w-5 h-5" />, barColor: 'bg-orange-500' },
  Agreeableness: { color: 'text-green-500', icon: <Heart className="w-5 h-5" />, barColor: 'bg-green-500' },
  Neuroticism: { color: 'text-red-500', icon: <Frown className="w-5 h-5" />, barColor: 'bg-red-500' },
  default: { color: 'text-gray-500', icon: <HelpCircle className="w-5 h-5" />, barColor: 'bg-gray-500' },
};

// This mapping translates the raw labels from your model to the correct names.
const oceanLabelMap: { [key: string]: string } = {
  'LABEL_0': 'Openness',
  'LABEL_1': 'Conscientiousness',
  'LABEL_2': 'Extraversion',
  'LABEL_3': 'Agreeableness',
  'LABEL_4': 'Neuroticism',
};

// A reusable component to render a styled score bar
const ScoreBar: React.FC<{
  label: string;
  score: number;
  index: number;
  config: { color: string; icon: React.ReactNode; barColor: string; }
}> = ({ label, score, index, config }) => (
    <div className="space-y-2">
      <div className="flex items-center text-sm">
        <span className={`mr-2 ${config.color}`}>{config.icon}</span>
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div
            className={`h-2.5 rounded-full ${config.barColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${score * 100}%` }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
          />
        </div>
        <span className="text-sm font-semibold text-gray-800 w-12 text-right">{Math.round(score * 100)}%</span>
      </div>
    </div>
);

const ToneIndicator: React.FC<{ analysis: ToneAnalysis }> = ({ analysis }) => {
  const { tone, confidence, oceanTraits } = analysis;

  const dominantConfig = toneConfig[tone] || toneConfig.default;

  // Convert the oceanTraits object into a sorted array, now with corrected labels
  const oceanData = oceanTraits ? Object.entries(oceanTraits)
    .map(([label, score]) => ({
      label: oceanLabelMap[label] || label, // Use the map to get the correct name
      score
    }))
    .sort((a, b) => b.score - a.score) : [];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Dominant Tone</h3>
        <div className={`flex items-center p-4 rounded-lg bg-gray-50`}>
          <div className={dominantConfig.color}>{React.cloneElement(dominantConfig.icon as React.ReactElement, { className: "w-6 h-6" })}</div>
          <div className="ml-4">
            <div className={`text-xl font-bold ${dominantConfig.color}`}>{tone}</div>
            <div className="text-sm text-gray-600">Confidence: {Math.round(confidence * 100)}%</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Psychological Traits (OCEAN)</h3>
        <div className="space-y-4">
          {oceanData.length > 0 ? (
            oceanData.map((trait, index) => (
              <ScoreBar
                key={trait.label}
                label={trait.label}
                score={trait.score}
                index={index}
                config={oceanConfig[trait.label] || oceanConfig.default}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">Psychological trait data not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToneIndicator;