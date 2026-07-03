import React from 'react';
import { Upload, Scissors, Zap } from 'lucide-react';

const HowItWorksSection = () => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 sm:p-12 md:p-16 mb-16 sm:mb-24">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 tracking-tight">
        How to Resize Photo & Signature for Exams
      </h2>
      <div className="grid md:grid-cols-3 gap-10 md:gap-12 relative">
        <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>
        
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-white dark:bg-gray-900 text-brand dark:text-cyan-400 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-200 dark:border-gray-700 relative">
            <Upload size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">1. Upload Image</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed px-4">Select your passport size photo and signature from your gallery or take a new one.</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-white dark:bg-gray-900 text-orange-500 dark:text-amber-400 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-200 dark:border-gray-700 relative">
            <Scissors size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">2. Select Exam</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed px-4">Choose your target exam (UPSC, SSC, IBPS, etc.). We automatically apply the correct dimensions and KB size limits.</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-white dark:bg-gray-900 text-green-500 dark:text-green-400 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-200 dark:border-gray-700 relative">
            <Zap size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">3. Download</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed px-4">Click the 'Compress & Resize' button and instantly download your perfectly resized images ready for the application form.</p>
        </div>
      </div>
    </div>
  </div>
);

export default HowItWorksSection;
