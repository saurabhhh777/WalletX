import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Wallet, Coins, Sparkles, Shield, Zap, Globe, CheckCircle, Star, Phone, Smartphone, Mail, Twitter, Github, Linkedin } from 'lucide-react';

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
    <div className="min-h-screen bg-white font-poppins">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-900 p-3 rounded-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-jost">WalletX</h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8 font-poppins">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
              <a href="#security" className="text-gray-600 hover:text-gray-900 font-medium">Security</a>
              <a href="#compare" className="text-gray-600 hover:text-gray-900 font-medium">Compare</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
            </nav>
            <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors font-poppins">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          {/* New Banner */}
          <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 font-poppins">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full mr-2">New</span>
            Multi-chain support for Ethereum and Solana
          </div>

          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight font-jost">
              A wallet system that works like a
              <span className="text-teal-500"> Professional</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-mulish">
              Secure digital assets deserve a system that does it all, from creating wallets and smooth transactions to helping you manage and track your crypto portfolio.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => handleCreateWallet('both')}
              disabled={isLoading}
              className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-3 font-poppins"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Star className="h-5 w-5" />
                  <span>Create Wallet</span>
                </>
              )}
            </button>
            <button className="bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-3 font-poppins">
              <Phone className="h-5 w-5" />
              <span>Learn More</span>
            </button>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="py-12 border-b border-gray-100">
          <p className="text-center text-gray-500 text-sm mb-8 font-medium font-poppins">Trusted by leading blockchain projects</p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-gray-400 font-bold text-xl font-jost">Ethereum</div>
            <div className="text-gray-400 font-bold text-xl font-jost">Solana</div>
            <div className="text-gray-400 font-bold text-xl font-jost">Polygon</div>
            <div className="text-gray-400 font-bold text-xl font-jost">Arbitrum</div>
            <div className="text-gray-400 font-bold text-xl font-jost">Optimism</div>
          </div>
        </div>

        {/* Quick Setup Section */}
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-8 flex items-center justify-center">
            <Wallet className="h-10 w-10 text-gray-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4 font-jost">Quick and Easy Setup</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-mulish">
            "We've scaled to thousands of transactions daily - WalletX's interface is the only thing that keeps us organized." - Alex Chen (DeFi Manager, Crypto Ventures)
          </p>
        </div>

        {/* Wallet Options Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 font-jost">Choose Your Wallet Type</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-mulish">
              From Ethereum to Solana, customize your experience across multiple blockchains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ethereum Wallet */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Coins className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-jost">Ethereum Wallet</h3>
                <p className="text-gray-600 mb-6 font-mulish">
                  Secure Ethereum wallet supporting ETH and all ERC-20 tokens.
                </p>
                <ul className="text-left mb-8 space-y-3">
                  <li className="flex items-center text-sm text-gray-600 font-mulish">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    ETH & ERC-20 support
                  </li>
                  <li className="flex items-center text-sm text-gray-600 font-mulish">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    DeFi & NFT ready
                  </li>
                  <li className="flex items-center text-sm text-gray-600 font-mulish">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    Enterprise security
                  </li>
                </ul>
                <button
                  onClick={() => handleCreateWallet('ethereum')}
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 font-poppins"
                >
                  Create ETH Wallet
                </button>
              </div>
            </div>

            {/* Solana Wallet */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-jost">Solana Wallet</h3>
                <p className="text-gray-600 mb-6 font-mulish">
                  High-performance Solana wallet for lightning-fast transactions.
                </p>
                <ul className="text-left mb-8 space-y-3">
                  <li className="flex items-center text-sm text-gray-600 font-mulish">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    SOL & SPL support
                  </li>
                  <li className="flex items-center text-sm text-gray-600 font-mulish">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    Ultra-fast transactions
                  </li>
                  <li className="flex items-center text-sm text-gray-600 font-mulish">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    Low fees
                  </li>
                </ul>
                <button
                  onClick={() => handleCreateWallet('solana')}
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 font-poppins"
                >
                  Create SOL Wallet
                </button>
              </div>
            </div>

            {/* Both Wallets */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Wallet className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-jost">Both Wallets</h3>
                <p className="text-gray-600 mb-6 font-mulish">
                  Complete multi-chain solution with both Ethereum and Solana.
                </p>
                <ul className="text-left mb-8 space-y-3">
                  <li className="flex items-center text-sm text-gray-600 font-mulish">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    Dual blockchain
                  </li>
                  <li className="flex items-center text-sm text-gray-600 font-mulish">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    Unified interface
                  </li>
                  <li className="flex items-center text-sm text-gray-600 font-mulish">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    Maximum flexibility
                  </li>
                </ul>
                <button
                  onClick={() => handleCreateWallet('both')}
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 font-poppins"
                >
                  Create Both
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-gray-50 rounded-3xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 font-jost">Security That Feels Like You</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-mulish">
              From wallet creation to transaction signing, so your assets always stay secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-sm">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-3 font-jost">Bank-Grade Security</h4>
              <p className="text-gray-600 text-sm font-mulish">
                Military-grade encryption with client-side key storage.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-sm">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-3 font-jost">Lightning Fast</h4>
              <p className="text-gray-600 text-sm font-mulish">
                Optimized for speed with instant wallet creation.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-sm">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-3 font-jost">Multi-Chain</h4>
              <p className="text-gray-600 text-sm font-mulish">
                Seamlessly manage multiple blockchains.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-sm">
                <Smartphone className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-3 font-jost">Mobile Ready</h4>
              <p className="text-gray-600 text-sm font-mulish">
                Responsive design works on all devices.
              </p>
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium font-poppins">{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium font-poppins">{success}</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-white p-2 rounded-lg">
                  <Wallet className="h-6 w-6 text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold font-jost">WalletX</h3>
              </div>
              <p className="text-gray-300 mb-6 font-mulish max-w-md">
                Professional-grade multi-chain wallet for Ethereum and Solana. Built with enterprise security standards and intuitive design.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold text-lg mb-4 font-jost">Product</h4>
              <ul className="space-y-3 font-mulish">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-lg mb-4 font-jost">Support</h4>
              <ul className="space-y-3 font-mulish">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-mulish">
              © 2024 WalletX. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors font-mulish">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors font-mulish">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors font-mulish">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; 