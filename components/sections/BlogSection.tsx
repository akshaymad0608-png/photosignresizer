import React from 'react';
import { Language } from '../../types';
import { TRANSLATIONS, SEO_CONTENT } from '../../constants';

const BlogSection = ({ lang }: { lang: Language }) => (
  <div className="max-w-4xl mx-auto py-12 px-6 animate-fade-in relative">
    <div className="absolute top-1/2 left-1/2 w-full h-full bg-brand/5 dark:bg-cyan-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    <div className="text-center mb-16 relative z-10">
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
        {TRANSLATIONS[lang].blog}
      </h2>
      <div className="w-24 h-1.5 bg-gradient-to-r from-brand to-accent dark:from-cyan-400 dark:to-blue-500 mx-auto rounded-full"></div>
    </div>

    <div className="space-y-16 relative z-10">
      <div className="bg-white dark:bg-gray-900/50 rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 relative overflow-hidden group/intro">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 dark:bg-cyan-500/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/intro:opacity-100"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 dark:bg-brand/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/intro:opacity-100"></div>
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent dark:from-cyan-400 dark:to-blue-500 mb-6 tracking-tight">{SEO_CONTENT.intro.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-medium">{SEO_CONTENT.intro.text}</p>
        </div>
      </div>

      <div className="grid gap-8">
        {SEO_CONTENT.exams.map((exam, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-900/50 p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10 dark:hover:shadow-cyan-500/10 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent dark:from-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-brand dark:group-hover:text-cyan-400 transition-colors relative z-10">{exam.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium relative z-10">{exam.content}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default BlogSection;
