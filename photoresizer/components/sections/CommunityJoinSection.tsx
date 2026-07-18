import React from 'react';
import { MessageCircle } from 'lucide-react';

const CommunityJoinSection = () => (
  <div className="bg-signal rounded-2xl p-8 sm:p-12 mb-16 text-white text-center relative overflow-hidden">
    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-card opacity-10 rounded-full"></div>
    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-card opacity-10 rounded-full"></div>
    
    <div className="relative z-10 max-w-3xl mx-auto">
      <div className="w-16 h-16 bg-card/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
        <MessageCircle size={32} className="text-white" />
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Get Instant Job Alerts on WhatsApp & Telegram
      </h2>
      <p className="text-signal-50 text-lg mb-8 max-w-2xl mx-auto">
        Don't miss out on any government job vacancy. Join our community of 50,000+ aspirants for instant updates, free mock tests, and study materials.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a href="#" className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-8 rounded-xl transition-colors">
          <MessageCircle size={20} />
          Join WhatsApp Group
        </a>
        <a href="#" className="inline-flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold py-3 px-8 rounded-xl transition-colors">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          Join Telegram Channel
        </a>
      </div>
    </div>
  </div>
);

export default CommunityJoinSection;
