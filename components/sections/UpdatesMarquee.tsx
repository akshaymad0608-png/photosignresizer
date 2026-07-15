import React from 'react';
import { Sparkles, Image as ImageIcon, Briefcase, Link as LinkIcon, FileText, Zap, HelpCircle } from 'lucide-react';

const UpdatesMarquee = ({ setActiveTab }: { setActiveTab?: (tab: string) => void }) => {
  const items = [
    { text: "AI Background Remover", icon: <Sparkles size={16} className="text-brand" />, tab: 'tools' },
    { text: "Image Compressor to 20KB/50KB", icon: <ImageIcon size={16} className="text-accent" />, tab: 'tools' },
    { text: "Latest Govt Job Vacancies", icon: <Briefcase size={16} className="text-brand" />, tab: 'jobs' },
    { text: "Major Exam Direct Links", icon: <LinkIcon size={16} className="text-accent" />, tab: 'links' },
    { text: "Photo with Name & Date Maker", icon: <FileText size={16} className="text-brand" />, tab: 'home' },
    { text: "SSC, UPSC & Bank Photo Resizer", icon: <Zap size={16} className="text-accent" />, tab: 'home' },
    { text: "Exam Photo Guidelines & Blog", icon: <FileText size={16} className="text-brand" />, tab: 'blog' },
    { text: "Frequently Asked Questions", icon: <HelpCircle size={16} className="text-accent" />, tab: 'faq' },
  ];

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 py-2.5 overflow-hidden relative flex shadow-sm group">
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient- dark: z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient- dark: z-10 pointer-events-none"></div>
      
      <div className="flex w-max animate-marquee group-hover:animate-pause">
        {repeatedItems.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 px-4 md:px-6 text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-accent transition-colors border-r border-gray-200 dark:border-gray-800 cursor-pointer"
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
