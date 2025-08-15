import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Wallet, Coins, Sparkles, ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { createEthereumWallet, createSolanaWallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateWallet = async (type: 'ethereum' | 'solana' | 'both') => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (type === 'ethereum' || type === 'both') {
        await createEthereumWallet();
      }
      
      if (type === 'solana' || type === 'both') {
        await createSolanaWallet();
      }

      const walletType = type === 'both' ? 'both wallets' : `${type} wallet`;
      setSuccess(`${walletType} created successfully!`);
    } catch (err) {
      setError('Failed to create wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">WalletX</h1>
                <p className="text-sm text-gray-500">Multi-chain Web3 Wallet</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to WalletX
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create and manage your Ethereum and Solana wallets in one secure, 
            user-friendly interface. Start your Web3 journey today.
          </p>
        </div>

        {/* Wallet Creation Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Ethereum Wallet */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="bg-blue-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Coins className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ethereum Wallet</h3>
              <p className="text-gray-600 mb-6">
                Create a secure Ethereum wallet to manage ETH and ERC-20 tokens.
                Perfect for DeFi, NFTs, and Ethereum ecosystem.
              </p>
              <button
                onClick={() => handleCreateWallet('ethereum')}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <span>Create ETH Wallet</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Solana Wallet */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="bg-purple-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Solana Wallet</h3>
              <p className="text-gray-600 mb-6">
                Create a Solana wallet for fast, low-cost transactions.
                Ideal for DeFi, gaming, and Solana ecosystem.
              </p>
              <button
                onClick={() => handleCreateWallet('solana')}
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <span>Create SOL Wallet</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Both Wallets */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Both Wallets</h3>
              <p className="text-gray-600 mb-6">
                Create both Ethereum and Solana wallets simultaneously.
                Get the best of both worlds in one setup.
              </p>
              <button
                onClick={() => handleCreateWallet('both')}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <span>Create Both Wallets</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose WalletX?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Multi-Chain Support</h4>
              <p className="text-gray-600 text-sm">
                Manage Ethereum and Solana wallets in one interface
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Coins className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure & Private</h4>
              <p className="text-gray-600 text-sm">
                Your private keys stay on your device, never shared
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Easy to Use</h4>
              <p className="text-gray-600 text-sm">
                Simple, intuitive interface for all your crypto needs
              </p>
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">{success}</p>
          </div>
        )}
      </main>
    </div>
  );
}; 