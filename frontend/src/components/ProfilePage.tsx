import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, User, Mail, Calendar, LogOut, Shield, Settings } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

interface ProfilePageProps {
 onBack: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
 const { user, logout } = useAuth();
 const { clearWallets } = useWallet();

 const handleLogout = () => {
  if (window.confirm('Are you sure you want to logout? This will clear all your wallet data.')) {
   clearWallets();
   logout();
   onBack();
  }
 };

 const handleClearWallets = () => {
  if (window.confirm('Are you sure you want to clear all wallets? This action cannot be undone.')) {
   clearWallets();
   onBack();
  }
 };

 if (!user) {
  return (
   <div className="min-h-screen bg-white font-poppins">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
     <div className="text-center">
      <p className="text-gray-600">User not found</p>
     </div>
    </div>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-white font-poppins">
   {/* Header */}
   <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex justify-between items-center py-6">
      <div className="flex items-center space-x-4">
       <button
        onClick={onBack}
        className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors"
       >
        <ArrowLeft className="h-6 w-6 text-black" />
       </button>
       <div>
        <h1 className="text-2xl font-bold text-black font-jost">Profile</h1>
       </div>
      </div>
     </div>
    </div>
   </header>

   {/* Main Content */}
   <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Profile Header */}
    <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
     <div className="flex items-center space-x-6">
      <div className="relative">
       {user.avatar ? (
        <img
         src={user.avatar}
         alt={user.name}
         className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
        />
       ) : (
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
         <User className="w-12 h-12 text-white" />
        </div>
       )}
       <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
      </div>
      <div className="flex-1">
       <h2 className="text-3xl font-bold text-black font-jost mb-2">{user.name}</h2>
       <p className="text-gray-600 font-mulish mb-1 flex items-center">
        <Mail className="w-4 h-4 mr-2" />
        {user.email}
       </p>
       <p className="text-gray-500 text-sm font-mulish flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        Member since {new Date(user.createdAt).toLocaleDateString()}
       </p>
       <div className="mt-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
         <Shield className="w-3 h-3 mr-1" />
         {user.provider.charAt(0).toUpperCase() + user.provider.slice(1)} Account
        </span>
       </div>
      </div>
     </div>
    </div>

    {/* Account Information */}
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
     <h3 className="text-xl font-bold text-black font-jost mb-4 flex items-center">
      <Settings className="w-5 h-5 mr-2" />
      Account Information
     </h3>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
       <label className="block text-sm font-medium text-black mb-2">Full Name</label>
       <p className="text-black font-mulish">{user.name}</p>
      </div>
      <div>
       <label className="block text-sm font-medium text-black mb-2">Email Address</label>
       <p className="text-black font-mulish">{user.email}</p>
      </div>
      <div>
       <label className="block text-sm font-medium text-black mb-2">Account Type</label>
       <p className="text-black font-mulish capitalize">{user.provider} Account</p>
      </div>
      <div>
       <label className="block text-sm font-medium text-black mb-2">Member Since</label>
       <p className="text-black font-mulish">{new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
     </div>
    </div>

    {/* Wallet Information */}
    {user.wallets && (
     <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
      <h3 className="text-xl font-bold text-black font-jost mb-4">Connected Wallets</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {user.wallets.ethereum && (
        <div className="border border-gray-200 rounded-lg p-4">
         <h4 className="font-semibold text-black mb-2">Ethereum Wallet</h4>
         <p className="text-sm text-gray-600 font-mulish">
          Address: {user.wallets.ethereum.address.slice(0, 6)}...{user.wallets.ethereum.address.slice(-4)}
         </p>
         <p className="text-sm text-gray-600 font-mulish">
          Balance: {user.wallets.ethereum.balance} ETH
         </p>
        </div>
       )}
       {user.wallets.solana && (
        <div className="border border-gray-200 rounded-lg p-4">
         <h4 className="font-semibold text-black mb-2">Solana Wallet</h4>
         <p className="text-sm text-gray-600 font-mulish">
          Address: {user.wallets.solana.address.slice(0, 6)}...{user.wallets.solana.address.slice(-4)}
         </p>
         <p className="text-sm text-gray-600 font-mulish">
          Balance: {user.wallets.solana.balance} SOL
         </p>
        </div>
       )}
      </div>
     </div>
    )}

    {/* Actions */}
    <div className="bg-white border border-gray-200 rounded-xl p-6">
     <h3 className="text-xl font-bold text-black font-jost mb-4">Account Actions</h3>
     <div className="space-y-4">
      <button
       onClick={handleClearWallets}
       className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 font-poppins"
      >
       <LogOut className="h-4 w-4" />
       <span>Clear All Wallets</span>
      </button>
      <button
       onClick={handleLogout}
       className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2 font-poppins"
      >
       <LogOut className="h-4 w-4" />
       <span>Logout</span>
      </button>
     </div>
    </div>
   </main>
  </div>
 );
}; 