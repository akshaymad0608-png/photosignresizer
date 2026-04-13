import React from 'react';
import { ShieldCheck, Zap, Globe, Settings, Upload, Download, Star, Youtube } from 'lucide-react';
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
    <header className="relative pt-24 pb-16 px-4 overflow-x-hidden mb-8">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-brand/10 dark:bg-brand/5 blur-[120px] rounded-full animate-pulse-slow mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-accent/10 dark:bg-accent/5 blur-[120px] rounded-full animate-pulse-slow delay-1000 mix-blend-multiply dark:mix-blend-screen"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-brand dark:text-blue-400 text-sm font-black border border-brand/20 dark:border-brand/30 shadow-xl shadow-brand/5 animate-fade-in hover:scale-105 transition-transform cursor-default">
            <Zap size={18} fill="currentColor" className="text-brand dark:text-blue-400 drop-shadow-sm" />
            <span className="tracking-widest uppercase text-[11px]">{lang === 'en' ? '100% Client-Side Processing' : '100% क्लाइंट-साइड प्रोसेसिंग'}</span>
          </div>
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-amber-600 dark:text-amber-400 text-sm font-black border border-amber-200/50 dark:border-amber-800/50 shadow-xl shadow-amber-500/5 animate-fade-in hover:scale-105 transition-transform cursor-default">
            <Star size={18} fill="currentColor" className="text-amber-500 drop-shadow-sm" />
            <span className="tracking-widest uppercase text-[11px]">{lang === 'en' ? 'Trusted by 10,000+ Students' : '10,000+ छात्रों द्वारा विश्वसनीय'}</span>
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-6 relative">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-brand/20 blur-2xl rounded-full"></div>
          <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-accent/20 blur-2xl rounded-full"></div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-gray-900 dark:text-white leading-[1.1] relative z-10">
            <span className="bg-gradient-to-br from-gray-900 via-brand to-gray-900 dark:from-white dark:via-brand dark:to-gray-300 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent drop-shadow-sm">
              {TRANSLATIONS[lang].title}
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium relative z-10 px-4 sm:px-0">
            {TRANSLATIONS[lang].subtitle}
          </p>
        </div>

        {/* Popular Exams Quick Select */}
        <div className="flex flex-col items-center gap-5 pt-6 relative z-10">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 bg-white/50 dark:bg-gray-900/50 px-4 py-1.5 rounded-full backdrop-blur-sm border border-gray-100 dark:border-gray-800">
            {lang === 'en' ? 'Quick Select Popular Exams' : 'लोकप्रिय परीक्षाओं का त्वरित चयन'}
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {popularExams.map((exam) => (
              <button
                key={exam.id}
                onClick={() => onSelectExam?.(exam)}
                className="px-5 py-2.5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/80 text-sm font-black text-gray-700 dark:text-gray-300 hover:border-brand dark:hover:border-brand hover:text-brand dark:hover:text-brand hover:shadow-xl hover:shadow-brand/10 transition-all active:scale-95 group"
              >
                <span className="group-hover:scale-105 inline-block transition-transform">{exam.name.split('(')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-8 relative z-10">
          <button 
            onClick={() => {
              const el = document.getElementById('monetize-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-red-600 text-white font-black text-lg shadow-2xl shadow-red-600/30 hover:bg-red-700 transition-all hover:-translate-y-1 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <Youtube size={24} fill="currentColor" className="text-white group-hover:scale-110 transition-transform relative z-10" />
            <span className="relative z-10 tracking-wide">{lang === 'en' ? 'Subscribe on YouTube' : 'YouTube पर सब्सक्राइब करें'}</span>
          </button>
        </div>
        
        {/* Trust Bar */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 pt-12 border-t border-gray-200/50 dark:border-gray-800/50 relative z-10">
          <div className="flex items-center gap-2.5 text-sm font-bold text-gray-500 dark:text-gray-400">
            <div className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/20">
              <ShieldCheck size={20} className="text-green-500" />
            </div>
            <span>No Upload Required</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-bold text-gray-500 dark:text-gray-400">
            <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20">
              <Zap size={20} className="text-amber-500" />
            </div>
            <span>Instant Download</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-bold text-gray-500 dark:text-gray-400">
            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Globe size={20} className="text-blue-500" />
            </div>
            <span>Works Offline</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-bold text-gray-500 dark:text-gray-400">
            <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <Star size={20} className="text-purple-500 fill-current" />
            </div>
            <span>Trusted by 1M+ Students</span>
          </div>
        </div>

        {/* Steps Component */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-16">
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
