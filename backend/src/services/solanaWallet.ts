import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram, clusterApiUrl } from '@solana/web3.js';

export interface SolanaWallet {
  address: string;
  privateKey: string;
  balance: string;
}

export class SolanaWalletService {
  private connection: Connection;

  constructor(rpcUrl: string = 'https://api.devnet.solana.com') {
    // Prefer explicit URL but allow env override in future
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
      let balanceLamports = await this.connection.getBalance(publicKey);

      // Quick retry once; RPCs can be eventually consistent on devnet
      if (balanceLamports === 0) {
        await new Promise(r => setTimeout(r, 1500));
        balanceLamports = await this.connection.getBalance(publicKey);
      }

      return (balanceLamports / LAMPORTS_PER_SOL).toFixed(9);
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
      console.log('Solana sendTransaction called with:', {
        toAddress,
        amount,
        hasPrivateKey: !!fromPrivateKeyBase64
      });

      const secretKey = this.base64ToArray(fromPrivateKeyBase64);
      const fromKeypair = Keypair.fromSecretKey(secretKey);
      const toPublicKey = new PublicKey(toAddress);
      const amountLamports = Math.round(parseFloat(amount) * LAMPORTS_PER_SOL);

      console.log('Transaction details:', {
        from: fromKeypair.publicKey.toString(),
        to: toPublicKey.toString(),
        amountLamports,
        amountSOL: amount
      });

      // Check if we have enough balance
      const currentBalance = await this.connection.getBalance(fromKeypair.publicKey);
      console.log('Current balance:', currentBalance, 'lamports');
      
      if (currentBalance < amountLamports) {
        throw new Error(`Insufficient balance. You have ${(currentBalance / LAMPORTS_PER_SOL).toFixed(9)} SOL, trying to send ${amount} SOL`);
      }

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromKeypair.publicKey,
          toPubkey: toPublicKey,
          lamports: amountLamports,
        })
      );

      console.log('Sending transaction...');
      const signature = await this.connection.sendTransaction(tx, [fromKeypair]);

      console.log('Transaction sent, signature:', signature);

      // Wait for confirmation
      console.log('Waiting for confirmation...');
      await this.connection.confirmTransaction(signature, 'confirmed');

      console.log('Transaction confirmed!');
      return signature;
    } catch (error) {
      console.error('Solana sendTransaction error:', error);
      if (error instanceof Error) {
        throw new Error(`Solana transaction failed: ${error.message}`);
      }
      throw new Error('Transaction failed. Please try again.');
    }
  }

  requestAirdrop = async (address: string, amount: number = 1): Promise<string> => {
    const publicKey = new PublicKey(address);
    const signature = await this.connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
    await this.connection.confirmTransaction(signature, 'confirmed');
    return signature;
  }

  async getRecentTransactions(address: string, limit: number = 10): Promise<Array<{
    signature: string;
    slot: number;
    timestamp?: number;
    type: 'send' | 'receive' | 'other';
    amount: string; // in SOL
    from?: string;
    to?: string;
    status: 'confirmed' | 'failed' | 'pending';
  }>> {
    try {
      const publicKey = new PublicKey(address);
      const signatures = await this.connection.getSignaturesForAddress(publicKey, { limit });
      const results: Array<{ signature: string; slot: number; timestamp?: number; type: 'send' | 'receive' | 'other'; amount: string; from?: string; to?: string; status: 'confirmed' | 'failed' | 'pending'; }> = [];

      for (const sig of signatures) {
        const tx = await this.connection.getParsedTransaction(sig.signature, { maxSupportedTransactionVersion: 0 });
        if (!tx) {
          results.push({ signature: sig.signature, slot: sig.slot, timestamp: sig.blockTime || undefined, type: 'other', amount: '0', status: 'pending' });
          continue;
        }

        let amountLamports = 0;
        let from: string | undefined;
        let to: string | undefined;
        let type: 'send' | 'receive' | 'other' = 'other';

        try {
          const instructions = tx.transaction.message.instructions as any[];
          for (const ix of instructions) {
            if (ix.parsed && ix.parsed.type === 'transfer') {
              const info = ix.parsed.info;
              from = info.source;
              to = info.destination;
              const lamports = Number(info.lamports);
              amountLamports += lamports;
            }
          }
        } catch {}

        if (from === address) type = 'send';
        else if (to === address) type = 'receive';

        results.push({
          signature: sig.signature,
          slot: sig.slot,
          timestamp: tx.blockTime || undefined,
          type,
          amount: (amountLamports / LAMPORTS_PER_SOL).toFixed(9),
          from,
          to,
          status: 'confirmed'
        });
      }

      return results;
    } catch (error) {
      console.error('Error fetching recent Solana transactions:', error);
      return [];
    }
  }
} 