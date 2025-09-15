import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Zap, HelpCircle, Coffee, Brain, 
  CheckSquare, Users, Heart, Frown, Info 
} from 'lucide-react';
import { ToneAnalysis } from '../types';

// CONFIGURATION FOR TONES
const toneConfig: { [key: string]: { color: string; icon: React.ReactNode } } = {
  Positive: { color: 'text-green-500', icon: <TrendingUp className="w-5 h-5" /> },
  Agitated: { color: 'text-red-500', icon: <Zap className="w-5 h-5" /> },
  Inquisitive: { color: 'text-blue-500', icon: <HelpCircle className="w-5 h-5" /> },
  Casual: { color: 'text-yellow-500', icon: <Coffee className="w-5 h-5" /> },
  default: { color: 'text-gray-500', icon: <HelpCircle className="w-5 h-5" /> },
};

// CONFIGURATION FOR OCEAN TRAITS
const oceanConfig: { [key: string]: { color: string; icon: React.ReactNode; barColor: string; } } = {
  Openness: { color: 'text-purple-500', icon: <Brain className="w-5 h-5" />, barColor: 'bg-purple-500' },
  Conscientiousness: { color: 'text-blue-500', icon: <CheckSquare className="w-5 h-5" />, barColor: 'bg-blue-500' },
  Extraversion: { color: 'text-orange-500', icon: <Users className="w-5 h-5" />, barColor: 'bg-orange-500' },
  Agreeableness: { color: 'text-green-500', icon: <Heart className="w-5 h-5" />, barColor: 'bg-green-500' },
  Neuroticism: { color: 'text-red-500', icon: <Frown className="w-5 h-5" />, barColor: 'bg-red-500' },
  default: { color: 'text-gray-500', icon: <HelpCircle className="w-5 h-5" />, barColor: 'bg-gray-500' },
};

// UPDATED: Definitions are now more relatable and email-focused
const oceanDefinitions: { [key: string]: string } = {
  Openness: "How creative or conventional is the language? High scores suggest imaginative wording, while low scores indicate more straightforward phrasing.",
  Conscientiousness: "How organized and goal-oriented is the email? High scores point to a structured and reliable message. Low scores suggest a more spontaneous approach.",
  Extraversion: "How energetic and engaging is the tone? High scores reflect a sociable and assertive style. Low scores suggest a more reserved or reflective tone.",
  Agreeableness: "How friendly and cooperative does the email sound? High scores indicate a warm and considerate tone. Low scores might come across as more direct or critical.",
  Neuroticism: "How much stress or sensitivity is conveyed? High scores can indicate worry or urgency. Low scores suggest a calm and emotionally stable tone.",
};

// UPDATED: ScoreBar now includes a tooltip for descriptions
const ScoreBar: React.FC<{ 
  label: string; 
  score: number; 
  index: number; 
  config: { color: string; icon: React.ReactNode; barColor?: string; };
  description?: string;
}> = ({ label, score, index, config, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const barColor = config.barColor || 'bg-gray-500';

  return (
    <div className="space-y-2">
      <div className="flex items-center text-sm relative">
        <span className={`mr-2 ${config.color}`}>{config.icon}</span>
        <span className="font-medium text-gray-700">{label}</span>
        {description && (
          <div 
            className="ml-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Info className="w-4 h-4 text-gray-400 cursor-pointer" />
          </div>
        )}
        {isHovered && description && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute left-0 top-full mt-2 w-60 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-xl z-10"
          >
            {description}
          </motion.div>
        )}
      </div>
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div
            className={`h-2.5 rounded-full ${barColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${score * 100}%` }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
          />
        </div>
        <span className="text-sm font-semibold text-gray-800 w-12 text-right">{Math.round(score * 100)}%</span>
      </div>
    </div>
  );
};

// UPDATED: This component now focuses only on Psychological Traits
const ToneIndicator: React.FC<{ analysis: ToneAnalysis }> = ({ analysis }) => {
  const { tone, confidence, oceanTraits } = analysis;

  const dominantConfig = toneConfig[tone] || toneConfig.default;

  const oceanData = oceanTraits ? Object.entries(oceanTraits).map(([label, score]) => ({ label, score })) : [];
  oceanData.sort((a, b) => b.score - a.score);

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
            oceanData.map((trait, index) => {
              const config = oceanConfig[trait.label] || oceanConfig.default;
              return (
                <ScoreBar 
                  key={trait.label} 
                  label={trait.label} 
                  score={trait.score} 
                  index={index} 
                  config={config}
                  description={oceanDefinitions[trait.label]} // Pass the description here
                />
              );
            })
          ) : (
            <p className="text-sm text-gray-500">Psychological trait data not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToneIndicator;

