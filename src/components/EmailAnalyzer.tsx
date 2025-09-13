import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, RotateCcw } from 'lucide-react';
import ToneIndicator from './ToneIndicator';
import { ToneAnalysis } from '../types';

const EmailAnalyzer: React.FC = () => {
  const [emailText, setEmailText] = useState('');
  const [subject, setSubject] = useState('');
  const [analysis, setAnalysis] = useState<ToneAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // The API URL now points to your Vercel Serverless Function proxy.
  // This is a relative path, which is secure and works in production.
  const apiUrl = '/api/analyze'; 

  const handleAnalyze = async () => {
    if (!emailText.trim()) return;

    setIsAnalyzing(true);
    setAnalysis(null);
    setError(null);

    try {
      // The fetch call points to your Vercel proxy, not the Hugging Face API directly.
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // The body now sends the text in a format that your proxy expects.
        body: JSON.stringify({ text: emailText }),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }
      
      // The proxy response is already structured for your component,
      // and the actual analysis data is in the 'data' field.
      const result: { data: [ToneAnalysis] } = await response.json();
      setAnalysis(result.data[0]);

    } catch (err) {
      console.error(err);
      setError("Failed to analyze tone. Please ensure the backend server is running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setEmailText('');
    setSubject('');
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Email Tone Analyzer</h2>
        <p className="text-gray-600">Analyze the psychological tone and sentiment of your emails</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Mail className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Email Input</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Content
                </label>
                <textarea
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  placeholder="Paste your email content here for tone analysis..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  onClick={handleAnalyze}
                  disabled={!emailText.trim() || isAnalyzing}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Analyze Tone</span>
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  onClick={handleReset}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          </div>
        </div>

        <div>
          {analysis ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ToneIndicator analysis={analysis} />
            </motion.div>
          ) : (
            <div className="bg-gray-100 rounded-2xl shadow-lg p-6 h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Enter an email to see tone analysis results</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailAnalyzer;