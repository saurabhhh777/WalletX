import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { WalletProvider, useWallet } from './contexts/WalletContext';
import { WalletDashboard } from './components/WalletDashboard';
import { HomePage } from './components/HomePage';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { CookiesPolicy } from './pages/CookiesPolicy';
import { ContactUs } from './pages/ContactUs';
import { HelpCenter } from './pages/HelpCenter';
import { Security } from './pages/Security';
import { Features } from './pages/Features';

const AppContent: React.FC = () => {
  const { ethereumWallet, solanaWallet } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to dashboard if wallets exist and user is on home page
  useEffect(() => {
    if ((ethereumWallet || solanaWallet) && location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [ethereumWallet, solanaWallet, location.pathname, navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleBack = () => {
    if (ethereumWallet || solanaWallet) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<WalletDashboard onGoHome={handleGoHome} />} />
          <Route path="/privacy" element={<PrivacyPolicy onBack={handleBack} />} />
          <Route path="/terms" element={<TermsOfService onBack={handleBack} />} />
          <Route path="/cookies" element={<CookiesPolicy onBack={handleBack} />} />
          <Route path="/contact" element={<ContactUs onBack={handleBack} />} />
          <Route path="/help" element={<HelpCenter onBack={handleBack} />} />
          <Route path="/security" element={<Security onBack={handleBack} />} />
          <Route path="/features" element={<Features onBack={handleBack} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
