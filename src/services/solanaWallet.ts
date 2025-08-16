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

  async createWallet(): Promise<SolanaWallet> {
    try {
      const keypair = Keypair.generate();
      const address = keypair.publicKey.toString();
      const privateKey = Buffer.from(keypair.secretKey).toString('base64');
      
      // Initialize balance to 0 for new wallets
      const balance = '0';
      
      return {
        address,
        privateKey,
        balance
      };
    } catch (error) {
      console.error('Error creating Solana wallet:', error);
      throw new Error('Failed to create Solana wallet. Please try again.');
    }
  }

  async importWallet(privateKeyBase64: string): Promise<SolanaWallet> {
    try {
      const secretKey = Buffer.from(privateKeyBase64, 'base64');
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
      return (balance / LAMPORTS_PER_SOL).toString();
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
      const secretKey = Buffer.from(fromPrivateKeyBase64, 'base64');
      const fromKeypair = Keypair.fromSecretKey(secretKey);
      const toPublicKey = new PublicKey(toAddress);
      
      const amountLamports = parseFloat(amount) * LAMPORTS_PER_SOL;
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromKeypair.publicKey,
          toPubkey: toPublicKey,
          lamports: amountLamports,
        })
      );
      
      const signature = await this.connection.sendTransaction(transaction, [fromKeypair]);
      return signature;
    } catch (error) {
      console.error('Error sending Solana transaction:', error);
      throw new Error(`Transaction failed: ${error}`);
    }
  }

  async getTransactionHistory(address: string): Promise<any[]> {
    try {
      const publicKey = new PublicKey(address);
      const signatures = await this.connection.getSignaturesForAddress(publicKey);
      return signatures.slice(0, 10); // Return last 10 transactions
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      return [];
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
      const secretKey = Buffer.from(privateKeyBase64, 'base64');
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