import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Star, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { DarkModeToggle } from './DarkModeToggle';
import ethimg from '../assets/ethimg.jpeg';
import solimg from '../assets/solimg.jpeg';

export const HomePage: React.FC = () => {
 const { user, isAuthenticated, logout, isLoading } = useAuth();
 const navigate = useNavigate();
 // Debug logging
 console.log('HomePage Debug:', {
 isLoading,
 isAuthenticated,
 user: user ? 'User exists' : 'No user',
 userData: user
 });

 const handleGetStarted = () => {
 if (!isAuthenticated) {
  navigate("/signin");
  return;
 }
 navigate('/dashboard');
 };

 const handleLogout = () => {
 logout();
 toast.success('Logged out successfully');
 };

 const scrollToSection = (sectionId: string) => {
 const element = document.getElementById(sectionId);
 if (element) {
  element.scrollIntoView({ 
  behavior: 'smooth',
  block: 'start'
  });
 }
 };

 return (
 <div className="min-h-screen bg-white font-poppins">
  {/* Header */}
  <header className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   <div className="flex justify-between items-center py-4">
   <div className="flex items-center space-x-3">
    <img src="/favicon-32x32.png" alt="WalletX" className="w-8 h-8 rounded" />
    <h1 className="text-2xl font-bold text-black">WalletX</h1>
   </div>
   
   <div className="hidden md:flex items-center space-x-8">
    <button 
    onClick={() => scrollToSection('features')} 
    className="text-gray-600 hover:text-black transition-colors"
    >
    Features
    </button>
    <button 
    onClick={() => scrollToSection('security')} 
    className="text-gray-600 hover:text-black transition-colors"
    >
    Security
    </button>
    <button 
    onClick={() => scrollToSection('compare')} 
    className="text-gray-600 hover:text-black transition-colors"
    >
    Compare
    </button>
    <button 
    onClick={() => scrollToSection('pricing')} 
    className="text-gray-600 hover:text-black transition-colors"
    >
    Pricing
    </button>
   </div>
   
   {isAuthenticated ? (
    <div className="flex items-center space-x-4">
    <DarkModeToggle />
    <button 
     onClick={() => window.location.href = '/profile'}
     className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors cursor-pointer"
    >
     {user?.avatar ? (
     <img
      src={user.avatar}
      alt={user.name}
      className="w-8 h-8 rounded-full"
     />
     ) : (
     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
      <User className="w-4 h-4 text-white" />
     </div>
     )}
     <span className="text-sm font-medium text-black">
     {user?.name}
     </span>
    </button>
    <button
     onClick={handleLogout}
     className="text-gray-600 hover:text-gray-800 transition-colors"
     title="Logout"
    >
     <LogOut className="w-5 h-5" />
    </button>
    </div>
   ) : (
    <div className="flex items-center space-x-4">
    <DarkModeToggle />
    <button
     className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
    >
     Get Started
    </button>
    </div>
   )}
   </div>
  </div>
  </header>

  {/* Main Content */}
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  {/* New Banner */}
  <div className="text-center mb-8">
   <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
   New Multi-chain support for Ethereum and Solana
   </div>
  </div>

  {/* Hero Section */}
  <div className="text-center mb-16">
   {isAuthenticated ? (
   <>
         <h2 className="text-5xl font-bold text-black mb-6">
   Welcome back,{' '}
   <span className="text-teal-500">{user?.name || 'User'}</span>
   </h2>
   <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
   Your secure digital assets are ready. Access your dashboard to manage wallets, track transactions, and monitor your crypto portfolio.
   </p>
   </>
   ) : (
   <>
    <h2 className="text-5xl font-bold text-black mb-6">
    A wallet system that works like a{' '}
    <span className="text-teal-500">Professional</span>
    </h2>
    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
    Secure digital assets deserve a system that does it all, from creating wallets and smooth transactions to helping you manage and track your crypto portfolio.
    </p>
   </>
   )}
  </div>

  {/* Action Buttons */}
  <div className="flex justify-center space-x-4 mb-16">
   {isAuthenticated ? (
   <>
    <button
    onClick={() => window.location.href = '/dashboard'}
    className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
    >
    <img src="/favicon-32x32.png" alt="Dashboard" className="w-5 h-5" />
    <span>Go to Dashboard</span>
    </button>
    <button
    onClick={() => window.location.href = '/profile'}
    className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg border border-gray-300 hover:bg-white transition-colors flex items-center space-x-2"
    >
    <User className="w-5 h-5" />
    <span>View Profile</span>
    </button>
   </>
   ) : (
   <>
    <button
    onClick={handleGetStarted}
    className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
    >
    <Star className="w-5 h-5" />
    <span>Create Wallet</span>
    </button>
    <button className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg border border-gray-300 hover:bg-white transition-colors flex items-center space-x-2">
    <Phone className="w-5 h-5" />
    <span>Learn More</span>
    </button>
   </>
   )}
  </div>

  {/* Trusted by Section */}
  <div className="text-center mb-16">
   <p className="text-gray-500 mb-6">Trusted by leading blockchain projects</p>
   <div className="flex justify-center space-x-8 text-gray-400">
   <span>Ethereum</span>
   <span>Solana</span>
   <span>Polygon</span>
   <span>Arbitrum</span>
   <span>Optimism</span>
   </div>
  </div>

  {/* Price Cards */}
  <div className="flex justify-center space-x-6 mb-16">
   <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
   <div className="text-2xl font-bold text-black">ETH $4,241.58</div>
   <div className="text-red-500 text-sm">-0.35%</div>
   </div>
   <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
   <div className="text-2xl font-bold text-black">SOL $178.20</div>
   <div className="text-red-500 text-sm">-2.99%</div>
   </div>
  </div>

  {/* Quick and Easy Setup Section */}
  <div className="text-center mb-16">
   <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
   <img src="/favicon-32x32.png" alt="Setup" className="w-12 h-12" />
   </div>
   <h3 className="text-3xl font-bold text-black mb-4">Quick and Easy Setup</h3>
   <div className="max-w-4xl mx-auto">
   <blockquote className="text-lg text-gray-600 italic">
    "We've scaled to thousands of transactions daily - WalletX's interface is the only thing that keeps us organized." - Alex Chen (DeFi Manager, Crypto Ventures)
   </blockquote>
   </div>
  </div>

  {/* Features Section */}
  <div id="features" className="text-center mb-16">
   <h3 className="text-3xl font-bold text-black mb-4">Choose Your Wallet Type</h3>
   <p className="text-gray-600 mb-8">From Ethereum to Solana, customize your experience across multiple blockchains.</p>
   
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
   {/* Ethereum Wallet Card */}
   <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <img src={ethimg} alt="Ethereum" className="w-8 h-8 rounded-full" />
    </div>
    <h4 className="text-xl font-bold text-black mb-2">Ethereum Wallet</h4>
    <p className="text-gray-600 mb-4">Secure Ethereum wallet supporting ETH and all ERC-20 tokens.</p>
    <ul className="text-left space-y-2 mb-6">
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     ETH & ERC-20 support
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     DeFi & NFT ready
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Enterprise security
    </li>
    </ul>
    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
    Create ETH Wallet
    </button>
   </div>

   {/* Solana Wallet Card */}
   <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <img src={solimg} alt="Solana" className="w-8 h-8 rounded-full" />
    </div>
    <h4 className="text-xl font-bold text-black mb-2">Solana Wallet</h4>
    <p className="text-gray-600 mb-4">High-performance Solana wallet for lightning-fast transactions.</p>
    <ul className="text-left space-y-2 mb-6">
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     SOL & SPL support
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Ultra-fast transactions
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Low fees
    </li>
    </ul>
    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
    Create SOL Wallet
    </button>
   </div>

   {/* Both Wallets Card */}
   <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <img src="/favicon-32x32.png" alt="Both Wallets" className="w-8 h-8" />
    </div>
    <h4 className="text-xl font-bold text-black mb-2">Both Wallets</h4>
    <p className="text-gray-600 mb-4">Complete multi-chain solution with both Ethereum and Solana.</p>
    <ul className="text-left space-y-2 mb-6">
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Dual blockchain
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Unified interface
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Maximum flexibility
    </li>
    </ul>
    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
    Create Both
    </button>
   </div>
   </div>
  </div>

  {/* Security Section */}
  <div id="security" className="text-center mb-16">
   <h3 className="text-3xl font-bold text-black mb-4">Security That Feels Like You</h3>
   <p className="text-gray-600 mb-8">From wallet creation to transaction signing, so your assets always stay secure.</p>
   
   <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
   <div className="text-center">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <svg className="w-8 h-8 text-gray-600 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
    </div>
    <h4 className="text-lg font-semibold text-black mb-2">Bank-Grade Security</h4>
    <p className="text-sm text-gray-600">Military-grade encryption with client-side key storage.</p>
   </div>
   
   <div className="text-center">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <svg className="w-8 h-8 text-gray-600 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
    </div>
    <h4 className="text-lg font-semibold text-black mb-2">Lightning Fast</h4>
    <p className="text-sm text-gray-600">Optimized for speed with instant wallet creation.</p>
   </div>
   
   <div className="text-center">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <svg className="w-8 h-8 text-gray-600 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    </div>
    <h4 className="text-lg font-semibold text-black mb-2">Multi-Chain</h4>
    <p className="text-sm text-gray-600">Seamlessly manage multiple blockchains.</p>
   </div>
   
   <div className="text-center">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <svg className="w-8 h-8 text-gray-600 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
    </div>
    <h4 className="text-lg font-semibold text-black mb-2">Mobile Ready</h4>
    <p className="text-sm text-gray-600">Responsive design works on all devices.</p>
   </div>
   </div>
  </div>

  {/* Compare Section */}
  <div id="compare" className="text-center mb-16">
   <h3 className="text-3xl font-bold text-black mb-4">Compare Wallet Solutions</h3>
   <p className="text-gray-600 mb-8">See how WalletX stacks up against other wallet solutions.</p>
   
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
   <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <h4 className="text-xl font-bold text-black mb-4">Traditional Wallets</h4>
    <ul className="text-left space-y-2 mb-6">
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
     </svg>
     Single blockchain support
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
     </svg>
     Complex setup process
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
     </svg>
     Limited features
    </li>
    </ul>
   </div>
   
   <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <h4 className="text-xl font-bold text-black mb-4">WalletX</h4>
    <ul className="text-left space-y-2 mb-6">
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Multi-chain support
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     One-click setup
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Advanced features
    </li>
    </ul>
   </div>
   
   <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <h4 className="text-xl font-bold text-black mb-4">Enterprise Solutions</h4>
    <ul className="text-left space-y-2 mb-6">
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     High cost
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Complex deployment
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Overkill for most users
    </li>
    </ul>
   </div>
   </div>
  </div>

  {/* Pricing Section */}
  <div id="pricing" className="text-center mb-16">
   <h3 className="text-3xl font-bold text-black mb-4">Simple, Transparent Pricing</h3>
   <p className="text-gray-600 mb-8">Choose the plan that works best for you.</p>
   
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
   <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <h4 className="text-xl font-bold text-black mb-2">Free</h4>
    <div className="text-3xl font-bold text-blue-600 mb-4">$0</div>
    <ul className="text-left space-y-2 mb-6">
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Up to 3 wallets
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Basic features
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Community support
    </li>
    </ul>
    <button className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">
    Get Started Free
    </button>
   </div>
   
   <div className="bg-white border-2 border-blue-500 rounded-lg p-6 shadow-sm">
    <h4 className="text-xl font-bold text-black mb-2">Pro</h4>
    <div className="text-3xl font-bold text-blue-600 mb-4">$9.99<span className="text-sm text-gray-500">/month</span></div>
    <ul className="text-left space-y-2 mb-6">
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Unlimited wallets
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Advanced features
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Priority support
    </li>
    </ul>
    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
    Start Pro Trial
    </button>
   </div>
   
   <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <h4 className="text-xl font-bold text-black mb-2">Enterprise</h4>
    <div className="text-3xl font-bold text-blue-600 mb-4">Custom</div>
    <ul className="text-left space-y-2 mb-6">
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Custom solutions
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     Dedicated support
    </li>
    <li className="flex items-center text-sm text-gray-600">
     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
     </svg>
     SLA guarantee
    </li>
    </ul>
    <button className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">
    Contact Sales
    </button>
   </div>
   </div>
  </div>
  </main>

  {/* Floating Action Button */}
  <div className="fixed bottom-6 right-6">
  <button className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
   </svg>
  </button>
  </div>

  {/* Login Modal */}
 </div>
 );
}; 