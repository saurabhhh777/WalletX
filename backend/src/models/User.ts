import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'github';
  providerId: string;
  wallets: {
    ethereum?: {
      address: string;
      privateKey: string;
      balance: string;
    };
    solana?: {
      address: string;
      privateKey: string;
      balance: string;
    };
  };
  networkSettings: {
    ethereum: string;
    solana: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  provider: {
    type: String,
    enum: ['google', 'github'],
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
  wallets: {
    ethereum: {
      address: String,
      privateKey: String,
      balance: String,
    },
    solana: {
      address: String,
      privateKey: String,
      balance: String,
    },
  },
  networkSettings: {
    ethereum: {
      type: String,
      default: 'sepolia',
    },
    solana: {
      type: String,
      default: 'devnet',
    },
  },
}, {
  timestamps: true,
});

// Create compound index for provider and providerId
UserSchema.index({ provider: 1, providerId: 1 }, { unique: true });

export const User = mongoose.model<IUser>('User', UserSchema); 