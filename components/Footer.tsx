import React from 'react';
import { Camera, Heart, Mail, Github, Twitter, Youtube } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FooterProps {
  lang: Language;
}

const Footer = ({ lang }: FooterProps) => (
  <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-24 pb-12 px-6 mt-24 relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand/5 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3"></div>
    
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-20 relative z-10">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand text-white rounded-xl shadow-lg shadow-brand/20">
            <Camera size={22} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-gray-900 dark:text-white">
            PHOTO<span className="text-brand">RESIZER</span>
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">
          The ultimate tool for Indian government exam aspirants. Resize, crop, and compress your photos and signatures instantly and securely.
        </p>
        <div className="flex gap-4 pt-4">
          <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white transition-all shadow-sm"><Twitter size={18} /></a>
          <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white transition-all shadow-sm"><Github size={18} /></a>
          <a href="https://www.youtube.com/@AIminivlogs4" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all shadow-sm"><Youtube size={18} /></a>
          <a href="mailto:support@photoresizer.click" className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white transition-all shadow-sm"><Mail size={18} /></a>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-8">{TRANSLATIONS[lang].home} & Links</h4>
        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-bold">
          <li><a href="#" className="hover:text-brand transition-colors">Home</a></li>
          <li><a href="#faq" className="hover:text-brand transition-colors">{TRANSLATIONS[lang].faq}</a></li>
          <li><a href="#blog" className="hover:text-brand transition-colors">{TRANSLATIONS[lang].blog}</a></li>
          <li><a href="#" className="hover:text-brand transition-colors">Privacy Policy</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-8">Exam Presets</h4>
        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-bold">
          <li><a href="#" className="hover:text-brand transition-colors">UPSC Photo Resizer</a></li>
          <li><a href="#" className="hover:text-brand transition-colors">SSC Photo Maker</a></li>
          <li><a href="#" className="hover:text-brand transition-colors">IBPS Signature Resizer</a></li>
          <li><a href="#" className="hover:text-brand transition-colors">NEET Image Converter</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-8">Contact Us</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 font-medium leading-relaxed">
          Have questions or suggestions? We'd love to hear from you.
        </p>
        <a 
          href="mailto:support@photoresizer.click" 
          className="inline-flex items-center gap-3 px-6 py-4 bg-brand text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-brand/20"
        >
          <Mail size={18} />
          Email Support
        </a>
      </div>
    </div>

    <div className="max-w-7xl mx-auto pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
      <p>© 2026 PHOTORESIZER. All rights reserved.</p>
      <div className="flex items-center gap-2">
        Made with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> for Indian Aspirants
      </div>
    </div>
  </footer>
);

export default Footer;
