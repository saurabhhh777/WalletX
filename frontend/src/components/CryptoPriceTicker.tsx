import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
}

export const CryptoPriceTicker: React.FC = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch prices from CoinGecko API
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,solana&vs_currencies=usd&include_24hr_change=true'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch prices');
        }
        
        const data = await response.json();
        
        const formattedPrices: CryptoPrice[] = [
          {
            symbol: 'ETH',
            price: data.ethereum.usd,
            change24h: data.ethereum.usd_24h_change,
            changePercent24h: data.ethereum.usd_24h_change
          },
          {
            symbol: 'SOL',
            price: data.solana.usd,
            change24h: data.solana.usd_24h_change,
            changePercent24h: data.solana.usd_24h_change
          }
        ];
        
        setPrices(formattedPrices);
      } catch (err) {
        console.error('Error fetching crypto prices:', err);
        setError('Failed to load prices');
        
        // Fallback prices (you can update these manually)
        setPrices([
          { symbol: 'ETH', price: 2500, change24h: 2.5, changePercent24h: 2.5 },
          { symbol: 'SOL', price: 100, change24h: -1.2, changePercent24h: -1.2 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    
    // Refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
    }
  };

  const formatChange = (change: number) => {
    const isPositive = change >= 0;
    const formattedChange = Math.abs(change).toFixed(2);
    return `${isPositive ? '+' : '-'}${formattedChange}%`;
  };

  if (loading && prices.length === 0) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 font-mulish">Loading prices...</span>
      </div>
    );
  }

  if (error && prices.length === 0) {
    return (
      <div className="text-center p-4">
        <span className="text-red-600 font-mulish">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex space-x-4">
      {prices.map((crypto) => (
        <div
          key={crypto.symbol}
          className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm"
        >
          <span className="font-semibold text-gray-900 font-jost">{crypto.symbol}</span>
          <span className="text-gray-700 font-mulish">{formatPrice(crypto.price)}</span>
          <div className={`flex items-center space-x-1 ${
            crypto.changePercent24h >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {crypto.changePercent24h >= 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span className="text-xs font-medium font-mulish">
              {formatChange(crypto.changePercent24h)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}; 