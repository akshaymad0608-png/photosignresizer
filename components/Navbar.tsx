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
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-gray-200/20 dark:shadow-none py-3 border-b border-gray-100/50 dark:border-gray-800/50' 
        : 'bg-brand dark:bg-blue-600 py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleTabClick('home')}>
          <div className={`p-2 rounded-2xl transition-all duration-300 group-hover:rotate-12 ${isScrolled || isMenuOpen ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'bg-white text-brand shadow-xl shadow-white/10'}`}>
            <Camera size={22} />
          </div>
          <span className={`font-black text-2xl tracking-tighter transition-colors ${isScrolled || isMenuOpen ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
            PHOTO<span className={isScrolled || isMenuOpen ? 'text-brand' : 'opacity-70'}>RESIZER</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-1">
            <button 
              onClick={() => handleTabClick('home')}
              className={`px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === 'home' 
                  ? (isScrolled ? 'bg-brand/10 text-brand' : 'bg-white/20 text-white') 
                  : (isScrolled ? 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-brand' : 'text-white/70 hover:bg-white/10 hover:text-white')
              }`}
            >
              {TRANSLATIONS[lang].home}
            </button>
            <button 
              onClick={() => handleTabClick('blog')}
              className={`px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === 'blog' 
                  ? (isScrolled ? 'bg-brand/10 text-brand' : 'bg-white/20 text-white') 
                  : (isScrolled ? 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-brand' : 'text-white/70 hover:bg-white/10 hover:text-white')
              }`}
            >
              {TRANSLATIONS[lang].blog}
            </button>
            <button 
              onClick={() => handleTabClick('faq')}
              className={`px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === 'faq' 
                  ? (isScrolled ? 'bg-brand/10 text-brand' : 'bg-white/20 text-white') 
                  : (isScrolled ? 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-brand' : 'text-white/70 hover:bg-white/10 hover:text-white')
              }`}
            >
              {TRANSLATIONS[lang].faq}
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className={`p-2.5 rounded-2xl transition-all ${isScrolled || isMenuOpen ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300' : 'hover:bg-white/10 text-white'}`}
              title={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
            >
              <Languages size={20} />
            </button>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-2xl transition-all ${isScrolled || isMenuOpen ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300' : 'hover:bg-white/10 text-white'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={toggleMenu}
              className={`md:hidden p-2.5 rounded-2xl transition-all ${isScrolled || isMenuOpen ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300' : 'hover:bg-white/10 text-white'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 animate-slide-down">
          <div className="px-6 py-8 space-y-4">
            <button 
              onClick={() => handleTabClick('home')}
              className={`block w-full text-left px-6 py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all ${activeTab === 'home' ? 'bg-brand text-white shadow-xl shadow-brand/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              {TRANSLATIONS[lang].home}
            </button>
            <button 
              onClick={() => handleTabClick('blog')}
              className={`block w-full text-left px-6 py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all ${activeTab === 'blog' ? 'bg-brand text-white shadow-xl shadow-brand/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              {TRANSLATIONS[lang].blog}
            </button>
            <button 
              onClick={() => handleTabClick('faq')}
              className={`block w-full text-left px-6 py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all ${activeTab === 'faq' ? 'bg-brand text-white shadow-xl shadow-brand/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
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
