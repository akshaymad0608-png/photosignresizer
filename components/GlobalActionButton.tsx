import React from 'react';
import { Zap } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface GlobalActionButtonProps {
  lang: Language;
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

const GlobalActionButton = ({ lang, onClick, disabled, loading }: GlobalActionButtonProps) => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-xs px-4 animate-bounce-subtle">
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-5 px-8 bg-gradient-to-r from-brand to-blue-600 text-white font-extrabold rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
        loading ? 'animate-pulse' : ''
      }`}
    >
      <div className="p-1.5 bg-white/20 rounded-lg group-hover:rotate-12 transition-transform">
        <Zap size={24} fill="white" />
      </div>
      <span className="text-lg uppercase tracking-wider">{TRANSLATIONS[lang].compress}</span>
    </button>
  </div>
);

export default GlobalActionButton;
