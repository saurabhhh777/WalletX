import { Request, Response } from 'express';
import { User } from '../models/User';

interface AuthRequest extends Request {
  user?: any;
}

export const getUserWallets = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      wallets: user.wallets,
      networkSettings: user.networkSettings,
    });
  } catch (error) {
    console.error('Get user wallets error:', error);
    res.status(500).json({ message: 'Failed to fetch wallets' });
  }
};

export const updateWallets = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { wallets, networkSettings } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        wallets,
        networkSettings,
      },
      { new: true }
    ).select('-__v');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      wallets: user.wallets,
      networkSettings: user.networkSettings,
    });
  } catch (error) {
    console.error('Update wallets error:', error);
    res.status(500).json({ message: 'Failed to update wallets' });
  }
};

export const updateNetworkSettings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { networkSettings } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { networkSettings },
      { new: true }
    ).select('-__v');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      networkSettings: user.networkSettings,
    });
  } catch (error) {
    console.error('Update network settings error:', error);
    res.status(500).json({ message: 'Failed to update network settings' });
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      provider: user.provider,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
}; 