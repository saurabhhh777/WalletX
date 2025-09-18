import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/favicon-32x32.png" alt="WalletX" className="w-8 h-8 rounded" />
              <h3 className="text-xl font-bold font-jost">WalletX</h3>
            </div>
            <p className="text-gray-300 mb-4 font-mulish">
              A modern, secure cryptocurrency wallet supporting Ethereum and Solana networks. 
              Manage your digital assets with confidence and ease.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:support@walletx.com" className="text-gray-300 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-jost">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-white transition-colors font-mulish"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-white transition-colors font-mulish"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-300 hover:text-white transition-colors font-mulish"
                >
                  Cookies Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-jost">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-gray-300 hover:text-white transition-colors font-mulish"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors font-mulish"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/security"
                  className="text-gray-300 hover:text-white transition-colors font-mulish"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-gray-300 hover:text-white transition-colors font-mulish"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-mulish">
              © {new Date().getFullYear()} WalletX. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm font-mulish">
                Version 1.5.0
              </span>
              <span className="text-gray-400 text-sm font-mulish">
                Made with ❤️ for the crypto community
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 