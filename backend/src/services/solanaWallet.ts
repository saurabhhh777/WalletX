import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

export interface SolanaWallet {
  address: string;
  privateKey: string;
  balance: string;
}

export class SolanaWalletService {
  private connection: Connection;

  constructor(rpcUrl: string = 'https://api.devnet.solana.com') {
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  // Helper function to convert Uint8Array to base64 string
  private arrayToBase64(array: Uint8Array): string {
    const bytes = new Uint8Array(array);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  // Helper function to convert base64 string to Uint8Array
  private base64ToArray(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  async createWallet(): Promise<SolanaWallet> {
    try {
      // Generate a new keypair - this doesn't require network connection
      const keypair = Keypair.generate();
      const address = keypair.publicKey.toString();
      const privateKey = this.arrayToBase64(keypair.secretKey);
      
      // Initialize balance to 0 for new wallets
      const balance = '0';
      
      console.log('Solana wallet created successfully:', { address, balance });
      
      return {
        address,
        privateKey,
        balance
      };
    } catch (error) {
      console.error('Error creating Solana wallet:', error);
      // Provide more specific error information
      if (error instanceof Error) {
        throw new Error(`Failed to create Solana wallet: ${error.message}`);
      } else {
        throw new Error('Failed to create Solana wallet. Please try again.');
      }
    }
  }

  async importWallet(privateKeyBase64: string): Promise<SolanaWallet> {
    try {
      const secretKey = this.base64ToArray(privateKeyBase64);
      const keypair = Keypair.fromSecretKey(secretKey);
      const address = keypair.publicKey.toString();
      const balance = await this.getBalance(address);
      
      return {
        address,
        privateKey: privateKeyBase64,
        balance
      };
    } catch (error) {
      console.error('Error importing Solana wallet:', error);
      throw new Error('Invalid private key. Please check and try again.');
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      const publicKey = new PublicKey(address);
      const balance = await this.connection.getBalance(publicKey);
      return (balance / LAMPORTS_PER_SOL).toFixed(9);
    } catch (error) {
      console.error('Error fetching balance:', error);
      return '0';
    }
  }

  async sendTransaction(
    fromPrivateKeyBase64: string,
    toAddress: string,
    amount: string
  ): Promise<string> {
    try {
      const secretKey = this.base64ToArray(fromPrivateKeyBase64);
      const fromKeypair = Keypair.fromSecretKey(secretKey);
      const toPublicKey = new PublicKey(toAddress);
      
      const amountLamports = Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL);
      
      if (amountLamports <= 0) {
        throw new Error('Amount must be greater than 0');
      }
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromKeypair.publicKey,
          toPubkey: toPublicKey,
          lamports: amountLamports,
        })
      );
      
      const signature = await this.connection.sendTransaction(transaction, [fromKeypair]);
      await this.connection.confirmTransaction(signature);
      return signature;
    } catch (error) {
      console.error('Error sending Solana transaction:', error);
      throw new Error(`Transaction failed: ${error}`);
    }
  }

  validateAddress(address: string): boolean {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  }

  validatePrivateKey(privateKeyBase64: string): boolean {
    try {
      const secretKey = this.base64ToArray(privateKeyBase64);
      Keypair.fromSecretKey(secretKey);
      return true;
    } catch {
      return false;
    }
  }

  async requestAirdrop(address: string, amount: number = 1): Promise<string> {
    try {
      const publicKey = new PublicKey(address);
      const signature = await this.connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
      await this.connection.confirmTransaction(signature);
      return signature;
    } catch (error) {
      console.error('Error requesting Solana airdrop:', error);
      throw new Error(`Airdrop failed: ${error}`);
    }
  }
} 