import React from 'react';
import { ArrowLeft, Wallet, Send, QrCode, Settings, Shield, Zap, Globe, Smartphone, Lock } from 'lucide-react';

interface FeaturesProps {
 onBack: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onBack }) => {
 return (
  <div className="min-h-screen bg-white font-poppins">
   <div className="max-w-6xl mx-auto p-6">
    {/* Header */}
    <div className="flex items-center mb-8">
     <button
      onClick={onBack}
      className="mr-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
     >
      <ArrowLeft className="h-6 w-6" />
     </button>
     <h1 className="text-3xl font-bold text-black font-jost">Features</h1>
    </div>

    <div className="space-y-8">
     {/* Hero Section */}
     <div className="bg-blue-600 rounded-xl p-8 text-white">
      <div className="text-center">
       <h2 className="text-3xl font-bold mb-4 font-jost">Discover WalletX Features</h2>
       <p className="text-xl opacity-90 font-mulish">
        A comprehensive cryptocurrency wallet with advanced features for secure and convenient digital asset management
       </p>
      </div>
     </div>

     {/* Core Features */}
     <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-black mb-8 font-jost text-center">Core Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
         <Wallet className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-black mb-3 font-jost">Multi-Chain Support</h3>
        <p className="text-gray-600 font-mulish">
         Manage both Ethereum and Solana wallets in one unified interface. Support for multiple networks and seamless switching.
        </p>
       </div>

       <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
         <Send className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-black mb-3 font-jost">Send & Receive</h3>
        <p className="text-gray-600 font-mulish">
         Send transactions to any address with real-time confirmation. Receive payments through QR codes for easy sharing.
        </p>
       </div>

       <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
         <QrCode className="h-8 w-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-black mb-3 font-jost">QR Code Integration</h3>
        <p className="text-gray-600 font-mulish">
         Generate QR codes for your wallet addresses. Easy sharing and scanning for quick payments and transactions.
        </p>
       </div>

       <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
         <Settings className="h-8 w-8 text-orange-600" />
        </div>
        <h3 className="text-lg font-semibold text-black mb-3 font-jost">Network Settings</h3>
        <p className="text-gray-600 font-mulish">
         Switch between different networks (mainnet, testnet, devnet) with ease. Customize your blockchain experience.
        </p>
       </div>

       <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
         <Shield className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-black mb-3 font-jost">Enhanced Security</h3>
        <p className="text-gray-600 font-mulish">
         Client-side storage ensures your private keys never leave your device. Advanced security features and best practices.
        </p>
       </div>

       <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
         <Zap className="h-8 w-8 text-yellow-600" />
        </div>
        <h3 className="text-lg font-semibold text-black mb-3 font-jost">Testnet Support</h3>
        <p className="text-gray-600 font-mulish">
         Full support for testnet environments. Request airdrops and test features without using real funds.
        </p>
       </div>
      </div>
     </div>

     {/* Advanced Features */}
     <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-black mb-8 font-jost text-center">Advanced Features</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       <div className="space-y-6">
        <div className="flex items-start space-x-4">
         <div className="bg-blue-100 p-3 rounded-lg">
          <Globe className="h-6 w-6 text-blue-600" />
         </div>
         <div>
          <h3 className="text-lg font-semibold text-black mb-2 font-jost">Cross-Network Compatibility</h3>
          <p className="text-gray-600 font-mulish">
           Seamlessly work with multiple blockchain networks. Switch between Ethereum and Solana ecosystems with ease.
          </p>
         </div>
        </div>

        <div className="flex items-start space-x-4">
         <div className="bg-green-100 p-3 rounded-lg">
          <Smartphone className="h-6 w-6 text-green-600" />
         </div>
         <div>
          <h3 className="text-lg font-semibold text-black mb-2 font-jost">Responsive Design</h3>
          <p className="text-gray-600 font-mulish">
           Optimized for all devices. Use WalletX on desktop, tablet, or mobile with a consistent, intuitive interface.
          </p>
         </div>
        </div>

        <div className="flex items-start space-x-4">
         <div className="bg-purple-100 p-3 rounded-lg">
          <Lock className="h-6 w-6 text-purple-600" />
         </div>
         <div>
          <h3 className="text-lg font-semibold text-black mb-2 font-jost">Private Key Management</h3>
          <p className="text-gray-600 font-mulish">
           Secure private key handling with show/hide functionality. Export capabilities for backup and recovery.
          </p>
         </div>
        </div>
       </div>

       <div className="space-y-6">
        <div className="flex items-start space-x-4">
         <div className="bg-orange-100 p-3 rounded-lg">
          <Zap className="h-6 w-6 text-orange-600" />
         </div>
         <div>
          <h3 className="text-lg font-semibold text-black mb-2 font-jost">Real-Time Updates</h3>
          <p className="text-gray-600 font-mulish">
           Live balance updates and transaction confirmations. Stay informed about your wallet status in real-time.
          </p>
         </div>
        </div>

        <div className="flex items-start space-x-4">
         <div className="bg-red-100 p-3 rounded-lg">
          <Shield className="h-6 w-6 text-red-600" />
         </div>
         <div>
          <h3 className="text-lg font-semibold text-black mb-2 font-jost">Transaction History</h3>
          <p className="text-gray-600 font-mulish">
           View detailed transaction history and track your digital asset movements across all supported networks.
          </p>
         </div>
        </div>

        <div className="flex items-start space-x-4">
         <div className="bg-yellow-100 p-3 rounded-lg">
          <Settings className="h-6 w-6 text-yellow-600" />
         </div>
         <div>
          <h3 className="text-lg font-semibold text-black mb-2 font-jost">Customizable Settings</h3>
          <p className="text-gray-600 font-mulish">
           Personalize your wallet experience with customizable network settings and preferences.
          </p>
         </div>
        </div>
       </div>
      </div>
     </div>

     {/* Feature Comparison */}
     <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-black mb-8 font-jost text-center">Feature Comparison</h2>
      
      <div className="overflow-x-auto">
       <table className="w-full">
        <thead>
         <tr className="border-b border-gray-200">
          <th className="text-left py-4 px-6 font-semibold text-black font-jost">Feature</th>
          <th className="text-center py-4 px-6 font-semibold text-blue-600 font-jost">Ethereum</th>
          <th className="text-center py-4 px-6 font-semibold text-purple-600 font-jost">Solana</th>
         </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
         <tr>
          <td className="py-4 px-6 font-medium text-black font-mulish">Wallet Creation</td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
          </td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
          </td>
         </tr>
         <tr>
          <td className="py-4 px-6 font-medium text-black font-mulish">Wallet Import</td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
          </td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
          </td>
         </tr>
         <tr>
          <td className="py-4 px-6 font-medium text-black font-mulish">Send Transactions</td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
          </td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
          </td>
         </tr>
         <tr>
          <td className="py-4 px-6 font-medium text-black font-mulish">Receive Payments</td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
          </td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
          </td>
         </tr>
         <tr>
          <td className="py-4 px-6 font-medium text-black font-mulish">QR Code Support</td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
          </td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
          </td>
         </tr>
         <tr>
          <td className="py-4 px-6 font-medium text-black font-mulish">Testnet Airdrops</td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-gray-300 rounded-full mx-auto"></div>
          </td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
          </td>
         </tr>
         <tr>
          <td className="py-4 px-6 font-medium text-black font-mulish">Multiple Networks</td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
          </td>
          <td className="py-4 px-6 text-center">
           <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
          </td>
         </tr>
        </tbody>
       </table>
      </div>
     </div>

     {/* Coming Soon */}
     <div className="bg-purple-600 rounded-xl p-8 text-white">
      <div className="text-center">
       <h2 className="text-2xl font-bold mb-4 font-jost">Coming Soon</h2>
       <p className="text-lg opacity-90 mb-6 font-mulish">
        We're constantly working on new features to enhance your wallet experience
       </p>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
         <h3 className="font-semibold mb-2 font-jost">Token Support</h3>
         <p className="text-sm opacity-90 font-mulish">ERC-20 and SPL token management</p>
        </div>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
         <h3 className="font-semibold mb-2 font-jost">DApp Integration</h3>
         <p className="text-sm opacity-90 font-mulish">Connect to decentralized applications</p>
        </div>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
         <h3 className="font-semibold mb-2 font-jost">Hardware Wallet</h3>
         <p className="text-sm opacity-90 font-mulish">Ledger and Trezor support</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}; 