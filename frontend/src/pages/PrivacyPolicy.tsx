import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
 onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
     <h1 className="text-3xl font-bold text-black font-jost">Privacy Policy</h1>
    </div>

    <div className="bg-white rounded-xl p-8 shadow-sm">
     <div className="prose prose-lg max-w-none">
      <p className="text-gray-600 mb-6 font-mulish">
       <strong>Last updated:</strong> {new Date().toLocaleDateString()}
      </p>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">1. Information We Collect</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         WalletX is a client-side wallet application that prioritizes your privacy. We collect minimal information:
        </p>
        <ul className="list-disc pl-6 space-y-2">
         <li><strong>Wallet Data:</strong> Your wallet addresses, private keys, and transaction data are stored locally in your browser and are never transmitted to our servers.</li>
         <li><strong>Usage Analytics:</strong> We may collect anonymous usage statistics to improve our service.</li>
         <li><strong>Network Information:</strong> Basic network connectivity data for blockchain interactions.</li>
        </ul>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">2. How We Use Your Information</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>We use the collected information for:</p>
        <ul className="list-disc pl-6 space-y-2">
         <li>Providing wallet functionality and blockchain interactions</li>
         <li>Improving user experience and application performance</li>
         <li>Ensuring security and preventing fraud</li>
         <li>Providing customer support when needed</li>
        </ul>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">3. Data Storage and Security</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         <strong>Local Storage:</strong> All sensitive wallet data is stored locally in your browser's localStorage. 
         This data is never transmitted to our servers and remains under your control.
        </p>
        <p>
         <strong>Encryption:</strong> While we implement security best practices, the security of your data 
         ultimately depends on your device and browser security.
        </p>
        <p>
         <strong>No Server Storage:</strong> We do not store your private keys, wallet addresses, or transaction 
         data on our servers.
        </p>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">4. Third-Party Services</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>We may use third-party services for:</p>
        <ul className="list-disc pl-6 space-y-2">
         <li>Blockchain RPC providers (Infura, Alchemy, Solana RPC)</li>
         <li>Analytics and performance monitoring</li>
         <li>Customer support tools</li>
        </ul>
        <p>
         These services have their own privacy policies, and we encourage you to review them.
        </p>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">5. Your Rights</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
         <li>Access your locally stored data</li>
         <li>Delete your wallet data by clearing browser storage</li>
         <li>Export your wallet information</li>
         <li>Opt out of analytics collection</li>
        </ul>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">6. Data Retention</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         Since your wallet data is stored locally, it will persist until you:
        </p>
        <ul className="list-disc pl-6 space-y-2">
         <li>Clear your browser's localStorage</li>
         <li>Uninstall the application</li>
         <li>Use the "Clear All" function in the application</li>
        </ul>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">7. Children's Privacy</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         WalletX is not intended for use by children under 13 years of age. We do not knowingly collect 
         personal information from children under 13.
        </p>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">8. Changes to This Policy</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         We may update this Privacy Policy from time to time. We will notify users of any material changes 
         by updating the "Last updated" date at the top of this policy.
        </p>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">9. Contact Us</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <div className="bg-white p-4 rounded-lg">
         <p><strong>Email:</strong> privacy@walletx.com</p>
         <p><strong>Support:</strong> support@walletx.com</p>
        </div>
       </div>
      </section>
     </div>
    </div>
   </div>
  </div>
 );
}; 