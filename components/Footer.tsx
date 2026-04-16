import React from 'react';
import { Camera, Heart, Mail, Github, Twitter, Youtube } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FooterProps {
  lang: Language;
}

const Footer = ({ lang }: FooterProps) => (
  <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 pt-32 pb-16 px-6 relative overflow-x-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent"></div>
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
    
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-24 relative z-10">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-brand to-accent text-white rounded-2xl shadow-xl shadow-brand/20">
            <Camera size={24} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-gray-900 dark:text-white">
            PHOTO<span className="text-brand">RESIZER</span>
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium max-w-xs">
          The ultimate tool for Indian government exam aspirants. Resize, crop, and compress your photos and signatures instantly and securely.
        </p>
        <div className="flex gap-3 pt-2">
          <a href="#" aria-label="Twitter Profile" className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1 border border-gray-100 dark:border-gray-800"><Twitter size={20} /></a>
          <a href="#" aria-label="Github Repository" className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1 border border-gray-100 dark:border-gray-800"><Github size={20} /></a>
          <a href="https://www.youtube.com/@AIminivlogs4" aria-label="Youtube Channel" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1 border border-gray-100 dark:border-gray-800"><Youtube size={20} /></a>
          <a href="mailto:support@photoresizer.click" aria-label="Email Support" className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1 border border-gray-100 dark:border-gray-800"><Mail size={20} /></a>
        </div>
      </div>

      <div>
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-8">Navigation</h2>
        <ul className="space-y-5 text-sm text-gray-500 dark:text-gray-400 font-bold">
          <li><a href="#" className="hover:text-brand transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>Home</a></li>
          <li><a href="#faq" className="hover:text-brand transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>{TRANSLATIONS[lang].faq}</a></li>
          <li><a href="#blog" className="hover:text-brand transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>{TRANSLATIONS[lang].blog}</a></li>
          <li><a href="#" className="hover:text-brand transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>Privacy Policy</a></li>
        </ul>
      </div>

      <div>
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-8">Exam Presets</h2>
        <ul className="space-y-5 text-sm text-gray-500 dark:text-gray-400 font-bold">
          <li><a href="#" className="hover:text-brand transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>UPSC Photo Resizer</a></li>
          <li><a href="#" className="hover:text-brand transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>SSC Photo Maker</a></li>
          <li><a href="#" className="hover:text-brand transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>IBPS Signature Resizer</a></li>
          <li><a href="#" className="hover:text-brand transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>NEET Image Converter</a></li>
        </ul>
      </div>

      <div>
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-8">Contact Us</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 font-medium leading-relaxed">
          Have questions or suggestions? We'd love to hear from you.
        </p>
        <div className="flex flex-col gap-4 items-start">
          <a 
            href="https://wa.me/917600885080" 
            target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-[#128C7E] transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="fill-current text-white group-hover:scale-110 transition-transform"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.065-.301-.15-1.265-.462-2.406-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.21 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.195-.572-.345z"></path><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.45zM12.046 21.77c-1.775 0-3.516-.476-5.04-1.375l-.36-.214-3.75.975.996-3.645-.235-.373c-.987-1.565-1.508-3.38-1.508-5.245 0-5.445 4.445-9.885 9.9-9.885 2.64 0 5.12 1.025 6.985 2.885 1.865 1.86 2.89 4.335 2.89 6.975-.005 5.44-4.45 9.885-9.888 9.885z"></path></svg>
            WhatsApp Us
          </a>
          <a 
            href="mailto:support@photoresizer.click" 
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-brand dark:hover:bg-brand dark:hover:text-white transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto"
          >
            <Mail size={18} className="group-hover:scale-110 transition-transform" />
            Email Support
          </a>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto pt-10 border-t border-gray-100 dark:border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 relative z-10">
      <p>© 2026 PHOTORESIZER. All rights reserved.</p>
      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-100 dark:border-gray-800">
        Made with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> for Indian Aspirants
      </div>
    </div>
  </footer>
);

export default Footer;
