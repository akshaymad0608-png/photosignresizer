import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Logo from './Logo';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: 'home' | 'faq' | 'blog' | 'tools' | 'jobs' | 'links') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const tabs = [
    { id: 'home', label: TRANSLATIONS[lang].photoResizer },
    { id: 'jobs', label: TRANSLATIONS[lang].latestJobs },
    { id: 'links', label: TRANSLATIONS[lang].examLinks },
    { id: 'blog', label: TRANSLATIONS[lang].blog },
    { id: 'faq', label: TRANSLATIONS[lang].faq },
    { id: 'tools', label: TRANSLATIONS[lang].freeTools },
  ] as const;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${ isScrolled ? 'bg-white/95 dark:bg-gray-950/95 backdrop- shadow-sm py-3 border-b border-gray-200 dark:border-gray-800' : 'bg-transparent py-4' }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="cursor-pointer group hover:opacity-90 transition-opacity" onClick={() => handleTabClick('home')}>
            <Logo className="scale-75 sm:scale-90 origin-left" />
          </div>
          
          <div className="flex items-center gap-2 md:gap-8">
            <div className="hidden md:flex items-center gap-1">
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${ activeTab === tab.id ? 'bg-gray-100 dark:bg-gray-800 text-brand dark:text-accent' : 'text-gray-600 dark:text-gray-300 hover:text-brand dark:hover:text-accent hover:bg-gray-50 dark:hover:bg-gray-800/50' }`}
                >
                  {tab.label}
                </button>
              ))}
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
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white dark:bg-gray-950 pt-20 px-4 pb-4 overflow-y-auto">
          <div className="flex flex-col gap-2 mt-4">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`p-4 rounded-xl text-left font-bold text-lg transition-colors ${ activeTab === tab.id ? 'bg-brand/10 text-brand dark:bg-brand/20' : 'bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300' }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
