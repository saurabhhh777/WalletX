import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useAuth } from '../contexts/AuthContext';
import { Upload, Send, Copy, Check, QrCode, Wallet } from 'lucide-react';
import { QRCodeModal } from './QRCodeModal';
import { CryptoPriceTicker } from './CryptoPriceTicker';
import toast from 'react-hot-toast';

export const EthereumTab: React.FC = () => {
  const { ethereumWallet, importEthereumWallet, sendEthereumTransaction } = useWallet();
  const { isAuthenticated } = useAuth();
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
      await importEthereumWallet(privateKey);
      toast.success('Ethereum wallet imported successfully!');
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
      const txHash = await sendEthereumTransaction(recipientAddress, amount);
      toast.success(`Transaction sent successfully! Hash: ${txHash.slice(0, 8)}...`);
      setRecipientAddress('');
      setAmount('');
    } catch (err) {
      console.error('Error sending transaction:', err);
      toast.error('Failed to send transaction. Please check your inputs and try again.');
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
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 font-jost">Sign In to Access Your Wallet</h3>
          <p className="text-gray-600 font-mulish">
            Your Ethereum wallet will be automatically created when you sign in with Google or GitHub.
          </p>
        </div>
      </div>
    );
  }

  if (!ethereumWallet) {
    return (
      <div className="space-y-6 font-poppins">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 font-jost">Loading Your Ethereum Wallet</h3>
          <p className="text-gray-600 font-mulish">
            Please wait while we load your Ethereum wallet...
          </p>
        </div>

        {/* Import Wallet (Optional) */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 font-jost">Import Different Wallet (Optional)</h3>
          <p className="text-gray-600 mb-4 font-mulish">
            You can import a different Ethereum wallet using your private key.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Private Key</label>
              <input
                type="password"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Enter your private key"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mulish"
              />
            </div>
            <button
              onClick={handleImportWallet}
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
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
      {/* Current ETH Price */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 font-jost">Current ETH Price</h3>
        <CryptoPriceTicker />
      </div>

      {/* Wallet Info */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 font-jost">Wallet Information</h3>
        <div className="space-y-3 font-mulish">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Address:</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm">{ethereumWallet.address}</span>
              <button
                onClick={() => copyToClipboard(ethereumWallet.address)}
                className="text-blue-600 hover:text-blue-700"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Balance:</span>
            <span className="font-semibold">{ethereumWallet.balance} ETH</span>
          </div>
        </div>
      </div>

      {/* Receive Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 font-jost">Receive ETH</h3>
        <p className="text-gray-600 mb-4 font-mulish">
          Share your wallet address or QR code to receive ETH payments.
        </p>
        <button
          onClick={handleShowQR}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <QrCode className="h-4 w-4" />
          <span>Show QR Code</span>
        </button>
      </div>

      {/* Send Transaction */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 font-jost">Send Transaction</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Recipient Address</label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mulish"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Amount (ETH)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              step="0.0001"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mulish"
            />
          </div>
          <button
            onClick={handleSendTransaction}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
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
        address={ethereumWallet?.address || ''}
        walletType="ethereum"
        copied={copied}
        onCopy={() => copyToClipboard(ethereumWallet?.address || '')}
      />
    </div>
  );
}; 