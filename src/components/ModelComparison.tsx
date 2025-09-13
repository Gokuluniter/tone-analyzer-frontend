import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Award, TrendingUp, Zap } from 'lucide-react';
import { modelPerformanceData } from '../utlis/mockData';
import type { ModelPerformance } from '../types';

const ModelComparison: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState(modelPerformanceData[0]);

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600 bg-green-100';
    if (score >= 0.8) return 'text-blue-600 bg-blue-100';
    if (score >= 0.7) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 0.9) return <Award className="w-4 h-4" />;
    if (score >= 0.8) return <TrendingUp className="w-4 h-4" />;
    if (score >= 0.7) return <Zap className="w-4 h-4" />;
    return <Brain className="w-4 h-4" />;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Model Performance Comparison</h2>
        <p className="text-gray-600">Comprehensive evaluation of different machine learning approaches</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Model Selection</h3>
            <div className="space-y-3">
              {modelPerformanceData.map((model: ModelPerformance, index: number) => (
                <motion.button
                  key={model.name}
                  onClick={() => setSelectedModel(model)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedModel.name === model.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{model.name}</h4>
                      <p className="text-sm text-gray-600">
                        Accuracy: {(model.accuracy * 100).toFixed(1)}%
                      </p>
                    </div>
                    {index === 0 && (
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Best
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Training Details</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Dataset: 50,000 labeled emails</p>
                <p>• Training epochs: 25</p>
                <p>• Validation split: 20%</p>
                <p>• Cross-validation: 5-fold</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <motion.div
            key={selectedModel.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">{selectedModel.name}</h3>
                <div className="flex items-center space-x-2">
                  {getScoreIcon(selectedModel.accuracy)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(selectedModel.accuracy)}`}>
                    {(selectedModel.accuracy * 100).toFixed(1)}% Accuracy
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Performance Metrics</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Accuracy', value: selectedModel.accuracy },
                      { label: 'Precision', value: selectedModel.precision },
                      { label: 'Recall', value: selectedModel.recall },
                      { label: 'F1-Score', value: selectedModel.f1Score },
                    ].map((metric) => (
                      <div key={metric.label} className="flex justify-between items-center">
                        <span className="text-gray-600">{metric.label}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value * 100}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-800">
                            {(metric.value * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Confusion Matrix</h4>
                  <div className="grid grid-cols-3 gap-1 max-w-48">
                    {selectedModel.confusionMatrix.flat().map((value: number, index: number) => (
                      <div
                        key={index}
                        className="aspect-square flex items-center justify-center text-xs font-medium text-white rounded"
                        style={{
                          backgroundColor: `rgba(59, 130, 246, ${Math.min(value / 200, 1)})`,
                        }}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Predicted</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="font-medium text-gray-800 mb-4">Model Characteristics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Strengths</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedModel.name.includes('BERT') && (
                      <>
                        <li>• Excellent context understanding</li>
                        <li>• High accuracy on complex emotions</li>
                        <li>• Robust to informal language</li>
                      </>
                    )}
                    {selectedModel.name.includes('RoBERTa') && (
                      <>
                        <li>• Strong performance on sentiment</li>
                        <li>• Good generalization ability</li>
                        <li>• Efficient fine-tuning</li>
                      </>
                    )}
                    {selectedModel.name.includes('CNN') && (
                      <>
                        <li>• Fast inference time</li>
                        <li>• Good at detecting patterns</li>
                        <li>• Lower computational requirements</li>
                      </>
                    )}
                    {selectedModel.name.includes('SVM') && (
                      <>
                        <li>• Interpretable results</li>
                        <li>• Good baseline performance</li>
                        <li>• Minimal preprocessing required</li>
                      </>
                    )}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Use Cases</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedModel.name.includes('BERT') && (
                      <>
                        <li>• Production email analysis</li>
                        <li>• Customer service automation</li>
                        <li>• Complex tone detection</li>
                      </>
                    )}
                    {selectedModel.name.includes('RoBERTa') && (
                      <>
                        <li>• Social media monitoring</li>
                        <li>• Content moderation</li>
                        <li>• Brand sentiment analysis</li>
                      </>
                    )}
                    {selectedModel.name.includes('CNN') && (
                      <>
                        <li>• Real-time applications</li>
                        <li>• Mobile implementations</li>
                        <li>• High-volume processing</li>
                      </>
                    )}
                    {selectedModel.name.includes('SVM') && (
                      <>
                        <li>• Research and development</li>
                        <li>• Feature analysis</li>
                        <li>• Baseline comparisons</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;