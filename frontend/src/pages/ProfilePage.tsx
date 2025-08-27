import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  LogOut, 
  Shield, 
  Settings, 
  Edit3, 
  Eye, 
  EyeOff,
  Copy,
  Check,
  Wallet,
  Activity,
  Bell,
  Lock,
  Globe,
  Smartphone,
  Link,
  Unlink,
  Github
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ProfilePageProps {
  onBack: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const { user, logout, isLoading, isAuthenticated } = useAuth();
  const { ethereumWallet, solanaWallet, clearWallets } = useWallet();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLinking, setIsLinking] = useState(false);

  // Debug logging
  console.log('ProfilePage Debug:', {
    isLoading,
    isAuthenticated,
    user: user ? 'User exists' : 'No user',
    userData: user,
    token: localStorage.getItem('authToken') ? 'Token exists' : 'No token',
    tokenValue: localStorage.getItem('authToken')?.substring(0, 20) + '...'
  });

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout? This will clear all your wallet data.')) {
      clearWallets();
      logout();
      navigate('/');
    }
  };

  const handleClearWallets = () => {
    if (window.confirm('Are you sure you want to clear all wallets? This action cannot be undone.')) {
      clearWallets();
      navigate('/');
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied to clipboard!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  // Handle account linking success/error messages
  useEffect(() => {
    const linkSuccess = searchParams.get('linkSuccess');
    const linkError = searchParams.get('linkError');
    
    if (linkSuccess) {
      toast.success(`${linkSuccess.charAt(0).toUpperCase() + linkSuccess.slice(1)} account linked successfully!`);
      // Clear the URL parameter
      navigate('/profile', { replace: true });
    }
    
    if (linkError) {
      toast.error(`Failed to link ${linkError} account. Please try again.`);
      // Clear the URL parameter
      navigate('/profile', { replace: true });
    }
  }, [searchParams, navigate]);

  const handleLinkAccount = (provider: 'google' | 'github') => {
    setIsLinking(true);
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      toast.error('Authentication required');
      setIsLinking(false);
      return;
    }

    // Add user ID to the URL for the backend to identify the current user
    const linkUrl = provider === 'google' 
      ? `${API_ENDPOINTS.LINK_GOOGLE}?userId=${user?.id}`
      : `${API_ENDPOINTS.LINK_GITHUB}?userId=${user?.id}`;
    
    // Open the OAuth flow in a new window
    const popup = window.open(linkUrl, 'linkAccount', 'width=500,height=600');
    
    if (!popup) {
      toast.error('Please allow popups to link your account');
      setIsLinking(false);
      return;
    }

    // Check if the popup was closed
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        setIsLinking(false);
        // Refresh the page to get updated user data
        window.location.reload();
      }
    }, 1000);
  };

  const handleUnlinkAccount = async (provider: 'google' | 'github') => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_ENDPOINTS.UNLINK_PROVIDER}/${provider}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success(`${provider.charAt(0).toUpperCase() + provider.slice(1)} account unlinked successfully`);
        // Refresh the page to get updated user data
        window.location.reload();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to unlink account');
      }
    } catch (error) {
      toast.error('Failed to unlink account');
    }
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-poppins flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-center">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  // Check if there's a token in localStorage as a fallback
  const hasToken = localStorage.getItem('authToken');
  
  // If we have a token but no user data yet, show loading
  if (hasToken && !user && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-poppins flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-center">Loading user data...</p>
        </div>
      </div>
    );
  }
  
  // If no token and not authenticated, show login prompt
  if (!isAuthenticated && !hasToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-poppins">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
              <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full"
                >
                  Go to Home & Login
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors w-full"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If we have a token but user data is still loading, show loading
  if (hasToken && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-poppins flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-center">Loading user data...</p>
        </div>
      </div>
    );
  }

  // If we don't have user data, show error
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-poppins">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">User Data Not Found</h2>
              <p className="text-gray-600 mb-6">Unable to load user profile data.</p>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-poppins">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
              >
                <ArrowLeft className="h-6 w-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-jost">Profile</h1>
                <p className="text-gray-600 font-mulish">Manage your account and preferences</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h2 className="text-4xl font-bold text-gray-900 font-jost">{user.name}</h2>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      <Shield className="w-4 h-4 mr-1" />
                      {user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 font-mulish text-lg mb-2 flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    {user.email}
                  </p>
                  <p className="text-gray-500 font-mulish flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 font-jost mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-blue-600" />
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-gray-900 font-mulish">{user.name}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between">
                      <p className="text-gray-900 font-mulish">{user.email}</p>
                      <button
                        onClick={() => copyToClipboard(user.email, 'Email')}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        {copiedField === 'Email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-gray-900 font-mulish capitalize">{user.provider} Account</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-gray-900 font-mulish">{new Date(user.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                            </div>
          </div>
        </div>

        {/* Account Linking */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 font-jost mb-6 flex items-center">
            <Link className="w-6 h-6 mr-3 text-blue-600" />
            Linked Accounts
          </h3>
          <p className="text-gray-600 mb-6">
            Link multiple accounts to access your wallet from different platforms. Your wallet data will be shared across all linked accounts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google Account */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Google Account</h4>
                    <p className="text-sm text-gray-600">Sign in with Google</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {user?.provider === 'google' || user?.linkedProviders?.google ? (
                    <>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Connected
                      </span>
                      {user?.linkedProviders?.google && (
                        <button
                          onClick={() => handleUnlinkAccount('google')}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Unlink Google account"
                        >
                          <Unlink className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleLinkAccount('google')}
                      disabled={isLinking}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isLinking ? 'Linking...' : 'Link Account'}
                    </button>
                  )}
                </div>
              </div>
              {user?.linkedProviders?.google && (
                <p className="text-xs text-gray-500">
                  Linked on {new Date(user.linkedProviders.google.linkedAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* GitHub Account */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">GitHub Account</h4>
                    <p className="text-sm text-gray-600">Sign in with GitHub</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {user?.provider === 'github' || user?.linkedProviders?.github ? (
                    <>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Connected
                      </span>
                      {user?.linkedProviders?.github && (
                        <button
                          onClick={() => handleUnlinkAccount('github')}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Unlink GitHub account"
                        >
                          <Unlink className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleLinkAccount('github')}
                      disabled={isLinking}
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {isLinking ? 'Linking...' : 'Link Account'}
                    </button>
                  )}
                </div>
              </div>
              {user?.linkedProviders?.github && (
                <p className="text-xs text-gray-500">
                  Linked on {new Date(user.linkedProviders.github.linkedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Wallet Information */}
            {(ethereumWallet || solanaWallet) && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 font-jost mb-6 flex items-center">
                  <Wallet className="w-6 h-6 mr-3 text-green-600" />
                  Connected Wallets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ethereumWallet && (
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-900 text-lg">Ethereum Wallet</h4>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <div className="bg-white rounded-lg p-3 border border-blue-200 flex items-center justify-between">
                            <p className="text-sm text-gray-900 font-mono">
                              {ethereumWallet.address.slice(0, 6)}...{ethereumWallet.address.slice(-4)}
                            </p>
                            <button
                              onClick={() => copyToClipboard(ethereumWallet.address, 'ETH Address')}
                              className="text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              {copiedField === 'ETH Address' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Balance</label>
                          <p className="text-lg font-bold text-gray-900">{ethereumWallet.balance} ETH</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {solanaWallet && (
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-900 text-lg">Solana Wallet</h4>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <div className="bg-white rounded-lg p-3 border border-purple-200 flex items-center justify-between">
                            <p className="text-sm text-gray-900 font-mono">
                              {solanaWallet.address.slice(0, 6)}...{solanaWallet.address.slice(-4)}
                            </p>
                            <button
                              onClick={() => copyToClipboard(solanaWallet.address, 'SOL Address')}
                              className="text-purple-600 hover:text-purple-700 transition-colors"
                            >
                              {copiedField === 'SOL Address' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Balance</label>
                          <p className="text-lg font-bold text-gray-900">{solanaWallet.balance} SOL</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Quick Actions & Settings */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 font-jost mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Go to Dashboard</span>
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            {/* Security & Privacy */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 font-jost mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-red-600" />
                Security & Privacy
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/security')}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Security Settings</span>
                </button>
                <button
                  onClick={() => navigate('/privacy')}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Globe className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 font-jost mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-orange-600" />
                Account Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleClearWallets}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Clear All Wallets</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">Get support and find answers to your questions.</p>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/help')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Help Center
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors border border-blue-200"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 