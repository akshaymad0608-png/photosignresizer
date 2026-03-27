import React from 'react';
import { ShieldCheck, Zap, Globe, Settings, Upload, Download, Heart, Star, Youtube } from 'lucide-react';
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
    <header className="relative pt-24 pb-16 px-4 overflow-hidden mb-8">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 dark:bg-blue-900/30 text-brand dark:text-blue-400 text-sm font-bold border border-brand/20 animate-fade-in shadow-sm">
          <Zap size={16} fill="currentColor" />
          <span>{lang === 'en' ? '100% Client-Side Processing' : '100% क्लाइंट-साइड प्रोसेसिंग'}</span>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1]">
            <span className="bg-gradient-to-r from-brand via-blue-600 to-brand bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              {TRANSLATIONS[lang].title}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
            {TRANSLATIONS[lang].subtitle}
          </p>
        </div>

        {/* Popular Exams Quick Select */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <span className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
            {lang === 'en' ? 'Quick Select Popular Exams' : 'लोकप्रिय परीक्षाओं का त्वरित चयन'}
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {popularExams.map((exam) => (
              <button
                key={exam.id}
                onClick={() => onSelectExam?.(exam)}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 hover:border-brand dark:hover:border-blue-500 hover:text-brand dark:hover:text-blue-400 transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                {exam.name.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button 
            onClick={() => {
              const el = document.getElementById('monetize-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-red-600 text-white font-black text-lg shadow-2xl shadow-red-600/20 hover:bg-red-700 hover:scale-105 transition-all animate-bounce-subtle"
          >
            <Youtube size={20} fill="currentColor" className="text-white group-hover:scale-125 transition-transform" />
            {lang === 'en' ? 'Subscribe on YouTube' : 'YouTube पर सब्सक्राइब करें'}
          </button>
        </div>
        
        {/* Trust Bar */}
        <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-gray-100 dark:border-gray-800">
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
