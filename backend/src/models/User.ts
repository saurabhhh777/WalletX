import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  password?: string; // Optional for OAuth users
  avatar?: string;
  provider: 'google' | 'github' | 'email';
  providerId?: string; // Optional for email users
  linkedProviders: {
    google?: {
      providerId: string;
      linkedAt: Date;
    };
    github?: {
      providerId: string;
      linkedAt: Date;
    };
  };
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
  password: {
    type: String,
    // Required only for email authentication
    required: function() {
      return this.provider === 'email';
    },
  },
  avatar: {
    type: String,
  },
  provider: {
    type: String,
    enum: ['google', 'github', 'email'],
    required: true,
  },
  providerId: {
    type: String,
    // Required only for OAuth providers
    required: function() {
      return this.provider !== 'email';
    },
  },
  linkedProviders: {
    google: {
      providerId: String,
      linkedAt: {
        type: Date,
        default: Date.now,
      },
    },
    github: {
      providerId: String,
      linkedAt: {
        type: Date,
        default: Date.now,
      },
    },
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

// Temporarily comment out the problematic index
// TODO: Fix this index properly for OAuth users
// UserSchema.index({ provider: 1, providerId: 1 }, { 
//   unique: true, 
//   sparse: true, // Allow null values for email users
//   partialFilterExpression: { 
//     providerId: { $exists: true, $ne: null } 
//   }
// });

export const User = mongoose.model<IUser>('User', UserSchema); 