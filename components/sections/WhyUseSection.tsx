import React from 'react';
import { ShieldCheck, Zap, Smartphone, Check } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS, SEO_CONTENT } from '../../constants';

interface WhyUseSectionProps {
  lang: Language;
}

const WhyUseSection = ({ lang }: WhyUseSectionProps) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="bg-white dark:bg-gray-900/50 rounded-3xl md:rounded-[3rem] p-6 sm:p-12 md:p-20 shadow-sm border border-gray-100 dark:border-gray-800 mb-16 sm:mb-24 relative overflow-hidden group/section">
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand/5 dark:bg-accent/5 100px] rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/section:opacity-100"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 dark:bg-brand/5 100px] rounded-full translate-x-1/2 translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/section:opacity-100"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 sm:mb-8 text-center tracking-tight leading-tight">{t.whyUse}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 sm:mb-20 text-lg sm:text-xl leading-relaxed font-medium max-w-3xl mx-auto">
          {t.whyUseText}
        </p>
        
        <div className="grid md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 text-brand dark:text-brand rounded-[1.5rem] flex items-center justify-center mb-4 shadow-sm border-4 border-white dark:border-gray-900 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative">
              <div className="absolute inset-0 bg-brand/10 dark:bg-brand/10 rounded-[1.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <ShieldCheck size={28} className="relative z-10" />
            </div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-brand dark:group-hover:text-brand transition-colors">100% Free</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed px-2">No charges, absolutely free tools forever.</p>
          </div>
          
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 text-accent dark:text-accent rounded-[1.5rem] flex items-center justify-center mb-4 shadow-sm border-4 border-white dark:border-gray-900 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 relative">
              <div className="absolute inset-0 bg-accent/10 dark:bg-accent/10 rounded-[1.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <ShieldCheck size={28} className="relative z-10" />
            </div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-accent dark:group-hover:text-accent transition-colors">100% Secure</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed px-2">Your data stays safe, processed locally.</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 text-brand dark:text-brand rounded-[1.5rem] flex items-center justify-center mb-4 shadow-sm border-4 border-white dark:border-gray-900 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 relative">
              <div className="absolute inset-0 bg-brand/10 dark:bg-brand/10 rounded-[1.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Zap size={28} className="relative z-10" />
            </div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-brand dark:group-hover:text-brand transition-colors">Super Fast</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed px-2">Get results in seconds, no waiting time.</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 text-accent dark:text-accent rounded-[1.5rem] flex items-center justify-center mb-4 shadow-sm border-4 border-white dark:border-gray-900 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative">
              <div className="absolute inset-0 bg-accent/10 dark:bg-accent/10 rounded-[1.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Smartphone size={28} className="relative z-10" />
            </div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-accent dark:group-hover:text-accent transition-colors">Mobile & Desktop</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed px-2">Easy to use across all your devices.</p>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-12 tracking-tight uppercase tracking-[0.2em] text-center">{t.features}</h3>
          <ul className="grid md:grid-cols-2 gap-6">
            {SEO_CONTENT.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-sm hover:shadow-sm hover:-translate-y-1 hover:bg-white dark:hover:bg-gray-800 group">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl shrink-0 border border-brand/20 dark:border-brand/20 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Check size={18} className="text-brand dark:text-brand" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-bold text-sm leading-relaxed pt-1 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhyUseSection;
