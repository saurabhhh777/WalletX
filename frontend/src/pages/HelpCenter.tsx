import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronDown, ChevronUp, Book, Shield, Wallet, Settings, Send, Download } from 'lucide-react';

interface HelpCenterProps {
 onBack: () => void;
}

interface FAQItem {
 question: string;
 answer: string;
 category: string;
}

export const HelpCenter: React.FC<HelpCenterProps> = ({ onBack }) => {
 const [searchTerm, setSearchTerm] = useState('');
 const [expandedItems, setExpandedItems] = useState<number[]>([]);
 const [selectedCategory, setSelectedCategory] = useState<string>('all');

 const faqData: FAQItem[] = [
  // Getting Started
  {
   question: "How do I create my first wallet?",
   answer: "To create your first wallet, click on either the 'Ethereum' or 'Solana' tab, then click the 'Create Wallet' button. Your wallet will be generated with a secure private key. Make sure to save your private key safely - it provides full access to your wallet.",
   category: "getting-started"
  },
  {
   question: "How do I import an existing wallet?",
   answer: "To import an existing wallet, click on the 'Import Wallet' section, enter your private key, and click 'Import Wallet'. Make sure you're using the correct private key format for the blockchain you're importing.",
   category: "getting-started"
  },
  {
   question: "What networks does WalletX support?",
   answer: "WalletX supports multiple networks. For Ethereum: Sepolia (testnet), Goerli (testnet), and Mainnet. For Solana: Devnet (testnet), Testnet, and Mainnet. You can switch networks in the Settings page.",
   category: "getting-started"
  },

  // Security
  {
   question: "How secure is my wallet?",
   answer: "WalletX is a client-side wallet, meaning all your data is stored locally in your browser. We never have access to your private keys or wallet data. However, the security of your funds depends on keeping your private keys safe and using secure devices.",
   category: "security"
  },
  {
   question: "What should I do if I lose my private key?",
   answer: "If you lose your private key, there is no way to recover your wallet or funds. This is why it's crucial to backup your private key securely. Consider using hardware wallets for additional security.",
   category: "security"
  },
  {
   question: "How can I backup my wallet?",
   answer: "You can backup your wallet by copying your private key from the 'Export Private Key' section in your wallet tab. Store it securely offline, such as on a piece of paper in a safe location.",
   category: "security"
  },

  // Transactions
  {
   question: "How do I send cryptocurrency?",
   answer: "To send cryptocurrency, navigate to the 'Send Transaction' section, enter the recipient's address, specify the amount, and click 'Send Transaction'. Make sure to double-check the address and amount before confirming.",
   category: "transactions"
  },
  {
   question: "How do I receive cryptocurrency?",
   answer: "To receive cryptocurrency, click the 'Show QR Code' button in the receive section. Share the QR code or wallet address with the sender. The QR code contains your wallet address for easy scanning.",
   category: "transactions"
  },
  {
   question: "What are transaction fees?",
   answer: "Transaction fees are small amounts paid to network validators/miners to process your transaction. Ethereum fees are called 'gas fees' and vary based on network congestion. Solana fees are typically much lower and more predictable.",
   category: "transactions"
  },

  // Features
  {
   question: "How do I switch between networks?",
   answer: "You can switch networks in the Settings page. Click the 'Settings' button in the dashboard header, then select your preferred network for each blockchain. Changes take effect immediately.",
   category: "features"
  },
  {
   question: "How do I get test tokens?",
   answer: "For Solana wallets, you can request test SOL using the 'Request Airdrop' feature. For Ethereum, you'll need to use a faucet service to get test ETH for the testnet you're using.",
   category: "features"
  },
  {
   question: "Can I use multiple wallets?",
   answer: "Yes! You can create or import multiple wallets. Each wallet will have its own address and private key. You can manage them all from the same WalletX interface.",
   category: "features"
  },

  // Troubleshooting
  {
   question: "Why is my transaction taking so long?",
   answer: "Transaction times depend on network congestion and the blockchain you're using. Ethereum transactions can take several minutes during high congestion, while Solana transactions are typically much faster.",
   category: "troubleshooting"
  },
  {
   question: "What if my transaction fails?",
   answer: "If a transaction fails, check that you have sufficient balance (including fees), the recipient address is correct, and you're connected to the right network. Failed transactions may still incur fees.",
   category: "troubleshooting"
  },
  {
   question: "How do I refresh my balance?",
   answer: "You can refresh your balance by clicking the 'Refresh' button in the dashboard header, or by switching tabs. Balances are also automatically updated after transactions.",
   category: "troubleshooting"
  }
 ];

 const categories = [
  { id: 'all', name: 'All Categories', icon: Book },
  { id: 'getting-started', name: 'Getting Started', icon: Download },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'transactions', name: 'Transactions', icon: Send },
  { id: 'features', name: 'Features', icon: Settings },
  { id: 'troubleshooting', name: 'Troubleshooting', icon: Wallet }
 ];

 const toggleItem = (index: number) => {
  setExpandedItems(prev => 
   prev.includes(index) 
    ? prev.filter(i => i !== index)
    : [...prev, index]
  );
 };

 const filteredFAQs = faqData.filter(item => {
  const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.answer.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
  return matchesSearch && matchesCategory;
 });

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
     <h1 className="text-3xl font-bold text-black font-jost">Help Center</h1>
    </div>

    {/* Search Bar */}
    <div className="mb-8">
     <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
       type="text"
       placeholder="Search for help articles..."
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
       className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mulish"
      />
     </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
     {/* Categories Sidebar */}
     <div className="lg:col-span-1">
      <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
       <h2 className="text-lg font-bold text-black mb-4 font-jost">Categories</h2>
       <div className="space-y-2">
        {categories.map((category) => {
         const Icon = category.icon;
         return (
          <button
           key={category.id}
           onClick={() => setSelectedCategory(category.id)}
           className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors font-mulish ${
            selectedCategory === category.id
             ? 'bg-blue-100 text-blue-700'
             : 'text-gray-600 hover:bg-gray-100'
           }`}
          >
           <Icon className="h-5 w-5" />
           <span>{category.name}</span>
          </button>
         );
        })}
       </div>
      </div>
     </div>

     {/* FAQ Content */}
     <div className="lg:col-span-3">
      <div className="bg-white rounded-xl p-8 shadow-sm">
       <h2 className="text-2xl font-bold text-black mb-6 font-jost">
        Frequently Asked Questions
        {searchTerm && (
         <span className="text-lg font-normal text-gray-600 ml-2">
          ({filteredFAQs.length} results)
         </span>
        )}
       </h2>

       {filteredFAQs.length === 0 ? (
        <div className="text-center py-12">
         <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
         <h3 className="text-lg font-semibold text-black mb-2 font-jost">No results found</h3>
         <p className="text-gray-600 font-mulish">
          Try adjusting your search terms or browse by category.
         </p>
        </div>
       ) : (
        <div className="space-y-4">
         {filteredFAQs.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
           <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-white transition-colors"
           >
            <h3 className="text-lg font-semibold text-black font-jost pr-4">
             {item.question}
            </h3>
            {expandedItems.includes(index) ? (
             <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
            ) : (
             <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
            )}
           </button>
           {expandedItems.includes(index) && (
            <div className="px-6 pb-6">
             <p className="text-black font-mulish leading-relaxed">
              {item.answer}
             </p>
            </div>
           )}
          </div>
         ))}
        </div>
       )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl p-8 shadow-sm">
       <h2 className="text-2xl font-bold text-black mb-6 font-jost">Still Need Help?</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
         <h3 className="text-lg font-semibold text-black mb-2 font-jost">Contact Support</h3>
         <p className="text-gray-600 mb-4 font-mulish">
          Get in touch with our support team for personalized assistance.
         </p>
         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors font-poppins">
          Contact Us
         </button>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
         <h3 className="text-lg font-semibold text-black mb-2 font-jost">Community Forum</h3>
         <p className="text-gray-600 mb-4 font-mulish">
          Connect with other users and share experiences in our community.
         </p>
         <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors font-poppins">
          Join Forum
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}; 