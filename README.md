# WalletX - Multi-Chain Web3 Wallet

A modern, web-based cryptocurrency wallet supporting both Ethereum and Solana networks. Built with React, TypeScript, and Vite for a fast and responsive user experience.

## Features

### 🚀 Core Functionality
- **Multi-Chain Support**: Manage both Ethereum and Solana wallets in one interface
- **Wallet Creation**: Generate new wallets with secure keypairs
- **Wallet Import**: Import existing wallets using private keys
- **Transaction Sending**: Send transactions on both networks
- **Balance Tracking**: Real-time balance updates
- **Secure Storage**: Local storage with encrypted private keys

### 🔐 Security Features
- Private key visibility toggle
- Secure clipboard operations
- Wallet export functionality
- Input validation and error handling

### 🎨 User Experience
- Modern, responsive UI built with Tailwind CSS
- Intuitive tab-based navigation
- Real-time status updates
- Loading states and error handling
- Copy-to-clipboard functionality

### 🌐 Network Features

#### Ethereum
- Create new Ethereum wallets
- Import existing wallets
- Send ETH transactions
- View transaction history (placeholder)
- Balance tracking

#### Solana
- Create new Solana wallets
- Import existing wallets
- Send SOL transactions
- Request testnet airdrops
- Balance tracking

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Ethereum**: ethers.js v6
- **Solana**: @solana/web3.js
- **Icons**: Lucide React
- **State Management**: React Context API

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

The built files will be in the `dist` directory.

## Usage

### Creating a New Wallet

1. Navigate to either the Ethereum or Solana tab
2. Click "Create New Wallet"
3. Your new wallet will be generated with a fresh address and private key
4. **Important**: Save your private key securely - it cannot be recovered if lost

### Importing an Existing Wallet

1. Navigate to either the Ethereum or Solana tab
2. Enter your private key in the import section
3. Click "Import Wallet"
4. Your wallet will be loaded and you can view your balance

### Sending Transactions

1. Ensure you have a wallet loaded
2. Navigate to the "Send Transaction" section
3. Enter the recipient's address
4. Enter the amount to send
5. Click "Send Transaction"
6. Wait for confirmation

### Solana Airdrop (Testnet)

1. Load a Solana wallet
2. Navigate to the "Request Airdrop" section
3. Enter the amount (max 2 SOL)
4. Click "Request Airdrop"
5. Wait for confirmation

## Security Considerations

⚠️ **Important Security Notes**:

- This is a **client-side wallet** - private keys are stored in your browser's localStorage
- **Never** use this wallet for large amounts of cryptocurrency
- **Always** test with small amounts first
- **Backup** your private keys securely
- **Never** share your private keys with anyone
- Consider using hardware wallets for significant amounts

## Network Configuration

### Ethereum
- **Mainnet**: Uses Alchemy demo endpoint (for testing)
- **Testnet**: Can be configured for Goerli/Sepolia

### Solana
- **Mainnet**: Uses Solana mainnet RPC
- **Testnet**: Airdrop functionality works on devnet

## Development

### Project Structure
```
src/
├── components/          # React components
│   ├── WalletDashboard.tsx
│   ├── EthereumTab.tsx
│   └── SolanaTab.tsx
├── contexts/           # React contexts
│   └── WalletContext.tsx
├── services/          # Wallet services
│   ├── ethereumWallet.ts
│   └── solanaWallet.ts
└── App.tsx           # Main app component
```

### Adding New Features

1. **New Networks**: Extend the wallet services and add new tabs
2. **Token Support**: Integrate token standards (ERC-20, SPL)
3. **DApp Integration**: Add wallet connection functionality
4. **Hardware Wallet Support**: Integrate with Ledger/Trezor

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This software is provided "as is" without warranty. Use at your own risk. The developers are not responsible for any loss of funds or other damages that may occur from using this wallet.

## Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review security best practices

---

**Remember**: Always test with small amounts and never share your private keys!
