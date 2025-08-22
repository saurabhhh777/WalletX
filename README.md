# WalletX - Multi-Chain Cryptocurrency Wallet

A modern, secure multi-chain cryptocurrency wallet that supports Ethereum and Solana networks. Built with React, TypeScript, Node.js, and MongoDB.

## Features

### 🔐 **Automatic Wallet Creation**
- **Sign up with Google/GitHub**: When users sign up with Google or GitHub OAuth, Ethereum and Solana wallets are automatically created for them
- **Persistent Wallets**: Users get the same wallets every time they log in (similar to tiplink.io)
- **Secure Storage**: Private keys are encrypted and stored securely in the cloud
- **No Manual Setup**: No need to manually create or import wallets - everything is handled automatically

### 🌐 **Multi-Chain Support**
- **Ethereum**: Support for Mainnet, Sepolia, and Goerli testnets
- **Solana**: Support for Mainnet, Devnet, and Testnet
- **Network Switching**: Easy switching between different networks
- **Real-time Balances**: Live balance updates for both chains

### 💰 **Wallet Features**
- **Send Transactions**: Send ETH and SOL to any address
- **Receive Payments**: QR code generation for easy payment receiving
- **Transaction History**: Track all your transactions
- **Test Airdrops**: Request test SOL tokens on devnet
- **Price Ticker**: Real-time cryptocurrency price information

### 🔒 **Security**
- **OAuth Authentication**: Secure login with Google or GitHub
- **JWT Tokens**: Stateless authentication with JSON Web Tokens
- **Encrypted Storage**: Private keys are encrypted before storage
- **Session Management**: Secure session handling

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- **React Hot Toast** for notifications

### Backend
- **Node.js** with TypeScript
- **Express.js** for API server
- **MongoDB** with Mongoose for database
- **Passport.js** for OAuth authentication
- **JWT** for token-based authentication
- **Ethers.js** for Ethereum wallet operations
- **@solana/web3.js** for Solana wallet operations

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB
- Google OAuth credentials
- GitHub OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WalletX
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/walletx

# JWT
JWT_SECRET=your-jwt-secret

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Server
PORT=5000
```

## Usage

### For Users

1. **Sign Up**: Visit the application and click "Sign In" to authenticate with Google or GitHub
2. **Automatic Wallet Creation**: Your Ethereum and Solana wallets are automatically created upon first signup
3. **Access Wallets**: Navigate to the dashboard to view your wallet information
4. **Send/Receive**: Use the wallet interface to send and receive cryptocurrencies
5. **Network Settings**: Switch between different networks as needed

### For Developers

The application follows a clean architecture pattern:

- **Frontend**: React components with TypeScript
- **Backend**: RESTful API with Express.js
- **Database**: MongoDB with Mongoose schemas
- **Authentication**: OAuth with Passport.js

## API Endpoints

### Authentication
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/github` - Initiate GitHub OAuth
- `GET /auth/github/callback` - GitHub OAuth callback
- `POST /auth/logout` - Logout user

### Wallet Management
- `GET /api/wallets` - Get user wallets (without private keys)
- `GET /api/wallets/private` - Get user wallets with private keys
- `PUT /api/wallets` - Update wallet information
- `PUT /api/network-settings` - Update network settings
- `GET /api/profile` - Get user profile

## Security Considerations

- Private keys are encrypted before storage
- JWT tokens are used for stateless authentication
- OAuth provides secure third-party authentication
- All sensitive operations require authentication
- Network requests are validated and sanitized

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
