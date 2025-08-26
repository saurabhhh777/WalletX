import React, { useEffect, useState } from 'react';
import { useWallet } from '../contexts/WalletContext';

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
  const { solanaWallet, solanaService } = useWallet();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!solanaWallet) return;
    setLoading(true);
    try {
      // @ts-ignore getRecentTransactions newly added
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

  if (!solanaWallet) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 font-jost">Solana History</h3>
        <button onClick={load} disabled={loading} className="text-sm bg-gray-100 px-3 py-1 rounded-md">
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      {items.length === 0 ? (
        <div className="text-gray-500 text-sm">No recent transactions</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
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
                <tr key={it.signature} className="border-t border-gray-100">
                  <td className="py-2 pr-4 capitalize">{it.type}</td>
                  <td className="py-2 pr-4">{it.amount}</td>
                  <td className="py-2 pr-4 truncate max-w-[220px]">{it.from || '-'}</td>
                  <td className="py-2 pr-4 truncate max-w-[220px]">{it.to || '-'}</td>
                  <td className="py-2 pr-4">{it.timestamp ? new Date(it.timestamp * 1000).toLocaleString() : '-'}</td>
                  <td className="py-2 pr-4">
                    <a href={`https://solscan.io/tx/${it.signature}?cluster=devnet`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">View</a>
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