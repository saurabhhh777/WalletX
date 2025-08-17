import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
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
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </WalletProvider>
  );
}

export default App;
