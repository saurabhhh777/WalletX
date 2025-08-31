import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useAuth } from '../contexts/AuthContext';
import { Upload, Send, Copy, Check, Zap, QrCode, Wallet, Wifi } from 'lucide-react';
import { QRCodeModal } from './QRCodeModal';
import { CryptoPriceTicker } from './CryptoPriceTicker';
import toast from 'react-hot-toast';

export const SolanaTab: React.FC = () => {
  const { solanaWallet, importSolanaWallet, sendSolanaTransaction, requestSolanaAirdrop, networkSettings, getNetworkDisplayName } = useWallet();
  const { isAuthenticated } = useAuth();
  
  // Helper function to check if on mainnet
  const isMainnet = networkSettings?.solana === 'mainnet' || networkSettings?.solana === 'mainnet-beta';
  
  // Debug: Log current network settings
  console.log('Current Solana network settings:', {
    solana: networkSettings?.solana,
    isMainnet,
    displayName: getNetworkDisplayName('solana', networkSettings?.solana || 'devnet')
  });
  const [privateKey, setPrivateKey] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleImportWallet = async () => {
    if (!privateKey.trim()) {
      toast.error('Please enter a private key');
      return;
    }
    setIsLoading(true);
    try {
      await importSolanaWallet(privateKey);
      toast.success('Solana wallet imported successfully!');
      setPrivateKey('');
    } catch (err) {
      console.error('Error importing wallet:', err);
      toast.error('Invalid private key. Please check and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTransaction = async () => {
    if (!recipientAddress.trim() || !amount.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (parseFloat(amount) <= 0) {
      toast.error('Amount must be greater than 0');
      return;
    }
    
    setIsLoading(true);
    try {
      console.log('Sending Solana transaction:', {
        to: recipientAddress,
        amount: amount,
        from: solanaWallet?.address
      });
      
      const signature = await sendSolanaTransaction(recipientAddress, amount);
      toast.success(`Transaction sent successfully! Signature: ${signature.slice(0, 8)}...`);
      setRecipientAddress('');
      setAmount('');
    } catch (err) {
      console.error('Error sending transaction:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Detailed error:', errorMessage);
      toast.error(`Transaction failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestAirdrop = async () => {
    setIsLoading(true);
    try {
      const signature = await requestSolanaAirdrop();
      toast.success(`Airdrop requested successfully! Check your balance in a few moments. Signature: ${signature.slice(0, 8)}...`);
    } catch (err) {
      console.error('Error requesting airdrop:', err);
      toast.error('Failed to request airdrop. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Address copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShowQR = () => {
    setShowQRModal(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="space-y-6 font-poppins">
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 font-jost">Sign In to Access Your Wallet</h3>
          <p className="text-gray-600 font-mulish">
            Your Solana wallet will be automatically created when you sign in with Google or GitHub.
          </p>
        </div>
      </div>
    );
  }

  if (!solanaWallet) {
    return (
      <div className="space-y-6 font-poppins">
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 text-center">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-jost">Loading Your Solana Wallet</h3>
          <p className="text-gray-600 dark:text-gray-400 font-mulish">
            Please wait while we load your Solana wallet...
          </p>
        </div>

        {/* Import Wallet (Optional) */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 font-jost">Import Different Wallet (Optional)</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 font-mulish">
            You can import a different Solana wallet using your private key.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">Private Key</label>
              <input
                type="password"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Enter your private key"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mulish bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleImportWallet}
              disabled={isLoading}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>{isLoading ? 'Importing...' : 'Import Wallet'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-poppins">
      {/* Current SOL Price */}
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 font-jost">Current SOL Price</h3>
        <CryptoPriceTicker />
      </div>

      {/* Network Status */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Wifi className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 font-jost">Network Status</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isMainnet ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {isMainnet ? 'Mainnet' : 'Testnet'}
            </span>
          </div>
        </div>
        <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300 font-mulish">
          <div className="flex items-center justify-between">
            <span>Connected to:</span>
            <span className="font-medium">{getNetworkDisplayName('solana', networkSettings?.solana || 'devnet')}</span>
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            {isMainnet
              ? '⚠️ You are on mainnet. Real SOL will be used for transactions.'
              : '🟢 You are on testnet. Test SOL can be requested via airdrop.'
            }
          </div>
        </div>
      </div>

      {/* Wallet Info */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 font-jost">Wallet Information</h3>
        <div className="space-y-3 font-mulish">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Address:</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm text-gray-900 dark:text-white">{solanaWallet.address}</span>
              <button
                onClick={() => copyToClipboard(solanaWallet.address)}
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Balance:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{solanaWallet.balance} SOL</span>
          </div>
        </div>
      </div>

      {/* Receive Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 font-jost">Receive SOL</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 font-mulish">
          Share your wallet address or QR code to receive SOL payments.
        </p>
        <button
          onClick={handleShowQR}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <QrCode className="h-4 w-4" />
          <span>Show QR Code</span>
        </button>
      </div>

      {/* Request Airdrop */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 font-jost">Request Test Airdrop</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 font-mulish">
          Get test SOL tokens for development and testing purposes.
        </p>
        <button
          onClick={handleRequestAirdrop}
          disabled={isLoading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          <Zap className="h-4 w-4" />
          <span>{isLoading ? 'Requesting...' : 'Request Airdrop'}</span>
        </button>
      </div>

      {/* Send Transaction */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 font-jost">Send Transaction</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">Recipient Address</label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Enter Solana address"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mulish bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">Amount (SOL)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              step="0.000000001"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mulish bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <button
            onClick={handleSendTransaction}
            disabled={isLoading}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>{isLoading ? 'Sending...' : 'Send Transaction'}</span>
          </button>
        </div>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        address={solanaWallet?.address || ''}
        walletType="solana"
        copied={copied}
        onCopy={() => copyToClipboard(solanaWallet?.address || '')}
      />
    </div>
  );
}; 