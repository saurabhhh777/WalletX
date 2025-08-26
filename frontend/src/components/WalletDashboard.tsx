import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { EthereumTab } from './EthereumTab';
import { SolanaTab } from './SolanaTab';
import { SettingsPage } from './SettingsPage';
import { RefreshCw, Trash2, Home, Settings, Coins } from 'lucide-react';

interface WalletDashboardProps {
  onGoHome: () => void;
}

export const WalletDashboard: React.FC<WalletDashboardProps> = ({ onGoHome }) => {
  const { ethereumWallet, solanaWallet, refreshBalances, clearWallets, networkSettings, getNetworkDisplayName } = useWallet();
  const [activeTab, setActiveTab] = useState<'ethereum' | 'solana'>('ethereum');
  const [showSettings, setShowSettings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
                onClick={onGoHome}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors font-poppins"
              >
                Home
              </button>
              <button
                onClick={handleClearWallets}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center space-x-2 font-poppins"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All</span>
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
                  <Coins className="w-6 h-6 text-blue-600" />
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
                  <Coins className="w-6 h-6 text-purple-600" />
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
              <Coins className="w-4 h-4 text-blue-600" />
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
              <Coins className="w-4 h-4 text-purple-600" />
              <span>Solana</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'ethereum' ? <EthereumTab /> : <SolanaTab />}
          </div>
        </div>
      </main>
    </div>
  );
}; 