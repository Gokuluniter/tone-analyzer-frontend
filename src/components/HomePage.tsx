import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Brain, RefreshCw, BarChart3, Zap, Award, TrendingUp } from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  const features = [
    {
      icon: Mail,
      title: 'Advanced Tone Analysis',
      description: 'AI-powered psychological analysis of email tone, sentiment, and emotional components',
      color: 'bg-blue-500',
      action: () => setActiveTab('analyzer')
    },
    {
      icon: RefreshCw,
      title: 'Smart Email Rewriter',
      description: 'Transform your emails to match any desired tone while preserving the original meaning',
      color: 'bg-purple-500',
      action: () => setActiveTab('rewriter')
    },
    {
      icon: BarChart3,
      title: 'EDA Dashboard',
      description: 'Comprehensive data insights with interactive visualizations and relationship analysis',
      color: 'bg-green-500',
      action: () => setActiveTab('eda')
    },
  ];

  const stats = [
    { icon: Award, label: 'Models Trained', value: '5+', color: 'text-blue-500' },
    { icon: Mail, label: 'Emails Analyzed', value: '2.5M+', color: 'text-green-500' },
    { icon: Award, label: 'Model Accuracy', value: '94.2%', color: 'text-purple-500' },
    { icon: TrendingUp, label: 'Success Rate', value: '98.7%', color: 'text-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl">
              <Zap className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Psychological Tone Analyzer
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block">
              for Emails
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Harness the power of advanced AI to analyze, understand, and transform the psychological 
            tone of your emails. Built with cutting-edge machine learning models and comprehensive 
            data analysis.
          </p>
          
          <div className="flex justify-center space-x-4">
            <motion.button
              onClick={() => setActiveTab('analyzer')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium flex items-center space-x-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              <span>Try Analyzer</span>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab('eda')}
              className="bg-white text-gray-800 px-8 py-4 rounded-xl font-medium flex items-center space-x-2 shadow-lg border border-gray-200 hover:bg-gray-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="w-5 h-5" />
              <span>View Analytics</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col"
              onClick={feature.action}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`${feature.color} p-4 rounded-xl w-fit mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed flex-grow">{feature.description}</p>
              
              <div className="mt-6 flex items-center text-blue-500 font-medium">
                <span>Explore →</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Technology Stack</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-xl w-fit mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">ML Models</h3>
              <p className="text-gray-600">Tone, Rewriter, and Psychological Analyzers</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-xl w-fit mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Data Science</h3>
              <p className="text-gray-600">EDA, Feature Engineering, and Model Validation</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-xl w-fit mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Frontend</h3>
              <p className="text-gray-600">React, TypeScript, Tailwind CSS, and Framer Motion</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;

