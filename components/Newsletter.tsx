import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface NewsletterProps {
  lang: 'en' | 'hi';
}

export default function Newsletter({ lang }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Need an actual API for newsletters, for now simulate UI
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const content = {
    title: lang === 'en' ? 'Get latest Exam Notifications' : 'नवीनतम परीक्षा सूचनाएं प्राप्त करें',
    desc: lang === 'en' ? 'Never miss an important exam date. Get photo specs and job alerts straight to your inbox.' : 'कभी भी महत्वपूर्ण परीक्षा तिथि न चूकें। सीधे अपने इनबॉक्स में फोटो स्पेक्स और नौकरी अलर्ट प्राप्त करें।',
    placeholder: lang === 'en' ? 'Enter your email address' : 'अपना ईमेल पता दर्ज करें',
    btn: lang === 'en' ? 'Subscribe' : 'सदस्यता लें',
    success: lang === 'en' ? 'Thanks for subscribing!' : 'सदस्यता लेने के लिए धन्यवाद!',
    spam: lang === 'en' ? 'No spam. We rarely email.' : 'कोई स्पैम नहीं। हम शायद ही कभी ईमेल करते हैं।'
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden group/news">
      <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[150%] bg-gradient-to-r from-brand/10 to-transparent dark:from-cyan-500/10 blur-[100px] pointer-events-none -rotate-12 transition-transform duration-700 group-hover/news:rotate-0"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 dark:bg-cyan-500/10 text-brand dark:text-cyan-400 text-xs font-black uppercase tracking-widest backdrop-blur-sm border border-brand/20 dark:border-cyan-500/20">
            <Mail size={14} /> Newsletter
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            {content.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg max-w-lg mx-auto md:mx-0">
            {content.desc}
          </p>
        </div>

        <div className="flex-1 w-full max-w-md">
          {isSubscribed ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
              <CheckCircle2 size={40} className="text-green-500" />
              <p className="font-black text-green-700 dark:text-green-400 text-lg">{content.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.placeholder}
                  className="flex-1 px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-brand/20 dark:focus:ring-cyan-500/20 focus:border-brand dark:focus:border-cyan-500 text-gray-900 dark:text-white font-medium placeholder:text-gray-400 transition-all"
                />
                <button 
                  type="submit"
                  className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-brand hover:text-white dark:hover:bg-cyan-500 transition-colors shadow-md whitespace-nowrap"
                >
                  {content.btn} <ArrowRight size={18} />
                </button>
              </div>
              <p className="text-xs text-center md:text-left text-gray-400 dark:text-gray-500 font-medium px-2">
                {content.spam}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
