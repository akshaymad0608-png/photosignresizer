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
  const t = TRANSLATIONS[lang];
  const tabs = [
    { id: 'home', icon: Home, label: t.navResize },
    { id: 'tools', icon: Wrench, label: t.navTools },
    { id: 'jobs', icon: Briefcase, label: t.navJobs },
    { id: 'links', icon: LinkIcon, label: t.navLinks },
    { id: 'blog', icon: BookOpen, label: t.navGuide },
  ] as const;

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-card/95 backdrop-blur-md border-t border-rule z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-stretch">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col items-center gap-1 flex-1 py-2.5 transition-colors ${
 isActive ? 'text-signal' : 'text-muted'
 }`}
            >
              {isActive && <span className="absolute top-0 inset-x-5 h-0.5 bg-signal" />}
              <Icon size={19} strokeWidth={isActive ? 2.4 : 1.8} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
