import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { EthereumTab } from './EthereumTab';
import { SolanaTab } from './SolanaTab';
import { Wallet, Coins, Settings, RefreshCw } from 'lucide-react';

export const WalletDashboard: React.FC = () => {
  const { ethereumWallet, solanaWallet, refreshBalances, clearWallets } = useWallet();
  const [activeTab, setActiveTab] = useState<'ethereum' | 'solana'>('ethereum');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshBalances();
    } catch (error) {
      console.error('Error refreshing balances:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleClearWallets = () => {
    if (confirm('Are you sure you want to clear all wallets? This action cannot be undone.')) {
      clearWallets();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">WalletX</h1>
                <p className="text-sm text-gray-500">Multi-chain Web3 Wallet</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              
              <button
                onClick={handleClearWallets}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wallet Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Ethereum Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Coins className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Ethereum</h3>
                  <p className="text-sm text-gray-500">
                    {ethereumWallet ? 'Wallet Connected' : 'No Wallet'}
                  </p>
                </div>
              </div>
              {ethereumWallet && (
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {parseFloat(ethereumWallet.balance).toFixed(4)} ETH
                  </p>
                  <p className="text-xs text-gray-500">
                    {ethereumWallet.address.slice(0, 6)}...{ethereumWallet.address.slice(-4)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Solana Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <Coins className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Solana</h3>
                  <p className="text-sm text-gray-500">
                    {solanaWallet ? 'Wallet Connected' : 'No Wallet'}
                  </p>
                </div>
              </div>
              {solanaWallet && (
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {parseFloat(solanaWallet.balance).toFixed(4)} SOL
                  </p>
                  <p className="text-xs text-gray-500">
                    {solanaWallet.address.slice(0, 6)}...{solanaWallet.address.slice(-4)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('ethereum')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ethereum'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Ethereum Wallet
            </button>
            <button
              onClick={() => setActiveTab('solana')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'solana'
                  ? 'border-purple-500 text-purple-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Solana Wallet
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {activeTab === 'ethereum' ? <EthereumTab /> : <SolanaTab />}
        </div>
      </main>
    </div>
  );
}; 