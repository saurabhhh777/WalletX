import React from 'react';
import QRCode from 'react-qr-code';
import { Copy, Check, X } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  walletType: 'ethereum' | 'solana';
  copied: boolean;
  onCopy: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  address,
  walletType,
  copied,
  onCopy
}) => {
  if (!isOpen) return null;

  const walletName = walletType === 'ethereum' ? 'Ethereum' : 'Solana';
  const qrValue = walletType === 'ethereum' 
    ? `ethereum:${address}` 
    : `solana:${address}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 font-jost">
            Receive {walletName}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600 font-mulish">
            Share this QR code to receive {walletName} payments
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg inline-block">
            <QRCode
              value={qrValue}
              size={200}
              level="M"
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-mulish">Wallet Address:</p>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="font-mono text-sm text-gray-800 truncate flex-1">
                {address}
              </span>
              <button
                onClick={onCopy}
                className="ml-2 text-purple-600 hover:text-purple-700 transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}; 