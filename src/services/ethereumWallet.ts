import { ethers } from 'ethers';

export interface EthereumWallet {
  address: string;
  privateKey: string;
  balance: string;
}

export class EthereumWalletService {
  private provider: ethers.JsonRpcProvider;

  constructor(rpcUrl: string = 'https://eth-mainnet.g.alchemy.com/v2/demo') {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  async createWallet(): Promise<EthereumWallet> {
    const wallet = ethers.Wallet.createRandom();
    const address = wallet.address;
    const privateKey = wallet.privateKey;
    
    const balance = await this.getBalance(address);
    
    return {
      address,
      privateKey,
      balance
    };
  }

  async importWallet(privateKey: string): Promise<EthereumWallet> {
    try {
      const wallet = new ethers.Wallet(privateKey, this.provider);
      const address = wallet.address;
      const balance = await this.getBalance(address);
      
      return {
        address,
        privateKey,
        balance
      };
    } catch (error) {
      throw new Error('Invalid private key');
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      return '0';
    }
  }

  async sendTransaction(
    fromPrivateKey: string,
    toAddress: string,
    amount: string
  ): Promise<string> {
    try {
      const wallet = new ethers.Wallet(fromPrivateKey, this.provider);
      const amountWei = ethers.parseEther(amount);
      
      const tx = await wallet.sendTransaction({
        to: toAddress,
        value: amountWei,
      });
      
      return tx.hash;
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`);
    }
  }

  async getTransactionHistory(address: string): Promise<any[]> {
    // This would typically use an API like Etherscan
    // For demo purposes, returning empty array
    return [];
  }

  validateAddress(address: string): boolean {
    return ethers.isAddress(address);
  }

  validatePrivateKey(privateKey: string): boolean {
    try {
      new ethers.Wallet(privateKey);
      return true;
    } catch {
      return false;
    }
  }
} 