import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import EmailAnalyzer from './components/EmailAnalyzer';
import EmailRewriter from './components/EmailRewriter';
import EDADashboard from './components/EDADashboard';
import ModelComparison from './components/ModelComparison';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'analyzer':
        return <EmailAnalyzer />;
      case 'rewriter':
        return <EmailRewriter />;
      case 'eda':
        return <EDADashboard />;
      case 'models':
        return <ModelComparison />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className={activeTab !== 'home' ? 'py-8' : ''}>
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;