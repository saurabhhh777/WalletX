import React from "react";
import { ArrowLeft, Github } from "lucide-react";
import { API_ENDPOINTS } from "../config/api";

interface SignInProps {
  onBack: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ onBack }) => {
  const handleGoogleLogin = () => {
    window.location.href = API_ENDPOINTS.GOOGLE_AUTH;
  };

  const handleGitHubLogin = () => {
    window.location.href = API_ENDPOINTS.GITHUB_AUTH;
  };

  return (
    <div className="min-h-screen bg-white font-poppins">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <img src="/favicon-32x32.png" alt="WalletX" className="w-8 h-8 rounded" />
              <h1 className="text-2xl font-bold text-black">WalletX</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black font-jost mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 font-mulish">
                Sign in with your social account to access your wallets
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors font-medium font-poppins"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                onClick={handleGitHubLogin}
                className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 flex items-center justify-center space-x-3 hover:bg-gray-800 transition-colors font-medium font-poppins"
              >
                <Github className="w-5 h-5" />
                <span>Continue with GitHub</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm font-mulish text-gray-600">
                By signing in, you agree to our{" "}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
