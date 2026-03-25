import React from 'react';
import { Language } from '../../types';
import { TRANSLATIONS, SEO_CONTENT } from '../../constants';

const BlogSection = ({ lang }: { lang: Language }) => (
  <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
      {TRANSLATIONS[lang].blog}
    </h2>
    <div className="space-y-12">
      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-brand dark:text-blue-400 mb-4">{SEO_CONTENT.intro.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{SEO_CONTENT.intro.text}</p>
      </div>

      <div className="grid gap-8">
        {SEO_CONTENT.exams.map((exam, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{exam.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{exam.content}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default BlogSection;
