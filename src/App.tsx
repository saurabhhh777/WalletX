import { useState, useEffect } from 'react';
import { WalletProvider, useWallet } from './contexts/WalletContext';
import { WalletDashboard } from './components/WalletDashboard';
import { HomePage } from './components/HomePage';

const AppContent: React.FC = () => {
  const { ethereumWallet, solanaWallet } = useWallet();
  const [showHome, setShowHome] = useState(true);

  // Show home page if no wallets exist, otherwise show dashboard
  useEffect(() => {
    if (ethereumWallet || solanaWallet) {
      setShowHome(false);
    }
  }, [ethereumWallet, solanaWallet]);

  const handleGoHome = () => {
    setShowHome(true);
  };

  if (showHome) {
    return <HomePage />;
  }

  return <WalletDashboard onGoHome={handleGoHome} />;
};

function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}

export default App;
