import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { WalletProvider, useWallet } from './contexts/WalletContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { HomePage } from './components/HomePage';
import { WalletDashboard } from './components/WalletDashboard';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { TermsOfService } from './pages/TermsOfService';
import { CookiesPolicy } from './pages/CookiesPolicy';
import { ContactUs } from './pages/ContactUs';
import { HelpCenter } from './pages/HelpCenter';
import { Security } from './pages/Security';
import { Features } from './pages/Features';
import { ProfilePage } from './pages/ProfilePage';
import { AuthCallback } from './components/AuthCallback';
import { Footer } from './components/Footer';
import { useThemeInit } from './hooks/useThemeInit';

const AppContent: React.FC = () => {
 const { ethereumWallet, solanaWallet } = useWallet();
 const { isLoading, isAuthenticated } = useAuth();
 const navigate = useNavigate();
 const location = useLocation();
 
 // Initialize theme
 useThemeInit();

 useEffect(() => {
  // Temporarily disable all automatic redirects for debugging
  console.log('App useEffect - Current location:', location.pathname);
  console.log('App useEffect - Has wallets:', ethereumWallet || solanaWallet);
  
  // All automatic redirects disabled for debugging
 }, [ethereumWallet, solanaWallet, location.pathname, navigate, isLoading, isAuthenticated]);



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
  <div className="min-h-screen flex flex-col bg-gray-50">
   <main className="flex-1">
    <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path="/auth-callback" element={<AuthCallback />} />
<Route path="/signin" element={<SignIn onBack={handleBack} />} />
<Route path="/signup" element={<SignUp onBack={handleBack} />} />
     <Route path="/dashboard" element={<WalletDashboard />} />
     <Route path="/profile" element={<ProfilePage onBack={handleBack} />} />
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
