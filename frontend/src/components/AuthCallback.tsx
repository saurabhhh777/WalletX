import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      try {
        login(token);
        // Redirect to dashboard after successful login
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } catch (err) {
        setError('Authentication failed. Please try again.');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } else {
      setError('No authentication token received.');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [searchParams, login, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 font-jost mb-2">
            Authentication Error
          </h2>
          <p className="text-gray-600 font-mulish mb-4">{error}</p>
          <p className="text-sm text-gray-500 font-mulish">
            Redirecting to home page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <Loader2 className="w-16 h-16 mx-auto text-blue-600 animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 font-jost mb-2">
          Signing you in...
        </h2>
        <p className="text-gray-600 font-mulish">
          Please wait while we complete your authentication.
        </p>
      </div>
    </div>
  );
}; 