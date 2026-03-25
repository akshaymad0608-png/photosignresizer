import React from 'react';
import { BookOpen, Star, ExternalLink, Zap, ShieldCheck, Heart, Lock, Image as ImageIcon } from 'lucide-react';
import { Language } from '../../types';
import AdPlaceholder from '../AdPlaceholder';

interface MonetizationSectionProps {
  lang: Language;
}

const MonetizationSection: React.FC<MonetizationSectionProps> = ({ lang }) => {
  const handleSupport = () => {
    window.open('https://g.page/photoresizer/review', '_blank');
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
      <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-[3rem] p-8 md:p-16 border border-blue-100 dark:border-gray-800 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-8 shadow-md border border-blue-50/50 animate-pulse">
            <Heart size={16} className="text-red-500 fill-current" />
            {lang === 'en' ? 'Support Our Mission' : 'हमारे मिशन का समर्थन करें'}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
            {lang === 'en' ? 'Keep This Tool Free Forever' : 'इस टूल को हमेशा के लिए फ्री रखें'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            {lang === 'en' 
              ? 'PhotoResizer.click is a free tool built to help students. Your small contribution helps us pay for servers and keep the lights on.' 
              : 'PhotoResizer.click छात्रों की मदद के लिए बनाया गया एक मुफ्त टूल है। आपका छोटा सा योगदान हमें सर्वर के लिए भुगतान करने और इसे चालू रखने में मदद करता है।'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={handleSupport}
              className="flex items-center gap-4 px-10 py-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl font-black border-2 border-gray-100 dark:border-gray-700 hover:border-blue-500 transition-all shadow-xl active:scale-95"
            >
              <Star size={28} className="text-amber-400 fill-current" />
              {lang === 'en' ? 'Rate Us 5 Stars' : 'हमें 5 स्टार दें'}
            </button>
          </div>
        </div>
      </div>

      <AdPlaceholder text={lang === 'en' ? 'Best Exam Preparation Books' : 'बेस्ट परीक्षा तैयारी पुस्तकें'} />

      {/* Recommended Resources */}
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
            {lang === 'en' ? 'Recommended Exam Resources' : 'अनुशंसित परीक्षा संसाधन'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {lang === 'en' ? 'Handpicked materials to boost your preparation.' : 'आपकी तैयारी को बढ़ावा देने के लिए चुनिंदा सामग्री।'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((res, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-inner">
                  <BookOpen size={28} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-700">
                  {res.tag}
                </span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {res.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                {res.desc}
              </p>
              <a 
                href={res.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl font-black text-sm hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all shadow-sm"
              >
                {lang === 'en' ? 'View Details' : 'विवरण देखें'}
                <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Teaser */}
      <div className="bg-gray-900 dark:bg-black rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <Zap size={300} />
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest border border-blue-500/30">
              <Lock size={14} />
              {lang === 'en' ? 'Coming Soon' : 'जल्द आ रहा है'}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              {lang === 'en' ? 'PhotoResizer Pro' : 'PhotoResizer प्रो'}
            </h2>
            <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
              {lang === 'en' 
                ? 'Unlock advanced features like bulk resizing, cloud storage, and AI enhancement for coaching institutes and power users.' 
                : 'कोचिंग संस्थानों और पावर यूजर्स के लिए बल्क रिसाइजिंग, क्लाउड स्टोरेज और एआई एन्हांसमेंट जैसे एडवांस फीचर्स अनलॉक करें।'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-4 px-8 py-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
              <div className="w-12 h-12 bg-amber-400/10 rounded-2xl flex items-center justify-center">
                <Zap size={24} className="text-amber-400" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Performance</div>
                <div className="text-lg font-black">2x Faster</div>
              </div>
            </div>
            <div className="flex items-center gap-4 px-8 py-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
              <div className="w-12 h-12 bg-green-400/10 rounded-2xl flex items-center justify-center">
                <ShieldCheck size={24} className="text-green-400" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Security</div>
                <div className="text-lg font-black">Enterprise</div>
              </div>
            </div>
            <div className="flex items-center gap-4 px-8 py-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md sm:col-span-2">
              <div className="w-12 h-12 bg-blue-400/10 rounded-2xl flex items-center justify-center">
                <ImageIcon size={24} className="text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Capability</div>
                <div className="text-lg font-black">Batch Processing (500+ Photos)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonetizationSection;
