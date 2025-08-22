import { ethers } from 'ethers';

export interface EthereumWallet {
  address: string;
  privateKey: string;
  balance: string;
}

export class EthereumWalletService {
  private provider: ethers.JsonRpcProvider;

  constructor(rpcUrl: string = 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161') {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  async createWallet(): Promise<EthereumWallet> {
    try {
      const wallet = ethers.Wallet.createRandom();
      const address = wallet.address;
      const privateKey = wallet.privateKey;
      
      const balance = await this.getBalance(address);
      
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
      const balance = await this.getBalance(address);
      
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