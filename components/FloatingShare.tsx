import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Link2, X } from 'lucide-react';

export default function FloatingShare() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [url] = useState(() => typeof window !== 'undefined' ? window.location.href : '');

  const text = 'Check out this awesome Free Photo & Signature Resizer for Govt Exams!';

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="fixed left-4 sm:left-6 bottom-6 z-50 flex flex-col-reverse items-center gap-3">
      {/* Main Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${ isOpen ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 rotate-180' : 'bg-white text-gray-900 dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 hover:scale-110' }`}
        aria-label="Share tool"
      >
        {isOpen ? <X size={20} className="sm:w-5 sm:h-5 w-4 h-4" /> : <Share2 size={20} className="sm:w-5 sm:h-5 w-4 h-4" />}
      </button>

      {/* Share Buttons (expand upwards) */}
      <div className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${ isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none' }`}>
        
        {/* Copy Link */}
        <button 
          onClick={copyToClipboard}
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700 hover:-translate-y-1 hover:text-brand dark:hover:text-accent transition-all relative group"
          title="Copy Link"
        >
          <Link2 size={16} />
          {showCopied && (
            <span className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-[10px] rounded block whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>

        {/* Telegram */}
        <a 
          href={shareLinks.telegram} target="_blank" rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#0088cc] text-white flex items-center justify-center shadow-sm hover:-translate-y-1 hover:shadow-[#0088cc]/50 transition-all"
          title="Share on Telegram"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="fill-current"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-18.006 6.94c-1.12.432-1.144 1.706-.021 2.122l4.897 1.83 2.155 6.78c.189.59.882.784 1.341.378l3.197-2.825 5.56 4.108c.833.616 2.05-.121 2.186-1.12l3.076-17.06c.15-1.077-.734-1.89-1.554-1.57zM5.566 11.23l11.455-6.536c.26-.149.508.156.28.357l-9.458 8.87.001 2.384-2.278-5.075z"></path></svg>
        </a>

        {/* Facebook */}
        <a 
          href={shareLinks.facebook} target="_blank" rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm hover:-translate-y-1 hover:shadow-[#1877F2]/50 transition-all"
          title="Share on Facebook"
        >
          <Facebook size={16} className="fill-current" />
        </a>

        {/* Twitter */}
        <a 
          href={shareLinks.twitter} target="_blank" rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center shadow-sm hover:-translate-y-1 hover:shadow-[#1DA1F2]/50 transition-all"
          title="Share on Twitter"
        >
          <Twitter size={16} className="fill-current" />
        </a>
        
        {/* WhatsApp */}
        <a 
          href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm hover:-translate-y-1 hover:shadow-[#25D366]/50 transition-all"
          title="Share on WhatsApp"
        >
         <svg viewBox="0 0 24 24" width="18" height="18" className="fill-current"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.065-.301-.15-1.265-.462-2.406-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.21 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.195-.572-.345z"></path><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.45zM12.046 21.77c-1.775 0-3.516-.476-5.04-1.375l-.36-.214-3.75.975.996-3.645-.235-.373c-.987-1.565-1.508-3.38-1.508-5.245 0-5.445 4.445-9.885 9.9-9.885 2.64 0 5.12 1.025 6.985 2.885 1.865 1.86 2.89 4.335 2.89 6.975-.005 5.44-4.45 9.885-9.888 9.885z"></path></svg>
        </a>

      </div>
    </div>
  );
}
