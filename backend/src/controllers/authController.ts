import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth';
import { User, IUser } from '../models/User';
import { EthereumWalletService } from '../services/ethereumWallet';
import { SolanaWalletService } from '../services/solanaWallet';

// Email/Password Authentication
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email' });
      return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create wallets for new user
    const ethereumService = new EthereumWalletService();
    const solanaService = new SolanaWalletService();

    const ethereumWallet = await ethereumService.createWallet();
    const solanaWallet = await solanaService.createWallet();

    // Create new user with wallets
    const user = new User({
      email,
      password: hashedPassword,
      name,
      provider: 'email',
      // Default avatar for email users
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      wallets: {
        ethereum: {
          address: ethereumWallet.address,
          privateKey: ethereumWallet.privateKey,
          balance: ethereumWallet.balance
        },
        solana: {
          address: solanaWallet.address,
          privateKey: solanaWallet.privateKey,
          balance: solanaWallet.balance
        }
      },
      networkSettings: {
        ethereum: 'sepolia',
        solana: 'devnet'
      }
    });

    await user.save();

    // Generate token - convert ObjectId to string
    const token = generateToken(user._id.toString());

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        wallets: {
          ethereum: user.wallets.ethereum ? {
            address: user.wallets.ethereum.address,
            balance: user.wallets.ethereum.balance
          } : null,
          solana: user.wallets.solana ? {
            address: user.wallets.solana.address,
            balance: user.wallets.solana.balance
          } : null
        },
        networkSettings: user.networkSettings
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Check if user has password (OAuth users might not have one)
    if (!user.password) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Check password - user.password is now guaranteed to be a string
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate token - convert ObjectId to string
    const token = generateToken(user._id.toString());

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        wallets: {
          ethereum: user.wallets.ethereum ? {
            address: user.wallets.ethereum.address,
            balance: user.wallets.ethereum.balance
          } : null,
          solana: user.wallets.solana ? {
            address: user.wallets.solana.address,
            balance: user.wallets.solana.balance
          } : null
        },
        networkSettings: user.networkSettings
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const googleAuth = (req: Request, res: Response): void => {
  // This will be handled by passport middleware
  res.json({ message: 'Google auth initiated' });
};

export const googleCallback = (req: Request, res: Response): void => {
  try {
    const user = req.user as IUser;
    const token = generateToken(user._id.toString());
    
    // Redirect to frontend with token, user data, and wallet info
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      provider: user.provider,
      createdAt: user.createdAt
    };
    const walletInfo = {
      ethereum: user.wallets.ethereum ? {
        address: user.wallets.ethereum.address,
        balance: user.wallets.ethereum.balance
      } : null,
      solana: user.wallets.solana ? {
        address: user.wallets.solana.address,
        balance: user.wallets.solana.balance
      } : null,
      networkSettings: user.networkSettings
    };
    
    const queryParams = new URLSearchParams({
      token,
      user: JSON.stringify(userData),
      provider: 'google',
      wallets: JSON.stringify(walletInfo)
    });
    
    console.log('Google callback - Redirecting with user data:', userData);
    res.redirect(`${frontendUrl}/auth-callback?${queryParams.toString()}`);
  } catch (error) {
    console.error('Google callback error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
};

export const githubAuth = (req: Request, res: Response): void => {
  // This will be handled by passport middleware
  res.json({ message: 'GitHub auth initiated' });
};

export const githubCallback = (req: Request, res: Response): void => {
  try {
    const user = req.user as IUser;
    const token = generateToken(user._id.toString());
    
    // Redirect to frontend with token, user data, and wallet info
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      provider: user.provider,
      createdAt: user.createdAt
    };
    const walletInfo = {
      ethereum: user.wallets.ethereum ? {
        address: user.wallets.ethereum.address,
        balance: user.wallets.ethereum.balance
      } : null,
      solana: user.wallets.solana ? {
        address: user.wallets.solana.address,
        balance: user.wallets.solana.balance
      } : null,
      networkSettings: user.networkSettings
    };
    
    const queryParams = new URLSearchParams({
      token,
      user: JSON.stringify(userData),
      provider: 'github',
      wallets: JSON.stringify(walletInfo)
    });
    
    console.log('GitHub callback - Redirecting with user data:', userData);
    res.redirect(`${frontendUrl}/auth-callback?${queryParams.toString()}`);
  } catch (error) {
    console.error('GitHub callback error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
};

export const logout = (req: Request, res: Response): void => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      res.status(500).json({ message: 'Logout failed' });
      return;
    }
    res.json({ message: 'Logged out successfully' });
  });
}; 