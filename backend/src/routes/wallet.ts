import express from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getUserWallets,
  getUserWalletsWithPrivateKeys,
  updateWallets,
  updateNetworkSettings,
  getUserProfile,
} from '../controllers/walletController';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get user profile
router.get('/profile', getUserProfile);

// Get user wallets (without private keys)
router.get('/wallets', getUserWallets);

// Get user wallets with private keys
router.get('/wallets/private', getUserWalletsWithPrivateKeys);

// Update wallets
router.put('/wallets', updateWallets);

// Update network settings
router.put('/network-settings', updateNetworkSettings);

export default router; 