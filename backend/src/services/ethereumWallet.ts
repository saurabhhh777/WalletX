import { ethers } from 'ethers';

export interface EthereumWallet {
  address: string;
  privateKey: string;
  balance: string;
}

export class EthereumWalletService {
  private provider: ethers.JsonRpcProvider;

  constructor(rpcUrl: string = 'https://eth-sepolia.g.alchemy.com/v2/demo') {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  async createWallet(): Promise<EthereumWallet> {
    try {
      const wallet = ethers.Wallet.createRandom();
      const address = wallet.address;
      const privateKey = wallet.privateKey;
      
      // Try to get balance, but don't fail if API is unavailable
      let balance = '0';
      try {
        balance = await this.getBalance(address);
      } catch (error) {
        console.warn('Could not fetch balance, using 0:', error instanceof Error ? error.message : 'Unknown error');
        balance = '0';
      }
      
      return {
        address,
        privateKey,
        balance
      };
    } catch (error) {
      console.error('Error creating Ethereum wallet:', error);
      throw new Error('Failed to create Ethereum wallet. Please try again.');
    }
  }

  async importWallet(privateKey: string): Promise<EthereumWallet> {
    try {
      const wallet = new ethers.Wallet(privateKey, this.provider);
      const address = wallet.address;
      
      // Try to get balance, but don't fail if API is unavailable
      let balance = '0';
      try {
        balance = await this.getBalance(address);
      } catch (error) {
        console.warn('Could not fetch balance, using 0:', error instanceof Error ? error.message : 'Unknown error');
        balance = '0';
      }
      
      return {
        address,
        privateKey,
        balance
      };
    } catch (error) {
      console.error('Error importing Ethereum wallet:', error);
      throw new Error('Invalid private key. Please check and try again.');
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      // Return 0 instead of throwing, so wallet creation doesn't fail
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
      console.error('Error sending Ethereum transaction:', error);
      throw new Error(`Transaction failed: ${error}`);
    }
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