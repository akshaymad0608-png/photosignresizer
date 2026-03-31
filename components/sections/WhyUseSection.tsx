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
    <div className="bg-white dark:bg-gray-900/50 rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 mb-24 relative overflow-hidden group/section">
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand/5 dark:bg-cyan-500/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/section:opacity-100"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 dark:bg-brand/5 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/section:opacity-100"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 text-center tracking-tight leading-tight">{t.whyUse}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-20 text-xl leading-relaxed font-medium max-w-3xl mx-auto">
          {t.whyUseText}
        </p>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 text-green-600 dark:text-green-400 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-green-500/10 border-4 border-white dark:border-gray-900 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative">
              <div className="absolute inset-0 bg-green-500/10 dark:bg-green-400/10 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <ShieldCheck size={32} className="relative z-10" />
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">100% Secure</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed px-2">Client-side processing means your photos never leave your browser.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 text-brand dark:text-cyan-400 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-brand/10 border-4 border-white dark:border-gray-900 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 relative">
              <div className="absolute inset-0 bg-brand/10 dark:bg-cyan-400/10 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <Zap size={32} className="relative z-10" />
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-brand dark:group-hover:text-cyan-400 transition-colors">Fastest Resizer</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed px-2">Instant compression and cropping without server latency.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 text-purple-600 dark:text-purple-400 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-purple-500/10 border-4 border-white dark:border-gray-900 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative">
              <div className="absolute inset-0 bg-purple-500/10 dark:bg-purple-400/10 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <Smartphone size={32} className="relative z-10" />
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Mobile Ready</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed px-2">Works perfectly on Android and iPhone devices.</p>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-12 tracking-tight uppercase tracking-[0.2em] text-center">{t.features}</h3>
          <ul className="grid md:grid-cols-2 gap-6">
            {SEO_CONTENT.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 hover:bg-white dark:hover:bg-gray-800 group">
                <div className="p-2 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-900/20 rounded-xl shrink-0 border border-green-200/50 dark:border-green-800/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Check size={18} className="text-green-600 dark:text-green-400" />
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
