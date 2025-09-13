import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { TrendingUp, Users, Mail, BarChart3 } from 'lucide-react';
import { edaChartData } from '../utlis/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const EDADashboard: React.FC = () => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const correlationData = {
    labels: ['Length vs Formality', 'Politeness vs Sentiment', 'Urgency vs Emotion', 'Time vs Tone', 'Subject vs Body'],
    datasets: [{
      label: 'Correlation Coefficient',
      data: [0.72, 0.84, -0.63, 0.45, 0.58],
      backgroundColor: [
        '#3B82F6',
        '#10B981',
        '#EF4444',
        '#F59E0B',
        '#8B5CF6',
      ],
    }]
  };

  const statsCards = [
    {
      title: 'Total Emails Analyzed',
      value: '12,847',
      change: '+23.5%',
      icon: Mail,
      color: 'bg-blue-500'
    },
    {
      title: 'Average Politeness Score',
      value: '7.3/10',
      change: '+4.2%',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Users Active',
      value: '1,247',
      change: '+12.8%',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Model Accuracy',
      value: '94.2%',
      change: '+1.3%',
      icon: BarChart3,
      color: 'bg-orange-500'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Exploratory Data Analysis</h2>
        <p className="text-gray-600">Comprehensive insights into email tone patterns and relationships</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-500 text-sm font-medium">{card.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{card.value}</h3>
            <p className="text-gray-600 text-sm">{card.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Tone Distribution</h3>
          <div className="h-64">
            <Doughnut data={edaChartData.toneDistribution} options={doughnutOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Sentiment Trends Over Time</h3>
          <div className="h-64">
            <Line data={edaChartData.sentimentTrend} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Feature Correlations</h3>
          <div className="h-64">
            <Bar data={correlationData} options={chartOptions} />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Strong positive correlation between politeness and sentiment (0.84), while urgency negatively correlates with emotional stability (-0.63).
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-blue-800 mb-1">Politeness Impact</h4>
              <p className="text-sm text-blue-700">Emails with higher politeness scores show 40% better response rates</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-green-800 mb-1">Optimal Length</h4>
              <p className="text-sm text-green-700">150-300 character emails achieve highest engagement</p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-medium text-orange-800 mb-1">Time Patterns</h4>
              <p className="text-sm text-orange-700">Professional tones peak during business hours (9-5 PM)</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-medium text-purple-800 mb-1">Subject Line Effect</h4>
              <p className="text-sm text-purple-700">Subject sentiment predicts body tone with 78% accuracy</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EDADashboard;