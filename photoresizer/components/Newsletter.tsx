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
    <div className="bg-card rounded-[3rem] p-8 md:p-12 border border-rule shadow-sm relative overflow-hidden group/news">
      <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[150%] bg-signal text-white pointer-events-none -rotate-12 transition-transform duration-700 group-hover/news:rotate-0"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-signal/10 text-signal text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-signal">
            <Mail size={14} /> Newsletter
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">
            {content.title}
          </h2>
          <p className="text-muted font-medium text-lg max-w-lg mx-auto md:mx-0">
            {content.desc}
          </p>
        </div>

        <div className="flex-1 w-full max-w-md">
          {isSubscribed ? (
            <div className="bg-signal/10 border border-signal dark:border-signal rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
              <CheckCircle2 size={40} className="text-green-500" />
              <p className="font-bold text-green-700 text-signal text-lg">{content.success}</p>
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
                  className="flex-1 px-6 py-4 rounded-2xl bg-card-sunk border border-rule focus:outline-none focus:ring-4 focus:ring-brand/20 dark:focus:ring-accent/20 focus:border-signal dark:focus:border-signal text-ink font-medium placeholder:text-muted transition-all"
                />
                <button 
                  type="submit"
                  className="btn btn-primary whitespace-nowrap"
                >
                  {content.btn} <ArrowRight size={18} />
                </button>
              </div>
              <p className="text-xs text-center md:text-left text-muted font-medium px-2">
                {content.spam}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
