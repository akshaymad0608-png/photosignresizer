import React from 'react';
import { Upload, Scissors, Zap } from 'lucide-react';

const HowItWorksSection = () => (
  <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 mb-24 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
    
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-16 tracking-tight leading-tight">How to Resize Photo & Signature for Exams</h2>
      <div className="grid md:grid-cols-3 gap-16 relative">
        <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gray-100 dark:bg-gray-700 -z-10 -translate-y-1/2"></div>
        
        <div className="flex flex-col items-center group">
          <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 text-brand dark:text-blue-400 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl shadow-brand/10 border-8 border-white dark:border-gray-800 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <Upload size={36} />
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">1. Upload Image</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">Select your passport size photo and signature from your gallery or take a new one.</p>
        </div>

        <div className="flex flex-col items-center group">
          <div className="w-24 h-24 bg-amber-50 dark:bg-amber-900/20 text-orange-600 dark:text-amber-400 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl shadow-orange-500/10 border-8 border-white dark:border-gray-800 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
            <Scissors size={36} />
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">2. Select Exam</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">Choose your target exam (UPSC, SSC, IBPS, etc.). We automatically apply the correct dimensions and KB size limits.</p>
        </div>

        <div className="flex flex-col items-center group">
          <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl shadow-green-500/10 border-8 border-white dark:border-gray-800 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <Zap size={36} />
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">3. Download</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">Click the 'Compress & Resize' button and instantly download your perfectly resized images ready for the application form.</p>
        </div>
      </div>
    </div>
  </div>
);

export default HowItWorksSection;
