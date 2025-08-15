import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { EthereumWalletService } from '../services/ethereumWallet.ts';
import type { EthereumWallet } from '../services/ethereumWallet.ts';
import { SolanaWalletService } from '../services/solanaWallet.ts';
import type { SolanaWallet } from '../services/solanaWallet.ts';

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
  
  // Common
  refreshBalances: () => Promise<void>;
  clearWallets: () => void;
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
  
  const ethereumService = new EthereumWalletService();
  const solanaService = new SolanaWalletService();

  // Load wallets from localStorage on mount
  useEffect(() => {
    const loadWallets = () => {
      const savedEthereumWallet = localStorage.getItem('ethereumWallet');
      const savedSolanaWallet = localStorage.getItem('solanaWallet');
      
      if (savedEthereumWallet) {
        setEthereumWallet(JSON.parse(savedEthereumWallet));
      }
      
      if (savedSolanaWallet) {
        setSolanaWallet(JSON.parse(savedSolanaWallet));
      }
    };
    
    loadWallets();
  }, []);

  // Save wallets to localStorage when they change
  useEffect(() => {
    if (ethereumWallet) {
      localStorage.setItem('ethereumWallet', JSON.stringify(ethereumWallet));
    } else {
      localStorage.removeItem('ethereumWallet');
    }
  }, [ethereumWallet]);

  useEffect(() => {
    if (solanaWallet) {
      localStorage.setItem('solanaWallet', JSON.stringify(solanaWallet));
    } else {
      localStorage.removeItem('solanaWallet');
    }
  }, [solanaWallet]);

  const createEthereumWallet = async () => {
    try {
      const wallet = await ethereumService.createWallet();
      setEthereumWallet(wallet);
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
    
    try {
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
      await refreshBalances();
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
    
    refreshBalances,
    clearWallets,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}; 