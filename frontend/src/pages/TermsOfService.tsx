import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
 onBack: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
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
     <h1 className="text-3xl font-bold text-black font-jost">Terms of Service</h1>
    </div>

    <div className="bg-white rounded-xl p-8 shadow-sm">
     <div className="prose prose-lg max-w-none">
      <p className="text-gray-600 mb-6 font-mulish">
       <strong>Last updated:</strong> {new Date().toLocaleDateString()}
      </p>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">1. Acceptance of Terms</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         By accessing and using WalletX, you accept and agree to be bound by the terms and provision of this agreement. 
         If you do not agree to abide by the above, please do not use this service.
        </p>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">2. Description of Service</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         WalletX is a client-side cryptocurrency wallet application that allows users to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
         <li>Create and manage cryptocurrency wallets</li>
         <li>Send and receive digital assets</li>
         <li>View transaction history and balances</li>
         <li>Interact with blockchain networks</li>
        </ul>
        <p>
         The service operates entirely in your browser and does not store sensitive data on our servers.
        </p>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">3. User Responsibilities</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>As a user of WalletX, you agree to:</p>
        <ul className="list-disc pl-6 space-y-2">
         <li>Keep your private keys secure and confidential</li>
         <li>Use the service only for lawful purposes</li>
         <li>Not attempt to reverse engineer or hack the application</li>
         <li>Not use the service for any fraudulent or illegal activities</li>
         <li>Be responsible for all transactions made through your wallet</li>
         <li>Backup your wallet data regularly</li>
        </ul>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">4. Security and Risk Disclosure</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         <strong>Cryptocurrency Risks:</strong> Cryptocurrency transactions are irreversible and subject to market volatility. 
         You acknowledge that you understand these risks.
        </p>
        <p>
         <strong>Security:</strong> While we implement security best practices, the security of your funds depends on:
        </p>
        <ul className="list-disc pl-6 space-y-2">
         <li>Your device and browser security</li>
         <li>Keeping your private keys secure</li>
         <li>Using secure networks</li>
         <li>Regular software updates</li>
        </ul>
        <p>
         <strong>No Insurance:</strong> Cryptocurrency holdings are not insured by any government agency or financial institution.
        </p>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">5. Disclaimers</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         <strong>Service Availability:</strong> We do not guarantee uninterrupted access to the service. 
         The service may be temporarily unavailable due to maintenance or technical issues.
        </p>
        <p>
         <strong>No Financial Advice:</strong> WalletX does not provide financial, investment, or legal advice. 
         All decisions regarding cryptocurrency transactions are your responsibility.
        </p>
        <p>
         <strong>Third-Party Services:</strong> We may use third-party services for blockchain interactions. 
         We are not responsible for the availability or reliability of these services.
        </p>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">6. Limitation of Liability</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         To the maximum extent permitted by law, WalletX shall not be liable for any indirect, incidental, 
         special, consequential, or punitive damages, including but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
         <li>Loss of funds due to user error or negligence</li>
         <li>Loss of funds due to technical issues or bugs</li>
         <li>Loss of funds due to third-party service failures</li>
         <li>Loss of funds due to security breaches</li>
         <li>Any other damages arising from the use of the service</li>
        </ul>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">7. Intellectual Property</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         WalletX and its original content, features, and functionality are owned by us and are protected by 
         international copyright, trademark, patent, trade secret, and other intellectual property laws.
        </p>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">8. Termination</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         We may terminate or suspend your access to WalletX immediately, without prior notice, for any reason, 
         including breach of these Terms of Service.
        </p>
        <p>
         Upon termination, your right to use the service will cease immediately. However, your locally stored 
         wallet data will remain in your browser until you clear it.
        </p>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">9. Governing Law</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction 
         in which WalletX operates, without regard to its conflict of law provisions.
        </p>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">10. Changes to Terms</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         We reserve the right to modify or replace these Terms of Service at any time. If a revision is material, 
         we will provide at least 30 days notice prior to any new terms taking effect.
        </p>
       </div>
      </section>

      <section className="mb-8">
       <h2 className="text-2xl font-bold text-black mb-4 font-jost">11. Contact Information</h2>
       <div className="space-y-4 text-black font-mulish">
        <p>
         If you have any questions about these Terms of Service, please contact us at:
        </p>
        <div className="bg-white p-4 rounded-lg">
         <p><strong>Email:</strong> legal@walletx.com</p>
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