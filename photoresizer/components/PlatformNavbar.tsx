import React from 'react';
import { Camera, Layers, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlatformNavbar() {
  return (
    <nav className="border-b border-rule bg-card backdrop-blur-md z-50 py-2 sm:py-3 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="p-2 rounded-xl transition-all duration-500 bg-signal text-white shadow-sm">
            <Camera className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg sm:text-2xl tracking-tighter text-ink">
            PHOTO<span className="text-signal">RESIZER</span>
          </span>
        </Link>
        <div className="flex gap-2 sm:gap-4">
           <Link to="/admin" className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 font-bold text-xs sm:text-sm bg-card-sunk hover:bg-card-sunk text-ink-soft rounded-xl transition-colors">
              <LayoutDashboard size={16} /> <span className="hidden sm:inline">Admin</span>
           </Link>
           <Link to="/all-tools" className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 font-bold text-xs sm:text-sm bg-signal/10 hover:bg-signal/20 text-signal rounded-xl transition-colors">
              <Layers size={16} /> <span className="hidden sm:inline">Tools</span>
           </Link>
        </div>
      </div>
    </nav>
  );
}
