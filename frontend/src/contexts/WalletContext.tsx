import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { EthereumWalletService } from '../services/ethereumWallet.ts';
import type { EthereumWallet } from '../services/ethereumWallet.ts';
import { SolanaWalletService } from '../services/solanaWallet.ts';
import type { SolanaWallet } from '../services/solanaWallet.ts';
import { useAuth } from './AuthContext';
import { API_ENDPOINTS, apiCall } from '../config/api';

interface NetworkSettings {
  ethereum: string;
  solana: string;
}

interface WalletContextType {
  // Ethereum
  ethereumWallet: EthereumWallet | null;
  ethereumService: EthereumWalletService;
  createEthereumWallet: () => Promise<void>;
  importEthereumWallet: (privateKey: string) => Promise<void>;
  sendEthereumTransaction: (toAddress: string, amount: string) => Promise<string>;
  
  // Solana
  solanaWallet: SolanaWallet | null;
  solanaService: SolanaWalletService;
  createSolanaWallet: () => Promise<void>;
  importSolanaWallet: (privateKey: string) => Promise<void>;
  sendSolanaTransaction: (toAddress: string, amount: string) => Promise<string>;
  requestSolanaAirdrop: (amount?: number) => Promise<string>;
  
  // Network Settings
  networkSettings: NetworkSettings;
  updateNetworkSettings: (chain: 'ethereum' | 'solana', network: string) => void;
  getNetworkDisplayName: (chain: 'ethereum' | 'solana', network: string) => string;
  
  // Common
  refreshBalances: () => Promise<void>;
  clearWallets: () => void;
  loadUserWallets: (walletInfo: any) => void;
  loadWalletsFromBackend: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [ethereumWallet, setEthereumWallet] = useState<EthereumWallet | null>(null);
  const [solanaWallet, setSolanaWallet] = useState<SolanaWallet | null>(null);
  const [networkSettings, setNetworkSettings] = useState<NetworkSettings>({
    ethereum: 'sepolia',
    solana: 'devnet'
  });
  
  const { token } = useAuth();
  
  // Initialize services with current network settings
  const [ethereumService, setEthereumService] = useState<EthereumWalletService>(() => 
    new EthereumWalletService(getEthereumRpcUrl('sepolia'))
  );
  const [solanaService, setSolanaService] = useState<SolanaWalletService>(() => 
    new SolanaWalletService(getSolanaRpcUrl('devnet'))
  );

  // Helper functions to get RPC URLs
  function getEthereumRpcUrl(network: string): string {
    switch (network) {
      case 'mainnet':
        return 'https://eth-mainnet.g.alchemy.com/v2/demo';
      case 'sepolia':
        return 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
      case 'goerli':
        return 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
      default:
        return 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
    }
  }

  function getSolanaRpcUrl(network: string): string {
    switch (network) {
      case 'mainnet':
        return 'https://api.mainnet-beta.solana.com';
      case 'devnet':
        return 'https://api.devnet.solana.com';
      case 'testnet':
        return 'https://api.testnet.solana.com';
      default:
        return 'https://api.devnet.solana.com';
    }
  }

  // Helper function to get network display names
  function getNetworkDisplayName(chain: 'ethereum' | 'solana', network: string): string {
    if (chain === 'ethereum') {
      switch (network) {
        case 'mainnet':
          return 'Ethereum Mainnet';
        case 'sepolia':
          return 'Sepolia Testnet';
        case 'goerli':
          return 'Goerli Testnet';
        default:
          return 'Sepolia Testnet';
      }
    } else {
      switch (network) {
        case 'mainnet':
          return 'Solana Mainnet';
        case 'devnet':
          return 'Solana Devnet';
        case 'testnet':
          return 'Solana Testnet';
        default:
          return 'Solana Devnet';
      }
    }
  }

  // Load user wallets from authentication response
  const loadUserWallets = async (walletInfo: any) => {
    if (walletInfo.networkSettings) {
      setNetworkSettings(walletInfo.networkSettings);
      // Update services with new network settings
      setEthereumService(new EthereumWalletService(getEthereumRpcUrl(walletInfo.networkSettings.ethereum)));
      setSolanaService(new SolanaWalletService(getSolanaRpcUrl(walletInfo.networkSettings.solana)));
    }

    // Load wallets with private keys from backend
    try {
      const response = await apiCall(API_ENDPOINTS.WALLETS_PRIVATE, {}, token);

      if (response.ok) {
        const data = await response.json();
        
        // Update network settings
        if (data.networkSettings) {
          setNetworkSettings(data.networkSettings);
          setEthereumService(new EthereumWalletService(getEthereumRpcUrl(data.networkSettings.ethereum)));
          setSolanaService(new SolanaWalletService(getSolanaRpcUrl(data.networkSettings.solana)));
        }

        // Load Ethereum wallet with private key
        if (data.wallets.ethereum) {
          setEthereumWallet({
            address: data.wallets.ethereum.address,
            privateKey: data.wallets.ethereum.privateKey,
            balance: data.wallets.ethereum.balance || '0'
          });
        }

        // Load Solana wallet with private key
        if (data.wallets.solana) {
          setSolanaWallet({
            address: data.wallets.solana.address,
            privateKey: data.wallets.solana.privateKey,
            balance: data.wallets.solana.balance || '0'
          });
        }
      }
    } catch (error) {
      console.error('Error loading wallets with private keys:', error);
      
      // Fallback to loading without private keys
      if (walletInfo.ethereum) {
        setEthereumWallet({
          address: walletInfo.ethereum.address,
          balance: walletInfo.ethereum.balance || '0'
        });
      }

      if (walletInfo.solana) {
        setSolanaWallet({
          address: walletInfo.solana.address,
          balance: walletInfo.solana.balance || '0'
        });
      }
    }
  };

