import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader, CheckCircle, XCircle } from 'lucide-react';
import ToneIndicator from './ToneIndicator';
import { ToneAnalysis } from '../types';

interface EmailAnalyzerProps {
  onRewrite: (emailContent: string, tone: string) => void;
}

const EmailAnalyzer: React.FC<EmailAnalyzerProps> = ({ onRewrite }) => {
  const [emailContent, setEmailContent] = useState('');
  const [analysis, setAnalysis] = useState<ToneAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (emailContent.trim() === '') {
        setAnalysis(null);
        setError('Please enter some text to analyze.');
        return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: emailContent }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error || 'Failed to analyze tone.');
            setLoading(false);
            return;
        }

        const data = await response.json();

        if (data && data.tone && data.confidence) {
            setAnalysis(data);
        } else {
            setError('Unexpected data format from the server.');
        }

    } catch (err) {
        console.error('API call failed:', err);
        setError('Failed to analyze tone. Please ensure the backend server is running.');
    } finally {
        setLoading(false);
    }
  };

  const handleClear = () => {
    setEmailContent('');
    setAnalysis(null);
    setError(null);
  };

  const handleRewriteClick = () => {
    if (analysis) {
        onRewrite(emailContent, analysis.tone);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[600px]">
      {/* Email Input Panel */}
      <div className="w-full md:w-1/2 p-6 bg-white rounded-2xl shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Email Input</h2>
        <div className="flex items-center text-gray-500 mb-2">
          <Mail className="w-5 h-5 mr-2" />
          <p className="text-sm">Email Content</p>
        </div>
        <textarea
          className="flex-grow w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors duration-200 resize-none"
          placeholder="Type or paste your email here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center text-red-500 text-sm mt-4"
          >
            <XCircle className="w-4 h-4 mr-2" />
            {error}
          </motion.div>
        )}
        <div className="flex items-center mt-4 space-x-4">
          <motion.button
            onClick={handleAnalyze}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-center py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
            }`}
            disabled={loading}
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span className="mr-2">Analyze Tone</span>
                <Mail className="w-5 h-5" />
              </>
            )}
          </motion.button>
          <motion.button
            onClick={handleClear}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-3 bg-gray-200 text-gray-600 rounded-xl hover:bg-gray-300 transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Analysis Results Panel */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl shadow-inner">
        {loading ? (
          <div className="flex flex-col items-center">
            <Loader className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="mt-4 text-gray-600">Analyzing your email...</p>
          </div>
        ) : analysis ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col justify-between"
          >
            <ToneIndicator analysis={analysis} />
            <motion.button
              onClick={handleRewriteClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full flex items-center justify-center py-3 px-6 rounded-xl text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Rewrite in a {analysis.tone} Tone
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500"
          >
            <Mail className="w-24 h-24 mx-auto mb-4" />
            <p className="text-lg">Enter an email to see tone analysis results</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EmailAnalyzer;
