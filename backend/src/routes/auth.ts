import express from 'express';
import passport from 'passport';
import { 
  googleAuth, 
  googleCallback, 
  githubAuth, 
  githubCallback, 
  logout,
  login,
  signup
} from '../controllers/authController';

const router = express.Router();

// Email/Password Authentication routes
router.post('/signup', signup);
router.post('/login', login);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), googleCallback);

// GitHub OAuth routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { session: false }), githubCallback);

// Logout route
router.post('/logout', logout);

export default router; 