  // Load wallets from backend with private keys
  const loadWalletsFromBackend = async () => {
    if (!token) return;

    try {
      const response = await apiCall(API_ENDPOINTS.WALLETS_PRIVATE, {}, token);

      if (response.ok) {
        const data = await response.json();
        console.log('Backend wallet data received:', data);
        
        // Update network settings
        if (data.networkSettings) {
          setNetworkSettings(data.networkSettings);
          setEthereumService(new EthereumWalletService(getEthereumRpcUrl(data.networkSettings.ethereum)));
          setSolanaService(new SolanaWalletService(getSolanaRpcUrl(data.networkSettings.solana)));
        }

        // Load Ethereum wallet
        if (data.wallets.ethereum) {
          console.log('Loading Ethereum wallet:', {
            address: data.wallets.ethereum.address,
            hasPrivateKey: !!data.wallets.ethereum.privateKey,
            privateKeyLength: data.wallets.ethereum.privateKey?.length
          });
          setEthereumWallet({
            address: data.wallets.ethereum.address,
            privateKey: data.wallets.ethereum.privateKey,
            balance: data.wallets.ethereum.balance || '0'
          });
        }

        // Load Solana wallet
        if (data.wallets.solana) {
          console.log('Loading Solana wallet:', {
            address: data.wallets.solana.address,
            hasPrivateKey: !!data.wallets.solana.privateKey,
            privateKeyLength: data.wallets.solana.privateKey?.length,
            privateKeyPreview: data.wallets.solana.privateKey ? data.wallets.solana.privateKey.substring(0, 20) + '...' : 'undefined'
          });
          setSolanaWallet({
            address: data.wallets.solana.address,
            privateKey: data.wallets.solana.privateKey,
            balance: data.wallets.solana.balance || '0'
          });
        }
      }
    } catch (error) {
      console.error('Error loading wallets from backend:', error);
    }
  };

  // Load wallets from backend when token changes
  useEffect(() => {
    if (token) {
      loadWalletsFromBackend();
    }
  }, [token]);

  // Update network settings and recreate services
  const updateNetworkSettings = async (chain: 'ethereum' | 'solana', network: string) => {
    setNetworkSettings(prev => {
      const newSettings = { ...prev, [chain]: network };
      
      // Update services based on new network settings
      if (chain === 'ethereum') {
        setEthereumService(new EthereumWalletService(getEthereumRpcUrl(network)));
      } else {
        setSolanaService(new SolanaWalletService(getSolanaRpcUrl(network)));
      }
      
      return newSettings;
    });

    // Refresh balances after network change
    setTimeout(async () => {
      await refreshBalances();
    }, 1000); // Small delay to ensure services are updated
  };

  // Load wallets and network settings from localStorage on mount (fallback)
  useEffect(() => {
    if (!token) {
      const loadWallets = () => {
        const savedEthereumWallet = localStorage.getItem('ethereumWallet');
        const savedSolanaWallet = localStorage.getItem('solanaWallet');
        const savedNetworkSettings = localStorage.getItem('networkSettings');
        
        if (savedEthereumWallet) {
          setEthereumWallet(JSON.parse(savedEthereumWallet));
        }
        
        if (savedSolanaWallet) {
          setSolanaWallet(JSON.parse(savedSolanaWallet));
        }
        
        if (savedNetworkSettings) {
          const settings = JSON.parse(savedNetworkSettings);
          setNetworkSettings(settings);
          // Update services with saved settings
          setEthereumService(new EthereumWalletService(getEthereumRpcUrl(settings.ethereum)));
          setSolanaService(new SolanaWalletService(getSolanaRpcUrl(settings.solana)));
        }
      };
      
      loadWallets();
    }
  }, [token]);

  // Save wallets to localStorage when they change (fallback for non-authenticated users)
  useEffect(() => {
    if (!token) {
      if (ethereumWallet) {
        localStorage.setItem('ethereumWallet', JSON.stringify(ethereumWallet));
      } else {
        localStorage.removeItem('ethereumWallet');
      }
    }
  }, [ethereumWallet, token]);

