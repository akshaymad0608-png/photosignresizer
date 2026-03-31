import React from 'react';
import { Language } from '../../types';
import { TRANSLATIONS, FAQ_DATA } from '../../constants';

const FAQSection = ({ lang }: { lang: Language }) => (
  <div className="max-w-4xl mx-auto py-12 px-6 animate-fade-in relative">
    <div className="absolute top-1/2 left-1/2 w-full h-full bg-brand/5 dark:bg-cyan-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    <div className="text-center mb-16 relative z-10">
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
        {TRANSLATIONS[lang].faq}
      </h2>
      <div className="w-24 h-1.5 bg-gradient-to-r from-brand to-accent dark:from-cyan-400 dark:to-blue-500 mx-auto rounded-full"></div>
    </div>
    <div className="space-y-6 relative z-10">
      {FAQ_DATA.map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-900/50 p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10 dark:hover:shadow-cyan-500/10 transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent dark:from-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-brand dark:group-hover:text-cyan-400 transition-colors relative z-10">{item.q}</h3>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium relative z-10">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FAQSection;
