import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
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
  Smartphone
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ProfilePageProps {
  onBack: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const { user, logout } = useAuth();
  const { ethereumWallet, solanaWallet, clearWallets } = useWallet();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-poppins">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
              <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
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