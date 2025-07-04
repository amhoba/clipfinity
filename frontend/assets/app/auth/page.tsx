'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import { SignIn } from '@clerk/nextjs'

export default function InstagramLogin() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Main sign-in card */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-4">
          {/* Instagram-style logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-light text-gray-800 tracking-wide">
              Clipfinity
            </h1>
          </div>

          <SignIn />
        </div>

      </div>
    </div>
  );
}