  useEffect(() => {
    if (!token) {
      if (solanaWallet) {
        localStorage.setItem('solanaWallet', JSON.stringify(solanaWallet));
      } else {
        localStorage.removeItem('solanaWallet');
      }
    }
  }, [solanaWallet, token]);

  // Save network settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('networkSettings', JSON.stringify(networkSettings));
  }, [networkSettings]);

  const createEthereumWallet = async () => {
    try {
      const wallet = await ethereumService.createWallet();
      setEthereumWallet(wallet);
      // Don't try to refresh balance immediately for new wallets
      // Balance will be 0 anyway, and we can refresh it later when needed
    } catch (error) {
      console.error('Error creating Ethereum wallet:', error);
      throw error;
    }
  };

  const importEthereumWallet = async (privateKey: string) => {
    try {
      const wallet = await ethereumService.importWallet(privateKey);
      setEthereumWallet(wallet);
    } catch (error) {
      console.error('Error importing Ethereum wallet:', error);
      throw error;
    }
  };

  const sendEthereumTransaction = async (toAddress: string, amount: string) => {
    if (!ethereumWallet) {
      throw new Error('No Ethereum wallet loaded');
    }
    
    if (!ethereumWallet.privateKey) {
      throw new Error('Private key not loaded. Please refresh the page and try again.');
    }
    
    try {
      const txHash = await ethereumService.sendTransaction(
        ethereumWallet.privateKey,
        toAddress,
        amount
      );
      
      // Refresh balance after transaction
      await refreshBalances();
      
      return txHash;
    } catch (error) {
      console.error('Error sending Ethereum transaction:', error);
      throw error;
    }
  };

  const createSolanaWallet = async () => {
    try {
      const wallet = await solanaService.createWallet();
      setSolanaWallet(wallet);
      // Don't try to refresh balance immediately for new wallets
      // Balance will be 0 anyway, and we can refresh it later when needed
    } catch (error) {
      console.error('Error creating Solana wallet:', error);
      throw error;
    }
  };

  const importSolanaWallet = async (privateKey: string) => {
    try {
      const wallet = await solanaService.importWallet(privateKey);
      setSolanaWallet(wallet);
    } catch (error) {
      console.error('Error importing Solana wallet:', error);
      throw error;
    }
  };

  const sendSolanaTransaction = async (toAddress: string, amount: string) => {
    if (!solanaWallet) {
      throw new Error('No Solana wallet loaded');
    }
    
    console.log('Solana wallet state:', {
      address: solanaWallet.address,
      hasPrivateKey: !!solanaWallet.privateKey,
      privateKeyLength: solanaWallet.privateKey?.length,
      privateKeyType: typeof solanaWallet.privateKey
    });
    
    if (!solanaWallet.privateKey) {
      throw new Error('Private key not loaded. Please refresh the page and try again.');
    }
    
    try {
      console.log('About to send transaction with private key length:', solanaWallet.privateKey.length);
      const signature = await solanaService.sendTransaction(
        solanaWallet.privateKey,
        toAddress,
        amount
      );
      
      // Refresh balance after transaction
      await refreshBalances();
      
      return signature;
    } catch (error) {
      console.error('Error sending Solana transaction:', error);
      throw error;
    }
  };

  const requestSolanaAirdrop = async (amount: number = 1) => {
    if (!solanaWallet) {
      throw new Error('No Solana wallet loaded');
    }
    
    try {
      const signature = await solanaService.requestAirdrop(solanaWallet.address, amount);
      // Wait a bit for the airdrop to be processed
      setTimeout(async () => {
        await refreshBalances();
      }, 2000);
      return signature;
    } catch (error) {
      console.error('Error requesting Solana airdrop:', error);
      throw error;
    }
  };

  const refreshBalances = async () => {
    try {
      if (ethereumWallet) {
        const balance = await ethereumService.getBalance(ethereumWallet.address);
        setEthereumWallet(prev => prev ? { ...prev, balance } : null);
      }
      
      if (solanaWallet) {
        const balance = await solanaService.getBalance(solanaWallet.address);
        setSolanaWallet(prev => prev ? { ...prev, balance } : null);
      }
    } catch (error) {
      console.error('Error refreshing balances:', error);
    }
  };

  const clearWallets = () => {
    setEthereumWallet(null);
    setSolanaWallet(null);
  };

  const value: WalletContextType = {
    ethereumWallet,
    ethereumService,
    createEthereumWallet,
    importEthereumWallet,
    sendEthereumTransaction,
    
    solanaWallet,
    solanaService,
    createSolanaWallet,
    importSolanaWallet,
    sendSolanaTransaction,
    requestSolanaAirdrop,
    
    networkSettings,
    updateNetworkSettings,
    getNetworkDisplayName,
    
    refreshBalances,
    clearWallets,
    loadUserWallets,
    loadWalletsFromBackend,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}; 