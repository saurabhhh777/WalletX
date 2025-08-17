import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User } from '../models/User';
import { generateToken } from '../middleware/auth';

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
            // Create new user
            user = new User({
              email: profile.emails![0].value,
              name: profile.displayName,
              avatar: profile.photos![0].value,
              provider: 'google',
              providerId: profile.id,
              wallets: {},
              networkSettings: {
                ethereum: 'sepolia',
                solana: 'devnet',
              },
            });
            await user.save();
          }

          return done(null, user);
        } catch (error) {
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
            // Create new user
            user = new User({
              email: profile.emails![0].value,
              name: profile.displayName,
              avatar: profile.photos![0].value,
              provider: 'github',
              providerId: profile.id,
              wallets: {},
              networkSettings: {
                ethereum: 'sepolia',
                solana: 'devnet',
              },
            });
            await user.save();
          }

          return done(null, user);
        } catch (error) {
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