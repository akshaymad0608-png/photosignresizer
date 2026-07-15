import React from 'react';
import { Camera, Layers, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlatformNavbar() {
  return (
    <nav className="border-b border-gray-200/50 dark:border-gray-800/50 bg-white/90 dark:bg-gray-950/90 backdrop- z-50 py-2 sm:py-3 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="p-2 rounded-xl transition-all duration-500 bg-brand text-white shadow-sm">
            <Camera className="w-5 h-5" />
          </div>
          <span className="font-black text-lg sm:text-2xl tracking-tighter text-gray-900 dark:text-white">
            PHOTO<span className="text-brand">RESIZER</span>
          </span>
        </Link>
        <div className="flex gap-2 sm:gap-4">
           <Link to="/admin" className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 font-bold text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors">
              <LayoutDashboard size={16} /> <span className="hidden sm:inline">Admin</span>
           </Link>
           <Link to="/all-tools" className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 font-bold text-xs sm:text-sm bg-brand/10 hover:bg-brand/20 text-brand rounded-xl transition-colors">
              <Layers size={16} /> <span className="hidden sm:inline">Tools</span>
           </Link>
        </div>
      </div>
    </nav>
  );
}
