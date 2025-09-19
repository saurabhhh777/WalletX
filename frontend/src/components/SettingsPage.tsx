import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Copy, Check, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface SettingsPageProps {
 onBack: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
 const { ethereumWallet, solanaWallet, networkSettings, updateNetworkSettings } = useWallet();
 const [showEthPrivateKey, setShowEthPrivateKey] = useState(false);
 const [showSolPrivateKey, setShowSolPrivateKey] = useState(false);
 const [copied, setCopied] = useState(false);

 const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  setCopied(true);
  toast.success('Copied to clipboard!');
  setTimeout(() => setCopied(false), 2000);
 };

 const handleNetworkChange = (chain: 'ethereum' | 'solana', network: string) => {
  // Update network settings in context
  updateNetworkSettings(chain, network);
  toast.success(`${chain === 'ethereum' ? 'Ethereum' : 'Solana'} network changed to ${network}`);
 };

 const getNetworkInfo = (chain: 'ethereum' | 'solana') => {
  const network = networkSettings[chain];
  if (chain === 'ethereum') {
   switch (network) {
    case 'mainnet':
     return { name: 'Ethereum Mainnet', rpc: 'https://eth-mainnet.g.alchemy.com/v2/demo' };
    case 'sepolia':
     return { name: 'Sepolia Testnet', rpc: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161' };
    case 'goerli':
     return { name: 'Goerli Testnet', rpc: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161' };
    default:
     return { name: 'Sepolia Testnet', rpc: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161' };
   }
  } else {
   switch (network) {
    case 'mainnet':
     return { name: 'Solana Mainnet', rpc: 'https://api.mainnet-beta.solana.com' };
    case 'devnet':
     return { name: 'Solana Devnet', rpc: 'https://api.devnet.solana.com' };
    case 'testnet':
     return { name: 'Solana Testnet', rpc: 'https://api.testnet.solana.com' };
    default:
     return { name: 'Solana Devnet', rpc: 'https://api.devnet.solana.com' };
   }
  }
 };

 return (
  <div className="min-h-screen bg-white font-poppins">
   <div className="max-w-4xl mx-auto p-6">
    {/* Header */}
    <div className="flex items-center mb-8">
     <button
      onClick={onBack}
      className="mr-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
     >
      <ArrowLeft className="h-6 w-6" />
     </button>
     <h1 className="text-3xl font-bold text-black font-jost">Settings</h1>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
     {/* Network Settings */}
     <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
       <h2 className="text-xl font-bold text-black mb-6 font-jost">Network Configuration</h2>
       
       {/* Ethereum Network */}
       <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 font-jost">Ethereum Network</h3>
        <div className="space-y-2">
         {['sepolia', 'goerli', 'mainnet'].map((network) => (
          <label key={network} className="flex items-center space-x-3 cursor-pointer">
           <input
            type="radio"
            name="ethereum-network"
            value={network}
            checked={networkSettings.ethereum === network}
            onChange={(e) => handleNetworkChange('ethereum', e.target.value)}
            className="text-blue-600 focus:ring-blue-500"
           />
           <span className="text-black font-mulish capitalize">{network}</span>
          </label>
         ))}
        </div>
        <div className="mt-3 p-3 bg-white rounded-lg">
         <p className="text-sm text-gray-600 font-mulish">
          <strong>Current:</strong> {getNetworkInfo('ethereum').name}
         </p>
         <p className="text-xs text-gray-500 font-mulish mt-1">
          RPC: {getNetworkInfo('ethereum').rpc}
         </p>
        </div>
       </div>

       {/* Solana Network */}
       <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 font-jost">Solana Network</h3>
        <div className="space-y-2">
         {['devnet', 'testnet', 'mainnet'].map((network) => (
          <label key={network} className="flex items-center space-x-3 cursor-pointer">
           <input
            type="radio"
            name="solana-network"
            value={network}
            checked={networkSettings.solana === network}
            onChange={(e) => handleNetworkChange('solana', e.target.value)}
            className="text-purple-600 focus:ring-purple-500"
           />
           <span className="text-black font-mulish capitalize">{network}</span>
          </label>
         ))}
        </div>
        <div className="mt-3 p-3 bg-white rounded-lg">
         <p className="text-sm text-gray-600 font-mulish">
          <strong>Current:</strong> {getNetworkInfo('solana').name}
         </p>
         <p className="text-xs text-gray-500 font-mulish mt-1">
          RPC: {getNetworkInfo('solana').rpc}
         </p>
        </div>
       </div>
      </div>
     </div>

     {/* Wallet Information */}
     <div className="space-y-6">
      {/* Ethereum Wallet */}
      {ethereumWallet && (
       <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-black mb-6 font-jost">Ethereum Wallet</h2>
        
        <div className="space-y-4">
         <div>
          <label className="block text-sm font-medium text-black mb-2 font-poppins">Address</label>
          <div className="flex items-center space-x-2">
           <input
            type="text"
            value={ethereumWallet.address}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white font-mono text-sm font-mulish"
           />
           <button
            onClick={() => copyToClipboard(ethereumWallet.address)}
            className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
           >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
           </button>
          </div>
         </div>

         <div>
          <label className="block text-sm font-medium text-black mb-2 font-poppins">Private Key</label>
          <div className="flex items-center space-x-2">
           <input
            type={showEthPrivateKey ? "text" : "password"}
            value={ethereumWallet.privateKey}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white font-mono text-sm font-mulish"
           />
           <button
            onClick={() => setShowEthPrivateKey(!showEthPrivateKey)}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
           >
            {showEthPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
           </button>
           <button
            onClick={() => copyToClipboard(ethereumWallet.privateKey || '')}
            className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
           >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
           </button>
          </div>
         </div>

         <div>
          <label className="block text-sm font-medium text-black mb-2 font-poppins">Balance</label>
          <input
           type="text"
           value={`${ethereumWallet.balance} ETH`}
           readOnly
           className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white font-mulish"
          />
         </div>
        </div>
       </div>
      )}

      {/* Solana Wallet */}
      {solanaWallet && (
       <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-black mb-6 font-jost">Solana Wallet</h2>
        
        <div className="space-y-4">
         <div>
          <label className="block text-sm font-medium text-black mb-2 font-poppins">Address</label>
          <div className="flex items-center space-x-2">
           <input
            type="text"
            value={solanaWallet.address}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white font-mono text-sm font-mulish"
           />
           <button
            onClick={() => copyToClipboard(solanaWallet.address)}
            className="p-2 text-purple-600 hover:text-purple-700 transition-colors"
           >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
           </button>
          </div>
         </div>

         <div>
          <label className="block text-sm font-medium text-black mb-2 font-poppins">Private Key</label>
          <div className="flex items-center space-x-2">
           <input
            type={showSolPrivateKey ? "text" : "password"}
            value={solanaWallet.privateKey}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white font-mono text-sm font-mulish"
           />
           <button
            onClick={() => setShowSolPrivateKey(!showSolPrivateKey)}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
           >
            {showSolPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
           </button>
           <button
            onClick={() => copyToClipboard(solanaWallet.privateKey || '')}
            className="p-2 text-purple-600 hover:text-purple-700 transition-colors"
           >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
           </button>
          </div>
         </div>

         <div>
          <label className="block text-sm font-medium text-black mb-2 font-poppins">Balance</label>
          <input
           type="text"
           value={`${solanaWallet.balance} SOL`}
           readOnly
           className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white font-mulish"
          />
         </div>
        </div>
       </div>
      )}

      {/* No Wallets Message */}
      {!ethereumWallet && !solanaWallet && (
       <div className="bg-white rounded-xl p-6 shadow-sm text-center">
        <h2 className="text-xl font-bold text-black mb-4 font-jost">No Wallets Found</h2>
        <p className="text-gray-600 font-mulish">
         Create or import wallets to see their information here.
        </p>
       </div>
      )}
     </div>
    </div>

    {/* Security Warning */}
    <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
     <h3 className="text-lg font-bold text-red-800 mb-2 font-jost">Security Warning</h3>
     <p className="text-red-700 font-mulish">
      <strong>Never share your private keys with anyone!</strong> They provide full access to your wallets. 
      Store them securely and only use this application for testing purposes.
     </p>
    </div>
   </div>
  </div>
 );
}; 