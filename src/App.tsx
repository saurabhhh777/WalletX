import { WalletProvider } from './contexts/WalletContext';
import { WalletDashboard } from './components/WalletDashboard';

function App() {
  return (
    <WalletProvider>
      <WalletDashboard />
    </WalletProvider>
  );
}

export default App;
