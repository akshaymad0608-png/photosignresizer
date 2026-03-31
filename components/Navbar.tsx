import React, { useState } from 'react';
import { Camera, Sun, Moon, Languages, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isScrolled: boolean;
  activeTab: 'home' | 'faq' | 'blog';
  setActiveTab: (tab: 'home' | 'faq' | 'blog') => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const Navbar = ({ lang, setLang, isScrolled, activeTab, setActiveTab, darkMode, setDarkMode }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleTabClick = (tab: 'home' | 'faq' | 'blog') => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled || isMenuOpen 
        ? 'bg-white/70 dark:bg-gray-950/70 backdrop-blur-2xl shadow-xl shadow-gray-200/20 dark:shadow-none py-3 border-b border-gray-200/50 dark:border-gray-800/50' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleTabClick('home')}>
          <div className={`p-2.5 rounded-2xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 ${isScrolled || isMenuOpen ? 'bg-gradient-to-br from-brand to-accent text-white shadow-lg shadow-brand/20' : 'bg-white/10 backdrop-blur-md text-brand border border-white/20 shadow-xl shadow-brand/5'}`}>
            <Camera size={24} />
          </div>
          <span className={`font-black text-2xl tracking-tighter transition-colors ${isScrolled || isMenuOpen ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
            PHOTO<span className="text-brand">RESIZER</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
            <button 
              onClick={() => handleTabClick('home')}
              className={`px-5 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === 'home' 
                  ? 'bg-white dark:bg-gray-800 text-brand shadow-sm border border-gray-100 dark:border-gray-700' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-brand dark:hover:text-brand hover:bg-white/50 dark:hover:bg-gray-800/50'
              }`}
            >
              {TRANSLATIONS[lang].home}
            </button>
            <button 
              onClick={() => handleTabClick('blog')}
              className={`px-5 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === 'blog' 
                  ? 'bg-white dark:bg-gray-800 text-brand shadow-sm border border-gray-100 dark:border-gray-700' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-brand dark:hover:text-brand hover:bg-white/50 dark:hover:bg-gray-800/50'
              }`}
            >
              {TRANSLATIONS[lang].blog}
            </button>
            <button 
              onClick={() => handleTabClick('faq')}
              className={`px-5 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === 'faq' 
                  ? 'bg-white dark:bg-gray-800 text-brand shadow-sm border border-gray-100 dark:border-gray-700' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-brand dark:hover:text-brand hover:bg-white/50 dark:hover:bg-gray-800/50'
              }`}
            >
              {TRANSLATIONS[lang].faq}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="p-2.5 rounded-xl transition-all hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              title={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
            >
              <Languages size={20} />
            </button>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl transition-all hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={toggleMenu}
              className="md:hidden p-2.5 rounded-xl transition-all hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl border-t border-gray-100 dark:border-gray-800 animate-slide-down shadow-2xl">
          <div className="px-6 py-6 space-y-3">
            <button 
              onClick={() => handleTabClick('home')}
              className={`block w-full text-left px-6 py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all ${activeTab === 'home' ? 'bg-gradient-to-r from-brand to-accent text-white shadow-lg shadow-brand/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 border border-transparent hover:border-gray-100 dark:hover:border-gray-800'}`}
            >
              {TRANSLATIONS[lang].home}
            </button>
            <button 
              onClick={() => handleTabClick('blog')}
              className={`block w-full text-left px-6 py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all ${activeTab === 'blog' ? 'bg-gradient-to-r from-brand to-accent text-white shadow-lg shadow-brand/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 border border-transparent hover:border-gray-100 dark:hover:border-gray-800'}`}
            >
              {TRANSLATIONS[lang].blog}
            </button>
            <button 
              onClick={() => handleTabClick('faq')}
              className={`block w-full text-left px-6 py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all ${activeTab === 'faq' ? 'bg-gradient-to-r from-brand to-accent text-white shadow-lg shadow-brand/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 border border-transparent hover:border-gray-100 dark:hover:border-gray-800'}`}
            >
              {TRANSLATIONS[lang].faq}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
