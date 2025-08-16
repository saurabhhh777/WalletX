import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Wallet, Coins, Sparkles, ArrowRight, Shield, Zap, Globe, CheckCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  WalletX
                </h1>
                <p className="text-sm text-gray-600 font-medium">Enterprise-Grade Multi-Chain Wallet</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <div className="mb-8">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Secure Your
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Digital Assets</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Professional-grade multi-chain wallet for Ethereum and Solana. 
              Built with enterprise security standards and intuitive design.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
              <div className="text-gray-700 font-semibold">Blockchains</div>
              <div className="text-sm text-gray-500">Ethereum & Solana</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-indigo-600 mb-2">100%</div>
              <div className="text-gray-700 font-semibold">Secure</div>
              <div className="text-sm text-gray-500">Client-side storage</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-700 font-semibold">Access</div>
              <div className="text-sm text-gray-500">Always available</div>
            </div>
          </div>
        </div>

        {/* Wallet Creation Options */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Wallet</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the perfect wallet configuration for your needs. 
              Create individual wallets or get both for maximum flexibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ethereum Wallet */}
            <div className="group bg-white rounded-3xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl w-20 h-20 mx-auto mb-8 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Coins className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ethereum Wallet</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Enterprise-grade Ethereum wallet supporting ETH and all ERC-20 tokens. 
                  Perfect for DeFi, NFTs, and the Ethereum ecosystem.
                </p>
                <ul className="text-left mb-8 space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    ETH & ERC-20 token support
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    DeFi & NFT compatibility
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    Enterprise security standards
                  </li>
                </ul>
                <button
                  onClick={() => handleCreateWallet('ethereum')}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <span>Create ETH Wallet</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Solana Wallet */}
            <div className="group bg-white rounded-3xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl w-20 h-20 mx-auto mb-8 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Solana Wallet</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  High-performance Solana wallet for lightning-fast transactions. 
                  Ideal for DeFi, gaming, and the Solana ecosystem.
                </p>
                <ul className="text-left mb-8 space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    SOL & SPL token support
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    Ultra-fast transactions
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    Low transaction fees
                  </li>
                </ul>
                <button
                  onClick={() => handleCreateWallet('solana')}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <span>Create SOL Wallet</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Both Wallets */}
            <div className="group bg-white rounded-3xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-6 rounded-2xl w-20 h-20 mx-auto mb-8 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Wallet className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Both Wallets</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Complete multi-chain solution with both Ethereum and Solana wallets. 
                  Maximize your opportunities across both ecosystems.
                </p>
                <ul className="text-left mb-8 space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    Dual blockchain support
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    Unified interface
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    Maximum flexibility
                  </li>
                </ul>
                <button
                  onClick={() => handleCreateWallet('both')}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Both Wallets</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Enterprise Features</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with professional standards for security, performance, and user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/80 transition-all duration-300">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-3">Bank-Grade Security</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Military-grade encryption with client-side key storage. 
                Your private keys never leave your device.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/80 transition-all duration-300">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-3">Lightning Fast</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Optimized for speed with instant wallet creation and 
                real-time balance updates.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/80 transition-all duration-300">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-3">Multi-Chain</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Seamlessly manage multiple blockchains in one unified 
                interface with cross-chain compatibility.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/80 transition-all duration-300">
              <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Wallet className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-3">Professional UI</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enterprise-grade user interface designed for both 
                beginners and advanced users.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center mb-20">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust WalletX for their digital asset management. 
            Create your wallet in seconds and start your Web3 journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleCreateWallet('both')}
              disabled={isLoading}
              className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-3 shadow-lg"
            >
              <span>Create Both Wallets</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6">
            <p className="text-green-800 font-medium">{success}</p>
          </div>
        )}
      </main>
    </div>
  );
}; 