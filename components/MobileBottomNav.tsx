import React from 'react';
import { Home, Briefcase, Link as LinkIcon, BookOpen, Wrench } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface MobileBottomNavProps {
  lang: Language;
  activeTab: string;
  setActiveTab: (tab: 'home' | 'faq' | 'blog' | 'tools' | 'jobs' | 'links') => void;
}

const MobileBottomNav = ({ lang, activeTab, setActiveTab }: MobileBottomNavProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: TRANSLATIONS[lang].photoResizer.split(' ')[0] },
    { id: 'tools', icon: Wrench, label: TRANSLATIONS[lang].freeTools.split(' ')[0] },
    { id: 'jobs', icon: Briefcase, label: TRANSLATIONS[lang].latestJobs.split(' ')[0] },
    { id: 'links', icon: LinkIcon, label: TRANSLATIONS[lang].examLinks.split(' ')[0] },
    { id: 'blog', icon: BookOpen, label: TRANSLATIONS[lang].blog },
  ] as const;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-950/95 backdrop- border-t border-gray-200 dark:border-gray-800 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center justify-center w-full p-2 space-y-1 rounded-xl transition-all ${ isActive ? 'text-brand' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100' }`}
            >
              <div className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-brand/10' : 'bg-transparent'}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-semibold tracking-wide ${isActive ? 'font-bold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
