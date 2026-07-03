import React, { useState } from 'react';
import { Camera, Sun, Moon, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  lang: Language;
  isScrolled: boolean;
  activeTab: 'home' | 'faq' | 'blog' | 'tools' | 'jobs' | 'links';
  setActiveTab: (tab: 'home' | 'faq' | 'blog' | 'tools' | 'jobs' | 'links') => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const Navbar = ({ lang, isScrolled, activeTab, setActiveTab, darkMode, setDarkMode }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleTabClick = (tab: 'home' | 'faq' | 'blog' | 'tools' | 'jobs' | 'links') => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMenuOpen 
        ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm py-3 border-b border-gray-200 dark:border-gray-800' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleTabClick('home')}>
          <div className="p-2 rounded-lg bg-brand text-white">
            <Camera className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            PHOTO<span className="text-brand">RESIZER</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-1">
            <button 
              onClick={() => handleTabClick('home')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'home' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-brand dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-brand dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              {TRANSLATIONS[lang].photoResizer}
            </button>
            <button 
              onClick={() => handleTabClick('jobs')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'jobs' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-brand dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-brand dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              {TRANSLATIONS[lang].latestJobs}
            </button>
            <button 
              onClick={() => handleTabClick('links')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'links' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-brand dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-brand dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              {TRANSLATIONS[lang].examLinks}
            </button>
            <button 
              onClick={() => handleTabClick('blog')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'blog' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-brand dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-brand dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              {TRANSLATIONS[lang].blog}
            </button>
            <button 
              onClick={() => handleTabClick('faq')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'faq' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-brand dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-brand dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              {TRANSLATIONS[lang].faq}
            </button>
            <button 
              onClick={() => handleTabClick('tools')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'tools' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-brand dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-brand dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              {TRANSLATIONS[lang].freeTools}
            </button>
          </div>

          <div className="flex items-center gap-1">
            <div id="google_translate_element" className="flex items-center"></div>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={toggleMenu}
              className="md:hidden p-2.5 rounded-xl transition-all hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              aria-label="Toggle Mobile Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            <button 
              onClick={() => handleTabClick('home')}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors ${activeTab === 'home' ? 'bg-brand/10 text-brand' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'}`}
            >
              {TRANSLATIONS[lang].photoResizer}
            </button>
            <button 
              onClick={() => handleTabClick('jobs')}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors ${activeTab === 'jobs' ? 'bg-brand/10 text-brand' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'}`}
            >
              {TRANSLATIONS[lang].latestJobs}
            </button>
            <button 
              onClick={() => handleTabClick('links')}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors ${activeTab === 'links' ? 'bg-brand/10 text-brand' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'}`}
            >
              {TRANSLATIONS[lang].examLinks}
            </button>
            <button 
              onClick={() => handleTabClick('blog')}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors ${activeTab === 'blog' ? 'bg-brand/10 text-brand' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'}`}
            >
              {TRANSLATIONS[lang].blog}
            </button>
            <button 
              onClick={() => handleTabClick('faq')}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors ${activeTab === 'faq' ? 'bg-brand/10 text-brand' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'}`}
            >
              {TRANSLATIONS[lang].faq}
            </button>
            <button 
              onClick={() => handleTabClick('tools')}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors ${activeTab === 'tools' ? 'bg-brand/10 text-brand' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'}`}
            >
              {TRANSLATIONS[lang].freeTools}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
