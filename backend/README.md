# WalletX Backend

Backend API for WalletX - Multi-chain cryptocurrency wallet with OAuth authentication.

## Features

- 🔐 **OAuth Authentication**: Google and GitHub login
- 💰 **Wallet Management**: Store and sync Ethereum and Solana wallets
- 🌐 **Network Settings**: Manage network preferences
- 🔒 **JWT Authentication**: Secure token-based authentication
- 📊 **MongoDB**: Persistent data storage

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js (Google OAuth, GitHub OAuth)
- **Security**: JWT tokens, bcrypt

## Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Google OAuth credentials
- GitHub OAuth credentials

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment setup**:
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/walletx
   JWT_SECRET=your-super-secret-jwt-key
   SESSION_SECRET=your-super-secret-session-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   FRONTEND_URL=http://localhost:5173
   ```

3. **OAuth Setup**:
   
   **Google OAuth**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:5000/auth/google/callback`
   
   **GitHub OAuth**:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App
   - Add callback URL: `http://localhost:5000/auth/github/callback`

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## API Endpoints

### Authentication

- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/github` - Initiate GitHub OAuth
- `GET /auth/github/callback` - GitHub OAuth callback
- `POST /auth/logout` - Logout user

### Wallet Management (Protected)

- `GET /api/profile` - Get user profile
- `GET /api/wallets` - Get user wallets
- `PUT /api/wallets` - Update user wallets
- `PUT /api/network-settings` - Update network settings

### Health Check

- `GET /health` - Server health status

## Database Schema

### User Model

```typescript
{
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
```

## Security Features

- **JWT Tokens**: 7-day expiration
- **CORS Protection**: Configured for frontend origin
- **Session Management**: Secure session handling
- **Input Validation**: Request validation middleware
- **Error Handling**: Comprehensive error responses

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/walletx` |
| `JWT_SECRET` | JWT signing secret | Required |
| `SESSION_SECRET` | Session secret | Required |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Required |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Required |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | Required |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret | Required |
| `FRONTEND_URL` | Frontend application URL | `http://localhost:5173` |

## Development Workflow

1. **Start MongoDB**: Ensure MongoDB is running
2. **Set Environment**: Configure `.env` file
3. **Install Dependencies**: `npm install`
4. **Start Development**: `npm run dev`
5. **Test Endpoints**: Use Postman or similar tool

## Production Deployment

1. **Build**: `npm run build`
2. **Environment**: Set production environment variables
3. **Start**: `npm start`
4. **Monitor**: Check logs and health endpoint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request 