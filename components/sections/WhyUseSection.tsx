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
    <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 mb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 text-center tracking-tight leading-tight">{t.whyUse}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-16 text-xl leading-relaxed font-medium">
          {t.whyUseText}
        </p>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">100% Secure</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Client-side processing means your photos never leave your browser.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Fastest Resizer</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Instant compression and cropping without server latency.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Smartphone size={32} />
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Mobile Ready</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Works perfectly on Android and iPhone devices.</p>
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-10 tracking-tight uppercase tracking-widest text-center">{t.features}</h3>
          <ul className="grid md:grid-cols-2 gap-6">
            {SEO_CONTENT.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md">
                <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-lg shrink-0">
                  <Check size={18} className="text-green-600 dark:text-green-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-bold text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhyUseSection;
