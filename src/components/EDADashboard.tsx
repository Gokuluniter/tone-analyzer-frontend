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
  RadialLinearScale, // Import the new scale for the radar chart
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2'; // Import Radar, remove Line
import { TrendingUp, Mail, BarChart3, Clock } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  RadialLinearScale // Register the new scale
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

  // NEW: Data for the Psychological Profile Radar Chart
  const psychologicalProfileData = {
    labels: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'],
    datasets: [
      {
        label: 'Average Trait Score',
        data: [65, 72, 58, 81, 34], // Example average scores out of 100
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  // NEW: Data for Average Word Count by Tone
  const wordCountByToneData = {
    labels: ['Positive', 'Agitated', 'Inquisitive', 'Casual'],
    datasets: [{
      label: 'Average Word Count',
      data: [112, 178, 95, 76], // Example average word counts
      backgroundColor: [
        '#10B981', // Green for Positive
        '#EF4444', // Red for Agitated
        '#3B82F6', // Blue for Inquisitive
        '#F59E0B', // Orange for Casual
      ],
    }]
  };


  const correlationData = {
    labels: ['Agreeableness vs. Positive Tone', 'Neuroticism vs. Agitated Tone', 'Openness vs. Inquisitive Tone', 'Conscientiousness vs. Word Count', 'Extraversion vs. Response Rate'],
    datasets: [{
      label: 'Correlation Coefficient',
      data: [0.68, 0.75, 0.55, -0.42, 0.61],
      backgroundColor: [
        '#3B82F6',
        '#EF4444',
        '#8B5CF6',
        '#F59E0B',
        '#10B981',
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
      title: 'Avg. Analysis Time',
      value: '0.8s',
      change: '-5.2%',
      icon: Clock,
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
        {/* UPDATED: Replaced Doughnut chart with the new Radar chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Average Psychological Profile (OCEAN)</h3>
          <div className="h-64 flex justify-center items-center">
            <Radar data={psychologicalProfileData} options={radarOptions} />
          </div>
        </motion.div>

        {/* UPDATED: Replaced Line chart with a Bar chart for Word Count */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Average Word Count by Tone</h3>
          <div className="h-64">
            <Bar data={wordCountByToneData} options={chartOptions} />
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
            Analysis shows strong links between psychological traits and email tones, such as Neuroticism's high correlation with Agitated Tone (0.75).
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

