import React from 'react';

export const LogoIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="lensGrad" x1="30" y1="30" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00d2ff" />
        <stop offset="50%" stopColor="#3a7bd5" />
        <stop offset="100%" stopColor="#8a2be2" />
      </linearGradient>
      <linearGradient id="glassReflect" x1="40" y1="40" x2="60" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    
    {/* Black Frame pieces */}
    {/* Top-left horizontal bar */}
    <rect x="10" y="25" width="25" height="10" fill="#111827" className="dark:fill-white" />
    {/* Top-left vertical bar extending down */}
    <rect x="25" y="10" width="10" height="25" fill="#111827" className="dark:fill-white" />
    
    {/* Main Bottom-Left L-shape */}
    <path d="M 20 40 L 20 100 L 80 100 L 80 90 L 30 90 L 30 40 Z" fill="#111827" className="dark:fill-white" />
    
    {/* Red Frame pieces */}
    {/* Main Top-Right L-shape */}
    <path d="M 40 20 L 100 20 L 100 70 L 90 70 L 90 30 L 40 30 Z" fill="#ef4444" />
    {/* Bottom-right red square */}
    <rect x="85" y="90" width="20" height="10" fill="#ef4444" />
    
    {/* Red Pixelation / Shattering at Top-Right */}
    <rect x="95" y="5" width="8" height="8" fill="#ef4444" />
    <rect x="110" y="0" width="6" height="6" fill="#ef4444" />
    <rect x="105" y="12" width="7" height="7" fill="#ef4444" />
    <rect x="112" y="22" width="5" height="5" fill="#ef4444" />
    <rect x="102" y="25" width="4" height="4" fill="#ef4444" />
    <rect x="95" y="18" width="6" height="6" fill="#ef4444" />
    <rect x="82" y="8" width="5" height="5" fill="#ef4444" />
    
    {/* Camera Lens Base */}
    <circle cx="60" cy="60" r="32" fill="#1f2937" />
    <circle cx="60" cy="60" r="28" fill="#374151" />
    <circle cx="60" cy="60" r="26" fill="#111827" />
    
    {/* Lens Inner Gradient */}
    <circle cx="60" cy="60" r="22" fill="url(#lensGrad)" />
    
    {/* Lens Reflection */}
    <path d="M 42 48 A 15 15 0 0 1 65 42 A 20 20 0 0 0 42 65 Z" fill="url(#glassReflect)" />
    
    {/* Pupil and Glint */}
    <circle cx="60" cy="60" r="8" fill="#000000" />
    <circle cx="63" cy="57" r="3" fill="#ffffff" />
  </svg>
);

export const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <LogoIcon className="w-12 h-12 flex-shrink-0" />
    <div className="flex flex-col pt-1">
      <span className="font-black text-2xl tracking-tight leading-none text-gray-900 dark:text-white">
        PHOTO<span className="text-brand">RESIZER</span>
      </span>
      <div className="flex items-center gap-2 mt-1 w-full opacity-80">
        <div className="h-[1px] flex-grow bg-gray-400 dark:bg-gray-600"></div>
        <span className="text-xs font-bold tracking-widest text-gray-800 dark:text-gray-300 leading-none pb-[1px]">.click</span>
        <div className="h-[1px] flex-grow bg-gray-400 dark:bg-gray-600"></div>
      </div>
    </div>
  </div>
);

export default Logo;
