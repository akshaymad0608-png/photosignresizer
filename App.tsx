import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { 
  Camera, Settings, Upload, Copy, Zap, FileDown, Trash2, FileText
} from 'lucide-react';
import { EXAM_PRESETS, TRANSLATIONS } from './constants';
import { ExamRequirement, Language, ProcessedImage } from './types';
import { processImage, readFileAsDataURL } from './utils/imageProcessing';
import ExamDropdown from './components/ExamDropdown';
import ImageUploader from './components/ImageUploader';
import ResultCard from './components/ResultCard';
import AdPlaceholder from './components/AdPlaceholder';

// --- New Components ---
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import FAQSection from './components/sections/FAQSection';
import BlogSection from './components/sections/BlogSection';
import HowItWorksSection from './components/sections/HowItWorksSection';
import SupportedExamsSection from './components/sections/SupportedExamsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import MonetizationSection from './components/sections/MonetizationSection';
import WhyUseSection from './components/sections/WhyUseSection';
import ImageControls from './components/ImageControls';

// --- Main App ---

export default function App() {
  // State
  const [lang, setLang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [activeTab, setActiveTab] = useState<'home' | 'faq' | 'blog'>('home');

  // Exam State
  const [selectedExam, setSelectedExam] = useState<ExamRequirement>(EXAM_PRESETS[0]); 
  
  // Custom Date/Name overlay state
  const [addDate, setAddDate] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [photoDate, setPhotoDate] = useState('');

  // Image State
  const [photoOriginal, setPhotoOriginal] = useState<string | null>(null);
  const [photoRotation, setPhotoRotation] = useState(0);
  const [photoBrightness, setPhotoBrightness] = useState(0);
  const [photoContrast, setPhotoContrast] = useState(0);
  const [photoGrayscale, setPhotoGrayscale] = useState(false);
  const [photoProcessed, setPhotoProcessed] = useState<ProcessedImage | null>(null);
  
  const [signOriginal, setSignOriginal] = useState<string | null>(null);
  const [signRotation, setSignRotation] = useState(0);
  const [signBrightness, setSignBrightness] = useState(0);
  const [signContrast, setSignContrast] = useState(0);
  const [signGrayscale, setSignGrayscale] = useState(true);
  const [signProcessed, setSignProcessed] = useState<ProcessedImage | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Title for SEO
  useEffect(() => {
    let title = "PHOTORESIZER: Govt Exam Photo Maker";
    if (activeTab === 'home') {
      title = `Resize Photo & Sign for ${selectedExam.name.split('(')[0].trim()} - ${title}`;
    } else if (activeTab === 'blog') {
      title = `Exam Photo Guidelines & Dimensions - ${title}`;
    } else if (activeTab === 'faq') {
      title = `FAQ - ${title}`;
    }
    document.title = title;
  }, [activeTab, selectedExam]);

  // Reset results when exam changes to avoid confusion
  useEffect(() => {
    setPhotoProcessed(null);
    setSignProcessed(null);
  }, [selectedExam]);

  // Theme Effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handlers
  const handlePhotoUpload = async (file: File) => {
    const url = await readFileAsDataURL(file);
    setPhotoOriginal(url);
    setPhotoRotation(0);
    setPhotoProcessed(null); // Reset prev result
  };

  const handleSignUpload = async (file: File) => {
    const url = await readFileAsDataURL(file);
    setSignOriginal(url);
    setSignRotation(0);
    setSignProcessed(null);
  };

  const updateCustomExam = (field: string, value: string | number, type: 'photo' | 'signature') => {
      setSelectedExam(prev => ({
          ...prev,
          [type]: {
              ...prev[type],
              [field]: Number(value)
          }
      }));
  };

  const processImages = async () => {
    setIsProcessing(true);
    try {
      if (photoOriginal) {
        // Format Date to DD-MM-YYYY for India
        let formattedDate = photoDate;
        if (photoDate) {
           const [year, month, day] = photoDate.split('-');
           formattedDate = `${day}-${month}-${year}`;
        }

        const res = await processImage(photoOriginal, {
          width: selectedExam.photo.width,
          height: selectedExam.photo.height,
          maxKB: selectedExam.photo.maxKB,
          grayscale: photoGrayscale,
          brightness: photoBrightness,
          contrast: photoContrast,
          resizeMode: selectedExam.photo.resizeMode,
          rotation: photoRotation,
          textOverlay: addDate ? { name: photoName, date: formattedDate } : undefined
        });
        setPhotoProcessed({
          originalUrl: photoOriginal,
          processedUrl: res.url,
          fileSizeKB: res.sizeKB,
          width: selectedExam.photo.width,
          height: selectedExam.photo.height,
          name: `photo_${selectedExam.id}.jpg`
        });
      }

      if (signOriginal) {
        const res = await processImage(signOriginal, {
          width: selectedExam.signature.width,
          height: selectedExam.signature.height,
          maxKB: selectedExam.signature.maxKB,
          grayscale: signGrayscale,
          brightness: signBrightness,
          contrast: signContrast,
          resizeMode: selectedExam.signature.resizeMode,
          rotation: signRotation
        });
        setSignProcessed({
          originalUrl: signOriginal,
          processedUrl: res.url,
          fileSizeKB: res.sizeKB,
          width: selectedExam.signature.width,
          height: selectedExam.signature.height,
          name: `sign_${selectedExam.id}.jpg`
        });
      }
    } catch (error) {
      console.error("Processing failed", error);
      alert(TRANSLATIONS[lang].error_compression);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyRequirements = () => {
    const text = `Exam: ${selectedExam.name}
Photo: ${selectedExam.photo.width}x${selectedExam.photo.height}px, ${selectedExam.photo.minKB}-${selectedExam.photo.maxKB}KB
Signature: ${selectedExam.signature.width}x${selectedExam.signature.height}px, ${selectedExam.signature.minKB}-${selectedExam.signature.maxKB}KB`;
    navigator.clipboard.writeText(text);
    alert('Requirements copied to clipboard!');
  };

  const downloadAsPDF = () => {
    if (!photoProcessed && !signProcessed) return;

    const doc = new jsPDF();
    const margin = 20;
    let currentY = margin;

    doc.setFontSize(18);
    doc.text('Exam Application Documents', margin, currentY);
    currentY += 10;
    doc.setFontSize(12);
    doc.text(`Exam: ${selectedExam.name}`, margin, currentY);
    currentY += 15;

    if (photoProcessed && photoProcessed.processedUrl) {
      doc.text('Photograph:', margin, currentY);
      currentY += 5;
      // Calculate aspect ratio for display
      const imgWidth = 40; // 40mm wide
      const imgHeight = (selectedExam.photo.height / selectedExam.photo.width) * imgWidth;
      doc.addImage(photoProcessed.processedUrl, 'JPEG', margin, currentY, imgWidth, imgHeight);
      currentY += imgHeight + 15;
    }

    if (signProcessed && signProcessed.processedUrl) {
      doc.text('Signature:', margin, currentY);
      currentY += 5;
      const imgWidth = 50; // 50mm wide
      const imgHeight = (selectedExam.signature.height / selectedExam.signature.width) * imgWidth;
      doc.addImage(signProcessed.processedUrl, 'JPEG', margin, currentY, imgWidth, imgHeight);
    }

    doc.save(`exam_docs_${selectedExam.id}.pdf`);
  };

  const resetAll = () => {
    setPhotoOriginal(null);
    setPhotoProcessed(null);
    setPhotoRotation(0);
    setPhotoBrightness(0);
    setPhotoContrast(0);
    setPhotoGrayscale(false);
    
    setSignOriginal(null);
    setSignProcessed(null);
    setSignRotation(0);
    setSignBrightness(0);
    setSignContrast(0);
    setSignGrayscale(true);
    
    setPhotoName('');
    setPhotoDate('');
    setAddDate(false);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-gray-950 transition-colors duration-200 relative overflow-x-hidden">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand/10 dark:bg-brand/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 dark:bg-accent/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        isScrolled={isScrolled} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <Header lang={lang} onSelectExam={setSelectedExam} />

            <div className="max-w-5xl mx-auto">
              <AdPlaceholder text={t.ad_placeholder} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-24 mt-12">
              {/* Left Column: Controls */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white dark:bg-gray-900/50 p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 lg:sticky lg:top-28 relative overflow-hidden group/controls">
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand/5 dark:bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none transition-opacity duration-500 opacity-50 group-hover/controls:opacity-100"></div>
                  <div className="relative z-10">
                    <ExamDropdown 
                      selectedExam={selectedExam} 
                      onSelect={setSelectedExam} 
                      label={t.selectExam}
                    />

                  {/* CUSTOM DIMENSION INPUTS */}
                  {selectedExam.id === 'custom' && (
                      <div className="mb-8 p-6 md:p-8 bg-white/80 dark:bg-gray-900/40 backdrop-blur-xl rounded-[2.5rem] border border-gray-100/50 dark:border-gray-800/50 animate-fade-in shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 dark:bg-cyan-500/5 blur-[40px] rounded-full pointer-events-none"></div>
                          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6 flex items-center gap-2 relative z-10">
                            <Settings size={14}/> {t.customSize}
                          </h4>
                          
                          <div className="space-y-6 relative z-10">
                              {/* Photo Inputs */}
                              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md p-5 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-brand dark:text-cyan-400 mb-4 block flex items-center gap-2"><Camera size={12}/> Photo (px & KB)</label>
                                  <div className="grid grid-cols-2 gap-4">
                                      <input type="number" placeholder="W" value={selectedExam.photo.width} onChange={(e) => updateCustomExam('width', e.target.value, 'photo')} className="p-4 text-sm font-bold border-2 rounded-2xl bg-gray-50/80 dark:bg-gray-900/80 dark:text-white border-gray-200/80 dark:border-gray-800 focus:ring-4 focus:ring-brand/10 dark:focus:ring-cyan-500/10 focus:border-brand dark:focus:border-cyan-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 shadow-inner" />
                                      <input type="number" placeholder="H" value={selectedExam.photo.height} onChange={(e) => updateCustomExam('height', e.target.value, 'photo')} className="p-4 text-sm font-bold border-2 rounded-2xl bg-gray-50/80 dark:bg-gray-900/80 dark:text-white border-gray-200/80 dark:border-gray-800 focus:ring-4 focus:ring-brand/10 dark:focus:ring-cyan-500/10 focus:border-brand dark:focus:border-cyan-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 shadow-inner" />
                                      <input type="number" placeholder="Min KB" value={selectedExam.photo.minKB} onChange={(e) => updateCustomExam('minKB', e.target.value, 'photo')} className="p-4 text-sm font-bold border-2 rounded-2xl bg-gray-50/80 dark:bg-gray-900/80 dark:text-white border-gray-200/80 dark:border-gray-800 focus:ring-4 focus:ring-brand/10 dark:focus:ring-cyan-500/10 focus:border-brand dark:focus:border-cyan-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 shadow-inner" />
                                      <input type="number" placeholder="Max KB" value={selectedExam.photo.maxKB} onChange={(e) => updateCustomExam('maxKB', e.target.value, 'photo')} className="p-4 text-sm font-bold border-2 rounded-2xl bg-gray-50/80 dark:bg-gray-900/80 dark:text-white border-gray-200/80 dark:border-gray-800 focus:ring-4 focus:ring-brand/10 dark:focus:ring-cyan-500/10 focus:border-brand dark:focus:border-cyan-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 shadow-inner" />
                                  </div>
                              </div>

                              {/* Sign Inputs */}
                              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md p-5 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-4 block flex items-center gap-2"><FileText size={12}/> Signature (px & KB)</label>
                                  <div className="grid grid-cols-2 gap-4">
                                      <input type="number" placeholder="W" value={selectedExam.signature.width} onChange={(e) => updateCustomExam('width', e.target.value, 'signature')} className="p-4 text-sm font-bold border-2 rounded-2xl bg-gray-50/80 dark:bg-gray-900/80 dark:text-white border-gray-200/80 dark:border-gray-800 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 shadow-inner" />
                                      <input type="number" placeholder="H" value={selectedExam.signature.height} onChange={(e) => updateCustomExam('height', e.target.value, 'signature')} className="p-4 text-sm font-bold border-2 rounded-2xl bg-gray-50/80 dark:bg-gray-900/80 dark:text-white border-gray-200/80 dark:border-gray-800 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 shadow-inner" />
                                      <input type="number" placeholder="Min KB" value={selectedExam.signature.minKB} onChange={(e) => updateCustomExam('minKB', e.target.value, 'signature')} className="p-4 text-sm font-bold border-2 rounded-2xl bg-gray-50/80 dark:bg-gray-900/80 dark:text-white border-gray-200/80 dark:border-gray-800 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 shadow-inner" />
                                      <input type="number" placeholder="Max KB" value={selectedExam.signature.maxKB} onChange={(e) => updateCustomExam('maxKB', e.target.value, 'signature')} className="p-4 text-sm font-bold border-2 rounded-2xl bg-gray-50/80 dark:bg-gray-900/80 dark:text-white border-gray-200/80 dark:border-gray-800 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 shadow-inner" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  <div className="mt-8 space-y-6 relative">
                    <button 
                      onClick={copyRequirements}
                      className="absolute -top-12 right-0 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-gray-500 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-gray-800 px-4 py-2 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 z-20 group"
                      title="Copy Requirements"
                    >
                      <Copy size={14} className="group-hover:scale-110 transition-transform" /> Copy Specs
                    </button>
                    
                    <div className="p-6 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-[2rem] border border-gray-200/50 dark:border-gray-800/50 transition-all duration-500 hover:shadow-[0_8px_30px_-10px_rgba(79,70,229,0.15)] dark:hover:shadow-[0_8px_30px_-10px_rgba(6,182,212,0.15)] hover:border-brand/20 dark:hover:border-cyan-500/20 group relative overflow-hidden hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent dark:from-cyan-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 dark:bg-cyan-500/10 blur-[40px] rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 dark:bg-blue-500/5 blur-[30px] rounded-full pointer-events-none"></div>
                      <h4 className="text-[11px] font-black text-brand dark:text-cyan-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3 relative z-10">
                        <div className="p-2.5 bg-brand/10 dark:bg-cyan-500/10 rounded-xl shadow-inner"><Camera size={14}/></div> {t.photoParams}
                      </h4>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm relative z-10">
                        <div className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-widest flex items-center">{t.width}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white bg-white/80 dark:bg-gray-900/80 px-3 py-1.5 rounded-xl border border-gray-100/50 dark:border-gray-800/50 shadow-sm">{selectedExam.photo.width}px</div>
                        <div className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-widest flex items-center">{t.height}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white bg-white/80 dark:bg-gray-900/80 px-3 py-1.5 rounded-xl border border-gray-100/50 dark:border-gray-800/50 shadow-sm">{selectedExam.photo.height}px</div>
                        <div className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-widest flex items-center">{t.minSize}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white bg-white/80 dark:bg-gray-900/80 px-3 py-1.5 rounded-xl border border-gray-100/50 dark:border-gray-800/50 shadow-sm">{selectedExam.photo.minKB}KB</div>
                        <div className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-widest flex items-center">{t.maxSize}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white bg-white/80 dark:bg-gray-900/80 px-3 py-1.5 rounded-xl border border-gray-100/50 dark:border-gray-800/50 shadow-sm">{selectedExam.photo.maxKB}KB</div>
                        <div className="col-span-2 border-t border-gray-100 dark:border-gray-800/50 mt-4 pt-5 text-[10px] text-gray-500 dark:text-gray-400 font-bold flex justify-between items-center uppercase tracking-widest">
                            <span>Resize Mode</span> <span className="text-brand dark:text-cyan-400 bg-brand/5 dark:bg-cyan-500/10 px-3 py-1.5 rounded-xl shadow-sm border border-brand/10 dark:border-cyan-500/20">{selectedExam.photo.resizeMode}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-[2rem] border border-gray-200/50 dark:border-gray-800/50 transition-all duration-500 hover:shadow-[0_8px_30px_-10px_rgba(249,115,22,0.15)] dark:hover:shadow-[0_8px_30px_-10px_rgba(249,115,22,0.15)] hover:border-orange-500/20 group relative overflow-hidden hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[40px] rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/5 blur-[30px] rounded-full pointer-events-none"></div>
                      <h4 className="text-[11px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3 relative z-10">
                        <div className="p-2.5 bg-orange-500/10 rounded-xl shadow-inner"><FileText size={14}/></div> {t.signParams}
                      </h4>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm relative z-10">
                        <div className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-widest flex items-center">{t.width}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white bg-white/80 dark:bg-gray-900/80 px-3 py-1.5 rounded-xl border border-gray-100/50 dark:border-gray-800/50 shadow-sm">{selectedExam.signature.width}px</div>
                        <div className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-widest flex items-center">{t.height}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white bg-white/80 dark:bg-gray-900/80 px-3 py-1.5 rounded-xl border border-gray-100/50 dark:border-gray-800/50 shadow-sm">{selectedExam.signature.height}px</div>
                        <div className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-widest flex items-center">{t.minSize}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white bg-white/80 dark:bg-gray-900/80 px-3 py-1.5 rounded-xl border border-gray-100/50 dark:border-gray-800/50 shadow-sm">{selectedExam.signature.minKB}KB</div>
                        <div className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-widest flex items-center">{t.maxSize}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white bg-white/80 dark:bg-gray-900/80 px-3 py-1.5 rounded-xl border border-gray-100/50 dark:border-gray-800/50 shadow-sm">{selectedExam.signature.maxKB}KB</div>
                        <div className="col-span-2 border-t border-gray-100 dark:border-gray-800/50 mt-4 pt-5 text-[10px] text-gray-500 dark:text-gray-400 font-bold flex justify-between items-center uppercase tracking-widest">
                            <span>Resize Mode</span> <span className="text-orange-600 dark:text-orange-400 bg-orange-500/5 px-3 py-1.5 rounded-xl shadow-sm border border-orange-500/10">{selectedExam.signature.resizeMode}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Uploaders */}
              <div className="lg:col-span-8 space-y-12">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-brand/20 to-brand/5 dark:from-cyan-500/20 dark:to-cyan-500/5 rounded-2xl border border-brand/10 dark:border-cyan-500/20 shadow-sm relative overflow-hidden group">
                      <div className="absolute inset-0 bg-brand/10 dark:bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <Upload size={24} className="text-brand dark:text-cyan-400 relative z-10" />
                    </div>
                    {t.upload_section || 'Upload Section'}
                  </h2>
                  <button 
                    onClick={resetAll}
                    className="group text-[11px] flex items-center gap-2 text-red-500 hover:text-white font-black transition-all bg-red-50 dark:bg-red-900/20 hover:bg-red-500 dark:hover:bg-red-600 px-5 py-2.5 rounded-xl border border-red-100 dark:border-red-800 uppercase tracking-[0.2em] shadow-sm hover:shadow-md hover:shadow-red-500/20 active:scale-95"
                  >
                    <Trash2 size={14} className="group-hover:rotate-12 transition-transform" /> {t.resetAll}
                  </button>
                </div>
                
                {/* Photo Section */}
                <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-3xl p-6 md:p-10 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] border border-gray-200/50 dark:border-gray-800/50 overflow-hidden relative group/section transition-all duration-500 hover:shadow-[0_16px_60px_-15px_rgba(79,70,229,0.15)] dark:hover:shadow-[0_16px_60px_-15px_rgba(6,182,212,0.15)] hover:border-brand/20 dark:hover:border-cyan-500/20">
                   <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent dark:from-cyan-500/5 opacity-50 group-hover/section:opacity-100 transition-opacity duration-500"></div>
                   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-brand/10 to-transparent dark:from-cyan-500/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700 opacity-40 group-hover/section:opacity-80 translate-x-1/3 -translate-y-1/3"></div>
                   <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-accent/10 to-transparent dark:from-blue-500/10 blur-[60px] rounded-full pointer-events-none transition-opacity duration-700 opacity-30 group-hover/section:opacity-60 -translate-x-1/3 translate-y-1/3"></div>
                   <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                      <div className="space-y-6">
                        <ImageUploader 
                            title={t.uploadPhoto}
                            image={photoOriginal} 
                            onUpload={handlePhotoUpload} 
                            onClear={() => { setPhotoOriginal(null); setPhotoProcessed(null); }}
                            label={t.dragDrop}
                            rotation={photoRotation}
                            onRotate={setPhotoRotation}
                            lang={lang}
                        />
                        <ImageControls 
                          brightness={photoBrightness} setBrightness={setPhotoBrightness}
                          contrast={photoContrast} setContrast={setPhotoContrast}
                          grayscale={photoGrayscale} setGrayscale={setPhotoGrayscale}
                          t={t}
                        />

                        {/* NAME & DATE OVERLAY TOGGLE */}
                        <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-gray-200/50 dark:border-gray-800/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] relative overflow-hidden mt-6 group/date transition-all duration-500 hover:shadow-[0_8px_30px_-10px_rgba(79,70,229,0.15)] dark:hover:shadow-[0_8px_30px_-10px_rgba(6,182,212,0.15)] hover:border-brand/20 dark:hover:border-cyan-500/20">
                           <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent dark:from-cyan-500/5 opacity-50 group-hover/date:opacity-100 transition-opacity duration-500"></div>
                           <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand/10 dark:bg-cyan-500/10 blur-[40px] rounded-full pointer-events-none transition-opacity duration-500 opacity-50 group-hover/date:opacity-100"></div>
                           <div className="flex items-center gap-4 mb-2 relative z-10">
                             <label className="flex items-center gap-4 cursor-pointer select-none group">
                               <div className="relative flex items-center">
                                 <input 
                                   type="checkbox" 
                                   checked={addDate} 
                                   onChange={(e) => setAddDate(e.target.checked)}
                                   className="peer w-7 h-7 appearance-none border-2 border-gray-300 dark:border-gray-600 rounded-xl checked:bg-brand dark:checked:bg-cyan-500 checked:border-brand dark:checked:border-cyan-500 transition-all cursor-pointer shadow-sm group-hover:border-brand/50 dark:group-hover:border-cyan-500/50 bg-white/50 dark:bg-gray-800/50"
                                 />
                                 <svg className="absolute w-4 h-4 text-white left-1.5 top-1.5 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity drop-shadow-sm" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                 </svg>
                               </div>
                               <span className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest group-hover:text-brand dark:group-hover:text-cyan-400 transition-colors">{t.addDate}</span>
                             </label>
                           </div>
                           
                           {addDate && (
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 animate-fade-in relative z-10">
                                  <div className="space-y-3">
                                     <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 block">{t.name}</label>
                                     <input 
                                        type="text" 
                                        value={photoName}
                                        onChange={(e) => setPhotoName(e.target.value)}
                                        placeholder="e.g. John Doe"
                                        className="w-full p-4 text-sm font-bold border-2 rounded-2xl bg-white/80 dark:bg-gray-900/80 dark:text-white border-gray-200/80 dark:border-gray-700/80 focus:ring-4 focus:ring-brand/10 dark:focus:ring-cyan-500/10 focus:border-brand dark:focus:border-cyan-500 outline-none transition-all shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 hover:border-gray-300 dark:hover:border-gray-600"
                                     />
                                  </div>
                                  <div className="space-y-3">
                                     <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 block">{t.date}</label>
                                     <input 
                                        type="date" 
                                        value={photoDate}
                                        onChange={(e) => setPhotoDate(e.target.value)}
                                        className="w-full p-4 text-sm font-bold border-2 rounded-2xl bg-white/80 dark:bg-gray-900/80 dark:text-white border-gray-200/80 dark:border-gray-700/80 focus:ring-4 focus:ring-brand/10 dark:focus:ring-cyan-500/10 focus:border-brand dark:focus:border-cyan-500 outline-none transition-all shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
                                     />
                                  </div>
                               </div>
                           )}
                        </div>

                      </div>
                      <div className="flex flex-col justify-end h-full min-h-[200px]">
                         {photoProcessed ? (
                            <ResultCard 
                              processedUrl={photoProcessed.processedUrl}
                              fileSizeKB={photoProcessed.fileSizeKB}
                              width={photoProcessed.width}
                              height={photoProcessed.height}
                              reqMin={selectedExam.photo.minKB}
                              reqMax={selectedExam.photo.maxKB}
                              fileName={photoProcessed.name}
                              onDownload={() => downloadImage(photoProcessed.processedUrl!, photoProcessed.name)}
                              type={t.photoParams.split(' ')[0]}
                            />
                         ) : (
                           <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-[2rem] bg-gray-50/50 dark:bg-gray-900/50 p-6 md:p-8 text-center group transition-colors hover:border-brand/20">
                             <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                               <Camera size={32} className="opacity-20 group-hover:opacity-40 transition-opacity" />
                             </div>
                             <span className="font-black uppercase tracking-widest text-[10px] mb-1">{t.result} {t.preview}</span>
                             <span className="text-xs text-gray-500 mt-1 max-w-[200px] font-medium leading-relaxed">Preview will appear here after processing</span>
                           </div>
                         )}
                      </div>
                   </div>
                </div>

                {/* Signature Section */}
                <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-3xl p-6 md:p-10 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] border border-gray-200/50 dark:border-gray-800/50 overflow-hidden relative group/section transition-all duration-500 hover:shadow-[0_16px_60px_-15px_rgba(249,115,22,0.15)] dark:hover:shadow-[0_16px_60px_-15px_rgba(249,115,22,0.15)] hover:border-orange-500/20">
                   <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-50 group-hover/section:opacity-100 transition-opacity duration-500"></div>
                   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/10 to-transparent blur-[80px] rounded-full pointer-events-none transition-opacity duration-700 opacity-40 group-hover/section:opacity-80 translate-x-1/3 -translate-y-1/3"></div>
                   <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-amber-500/10 to-transparent blur-[60px] rounded-full pointer-events-none transition-opacity duration-700 opacity-30 group-hover/section:opacity-60 -translate-x-1/3 translate-y-1/3"></div>
                   <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                      <div className="space-y-6">
                          <ImageUploader 
                            title={t.uploadSign}
                            image={signOriginal} 
                            onUpload={handleSignUpload} 
                            onClear={() => { setSignOriginal(null); setSignProcessed(null); }}
                            label={t.dragDrop}
                            rotation={signRotation}
                            onRotate={setSignRotation}
                            lang={lang}
                          />
                          <ImageControls 
                            brightness={signBrightness} setBrightness={setSignBrightness}
                            contrast={signContrast} setContrast={setSignContrast}
                            grayscale={signGrayscale} setGrayscale={setSignGrayscale}
                            t={t}
                          />
                      </div>
                       <div className="flex flex-col justify-end h-full min-h-[200px]">
                         {signProcessed ? (
                            <ResultCard 
                              processedUrl={signProcessed.processedUrl}
                              fileSizeKB={signProcessed.fileSizeKB}
                              width={signProcessed.width}
                              height={signProcessed.height}
                              reqMin={selectedExam.signature.minKB}
                              reqMax={selectedExam.signature.maxKB}
                              fileName={signProcessed.name}
                              onDownload={() => downloadImage(signProcessed.processedUrl!, signProcessed.name)}
                              type={t.signParams.split(' ')[0]}
                            />
                         ) : (
                           <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-[2rem] bg-gray-50/50 dark:bg-gray-900/50 p-6 md:p-8 text-center group transition-colors hover:border-orange-500/20">
                             <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                               <FileText size={32} className="opacity-20 group-hover:opacity-40 transition-opacity" />
                             </div>
                             <span className="font-black uppercase tracking-widest text-[10px] mb-1">{t.result} {t.preview}</span>
                             <span className="text-xs text-gray-500 mt-1 max-w-[200px] font-medium leading-relaxed">Preview will appear here after processing</span>
                           </div>
                         )}
                      </div>
                   </div>
                </div>

                {/* Global Action */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 relative z-20">
                  <button 
                    onClick={processImages}
                    disabled={(!photoOriginal && !signOriginal) || isProcessing}
                    className={`
                      relative overflow-hidden w-full sm:w-2/3 px-12 py-6 rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all duration-500 group
                      ${(!photoOriginal && !signOriginal) || isProcessing
                        ? 'bg-gray-100/50 text-gray-400 cursor-not-allowed dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700'
                        : 'bg-gradient-to-r from-brand via-accent to-brand bg-[length:200%_auto] animate-gradient text-white hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.5)] dark:hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.5)] hover:-translate-y-1.5 active:scale-[0.98]'
                      }
                    `}
                  >
                    {!((!photoOriginal && !signOriginal) || isProcessing) && (
                      <>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand via-accent to-brand blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 -z-10"></div>
                      </>
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      {isProcessing ? (
                         <><div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full"/> {t.processing}</>
                      ) : (
                         <><Zap size={28} className={(!photoOriginal && !signOriginal) ? "" : "fill-current animate-pulse-slow"}/> {t.compress}</>
                      )}
                    </span>
                  </button>

                  {(photoProcessed || signProcessed) && (
                    <button
                      onClick={downloadAsPDF}
                      className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-6 rounded-[2.5rem] font-black text-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl text-brand dark:text-cyan-400 border-2 border-brand/20 dark:border-cyan-500/30 hover:border-brand dark:hover:border-cyan-400 hover:bg-brand/5 dark:hover:bg-cyan-500/10 shadow-[0_8px_30px_-10px_rgba(79,70,229,0.15)] dark:shadow-[0_8px_30px_-10px_rgba(6,182,212,0.15)] transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent dark:from-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <FileDown size={24} className="group-hover:-translate-y-1 transition-transform duration-300 relative z-10" />
                      <span className="relative z-10">{t.downloadPDF}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* SEO Content Section for Home Page */}
            <HowItWorksSection />
            <SupportedExamsSection />
            <MonetizationSection lang={lang} />
            <WhyUseSection lang={lang} />
            <TestimonialsSection />
            <AdPlaceholder text={t.ad_placeholder} />
          </div>
        )}

        {activeTab === 'faq' && <FAQSection lang={lang} />}
        {activeTab === 'blog' && <BlogSection lang={lang} />}

      </main>

      <Footer lang={lang} />
      
      {/* Floating WhatsApp Contact Button */}
      <a
        href="https://wa.me/917600885080"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-300 group flex items-center justify-center"
        title="Contact us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="fill-current text-white"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.065-.301-.15-1.265-.462-2.406-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.21 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.195-.572-.345z"></path><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.45zM12.046 21.77c-1.775 0-3.516-.476-5.04-1.375l-.36-.214-3.75.975.996-3.645-.235-.373c-.987-1.565-1.508-3.38-1.508-5.245 0-5.445 4.445-9.885 9.9-9.885 2.64 0 5.12 1.025 6.985 2.885 1.865 1.86 2.89 4.335 2.89 6.975-.005 5.44-4.45 9.885-9.888 9.885z"></path></svg>
      </a>
    </div>
  );
}