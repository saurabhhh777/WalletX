# WalletX - Multi-Chain Wallet Manager

A modern, user-friendly wallet management application supporting Ethereum and Solana networks with advanced features for sending, receiving, and managing cryptocurrency assets.

## Features

### 🚀 Core Functionality
- **Multi-Chain Support**: Manage both Ethereum and Solana wallets
- **Wallet Creation**: Generate new wallets with secure private keys
- **Wallet Import**: Import existing wallets using private keys
- **Secure Storage**: Local storage with encrypted private key handling

### 💸 Transaction Management
- **Send Transactions**: Transfer ETH and SOL to any address
- **Receive Payments**: QR code generation for easy payment reception
- **Transaction History**: View recent transaction details
- **Balance Tracking**: Real-time balance updates

### 🎨 User Experience
- **Toast Notifications**: Beautiful, non-intrusive notifications for all actions
- **QR Code Integration**: Generate QR codes for wallet addresses
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Loading States**: Visual feedback during operations
- **Error Handling**: Comprehensive error messages and recovery

### 🔧 Technical Features
- **TypeScript**: Full type safety and better development experience
- **React 19**: Latest React features and performance optimizations
- **Vite**: Fast development and build times
- **Ethers.js**: Ethereum blockchain integration
- **Solana Web3.js**: Solana blockchain integration
- **React Hot Toast**: Elegant toast notifications

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd WalletX
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Usage

### Creating a Wallet
1. Click on either "Ethereum" or "Solana" tab
2. Click "Create Wallet" button
3. Your new wallet will be generated with a secure private key
4. Save your private key securely - it provides full access to your wallet

### Importing a Wallet
1. Click on either "Ethereum" or "Solana" tab
2. Enter your private key in the import section
3. Click "Import Wallet"
4. Your wallet will be loaded and ready to use

### Sending Transactions
1. Ensure you have a wallet loaded
2. Enter the recipient's address
3. Enter the amount to send
4. Click "Send Transaction"
5. Wait for confirmation

### Receiving Payments
1. Click "Show QR Code" in the receive section
2. Share the QR code or wallet address with the sender
3. The QR code contains the wallet address for easy scanning

### Requesting Test Tokens (Solana)
1. Load a Solana wallet
2. Click "Request Airdrop" to get test SOL tokens
3. Wait for the airdrop to be processed

## Network Information

### Ethereum
- **Network**: Sepolia Testnet
- **RPC URL**: Infura Sepolia
- **Purpose**: Testing and development

### Solana
- **Network**: Devnet
- **RPC URL**: Solana Devnet
- **Purpose**: Testing and development

## Security Notes

⚠️ **Important Security Warnings**:
- Never share your private keys with anyone
- This application stores private keys locally in your browser
- Use only for testing and development purposes
- For production use, consider hardware wallets and secure key management

## Development

### Project Structure
```
src/
├── components/          # React components
│   ├── EthereumTab.tsx  # Ethereum wallet interface
│   ├── SolanaTab.tsx    # Solana wallet interface
│   ├── QRCodeModal.tsx  # QR code display modal
│   └── ...
├── contexts/            # React contexts
│   └── WalletContext.tsx # Wallet state management
├── services/            # Blockchain services
│   ├── ethereumWallet.ts # Ethereum wallet operations
│   └── solanaWallet.ts  # Solana wallet operations
└── ...
```

### Key Dependencies
- `react-hot-toast`: Toast notifications
- `react-qr-code`: QR code generation
- `ethers`: Ethereum blockchain interaction
- `@solana/web3.js`: Solana blockchain interaction
- `lucide-react`: Icon library
- `tailwindcss`: Styling framework

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This software is provided "as is" without warranty of any kind. Use at your own risk. This application is intended for educational and development purposes only.
