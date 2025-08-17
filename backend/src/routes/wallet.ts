import express from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getUserWallets,
  updateWallets,
  updateNetworkSettings,
  getUserProfile,
} from '../controllers/walletController';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get user profile
router.get('/profile', getUserProfile);

// Get user wallets
router.get('/wallets', getUserWallets);

// Update wallets
router.put('/wallets', updateWallets);

// Update network settings
router.put('/network-settings', updateNetworkSettings);

export default router; 