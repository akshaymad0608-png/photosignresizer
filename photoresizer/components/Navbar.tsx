import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

type Tab = 'home' | 'faq' | 'blog' | 'tools' | 'jobs' | 'links';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  isScrolled: boolean;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const Navbar = ({ lang, setLang, isScrolled, activeTab, setActiveTab, darkMode, setDarkMode }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const go = (tab: Tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  const tabs = [
    { id: 'home', label: t.photoResizer },
    { id: 'jobs', label: t.latestJobs },
    { id: 'links', label: t.examLinks },
    { id: 'blog', label: t.blog },
    { id: 'faq', label: t.faq },
    { id: 'tools', label: t.freeTools },
  ] as const;

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
 isScrolled
 ? 'bg-paper/92 backdrop-blur-md border-b border-rule py-2'
 : 'bg-transparent py-3 border-b border-transparent'
 }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <button onClick={() => go('home')} className="shrink-0" aria-label="PhotoResizer home">
            <Logo />
          </button>

          <div className="hidden lg:flex items-center gap-0.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => go(tab.id)}
                data-active={activeTab === tab.id}
                className={`tab-underline px-3 py-2 text-[14px] font-medium rounded-md transition-colors ${
 activeTab === tab.id ? 'text-ink' : 'text-muted hover:text-ink'
 }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Hindi is the working language of most of these forms. Make it one tap. */}
            <div className="flex items-center rounded-lg border border-rule overflow-hidden">
              {(['en', 'hi'] as const).map(code => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`px-2.5 py-1.5 text-[11px] font-mono font-semibold uppercase transition-colors ${
 lang === code ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
 }`}
                >
                  {code === 'en' ? 'EN' : 'हिं'}
                </button>
              ))}
            </div>

            <div id="google_translate_element" className="hidden xl:flex items-center" />

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-muted hover:text-ink hover:bg-card-sunk transition-colors"
              aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-muted hover:text-ink hover:bg-card-sunk transition-colors"
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-paper pt-20 px-4 pb-8 overflow-y-auto animate-fade-in">
          <div className="label-field mb-3">Sections</div>
          <div className="flex flex-col">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => go(tab.id)}
                className={`flex items-baseline gap-4 py-4 text-left border-b border-rule transition-colors ${
 activeTab === tab.id ? 'text-signal' : 'text-ink'
 }`}
              >
                <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-2xl font-bold">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
