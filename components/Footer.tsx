import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Github, Twitter, Globe } from 'lucide-react';
import Logo from './Logo';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FooterProps {
  lang: Language;
}

const Footer = ({ lang }: FooterProps) => (
  <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-16 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 relative overflow-x-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-10 xl:gap-12 mb-16 relative z-10">
      
      {/* Brand & About */}
      <div className="xl:col-span-2 space-y-6">
        <Logo className="scale-75 origin-left" />
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
          The ultimate tool for Indian government exam aspirants. Resize, crop, and compress your photos and signatures instantly and securely in your browser. No data leaves your device.
        </p>
        <div className="flex gap-3">
          <a href="#" aria-label="Twitter Profile" className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:border-brand hover:text-brand transition-all shadow-sm"><Twitter size={18} /></a>
          <a href="#" aria-label="Github Repository" className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:border-brand hover:text-brand transition-all shadow-sm"><Github size={18} /></a>
          <a href="https://akshay.website" aria-label="Website" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:border-accent hover:text-accent transition-all shadow-sm"><Globe size={18} /></a>
          <a href="mailto:support@photoresizer.click" aria-label="Email Support" className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:border-brand hover:text-brand transition-all shadow-sm"><Mail size={18} /></a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6">Quick Links</h2>
        <ul className="space-y-3.5 text-sm text-gray-600 dark:text-gray-400 font-medium">
          <li><Link to="/" className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">Home</Link></li>
          <li><Link to="/faq" className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">{TRANSLATIONS[lang].faq}</Link></li>
          <li><Link to="/blog" className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">{TRANSLATIONS[lang].blog}</Link></li>
          <li><Link to="/terms" className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">Terms of Service</Link></li>
          <li><Link to="/privacy" className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">Privacy Policy</Link></li>
        </ul>
      </div>

      {/* Popular Tools */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6">Popular Tools</h2>
        <ul className="space-y-3.5 text-sm text-gray-600 dark:text-gray-400 font-medium">
          <li><Link to="/tools/image-compressor" className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">Image Compressor</Link></li>
          <li><Link to="/tools/grayscale-converter" className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">Grayscale Converter</Link></li>
          <li><Link to="/tools/jpg-" className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">JPG to PNG Converter</Link></li>
          <li><Link to="/tools/pdf-" className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">PDF to Word</Link></li>
          <li><Link to="/tools/merge-pdf" className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">Merge PDF</Link></li>
          <li><Link to="/tools/split-pdf" className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">Split PDF</Link></li>
        </ul>
      </div>

      {/* Top Exams */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6">Top Exams</h2>
        <ul className="space-y-3.5 text-sm text-gray-600 dark:text-gray-400 font-medium">
          <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">UPSC Photo Resizer</button></li>
          <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">SSC Photo & Sign Maker</button></li>
          <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">IBPS Signature Tool</button></li>
          <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">NEET Image Converter</button></li>
          <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-brand dark:hover:text-accent transition-colors flex items-center gap-2">GATE Photo Tool</button></li>
        </ul>
      </div>

    </div>

    {/* Bottom Footer */}
    <div className="max-w-7xl mx-auto pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 relative z-10">
      <p>© {new Date().getFullYear()} PhotoResizer.click. All rights reserved.</p>
      <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800">
        Made with <Heart size={14} className="text-red-500 fill-red-500 mx-0.5 animate-pulse" /> for Indian Aspirants
      </div>
    </div>
  </footer>
);

export default Footer;
