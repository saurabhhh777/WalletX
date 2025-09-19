import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Key, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface SecurityProps {
 onBack: () => void;
}

export const Security: React.FC<SecurityProps> = ({ onBack }) => {
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
     <h1 className="text-3xl font-bold text-black font-jost">Security</h1>
    </div>

    <div className="space-y-8">
     {/* Security Overview */}
     <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="flex items-center space-x-4 mb-6">
       <div className="bg-green-100 p-3 rounded-lg">
        <Shield className="h-8 w-8 text-green-600" />
       </div>
       <div>
        <h2 className="text-2xl font-bold text-black font-jost">Security Overview</h2>
        <p className="text-gray-600 font-mulish">Learn about WalletX security features and best practices</p>
       </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       <div className="text-center p-6 bg-green-50 rounded-lg">
        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-black mb-2 font-jost">Client-Side Storage</h3>
        <p className="text-gray-600 text-sm font-mulish">
         All data stored locally in your browser
        </p>
       </div>
       <div className="text-center p-6 bg-blue-50 rounded-lg">
        <Lock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-black mb-2 font-jost">No Server Access</h3>
        <p className="text-gray-600 text-sm font-mulish">
         We never access your private keys
        </p>
       </div>
       <div className="text-center p-6 bg-purple-50 rounded-lg">
        <Key className="h-8 w-8 text-purple-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-black mb-2 font-jost">Secure Generation</h3>
        <p className="text-gray-600 text-sm font-mulish">
         Cryptographically secure key generation
        </p>
       </div>
      </div>
     </div>

     {/* Security Features */}
     <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-black mb-6 font-jost">Security Features</h2>
      
      <div className="space-y-6">
       <div className="flex items-start space-x-4">
        <div className="bg-blue-100 p-3 rounded-lg">
         <Lock className="h-6 w-6 text-blue-600" />
        </div>
        <div>
         <h3 className="text-lg font-semibold text-black mb-2 font-jost">Local Data Storage</h3>
         <p className="text-gray-600 font-mulish">
          All wallet data, including private keys, addresses, and transaction history, is stored locally in your browser's localStorage. 
          This means we never have access to your sensitive information.
         </p>
        </div>
       </div>

       <div className="flex items-start space-x-4">
        <div className="bg-green-100 p-3 rounded-lg">
         <Shield className="h-6 w-6 text-green-600" />
        </div>
        <div>
         <h3 className="text-lg font-semibold text-black mb-2 font-jost">Secure Key Generation</h3>
         <p className="text-gray-600 font-mulish">
          WalletX uses industry-standard cryptographic libraries to generate secure private keys. 
          Each wallet is created with a unique, cryptographically secure keypair.
         </p>
        </div>
       </div>

       <div className="flex items-start space-x-4">
        <div className="bg-purple-100 p-3 rounded-lg">
         <Eye className="h-6 w-6 text-purple-600" />
        </div>
        <div>
         <h3 className="text-lg font-semibold text-black mb-2 font-jost">Private Key Protection</h3>
         <p className="text-gray-600 font-mulish">
          Private keys are hidden by default and can only be revealed with explicit user action. 
          Copy functionality is available for backup purposes, but with clear security warnings.
         </p>
        </div>
       </div>

       <div className="flex items-start space-x-4">
        <div className="bg-orange-100 p-3 rounded-lg">
         <Key className="h-6 w-6 text-orange-600" />
        </div>
        <div>
         <h3 className="text-lg font-semibold text-black mb-2 font-jost">Network Security</h3>
         <p className="text-gray-600 font-mulish">
          All blockchain interactions use secure RPC endpoints. We support multiple networks 
          and allow users to choose their preferred network for enhanced security.
         </p>
        </div>
       </div>
      </div>
     </div>

     {/* Security Best Practices */}
     <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-black mb-6 font-jost">Security Best Practices</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black font-jost">Do's</h3>
        <div className="space-y-3">
         <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
           <p className="text-black font-medium font-mulish">Backup your private key securely</p>
           <p className="text-gray-600 text-sm font-mulish">Store it offline in a safe location</p>
          </div>
         </div>
         <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
           <p className="text-black font-medium font-mulish">Use secure networks</p>
           <p className="text-gray-600 text-sm font-mulish">Avoid public Wi-Fi for transactions</p>
          </div>
         </div>
         <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
           <p className="text-black font-medium font-mulish">Keep your device updated</p>
           <p className="text-gray-600 text-sm font-mulish">Regular software updates are crucial</p>
          </div>
         </div>
         <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
           <p className="text-black font-medium font-mulish">Verify addresses carefully</p>
           <p className="text-gray-600 text-sm font-mulish">Double-check before sending funds</p>
          </div>
         </div>
        </div>
       </div>

       <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black font-jost">Don'ts</h3>
        <div className="space-y-3">
         <div className="flex items-start space-x-3">
          <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
           <p className="text-black font-medium font-mulish">Share your private key</p>
           <p className="text-gray-600 text-sm font-mulish">Never share it with anyone</p>
          </div>
         </div>
         <div className="flex items-start space-x-3">
          <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
           <p className="text-black font-medium font-mulish">Store keys in plain text</p>
           <p className="text-gray-600 text-sm font-mulish">Use secure storage methods</p>
          </div>
         </div>
         <div className="flex items-start space-x-3">
          <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
           <p className="text-black font-medium font-mulish">Use on compromised devices</p>
           <p className="text-gray-600 text-sm font-mulish">Ensure device security first</p>
          </div>
         </div>
         <div className="flex items-start space-x-3">
          <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
           <p className="text-black font-medium font-mulish">Ignore security warnings</p>
           <p className="text-gray-600 text-sm font-mulish">Take all warnings seriously</p>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>

     {/* Security Warnings */}
     <div className="bg-red-50 border border-red-200 rounded-xl p-8">
      <div className="flex items-start space-x-4">
       <AlertTriangle className="h-8 w-8 text-red-600 mt-1 flex-shrink-0" />
       <div>
        <h2 className="text-2xl font-bold text-red-900 mb-4 font-jost">Important Security Warnings</h2>
        <div className="space-y-4 text-red-800 font-mulish">
         <p>
          <strong>Private Key Security:</strong> Your private key is the only way to access your wallet. 
          If you lose it, you lose access to all your funds permanently.
         </p>
         <p>
          <strong>No Recovery:</strong> Unlike traditional banking, there is no way to recover lost private keys 
          or reverse cryptocurrency transactions.
         </p>
         <p>
          <strong>Test First:</strong> Always test with small amounts before making large transactions 
          to ensure everything works correctly.
         </p>
         <p>
          <strong>Device Security:</strong> The security of your wallet depends on the security of your device. 
          Keep your device and browser updated and secure.
         </p>
        </div>
       </div>
      </div>
     </div>

     {/* Additional Resources */}
     <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-black mb-6 font-jost">Additional Security Resources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-black mb-3 font-jost">Cryptocurrency Security Guide</h3>
        <p className="text-gray-600 mb-4 font-mulish">
         Learn about general cryptocurrency security practices and how to protect your digital assets.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors font-poppins">
         Read Guide
        </button>
       </div>
       
       <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-black mb-3 font-jost">Security Checklist</h3>
        <p className="text-gray-600 mb-4 font-mulish">
         Use our comprehensive security checklist to ensure your wallet is properly secured.
        </p>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors font-poppins">
         View Checklist
        </button>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}; 