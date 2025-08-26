import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { WalletProvider, useWallet } from './contexts/WalletContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { HomePage } from './components/HomePage';
import { WalletDashboard } from './components/WalletDashboard';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { CookiesPolicy } from './pages/CookiesPolicy';
import { ContactUs } from './pages/ContactUs';
import { HelpCenter } from './pages/HelpCenter';
import { Security } from './pages/Security';
import { Features } from './pages/Features';
import { AuthCallback } from './components/AuthCallback';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { ethereumWallet, solanaWallet } = useWallet();
  const { isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasWallets = ethereumWallet || solanaWallet;
    const manualHome = sessionStorage.getItem('manualHome') === '1';
    const onHome = location.pathname === '/';

    // Bypass auto-redirect if user explicitly clicked Home
    if (hasWallets && onHome && !manualHome) {
      navigate('/dashboard');
    }

    // If we're on Home and manual flag is set, clear it
    if (onHome && manualHome) {
      sessionStorage.removeItem('manualHome');
    }
  }, [ethereumWallet, solanaWallet, location.pathname, navigate]);

  const handleGoHome = () => {
    sessionStorage.setItem('manualHome', '1');
    navigate('/');
  };

  const handleBack = () => {
    if (ethereumWallet || solanaWallet) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth-callback" element={<AuthCallback />} />
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
      <AuthProvider>
        <WalletProvider>
          <AppContent />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: '#363636', color: '#fff' },
              success: { duration: 3000, iconTheme: { primary: '#4ade80', secondary: '#fff' } },
              error: { duration: 5000, iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </WalletProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
