import React from 'react';
import { Upload, Scissors, Zap } from 'lucide-react';

const HowItWorksSection = () => (
  <div className="bg-white dark:bg-gray-900/50 rounded-[3rem] p-8 md:p-20 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 mb-24 relative overflow-hidden group/section">
    <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 dark:bg-cyan-500/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/section:opacity-100"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 dark:bg-brand/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/section:opacity-100"></div>
    
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-20 tracking-tight leading-tight">
        How to Resize Photo & Signature for Exams
      </h2>
      <div className="grid md:grid-cols-3 gap-12 md:gap-16 relative">
        <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent -z-10"></div>
        
        <div className="flex flex-col items-center group">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 text-brand dark:text-cyan-400 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl shadow-brand/10 border-8 border-white dark:border-gray-900 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative">
            <div className="absolute inset-0 bg-brand/10 dark:bg-cyan-400/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            <Upload size={36} className="relative z-10" />
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-brand dark:group-hover:text-cyan-400 transition-colors">1. Upload Image</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed px-4">Select your passport size photo and signature from your gallery or take a new one.</p>
        </div>

        <div className="flex flex-col items-center group">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 text-orange-600 dark:text-amber-400 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl shadow-orange-500/10 border-8 border-white dark:border-gray-900 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 relative">
            <div className="absolute inset-0 bg-orange-500/10 dark:bg-amber-400/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            <Scissors size={36} className="relative z-10" />
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-orange-600 dark:group-hover:text-amber-400 transition-colors">2. Select Exam</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed px-4">Choose your target exam (UPSC, SSC, IBPS, etc.). We automatically apply the correct dimensions and KB size limits.</p>
        </div>

        <div className="flex flex-col items-center group">
          <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 text-green-600 dark:text-green-400 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl shadow-green-500/10 border-8 border-white dark:border-gray-900 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative">
            <div className="absolute inset-0 bg-green-500/10 dark:bg-green-400/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            <Zap size={36} className="relative z-10" />
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">3. Download</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed px-4">Click the 'Compress & Resize' button and instantly download your perfectly resized images ready for the application form.</p>
        </div>
      </div>
    </div>
  </div>
);

export default HowItWorksSection;
