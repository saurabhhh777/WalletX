import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { EthereumTab } from './EthereumTab';
import { SolanaTab } from './SolanaTab';
import { SettingsPage } from './SettingsPage';
import { RefreshCw, Trash2, Home, Settings, Coins, User } from 'lucide-react';
import { TransactionHistory } from './TransactionHistory';

interface WalletDashboardProps {
  onGoHome: () => void;
}

export const WalletDashboard: React.FC<WalletDashboardProps> = ({ onGoHome }) => {
  const { ethereumWallet, solanaWallet, refreshBalances, clearWallets, networkSettings, getNetworkDisplayName } = useWallet();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ethereum' | 'solana'>('ethereum');
  const [showSettings, setShowSettings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Debug logging
  console.log('WalletDashboard Debug:', {
    user: user ? 'User exists' : 'No user',
    userAvatar: user?.avatar,
    userName: user?.name,
    navigate: typeof navigate
  });

  useEffect(() => {
    // Initial refresh
    (async () => {
      setIsRefreshing(true);
      await refreshBalances();
      setIsRefreshing(false);
    })();

    // Periodic refresh every 15 seconds
    const id = setInterval(async () => {
      setIsRefreshing(true);
      await refreshBalances();
      setIsRefreshing(false);
    }, 15000);

    return () => clearInterval(id);
  }, [refreshBalances]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshBalances();
    setIsRefreshing(false);
  };

  const handleClearWallets = () => {
    if (window.confirm('Are you sure you want to clear all wallets? This action cannot be undone.')) {
      clearWallets();
      onGoHome();
    }
  };

  const handleBackFromSettings = () => {
    setShowSettings(false);
  };

  // Show settings page if active
  if (showSettings) {
    return <SettingsPage onBack={handleBackFromSettings} />;
  }

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-900 p-3 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-jost">WalletX Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2 font-poppins"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2 font-poppins"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
              <button
                onClick={() => {
                  console.log('Home button clicked, navigating to /');
                  console.log('Current location before navigation:', window.location.pathname);
                  alert('Home button clicked! Navigating to home page...');
                  window.location.href = '/';
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors font-poppins"
              >
                Home
              </button>
              <button
                onClick={() => window.location.href = '/profile'}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer z-10"
                title="Profile"
                style={{ position: 'relative', zIndex: 10 }}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wallet Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  {/* Ethereum Symbol */}
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-jost">Ethereum Wallet</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium font-poppins ${
                ethereumWallet ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {ethereumWallet ? 'Connected' : 'Not Connected'}
              </span>
            </div>
            {ethereumWallet && (
              <div className="space-y-2 font-mulish">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Network:</span> {getNetworkDisplayName('ethereum', networkSettings.ethereum)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Address:</span> {ethereumWallet.address.slice(0, 6)}...{ethereumWallet.address.slice(-4)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Balance:</span> {ethereumWallet.balance} ETH
                </p>
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  {/* Solana Symbol */}
                  <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.719 0H0v13.719h13.719V0zM24 10.281H10.281V24H24V10.281z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-jost">Solana Wallet</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium font-poppins ${
                solanaWallet ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {solanaWallet ? 'Connected' : 'Not Created'}
              </span>
            </div>
            {solanaWallet && (
              <div className="space-y-2 font-mulish">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Network:</span> {getNetworkDisplayName('solana', networkSettings.solana)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Address:</span> {solanaWallet.address.slice(0, 6)}...{solanaWallet.address.slice(-4)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Balance:</span> {solanaWallet.balance} SOL
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('ethereum')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors font-poppins flex items-center justify-center space-x-2 ${
                activeTab === 'ethereum'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {/* Ethereum Symbol */}
              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span>Ethereum</span>
            </button>
            <button
              onClick={() => setActiveTab('solana')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors font-poppins flex items-center justify-center space-x-2 ${
                activeTab === 'solana'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {/* Solana Symbol */}
              <svg className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.719 0H0v13.719h13.719V0zM24 10.281H10.281V24H24V10.281z"/>
              </svg>
              <span>Solana</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'ethereum' ? <EthereumTab /> : <SolanaTab />}
          </div>
        </div>

        {/* History */}
        <TransactionHistory />
      </main>
    </div>
  );
}; 