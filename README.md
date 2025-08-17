# WalletX - Multi-Chain Cryptocurrency Wallet

A professional-grade multi-chain cryptocurrency wallet supporting Ethereum and Solana with OAuth authentication.

## 🏗️ Project Structure

```
WalletX/
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + TypeScript backend
└── README.md         # This file
```

## 🚀 Features

### Frontend
- **Multi-Chain Support**: Ethereum and Solana wallets
- **OAuth Authentication**: Google and GitHub login
- **Real-time Prices**: Live cryptocurrency price display
- **QR Code Generation**: Receive payments via QR codes
- **Network Management**: Switch between testnets and mainnets
- **Responsive Design**: Works on all devices
- **Modern UI**: Beautiful, intuitive interface

### Backend
- **OAuth Integration**: Google and GitHub authentication
- **JWT Authentication**: Secure token-based sessions
- **MongoDB Database**: Persistent user and wallet storage
- **RESTful API**: Clean, documented endpoints
- **TypeScript**: Full type safety
- **Security**: CORS protection, input validation

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Ethers.js** for Ethereum interactions
- **Solana Web3.js** for Solana interactions
- **React Hot Toast** for notifications
- **React QR Code** for QR generation

### Backend
- **Node.js** with TypeScript
- **Express.js** framework
- **MongoDB** with Mongoose
- **Passport.js** for OAuth
- **JWT** for authentication
- **CORS** for cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Google OAuth credentials
- GitHub OAuth credentials

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd WalletX
   ```

2. **Install dependencies**:
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**:
   ```bash
   # Backend
   cp backend/env.example backend/.env
   # Edit backend/.env with your credentials
   ```

4. **Start development servers**:
   ```bash
   npm run dev
   ```

This will start both frontend (http://localhost:5173) and backend (http://localhost:5000).

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
```

### Monorepo Commands
```bash
npm run dev          # Start both frontend and backend
npm run build        # Build both frontend and backend
npm run start        # Start both in production mode
npm run clean        # Clean all node_modules and dist folders
```

## 🔐 OAuth Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/auth/google/callback`

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Add callback URL: `http://localhost:5000/auth/github/callback`

## 📚 API Documentation

### Authentication Endpoints
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/github` - Initiate GitHub OAuth
- `GET /auth/github/callback` - GitHub OAuth callback
- `POST /auth/logout` - Logout user

### Protected Endpoints
- `GET /api/profile` - Get user profile
- `GET /api/wallets` - Get user wallets
- `PUT /api/wallets` - Update user wallets
- `PUT /api/network-settings` - Update network settings

## 🔒 Security Features

- **JWT Tokens**: 7-day expiration
- **CORS Protection**: Configured for frontend origin
- **Input Validation**: Request validation middleware
- **Secure Storage**: Encrypted private key storage
- **OAuth Security**: Industry-standard OAuth 2.0

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```bash
cd backend
npm run build
npm start
# Deploy to your server or cloud platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation in each folder
- Review the API endpoints

---

**WalletX** - Your secure multi-chain cryptocurrency wallet solution! 🚀
