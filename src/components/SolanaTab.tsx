import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Copy, Download, Upload, Send, Eye, EyeOff, Gift } from 'lucide-react';

export const SolanaTab: React.FC = () => {
  const {
    solanaWallet,
    createSolanaWallet,
    importSolanaWallet,
    sendSolanaTransaction,
    requestSolanaAirdrop,
  } = useWallet();

  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [importKey, setImportKey] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [airdropAmount, setAirdropAmount] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateWallet = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await createSolanaWallet();
      setSuccess('Solana wallet created successfully!');
    } catch (err) {
      setError('Failed to create wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportWallet = async () => {
    if (!importKey.trim()) {
      setError('Please enter a private key');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await importSolanaWallet(importKey.trim());
      setSuccess('Solana wallet imported successfully!');
      setImportKey('');
    } catch (err) {
      setError('Invalid private key. Please check and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTransaction = async () => {
    if (!toAddress.trim() || !amount.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (parseFloat(amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const signature = await sendSolanaTransaction(toAddress.trim(), amount);
      setSuccess(`Transaction sent successfully! Signature: ${signature}`);
      setToAddress('');
      setAmount('');
    } catch (err) {
      setError('Transaction failed. Please check your balance and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAirdrop = async () => {
    if (!solanaWallet) {
      setError('No wallet loaded');
      return;
    }

    const amount = parseFloat(airdropAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const signature = await requestSolanaAirdrop(amount);
      setSuccess(`Airdrop successful! Signature: ${signature}`);
    } catch (err) {
      setError('Airdrop failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const downloadWallet = () => {
    if (!solanaWallet) return;
    
    const walletData = {
      address: solanaWallet.address,
      privateKey: solanaWallet.privateKey,
      network: 'Solana',
      createdAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(walletData, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solana-wallet-${solanaWallet.address.slice(0, 6)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!solanaWallet) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Solana Wallet</h2>
          <p className="text-gray-600">Create a new wallet or import an existing one to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create New Wallet */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-500 p-2 rounded-lg">
                <Download className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Create New Wallet</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Generate a new Solana wallet with a fresh keypair and address.
            </p>
            <button
              onClick={handleCreateWallet}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 w-full"
            >
              {isLoading ? 'Creating...' : 'Create Wallet'}
            </button>
          </div>

          {/* Import Wallet */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-500 p-2 rounded-lg">
                <Upload className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Import Wallet</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Import an existing wallet using your private key (base64 encoded).
            </p>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Enter private key (base64)"
                value={importKey}
                onChange={(e) => setImportKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleImportWallet}
                disabled={isLoading || !importKey.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 w-full"
              >
                {isLoading ? 'Importing...' : 'Import Wallet'}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">{success}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Solana Wallet</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={downloadWallet}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Wallet Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Wallet Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={solanaWallet.address}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent flex-1"
              />
              <button
                onClick={() => copyToClipboard(solanaWallet.address)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Private Key (Base64)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type={showPrivateKey ? 'text' : 'password'}
                value={solanaWallet.privateKey}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent flex-1"
              />
              <button
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <button
                onClick={() => copyToClipboard(solanaWallet.privateKey)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Balance
            </label>
            <div className="text-2xl font-bold text-gray-900">
              {parseFloat(solanaWallet.balance).toFixed(6)} SOL
            </div>
          </div>
        </div>
      </div>

      {/* Airdrop */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Request Airdrop</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (SOL)
            </label>
            <input
              type="number"
              placeholder="1"
              value={airdropAmount}
              onChange={(e) => setAirdropAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              step="0.1"
              min="0.1"
              max="2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum 2 SOL per airdrop (testnet only)
            </p>
          </div>

          <button
            onClick={handleAirdrop}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 w-full flex items-center justify-center space-x-2"
          >
            <Gift className="h-4 w-4" />
            <span>{isLoading ? 'Requesting...' : 'Request Airdrop'}</span>
          </button>
        </div>
      </div>

      {/* Send Transaction */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Send Transaction</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Address
            </label>
            <input
              type="text"
              placeholder="Enter Solana address"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (SOL)
            </label>
            <input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              step="0.000001"
              min="0"
            />
          </div>

          <button
            onClick={handleSendTransaction}
            disabled={isLoading || !toAddress.trim() || !amount.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 w-full flex items-center justify-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>{isLoading ? 'Sending...' : 'Send Transaction'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">{success}</p>
        </div>
      )}
    </div>
  );
}; 