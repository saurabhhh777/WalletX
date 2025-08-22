import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User } from '../models/User';
import { generateToken } from '../middleware/auth';
import { ethers } from 'ethers';
import { Keypair } from '@solana/web3.js';

// Helper function to create Ethereum wallet
const createEthereumWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    balance: '0'
  };
};

// Helper function to create Solana wallet
const createSolanaWallet = () => {
  const keypair = Keypair.generate();
  return {
    address: keypair.publicKey.toString(),
    privateKey: Buffer.from(keypair.secretKey).toString('hex'),
    balance: '0'
  };
};

export const configurePassport = (): void => {
  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
          // Check if user already exists
          let user = await User.findOne({
            provider: 'google',
            providerId: profile.id,
          });

          if (!user) {
            // Create new user with wallets
            const ethereumWallet = createEthereumWallet();
            const solanaWallet = createSolanaWallet();
            
            user = new User({
              email: profile.emails![0].value,
              name: profile.displayName,
              avatar: profile.photos![0].value,
              provider: 'google',
              providerId: profile.id,
              wallets: {
                ethereum: ethereumWallet,
                solana: solanaWallet,
              },
              networkSettings: {
                ethereum: 'sepolia',
                solana: 'devnet',
              },
            });
            await user.save();
            console.log(`Created new user with wallets for Google auth: ${user.email}`);
          } else {
            console.log(`Existing user logged in: ${user.email}`);
          }

          return done(null, user);
        } catch (error) {
          console.error('Google auth error:', error);
          return done(error as Error);
        }
      }
    )
  );

  // GitHub OAuth Strategy
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: '/auth/github/callback',
      },
      async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
          // Check if user already exists
          let user = await User.findOne({
            provider: 'github',
            providerId: profile.id,
          });

          if (!user) {
            // Create new user with wallets
            const ethereumWallet = createEthereumWallet();
            const solanaWallet = createSolanaWallet();
            
            user = new User({
              email: profile.emails![0].value,
              name: profile.displayName,
              avatar: profile.photos![0].value,
              provider: 'github',
              providerId: profile.id,
              wallets: {
                ethereum: ethereumWallet,
                solana: solanaWallet,
              },
              networkSettings: {
                ethereum: 'sepolia',
                solana: 'devnet',
              },
            });
            await user.save();
            console.log(`Created new user with wallets for GitHub auth: ${user.email}`);
          } else {
            console.log(`Existing user logged in: ${user.email}`);
          }

          return done(null, user);
        } catch (error) {
          console.error('GitHub auth error:', error);
          return done(error as Error);
        }
      }
    )
  );

  // Serialize user for the session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user from the session
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}; 