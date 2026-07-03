import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Heart, Mail, Github, Twitter, Globe } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FooterProps {
  lang: Language;
}

const Footer = ({ lang }: FooterProps) => (
  <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 relative overflow-x-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-12 relative z-10">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand text-white rounded-xl shadow-sm">
            <Camera size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            PhotoResizer
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
          The ultimate tool for Indian government exam aspirants. Resize, crop, and compress your photos and signatures instantly and securely.
        </p>
        <div className="flex gap-3">
          <a href="#" aria-label="Twitter Profile" className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-brand hover:text-white transition-colors"><Twitter size={18} /></a>
          <a href="#" aria-label="Github Repository" className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-brand hover:text-white transition-colors"><Github size={18} /></a>
          <a href="https://akshay.website" aria-label="Website" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-colors"><Globe size={18} /></a>
          <a href="mailto:support@photoresizer.click" aria-label="Email Support" className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-brand hover:text-white transition-colors"><Mail size={18} /></a>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Navigation</h2>
        <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
          <li><Link to="/" className="hover:text-brand transition-colors flex items-center gap-2">Home</Link></li>
          <li><Link to="/faq" className="hover:text-brand transition-colors flex items-center gap-2">{TRANSLATIONS[lang].faq}</Link></li>
          <li><Link to="/blog" className="hover:text-brand transition-colors flex items-center gap-2">{TRANSLATIONS[lang].blog}</Link></li>
          <li><a href="#" className="hover:text-brand transition-colors flex items-center gap-2">Privacy Policy</a></li>
        </ul>
      </div>

      <div>
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Exam Presets</h2>
        <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
          <li><a href="#" className="hover:text-brand transition-colors flex items-center gap-2">UPSC Photo Resizer</a></li>
          <li><a href="#" className="hover:text-brand transition-colors flex items-center gap-2">SSC Photo Maker</a></li>
          <li><a href="#" className="hover:text-brand transition-colors flex items-center gap-2">IBPS Signature Resizer</a></li>
          <li><a href="#" className="hover:text-brand transition-colors flex items-center gap-2">NEET Image Converter</a></li>
        </ul>
      </div>

      <div>
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Contact Us</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          Have questions or suggestions? We'd love to hear from you.
        </p>
        <div className="flex flex-col gap-3">
          <a 
            href="https://wa.me/917600885080" 
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg text-sm font-bold hover:bg-[#128C7E] transition-colors w-full sm:w-auto"
          >
            WhatsApp Us
          </a>
          <a 
            href="mailto:support@photoresizer.click" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors w-full sm:w-auto"
          >
            Email Support
          </a>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 relative z-10">
      <p>© 2026 PhotoResizer. All rights reserved.</p>
      <div className="flex items-center gap-2">
        Made with <Heart size={14} className="text-red-500 fill-red-500" /> for Indian Aspirants
      </div>
    </div>
  </footer>
);

export default Footer;
