'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Camera } from 'lucide-react';

export default function InstagramLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    alert('Login successful! (This is just a demo)');
  };

  const isFormValid = email.length > 0 && password.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Main login card */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-4">
          {/* Instagram-style logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-light text-gray-800 tracking-wide">
              Photogram
            </h1>
          </div>

          {/* Login form */}
          <div className="space-y-4">
            {/* Email input */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Login button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className={`w-full py-3 rounded-md font-semibold text-white text-sm transition-all duration-200 ${
                isFormValid && !isLoading
                  ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-blue-300 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging in...
                </div>
              ) : (
                'Log In'
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Social login */}
            <button
              type="button"
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>

            {/* Forgot password */}
            <div className="text-center mt-4">
              <a href="#" className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>
        </div>

        {/* Sign up card */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold transition-colors">
              Sign up
            </a>
          </p>
        </div>

        {/* App download section */}
        <div className="text-center mt-6">
          <p className="text-white text-sm mb-4">Get the app.</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg px-4 py-2 text-white text-xs hover:bg-opacity-30 transition-all">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-black text-xs font-bold">📱</span>
                </div>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </div>
            </button>
            <button className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg px-4 py-2 text-white text-xs hover:bg-opacity-30 transition-all">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-black text-xs font-bold">🤖</span>
                </div>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}