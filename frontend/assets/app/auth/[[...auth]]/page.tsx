'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs';

function SimpleSpinner() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm text-white">Loading...</span>
    </div>
  );
}

export default function InstagramLogin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-sm h-64 flex items-center justify-center flex-col">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl text-white font-black tracking-wide">
            Clipfinity
          </h1>
        </div>

        <ClerkLoading>
          <SimpleSpinner />
        </ClerkLoading>
        <ClerkLoaded>
          <SignIn />
        </ClerkLoaded>
      </div>
    </div>
  );
}
