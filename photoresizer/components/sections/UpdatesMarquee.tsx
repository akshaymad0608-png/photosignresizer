import React from 'react';
import { Sparkles, Image as ImageIcon, Briefcase, Link as LinkIcon, FileText, Zap, HelpCircle } from 'lucide-react';

const UpdatesMarquee = ({ setActiveTab }: { setActiveTab?: (tab: string) => void }) => {
  const items = [
    { text: "AI Background Remover", icon: <Sparkles size={16} className="text-signal" />, tab: 'tools' },
    { text: "Image Compressor to 20KB/50KB", icon: <ImageIcon size={16} className="text-signal" />, tab: 'tools' },
    { text: "Latest Govt Job Vacancies", icon: <Briefcase size={16} className="text-signal" />, tab: 'jobs' },
    { text: "Major Exam Direct Links", icon: <LinkIcon size={16} className="text-signal" />, tab: 'links' },
    { text: "Photo with Name & Date Maker", icon: <FileText size={16} className="text-signal" />, tab: 'home' },
    { text: "SSC, UPSC & Bank Photo Resizer", icon: <Zap size={16} className="text-signal" />, tab: 'home' },
    { text: "Exam Photo Guidelines & Blog", icon: <FileText size={16} className="text-signal" />, tab: 'blog' },
    { text: "Frequently Asked Questions", icon: <HelpCircle size={16} className="text-signal" />, tab: 'faq' },
  ];

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-card border-y border-rule py-2 overflow-hidden relative flex group [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      
      
      <div className="flex w-max animate-marquee group-hover:animate-pause">
        {repeatedItems.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 px-4 md:px-6 text-xs md:text-sm font-semibold text-ink-soft hover:text-signal transition-colors border-r border-rule cursor-pointer"
            onClick={() => setActiveTab && setActiveTab(item.tab)}
          >
            {item.icon}
            <span className="whitespace-nowrap">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdatesMarquee;
