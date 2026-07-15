import React from 'react';
import { MessageSquare, Star } from 'lucide-react';

const TestimonialsSection = () => (
  <div className="bg-white dark:bg-gray-900/50 rounded-3xl md:rounded-[3rem] p-6 sm:p-12 md:p-20 shadow-sm border border-gray-100 dark:border-gray-800 mb-16 sm:mb-24 relative overflow-hidden group/section">
    <div className="absolute top-0 left-0 w-96 h-96 bg-brand/5 dark:bg-accent/5 100px] rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/section:opacity-100"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 dark:bg-brand/5 100px] rounded-full translate-x-1/2 translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/section:opacity-100"></div>
    
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-16 md:mb-20 tracking-tight leading-tight flex items-center justify-center gap-4">
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-brand/10 dark:border-accent/20 shadow-sm hidden sm:block">
          <MessageSquare className="text-brand dark:text-accent" size={32} />
        </div>
        User Testimonials
      </h2>
      <div className="grid md:grid-cols-3 gap-6 sm:gap-12">
        <div className="bg-gray-50/50 dark:bg-gray-900/30 p-6 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 text-left hover:shadow-sm hover:shadow-sm dark:hover:shadow-sm hover:-translate-y-2 hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-brand text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex gap-1 mb-8 relative z-10">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg italic mb-10 leading-relaxed font-medium relative z-10">"This tool saved me so much time for my UPSC form. The photo and signature were perfectly resized in seconds."</p>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-sm group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">R</div>
            <div>
              <span className="block font-black text-gray-900 dark:text-white text-base tracking-tight group-hover:text-brand dark:group-hover:text-accent transition-colors">Rahul S.</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">UPSC Aspirant</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50/50 dark:bg-gray-900/30 p-6 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 text-left hover:shadow-sm hover:shadow-sm dark:hover:shadow-sm hover:-translate-y-2 hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-brand text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex gap-1 mb-8 relative z-10">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg italic mb-10 leading-relaxed font-medium relative z-10">"I was struggling with the 50KB limit for SSC. This tool made it so easy. Highly recommended!"</p>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-sm group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">P</div>
            <div>
              <span className="block font-black text-gray-900 dark:text-white text-base tracking-tight group-hover:text-brand dark:group-hover:text-brand transition-colors">Priya M.</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">SSC Candidate</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50/50 dark:bg-gray-900/30 p-6 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 text-left hover:shadow-sm hover:shadow-sm dark:hover:shadow-sm hover:-translate-y-2 hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-brand text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex gap-1 mb-8 relative z-10">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg italic mb-10 leading-relaxed font-medium relative z-10">"The best part is that it works offline and my data is safe. Very fast and reliable."</p>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-sm group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">A</div>
            <div>
              <span className="block font-black text-gray-900 dark:text-white text-base tracking-tight group-hover:text-brand dark:group-hover:text-brand transition-colors">Ankit K.</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">IBPS Aspirant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TestimonialsSection;
