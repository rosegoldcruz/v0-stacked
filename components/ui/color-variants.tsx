'use client'

import React from 'react'

export const PrimaryCTA = () => (
  <button
    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
  >
    Start Creating Free
  </button>
);

export const SecondaryCTA = () => (
  <button
    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300"
  >
    Book a Demo
  </button>
);

export const GradientHeadline = ({ children }: { children: React.ReactNode }) => (
  <h1
    className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mb-6"
  >
    {children}
  </h1>
);

export const FeatureHighlight = ({ children }: { children: React.ReactNode }) => (
  <div
    className="border-l-4 border-purple-600 pl-4 py-2 mb-4 bg-purple-900/20 text-purple-200 font-medium shadow-sm rounded-r-lg"
  >
    {children}
  </div>
);

export const GoButton = () => (
  <button
    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300"
  >
    Upgrade Now
  </button>
);

export const PremiumPlanCard = () => (
  <div className="bg-gradient-to-br from-black via-gray-900 to-purple-900 border-2 border-purple-600 rounded-2xl shadow-2xl p-8 text-white max-w-sm mx-auto mt-10">
    <h3 className="text-3xl font-bold mb-4">Ultimate Plan</h3>
    <p className="mb-6 text-lg text-purple-200">All features unlocked. Priority support. Custom branding.</p>
    <GoButton />
  </div>
);
