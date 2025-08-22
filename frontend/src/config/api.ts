// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5000',
  },
  production: {
    baseURL: import.meta.env.VITE_API_URL || 'https://your-backend-domain.com', // You'll need to set this
  },
};

// Get current environment
const isDevelopment = import.meta.env.DEV;
const config = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

export const API_BASE_URL = config.baseURL;

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  PROFILE: `${API_BASE_URL}/api/profile`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  GOOGLE_AUTH: `${API_BASE_URL}/auth/google`,
  GITHUB_AUTH: `${API_BASE_URL}/auth/github`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  
  // Wallet endpoints
  WALLETS_PRIVATE: `${API_BASE_URL}/api/wallets/private`,
  WALLETS_BALANCE: `${API_BASE_URL}/api/wallets/balance`,
  WALLETS_TRANSACTION: `${API_BASE_URL}/api/wallets/transaction`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/health`,
};

// Helper function to make authenticated API calls
export const apiCall = async (
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<Response> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(endpoint, {
    ...options,
    headers,
  });
}; 