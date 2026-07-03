import React from 'react';
import { Language } from '../../types';
import { TRANSLATIONS, FAQ_DATA } from '../../constants';

const FAQSection = ({ lang }: { lang: Language }) => (
  <div className="max-w-4xl mx-auto py-12 px-6 animate-fade-in relative">
    <div className="text-center mb-12 relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
        {TRANSLATIONS[lang].faq}
      </h2>
    </div>
    <div className="space-y-4 relative z-10">
      {FAQ_DATA.map((item, idx) => (
        <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.q}</h3>
          <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FAQSection;
