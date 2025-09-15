import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import EmailAnalyzer from './components/EmailAnalyzer';
import EmailRewriter from './components/EmailRewriter';
import EDADashboard from './components/EDADashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'analyzer':
        return <EmailAnalyzer />;
      case 'rewriter':
        return <EmailRewriter />;
      case 'eda':
        return <EDADashboard />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
