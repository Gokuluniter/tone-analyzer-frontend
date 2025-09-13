import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Copy, Check, Wand2 } from 'lucide-react';

const toneOptions = [
    { value: 'positive', label: 'Positive', color: '#10B981' },
    { value: 'negative', label: 'Negative', color: '#F87171' },
    { value: 'agitated', label: 'Agitated', color: '#EF4444' },
    { value: 'inquisitive', label: 'Inquisitive', color: '#3B82F6' },
    { value: 'casual', label: 'Casual', color: '#F59E0B' },
    { value: 'neutral', label: 'Neutral', color: '#6B7280' },
];

const EmailRewriter: React.FC = () => {
  const [originalEmail, setOriginalEmail] = useState('');
  const [rewrittenEmail, setRewrittenEmail] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetTone, setTargetTone] = useState('neutral');

  // The API URL now points to your Vercel Serverless Function proxy.
  const apiUrl = '/api/rewrite';

  const rewriteEmail = async () => {
    if (!originalEmail.trim()) return;

    setIsRewriting(true);
    setRewrittenEmail('');
    setError(null);

    try {
      // The fetch call now points to your Vercel proxy.
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The body sends both the email text and the target tone.
        // Your proxy will handle the formatting for the Hugging Face API.
        body: JSON.stringify({ text: originalEmail, tone: targetTone }),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      // The proxy is expected to return a simple JSON object like { rewrittenText: '...' }
      const data = await response.json();
      setRewrittenEmail(data.rewrittenText);

    } catch (err) {
      console.error(err);
      setError("Failed to rewrite email. Please ensure the backend server is running.");
    } finally {
      setIsRewriting(false);
    }
  };

  const copyToClipboard = () => {
    if (!rewrittenEmail) return;
    const textArea = document.createElement("textarea");
    textArea.value = rewrittenEmail;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Email Tone Rewriter</h2>
        <p className="text-gray-600">Transform your emails to match any desired tone</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Original Email</h3>
            <textarea
              value={originalEmail}
              onChange={(e) => setOriginalEmail(e.target.value)}
              placeholder="Paste your original email here..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Rewriting Options</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Target Tone</label>
                <div className="grid grid-cols-3 gap-3">
                  {toneOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTargetTone(option.value)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        targetTone === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: option.color }}
                        ></div>
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={rewriteEmail}
                disabled={!originalEmail.trim() || isRewriting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isRewriting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Rewriting...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Rewrite Email</span>
                  </>
                )}
              </motion.button>
              {error && <p className="mt-2 text-sm text-red-600 text-center">{error}</p>}
            </div>
          </div>
        </div>

        <div>
          {rewrittenEmail || isRewriting ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Rewritten Email</h3>
                {rewrittenEmail && !isRewriting && (
                  <motion.button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </motion.button>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 flex-grow">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                  {isRewriting ? "Generating..." : rewrittenEmail}
                </pre>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-100 rounded-2xl shadow-lg p-6 h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <RefreshCw className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Your rewritten email will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailRewriter;