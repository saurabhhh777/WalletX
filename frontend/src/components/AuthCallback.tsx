import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { Loader2 } from 'lucide-react';

export const AuthCallback: React.FC = () => {
 const [searchParams] = useSearchParams();
 const navigate = useNavigate();
 const { login } = useAuth();
 const { loadUserWallets } = useWallet();
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const handleAuth = async () => {
   const token = searchParams.get('token');
   const walletsParam = searchParams.get('wallets');
   const userParam = searchParams.get('user');

   console.log('AuthCallback - Token:', token ? 'Present' : 'Missing');
   console.log('AuthCallback - Wallets param:', walletsParam ? 'Present' : 'Missing');
   console.log('AuthCallback - User param:', userParam ? 'Present' : 'Missing');

   if (token) {
    try {
     let userData = null;
     
     // Parse user data if provided
     if (userParam) {
      try {
       userData = JSON.parse(userParam);
       console.log('AuthCallback - Parsed user data:', userData);
      } catch (userError) {
       console.error('Error parsing user data:', userError);
      }
     }
     
     console.log('AuthCallback - Calling login with token');
     login(token, userData);
     
     // Load user wallets if provided
     if (walletsParam) {
      try {
       const walletInfo = JSON.parse(walletsParam);
       console.log('AuthCallback - Loading wallets:', walletInfo);
       await loadUserWallets(walletInfo);
      } catch (walletError) {
       console.error('Error parsing wallet info:', walletError);
      }
     }
     
     // Redirect to dashboard after successful login
     console.log('AuthCallback - Redirecting to dashboard in 1 second');
     setTimeout(() => {
      navigate('/dashboard');
     }, 1000);
    } catch (err) {
     console.error('AuthCallback - Authentication error:', err);
     setError('Authentication failed. Please try again.');
     setTimeout(() => {
      navigate('/');
     }, 3000);
    }
   } else {
    console.error('AuthCallback - No token received');
    setError('No authentication token received.');
    setTimeout(() => {
     navigate('/');
    }, 3000);
   }
  };

  handleAuth();
 }, [searchParams, login, loadUserWallets, navigate]);

 if (error) {
  return (
   <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
     <div className="text-red-600 mb-4">
      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
     </div>
     <h2 className="text-xl font-bold text-black font-jost mb-2">
      Authentication Error
     </h2>
     <p className="text-gray-600 font-mulish mb-4">{error}</p>
     <p className="text-sm text-gray-500 font-mulish">
      Redirecting to home page...
     </p>
    </div>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-white flex items-center justify-center">
   <div className="text-center">
    <div className="mb-4">
     <Loader2 className="w-16 h-16 mx-auto text-blue-600 animate-spin" />
    </div>
    <h2 className="text-xl font-bold text-black font-jost mb-2">
     Signing you in...
    </h2>
    <p className="text-gray-600 font-mulish">
     Please wait while we complete your authentication and load your wallets.
    </p>
   </div>
  </div>
 );
}; 