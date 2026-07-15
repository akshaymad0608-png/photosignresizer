import React from 'react';
import { Language } from '../../types';
import { TRANSLATIONS, SEO_CONTENT } from '../../constants';

const BlogSection = ({ lang }: { lang: Language }) => (
  <div className="max-w-4xl mx-auto py-12 px-6 animate-fade-in relative">
    <div className="text-center mb-12 relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
        {TRANSLATIONS[lang].blog}
      </h2>
    </div>

    <div className="space-y-8 relative z-10">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-brand dark:text-accent mb-6">{SEO_CONTENT.intro.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{SEO_CONTENT.intro.text}</p>
        </div>
      </div>

      <div className="grid gap-6">
        {SEO_CONTENT.exams.map((exam, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">{exam.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{exam.content}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default BlogSection;
