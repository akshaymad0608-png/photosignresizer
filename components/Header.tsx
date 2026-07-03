import React from 'react';
import { ShieldCheck, Zap, Globe, Settings, Upload, Download, Star } from 'lucide-react';
import { Language, ExamRequirement } from '../types';
import { TRANSLATIONS, EXAM_PRESETS } from '../constants';
import StepCard from './StepCard';

interface HeaderProps {
  lang: Language;
  onSelectExam?: (exam: ExamRequirement) => void;
}

const Header = ({ lang, onSelectExam }: HeaderProps) => {
  const popularExams = EXAM_PRESETS.slice(0, 5);

  return (
    <header className="relative pt-8 sm:pt-12 pb-16 sm:pb-24 px-4 mb-8 sm:mb-12 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-brand/10 to-transparent dark:from-brand/5 dark:to-transparent rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12 animate-fade-in-up relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand/10 text-brand text-sm font-semibold border border-brand/20 backdrop-blur-sm">
            <Zap size={16} />
            <span className="uppercase text-[11px] tracking-widest">{lang === 'en' ? '100% Client-Side Processing' : '100% क्लाइंट-साइड प्रोसेसिंग'}</span>
          </div>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 backdrop-blur-sm">
            <Star size={16} />
            <span className="uppercase text-[11px] tracking-widest">{lang === 'en' ? 'Trusted by 10,000+ Students' : '10,000+ छात्रों द्वारा विश्वसनीय'}</span>
          </div>
        </div>
        
        <div className="space-y-6 sm:space-y-8">
          <h1 className="text-3xl min-[400px]:text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight break-words">
            {TRANSLATIONS[lang].title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent" : ""}>
                {word}{' '}
              </span>
            ))}
          </h1>
          
          <p className="text-base min-[400px]:text-lg sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            {TRANSLATIONS[lang].subtitle}
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl mt-8 sm:mt-12 mb-8 rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-800/50 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600" alt="Students studying" className="w-full h-auto object-cover aspect-[21/9]" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
        </div>

        {/* Popular Exams Quick Select */}
        <div className="flex flex-col items-center gap-5 pt-8">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            {lang === 'en' ? 'Quick Select Popular Exams' : 'लोकप्रिय परीक्षाओं का त्वरित चयन'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {popularExams.map((exam) => (
              <button
                key={exam.id}
                onClick={() => onSelectExam?.(exam)}
                className="px-5 py-2.5 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-brand hover:bg-brand hover:text-white dark:hover:border-brand transition-all shadow-sm hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-0.5"
              >
                {exam.name.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-8 relative z-10 px-4 sm:px-0">
          <a 
            href="https://akshay.website"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-lg shadow-xl shadow-gray-900/10 dark:shadow-white/10 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:-translate-y-1 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <Globe size={22} className="group-hover:scale-110 transition-transform relative z-10 text-blue-500" />
            <span className="relative z-10 tracking-wide">{lang === 'en' ? 'Visit akshay.website' : 'akshay.website पर जाएं'}</span>
          </a>
        </div>
        
        {/* Trust Bar */}
        <div className="grid grid-cols-2 sm:flex flex-wrap justify-center gap-x-8 sm:gap-x-12 gap-y-6 pt-12 sm:pt-16 border-t border-gray-200/60 dark:border-gray-800/60 relative z-10">
          <div className="flex flex-col items-center justify-center gap-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400">
              <ShieldCheck size={24} />
            </div>
            <span>No Upload Required</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
            <div className="p-3 rounded-2xl bg-sky-50 text-sky-500 dark:bg-sky-500/10 dark:text-sky-400">
              <Zap size={24} />
            </div>
            <span>Instant Download</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Globe size={24} />
            </div>
            <span>Works Offline</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400">
              <Star size={24} />
            </div>
            <span>Trusted by 1M+ Students</span>
          </div>
        </div>

        {/* Steps Component */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto pt-16 px-2 sm:px-0">
          <StepCard 
            step={1} 
            icon={Settings} 
            title={lang === 'en' ? 'Select Exam' : 'परीक्षा चुनें'} 
            description={lang === 'en' ? 'Choose from 50+ presets like UPSC, SSC, or set custom size.' : 'UPSC, SSC जैसे 50+ प्रीसेट में से चुनें या कस्टम आकार सेट करें।'} 
          />
          <StepCard 
            step={2} 
            icon={Upload} 
            title={lang === 'en' ? 'Upload Image' : 'इमेज अपलोड करें'} 
            description={lang === 'en' ? 'Select your photo and signature. Rotate if needed.' : 'अपनी फोटो और हस्ताक्षर चुनें। यदि आवश्यक हो तो घुमाएं।'} 
          />
          <StepCard 
            step={3} 
            icon={Download} 
            title={lang === 'en' ? 'Download' : 'डाउनलोड करें'} 
            description={lang === 'en' ? 'Get perfectly resized, compressed JPGs instantly.' : 'तुरंत पूरी तरह से आकार बदला हुआ, संकुचित JPG प्राप्त करें।'} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
