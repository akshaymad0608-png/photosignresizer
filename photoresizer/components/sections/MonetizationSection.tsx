import React from 'react';
import { BookOpen, ExternalLink, Zap, ShieldCheck, Lock, Image as ImageIcon, Youtube } from 'lucide-react';
import { Language } from '../../types';
import AdPlaceholder from '../AdPlaceholder';
import Newsletter from '../Newsletter';

interface MonetizationSectionProps {
  lang: Language;
}

const MonetizationSection: React.FC<MonetizationSectionProps> = ({ lang }) => {
  const handleSupport = () => {
    window.open('https://www.youtube.com/@AIminivlogs4', '_blank');
  };

  const resources = [
    {
      title: lang === 'en' ? 'Latest Govt Jobs 2024' : 'नवीनतम सरकारी नौकरियां 2024',
      desc: lang === 'en' ? 'Stay updated with the latest job notifications.' : 'नवीनतम नौकरी सूचनाओं के साथ अपडेट रहें।',
      link: 'https://www.sarkariresult.com/',
      tag: 'Popular'
    },
    {
      title: lang === 'en' ? 'Exam Preparation Tips' : 'परीक्षा की तैयारी के टिप्स',
      desc: lang === 'en' ? 'Expert advice to crack competitive exams.' : 'प्रतियोगी परीक्षाओं को क्रैक करने के लिए विशेषज्ञ की सलाह।',
      link: 'https://www.jagranjosh.com/',
      tag: 'Recommended'
    },
    {
      title: lang === 'en' ? 'Free Mock Tests' : 'फ्री मॉक टेस्ट',
      desc: lang === 'en' ? 'Practice with real exam-like test series.' : 'वास्तविक परीक्षा जैसी टेस्ट सीरीज के साथ अभ्यास करें।',
      link: 'https://testbook.com/',
      tag: 'Essential'
    }
  ];

  return (
    <section id="monetize-section" className="py-20 space-y-20">
      {/* Support Section */}
      <div className="bg-card-sunk rounded-[3rem] p-6 md:p-16 border border-signal shadow-sm relative overflow-hidden group/support">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 120px] rounded-full -translate-y-1/2 translate-x-1/2 transition-opacity duration-700 opacity-50 group-hover/support:opacity-100"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 120px] rounded-full translate-y-1/2 -translate-x-1/2 transition-opacity duration-700 opacity-50 group-hover/support:opacity-100"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-card text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm border border-red-50/50 dark:border-red-900/30 animate-pulse-slow">
            <Youtube size={16} className="text-red-500 fill-current" />
            {lang === 'en' ? 'Support Our Mission' : 'हमारे मिशन का समर्थन करें'}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-ink mb-8 tracking-tight">
            {lang === 'en' ? 'Subscribe to Our Channel' : 'हमारे चैनल को सब्सक्राइब करें'}
          </h2>
          <p className="text-muted mb-12 text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            {lang === 'en' 
              ? 'PhotoResizer.click is a free tool built to help students. Subscribe to our YouTube channel for more useful tools and updates!' 
              : 'PhotoResizer.click छात्रों की मदद के लिए बनाया गया एक मुफ्त टूल है। अधिक उपयोगी टूल और अपडेट के लिए हमारे YouTube चैनल को सब्सक्राइब करें!'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={handleSupport}
              className="group relative flex items-center justify-center gap-4 w-full sm:w-auto px-10 py-5 bg-signal text-white rounded-2xl font-bold transition-all duration-300 shadow-sm hover:shadow-sm hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-card/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <Youtube size={28} className="fill-current relative z-10" />
              <span className="relative z-10">{lang === 'en' ? 'Subscribe on YouTube' : 'YouTube पर सब्सक्राइब करें'}</span>
            </button>
          </div>
        </div>
      </div>

      <Newsletter lang={lang} />

      <AdPlaceholder text={lang === 'en' ? 'Best Exam Preparation Books' : 'बेस्ट परीक्षा तैयारी पुस्तकें'} />

      {/* Recommended Resources */}
      <div className="space-y-12 relative">
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-signal/5 120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">
            {lang === 'en' ? 'Recommended Exam Resources' : 'अनुशंसित परीक्षा संसाधन'}
          </h2>
          <p className="text-muted text-lg font-medium">
            {lang === 'en' ? 'Handpicked materials to boost your preparation.' : 'आपकी तैयारी को बढ़ावा देने के लिए चुनिंदा सामग्री।'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {resources.map((res, i) => (
            <div key={i} className="bg-card/50 p-6 md:p-10 rounded-[2.5rem] border border-rule shadow-sm hover:shadow-sm hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-signal text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-16 h-16 bg-card-sunk text-signal rounded-2xl flex items-center justify-center shadow-sm border border-white group-hover:scale-110 transition-transform duration-500">
                  <BookOpen size={28} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-card-sunk text-muted rounded-full border border-rule shadow-sm">
                  {res.tag}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-ink mb-4 group-hover:text-signal transition-colors relative z-10 tracking-tight">
                {res.title}
              </h3>
              <p className="text-muted mb-10 leading-relaxed font-medium relative z-10">
                {res.desc}
              </p>
              <a 
                href={res.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-card-sunk text-ink rounded-2xl font-bold text-sm hover:bg-signal hover:text-white transition-all duration-300 shadow-sm hover:shadow-sm relative z-10 group/btn"
              >
                {lang === 'en' ? 'View Details' : 'विवरण देखें'}
                <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Teaser */}
      <div className="bg-ink rounded-2xl p-8 md:p-16 text-paper relative overflow-hidden border border-rule shadow-sm group/premium">
        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover/premium:opacity-10 transition-opacity duration-700 group-hover/premium:scale-110 transform origin-top-right">
          <Zap size={400} />
        </div>
        <div className="absolute inset-0 bg-signal text-white opacity-50"></div>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
          <div className="space-y-8 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-signal/20 text-signal text-xs font-bold uppercase tracking-widest border border-signal backdrop-blur-md">
              <Lock size={14} />
              {lang === 'en' ? 'Coming Soon' : 'जल्द आ रहा है'}
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-ink text-white">
              {lang === 'en' ? 'PhotoResizer Pro' : 'PhotoResizer प्रो'}
            </h2>
            <p className="text-muted text-xl leading-relaxed font-medium">
              {lang === 'en' 
                ? 'Unlock advanced features like bulk resizing, cloud storage, and AI enhancement for coaching institutes and power users.' 
                : 'कोचिंग संस्थानों और पावर यूजर्स के लिए बल्क रिसाइजिंग, क्लाउड स्टोरेज और एआई एन्हांसमेंट जैसे एडवांस फीचर्स अनलॉक करें।'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto">
            <div className="flex items-center gap-5 px-8 py-6 bg-card/5 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-card/10 transition-colors group/feat">
              <div className="w-14 h-14 bg-signal/10 rounded-2xl flex items-center justify-center group-hover/feat:scale-110 transition-transform">
                <Zap size={28} className="text-signal" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Performance</div>
                <div className="text-xl font-bold tracking-tight">2x Faster</div>
              </div>
            </div>
            <div className="flex items-center gap-5 px-8 py-6 bg-card/5 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-card/10 transition-colors group/feat">
              <div className="w-14 h-14 bg-signal/10 rounded-2xl flex items-center justify-center group-hover/feat:scale-110 transition-transform">
                <ShieldCheck size={28} className="text-signal" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Security</div>
                <div className="text-xl font-bold tracking-tight">Enterprise</div>
              </div>
            </div>
            <div className="flex items-center gap-5 px-8 py-6 bg-card/5 rounded-2xl border border-white/10 backdrop-blur-md sm:col-span-2 hover:bg-card/10 transition-colors group/feat">
              <div className="w-14 h-14 bg-blue-400/10 rounded-2xl flex items-center justify-center group-hover/feat:scale-110 transition-transform">
                <ImageIcon size={28} className="text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Capability</div>
                <div className="text-xl font-bold tracking-tight">Batch Processing (500+ Photos)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonetizationSection;
