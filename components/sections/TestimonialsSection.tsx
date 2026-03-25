import React from 'react';
import { MessageSquare, Star } from 'lucide-react';

const TestimonialsSection = () => (
  <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 mb-24 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-64 h-64 bg-brand/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-16 tracking-tight leading-tight flex items-center justify-center gap-4">
        <div className="p-3 bg-brand/10 dark:bg-blue-900/30 rounded-2xl">
          <MessageSquare className="text-brand dark:text-blue-400" size={32} />
        </div>
        User Testimonials
      </h2>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg italic mb-8 leading-relaxed font-medium">"This tool saved me so much time for my UPSC form. The photo and signature were perfectly resized in seconds."</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand dark:bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-brand/20 group-hover:rotate-12 transition-transform">R</div>
            <div>
              <span className="block font-black text-gray-900 dark:text-white text-base tracking-tight">Rahul S.</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">UPSC Aspirant</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg italic mb-8 leading-relaxed font-medium">"I was struggling with the 50KB limit for SSC. This tool made it so easy. Highly recommended!"</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-green-600/20 group-hover:rotate-12 transition-transform">P</div>
            <div>
              <span className="block font-black text-gray-900 dark:text-white text-base tracking-tight">Priya M.</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">SSC Candidate</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg italic mb-8 leading-relaxed font-medium">"The best part is that it works offline and my data is safe. Very fast and reliable."</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-amber-600/20 group-hover:rotate-12 transition-transform">A</div>
            <div>
              <span className="block font-black text-gray-900 dark:text-white text-base tracking-tight">Ankit K.</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">IBPS Aspirant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TestimonialsSection;
