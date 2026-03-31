import React from 'react';
import { MessageSquare, Star } from 'lucide-react';

const TestimonialsSection = () => (
  <div className="bg-white dark:bg-gray-900/50 rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 mb-24 relative overflow-hidden group/section">
    <div className="absolute top-0 left-0 w-96 h-96 bg-brand/5 dark:bg-cyan-500/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/section:opacity-100"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 dark:bg-brand/5 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2 transition-opacity duration-700 opacity-50 group-hover/section:opacity-100"></div>
    
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-20 tracking-tight leading-tight flex items-center justify-center gap-4">
        <div className="p-3 bg-gradient-to-br from-brand/20 to-brand/5 dark:from-cyan-500/20 dark:to-cyan-500/5 rounded-2xl border border-brand/10 dark:border-cyan-500/20 shadow-sm">
          <MessageSquare className="text-brand dark:text-cyan-400" size={32} />
        </div>
        User Testimonials
      </h2>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="bg-gray-50/50 dark:bg-gray-900/30 p-6 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 text-left hover:shadow-2xl hover:shadow-brand/10 dark:hover:shadow-cyan-500/10 hover:-translate-y-2 hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent dark:from-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex gap-1 mb-8 relative z-10">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg italic mb-10 leading-relaxed font-medium relative z-10">"This tool saved me so much time for my UPSC form. The photo and signature were perfectly resized in seconds."</p>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-brand to-accent dark:from-cyan-500 dark:to-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand/20 dark:shadow-cyan-500/20 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">R</div>
            <div>
              <span className="block font-black text-gray-900 dark:text-white text-base tracking-tight group-hover:text-brand dark:group-hover:text-cyan-400 transition-colors">Rahul S.</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">UPSC Aspirant</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50/50 dark:bg-gray-900/30 p-6 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 text-left hover:shadow-2xl hover:shadow-green-500/10 dark:hover:shadow-green-500/10 hover:-translate-y-2 hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent dark:from-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex gap-1 mb-8 relative z-10">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg italic mb-10 leading-relaxed font-medium relative z-10">"I was struggling with the 50KB limit for SSC. This tool made it so easy. Highly recommended!"</p>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-600/20 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">P</div>
            <div>
              <span className="block font-black text-gray-900 dark:text-white text-base tracking-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Priya M.</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">SSC Candidate</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50/50 dark:bg-gray-900/30 p-6 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 text-left hover:shadow-2xl hover:shadow-amber-500/10 dark:hover:shadow-amber-500/10 hover:-translate-y-2 hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent dark:from-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex gap-1 mb-8 relative z-10">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg italic mb-10 leading-relaxed font-medium relative z-10">"The best part is that it works offline and my data is safe. Very fast and reliable."</p>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-amber-600/20 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">A</div>
            <div>
              <span className="block font-black text-gray-900 dark:text-white text-base tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Ankit K.</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">IBPS Aspirant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TestimonialsSection;
