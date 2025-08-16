import React, { useState, useEffect } from 'react';
import { CryptoPriceService, type CryptoPrice } from '../services/cryptoPriceService';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export const CryptoPriceTicker: React.FC = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const cryptoService = new CryptoPriceService();

  const fetchPrices = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await cryptoService.getPrices();
      setPrices(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch prices');
      console.error('Error fetching prices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    
    // Refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getPriceChangeColor = (percentage: number) => {
    return percentage >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getPriceChangeIcon = (percentage: number) => {
    return percentage >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  if (loading && prices.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 font-jost">Live Crypto Prices</h3>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600 font-mulish">Loading cryptocurrency prices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 font-jost">Live Crypto Prices</h3>
        <div className="flex items-center space-x-3">
          {lastUpdated && (
            <p className="text-xs text-gray-500 font-mulish">
              Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
          <button
            onClick={fetchPrices}
            disabled={loading}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800 text-sm font-poppins">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prices.map((crypto) => (
          <div key={crypto.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <img 
                src={crypto.image} 
                alt={crypto.name} 
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h4 className="font-semibold text-gray-900 font-jost">{crypto.name}</h4>
                <p className="text-sm text-gray-500 font-mulish uppercase">{crypto.symbol}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 font-jost">
                  {cryptoService.formatPrice(crypto.current_price)}
                </span>
                <div className={`flex items-center space-x-1 ${getPriceChangeColor(crypto.price_change_percentage_24h)}`}>
                  {getPriceChangeIcon(crypto.price_change_percentage_24h)}
                  <span className="text-sm font-medium font-poppins">
                    {cryptoService.formatPercentage(crypto.price_change_percentage_24h)}
                  </span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 font-mulish">
                Market Cap: {cryptoService.formatMarketCap(crypto.market_cap)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {prices.length === 0 && !loading && !error && (
        <div className="text-center py-8">
          <p className="text-gray-600 font-mulish">No price data available</p>
        </div>
      )}
    </div>
  );
}; 