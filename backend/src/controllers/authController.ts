import { Request, Response } from 'express';
import { generateToken } from '../middleware/auth';

export const googleAuth = (req: Request, res: Response): void => {
  // This will be handled by passport middleware
  res.json({ message: 'Google auth initiated' });
};

export const googleCallback = (req: Request, res: Response): void => {
  try {
    const user = req.user as any;
    const token = generateToken(user._id);
    
    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth-callback?token=${token}&provider=google`);
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
    const user = req.user as any;
    const token = generateToken(user._id);
    
    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth-callback?token=${token}&provider=github`);
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