import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Download, Upload, Send, Copy, Check, Zap, QrCode } from 'lucide-react';
import { QRCodeModal } from './QRCodeModal';
import { CryptoPriceTicker } from './CryptoPriceTicker';
import toast from 'react-hot-toast';

export const SolanaTab: React.FC = () => {
  const { solanaWallet, createSolanaWallet, importSolanaWallet, sendSolanaTransaction, requestSolanaAirdrop } = useWallet();
  const [privateKey, setPrivateKey] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCreateWallet = async () => {
    setIsLoading(true);
    try {
      await createSolanaWallet();
      toast.success('Solana wallet created successfully!');
    } catch (err) {
      console.error('Error creating wallet:', err);
      toast.error('Failed to create wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
      const signature = await sendSolanaTransaction(recipientAddress, amount);
      toast.success(`Transaction sent successfully! Signature: ${signature.slice(0, 8)}...`);
      setRecipientAddress('');
      setAmount('');
    } catch (err) {
      console.error('Error sending transaction:', err);
      toast.error('Failed to send transaction. Please check your inputs and try again.');
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

  return (
    <div className="space-y-6 font-poppins">
      {!solanaWallet ? (
        <div className="space-y-6">
          {/* Create Wallet */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-jost">Create New Solana Wallet</h3>
            <p className="text-gray-600 mb-4 font-mulish">
              Generate a new Solana wallet with a secure private key.
            </p>
            <button
              onClick={handleCreateWallet}
              disabled={isLoading}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>{isLoading ? 'Creating...' : 'Create Wallet'}</span>
            </button>
          </div>

          {/* Import Wallet */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-jost">Import Existing Wallet</h3>
            <p className="text-gray-600 mb-4 font-mulish">
              Import an existing Solana wallet using your private key.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Private Key</label>
                <input
                  type="password"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  placeholder="Enter your private key"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mulish"
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
      ) : (
        <div className="space-y-6">
          {/* Current SOL Price */}
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-jost">Current SOL Price</h3>
            <CryptoPriceTicker />
          </div>

          {/* Wallet Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-jost">Wallet Information</h3>
            <div className="space-y-3 font-mulish">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Address:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm">{solanaWallet.address}</span>
                  <button
                    onClick={() => copyToClipboard(solanaWallet.address)}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Balance:</span>
                <span className="font-semibold">{solanaWallet.balance} SOL</span>
              </div>
            </div>
          </div>

          {/* Receive Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-jost">Receive SOL</h3>
            <p className="text-gray-600 mb-4 font-mulish">
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
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-jost">Request Test Airdrop</h3>
            <p className="text-gray-600 mb-4 font-mulish">
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
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-jost">Send Transaction</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Recipient Address</label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Enter Solana address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mulish"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Amount (SOL)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  step="0.000000001"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mulish"
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

          {/* Export Private Key */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-jost">Export Private Key</h3>
            <p className="text-gray-600 mb-4 font-mulish">
              <strong>Warning:</strong> Never share your private key with anyone. It provides full access to your wallet.
            </p>
            <div className="flex items-center space-x-2">
              <input
                type="password"
                value={solanaWallet.privateKey}
                readOnly
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 font-mono text-sm font-mulish"
              />
              <button
                onClick={() => copyToClipboard(solanaWallet.privateKey)}
                className="bg-gray-900 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

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