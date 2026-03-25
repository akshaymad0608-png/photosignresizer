import React from 'react';
import { Language } from '../../types';
import { TRANSLATIONS, FAQ_DATA } from '../../constants';

const FAQSection = ({ lang }: { lang: Language }) => (
  <div className="max-w-3xl mx-auto py-8 px-4 animate-fade-in">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
      {TRANSLATIONS[lang].faq}
    </h2>
    <div className="space-y-4">
      {FAQ_DATA.map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-brand dark:text-blue-400 mb-2">{item.q}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FAQSection;
