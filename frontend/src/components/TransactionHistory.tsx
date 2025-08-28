import React, { useEffect, useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Wifi, WifiOff } from 'lucide-react';

interface HistoryItem {
  signature: string;
  slot: number;
  timestamp?: number;
  type: 'send' | 'receive' | 'other';
  amount: string;
  from?: string;
  to?: string;
  status: 'confirmed' | 'failed' | 'pending';
}

export const TransactionHistory: React.FC = () => {
  const { solanaWallet, solanaService, networkSettings, getNetworkDisplayName } = useWallet();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Helper function to check if on mainnet
  const isMainnet = networkSettings?.solana === 'mainnet' || networkSettings?.solana === 'mainnet-beta';

  const load = async () => {
    if (!solanaWallet) return;
    setLoading(true);
    try {
      const history = await solanaService.getRecentTransactions(solanaWallet.address, 10);
      setItems(history || []);
    } catch (e) {
      console.error('Failed to load history', e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solanaWallet?.address]);

  useEffect(() => {
    const handleRefresh = () => {
      load();
    };

    window.addEventListener('refreshTransactionHistory', handleRefresh);
    return () => {
      window.removeEventListener('refreshTransactionHistory', handleRefresh);
    };
  }, []);

  if (!solanaWallet) return null;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mt-8 transition-colors duration-200">
      {/* Network Status Section */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Wifi className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">Network Status</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Connected to: <span className="font-medium">{getNetworkDisplayName('solana', networkSettings?.solana || 'devnet')}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isMainnet ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {isMainnet ? 'Mainnet' : 'Testnet'}
            </span>
          </div>
        </div>
        <div className="mt-3 text-xs text-blue-600 dark:text-blue-400">
          {isMainnet
            ? '⚠️ You are on mainnet. Real SOL will be used for transactions.'
            : '🟢 You are on testnet. Test SOL can be requested via airdrop.'
          }
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white font-jost">Solana History</h3>
        <button onClick={load} disabled={loading} className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      {items.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-sm">No recent transactions</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 dark:text-gray-400">
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Amount (SOL)</th>
                <th className="py-2 pr-4">From</th>
                <th className="py-2 pr-4">To</th>
                <th className="py-2 pr-4">Time</th>
                <th className="py-2 pr-4">Explorer</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.signature} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="py-2 pr-4 capitalize text-gray-900 dark:text-white">{it.type}</td>
                  <td className="py-2 pr-4 text-gray-900 dark:text-white">{it.amount}</td>
                  <td className="py-2 pr-4 truncate max-w-[220px] text-gray-900 dark:text-white">{it.from || '-'}</td>
                  <td className="py-2 pr-4 truncate max-w-[220px] text-gray-900 dark:text-white">{it.to || '-'}</td>
                  <td className="py-2 pr-4 text-gray-900 dark:text-white">{it.timestamp ? new Date(it.timestamp * 1000).toLocaleString() : '-'}</td>
                  <td className="py-2 pr-4">
                    <a href={`https://solscan.io/tx/${it.signature}?cluster=devnet`} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}; 