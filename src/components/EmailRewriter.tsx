import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, PenTool, Loader, CheckCircle, XCircle } from 'lucide-react';
import { ToneAnalysis } from '../types';

interface EmailRewriterProps {
  initialContent: string;
  initialTone: string;
}

const toneOptions = ['Positive', 'Agitated', 'Inquisitive', 'Casual', 'Formal'];

const EmailRewriter: React.FC<EmailRewriterProps> = ({ initialContent, initialTone }) => {
  const [emailContent, setEmailContent] = useState(initialContent);
  const [selectedTone, setSelectedTone] = useState(initialTone);
  const [rewrittenEmail, setRewrittenEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEmailContent(initialContent);
    setSelectedTone(initialTone);
    setRewrittenEmail('');
    setError(null);
  }, [initialContent, initialTone]);

  const handleRewrite = async () => {
    if (emailContent.trim() === '') {
      setError('Please enter some text to rewrite.');
      return;
    }

    setLoading(true);
    setError(null);
    setRewrittenEmail('');

    try {
      const response = await fetch('/api/rewrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: emailContent, tone: selectedTone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to rewrite email.');
        setLoading(false);
        return;
      }

      const data = await response.json();
      setRewrittenEmail(data.rewrittenText);
    } catch (err) {
      console.error('API call failed:', err);
      setError('Failed to rewrite email. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rewrittenEmail);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[600px]">
      {/* Email Input Panel */}
      <div className="w-full md:w-1/2 p-6 bg-white rounded-2xl shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Email Rewriter</h2>
        <div className="flex items-center text-gray-500 mb-2">
          <Mail className="w-5 h-5 mr-2" />
          <p className="text-sm">Original Content</p>
        </div>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors duration-200 resize-none flex-grow"
          placeholder="Type or paste your email here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />
        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1">Select a Tone</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {toneOptions.map((tone) => (
              <motion.button
                key={tone}
                onClick={() => setSelectedTone(tone)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  selectedTone === tone
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                }`}
              >
                {tone}
              </motion.button>
            ))}
          </div>
        </div>
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
        <motion.button
          onClick={handleRewrite}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center justify-center py-3 px-6 mt-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
          }`}
          disabled={loading}
        >
          {loading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span className="mr-2">Rewrite</span>
              <PenTool className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>

      {/* Rewritten Email Panel */}
      <div className="w-full md:w-1/2 flex flex-col p-6 bg-gray-50 rounded-2xl shadow-inner">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Rewritten Email</h2>
        {loading ? (
          <div className="flex flex-col items-center justify-center flex-grow">
            <Loader className="w-10 h-10 text-green-500 animate-spin" />
            <p className="mt-4 text-gray-600">Rewriting your email...</p>
          </div>
        ) : rewrittenEmail ? (
          <div className="flex flex-col flex-grow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-grow w-full p-4 bg-white border border-gray-300 rounded-lg text-gray-800 resize-none outline-none overflow-auto"
            >
              {rewrittenEmail}
            </motion.div>
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full flex items-center justify-center py-3 px-6 rounded-xl text-lg font-semibold text-white bg-gray-700 hover:bg-gray-800 transition-colors"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Copy Rewritten Email
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center flex-grow text-center text-gray-500"
          >
            <PenTool className="w-24 h-24 mx-auto mb-4" />
            <p className="text-lg">Your rewritten email will appear here</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EmailRewriter;
