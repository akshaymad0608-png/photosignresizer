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
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-gray-900 transition-colors duration-200 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-20 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 mt-12">
              {/* Left Column: Controls */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 lg:sticky lg:top-28">
                  <ExamDropdown 
                    selectedExam={selectedExam} 
                    onSelect={setSelectedExam} 
                    label={t.selectExam}
                  />

                  {/* CUSTOM DIMENSION INPUTS */}
                  {selectedExam.id === 'custom' && (
                      <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-100 dark:border-gray-700 animate-fade-in">
                          <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                            <Settings size={14}/> {t.customSize}
                          </h4>
                          
                          <div className="space-y-6">
                              {/* Photo Inputs */}
                              <div>
                                  <label className="text-[10px] font-black uppercase tracking-tighter text-blue-600 dark:text-blue-400 mb-2 block">Photo (px & KB)</label>
                                  <div className="grid grid-cols-2 gap-3">
                                      <input type="number" placeholder="W" value={selectedExam.photo.width} onChange={(e) => updateCustomExam('width', e.target.value, 'photo')} className="p-3 text-sm font-bold border-2 rounded-xl bg-white dark:bg-gray-800 dark:text-white border-gray-100 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
                                      <input type="number" placeholder="H" value={selectedExam.photo.height} onChange={(e) => updateCustomExam('height', e.target.value, 'photo')} className="p-3 text-sm font-bold border-2 rounded-xl bg-white dark:bg-gray-800 dark:text-white border-gray-100 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
                                      <input type="number" placeholder="Min KB" value={selectedExam.photo.minKB} onChange={(e) => updateCustomExam('minKB', e.target.value, 'photo')} className="p-3 text-sm font-bold border-2 rounded-xl bg-white dark:bg-gray-800 dark:text-white border-gray-100 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
                                      <input type="number" placeholder="Max KB" value={selectedExam.photo.maxKB} onChange={(e) => updateCustomExam('maxKB', e.target.value, 'photo')} className="p-3 text-sm font-bold border-2 rounded-xl bg-white dark:bg-gray-800 dark:text-white border-gray-100 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
                                  </div>
                              </div>

                              {/* Sign Inputs */}
                              <div>
                                  <label className="text-[10px] font-black uppercase tracking-tighter text-orange-600 dark:text-orange-400 mb-2 block">Signature (px & KB)</label>
                                  <div className="grid grid-cols-2 gap-3">
                                      <input type="number" placeholder="W" value={selectedExam.signature.width} onChange={(e) => updateCustomExam('width', e.target.value, 'signature')} className="p-3 text-sm font-bold border-2 rounded-xl bg-white dark:bg-gray-800 dark:text-white border-gray-100 dark:border-gray-700 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all" />
                                      <input type="number" placeholder="H" value={selectedExam.signature.height} onChange={(e) => updateCustomExam('height', e.target.value, 'signature')} className="p-3 text-sm font-bold border-2 rounded-xl bg-white dark:bg-gray-800 dark:text-white border-gray-100 dark:border-gray-700 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all" />
                                      <input type="number" placeholder="Min KB" value={selectedExam.signature.minKB} onChange={(e) => updateCustomExam('minKB', e.target.value, 'signature')} className="p-3 text-sm font-bold border-2 rounded-xl bg-white dark:bg-gray-800 dark:text-white border-gray-100 dark:border-gray-700 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all" />
                                      <input type="number" placeholder="Max KB" value={selectedExam.signature.maxKB} onChange={(e) => updateCustomExam('maxKB', e.target.value, 'signature')} className="p-3 text-sm font-bold border-2 rounded-xl bg-white dark:bg-gray-800 dark:text-white border-gray-100 dark:border-gray-700 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  <div className="mt-8 space-y-6 relative">
                    <button 
                      onClick={copyRequirements}
                      className="absolute -top-10 right-0 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 text-gray-400 hover:text-brand dark:hover:text-blue-400 transition-colors"
                      title="Copy Requirements"
                    >
                      <Copy size={12} /> Copy Specs
                    </button>
                    
                    <div className="p-5 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-100/50 dark:border-blue-800/50 transition-all hover:shadow-lg group">
                      <h4 className="text-[10px] font-black text-brand dark:text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Camera size={14}/> {t.photoParams}
                      </h4>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                        <div className="text-gray-400 font-bold uppercase text-[10px] tracking-tighter">{t.width}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white">{selectedExam.photo.width}px</div>
                        <div className="text-gray-400 font-bold uppercase text-[10px] tracking-tighter">{t.height}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white">{selectedExam.photo.height}px</div>
                        <div className="text-gray-400 font-bold uppercase text-[10px] tracking-tighter">{t.minSize}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white">{selectedExam.photo.minKB}KB</div>
                        <div className="text-gray-400 font-bold uppercase text-[10px] tracking-tighter">{t.maxSize}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white">{selectedExam.photo.maxKB}KB</div>
                        <div className="col-span-2 border-t border-blue-100 dark:border-blue-800/50 mt-3 pt-3 text-[10px] text-gray-400 font-bold flex justify-between uppercase">
                            <span>Resize Mode</span> <span className="text-brand dark:text-blue-400">{selectedExam.photo.resizeMode}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-orange-50/50 dark:bg-orange-900/10 rounded-2xl border border-orange-100/50 dark:border-orange-800/50 transition-all hover:shadow-lg group">
                      <h4 className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FileText size={14}/> {t.signParams}
                      </h4>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                        <div className="text-gray-400 font-bold uppercase text-[10px] tracking-tighter">{t.width}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white">{selectedExam.signature.width}px</div>
                        <div className="text-gray-400 font-bold uppercase text-[10px] tracking-tighter">{t.height}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white">{selectedExam.signature.height}px</div>
                        <div className="text-gray-400 font-bold uppercase text-[10px] tracking-tighter">{t.minSize}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white">{selectedExam.signature.minKB}KB</div>
                        <div className="text-gray-400 font-bold uppercase text-[10px] tracking-tighter">{t.maxSize}</div> <div className="font-mono font-black text-right text-gray-900 dark:text-white">{selectedExam.signature.maxKB}KB</div>
                        <div className="col-span-2 border-t border-orange-100 dark:border-orange-800/50 mt-3 pt-3 text-[10px] text-gray-400 font-bold flex justify-between uppercase">
                            <span>Resize Mode</span> <span className="text-orange-600 dark:text-orange-400">{selectedExam.signature.resizeMode}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Uploaders */}
              <div className="lg:col-span-8 space-y-12">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                    <div className="p-2 bg-brand/10 dark:bg-blue-900/30 rounded-xl">
                      <Upload size={20} className="text-brand dark:text-blue-400" />
                    </div>
                    {t.upload_section || 'Upload Section'}
                  </h2>
                  <button 
                    onClick={resetAll}
                    className="group text-xs flex items-center gap-2 text-red-500 hover:text-white font-black transition-all bg-red-50 dark:bg-red-900/20 hover:bg-red-500 dark:hover:bg-red-600 px-4 py-2 rounded-xl border border-red-100 dark:border-red-800 uppercase tracking-widest"
                  >
                    <Trash2 size={14} className="group-hover:rotate-12 transition-transform" /> {t.resetAll}
                  </button>
                </div>
                
                {/* Photo Section */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden relative">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl rounded-full"></div>
                   <div className="grid md:grid-cols-2 gap-12 relative z-10">
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
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                           <div className="flex items-center gap-3 mb-4">
                             <label htmlFor="addDate" className="relative inline-flex items-center cursor-pointer">
                               <input 
                                 type="checkbox" 
                                 id="addDate" 
                                 checked={addDate} 
                                 onChange={(e) => setAddDate(e.target.checked)}
                                 className="sr-only peer"
                               />
                               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand"></div>
                             </label>
                             <label htmlFor="addDate" className="text-sm font-black text-gray-700 dark:text-gray-300 cursor-pointer select-none uppercase tracking-wider">
                               {t.addDate}
                             </label>
                           </div>
                           
                           {addDate && (
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 animate-fade-in">
                                  <div>
                                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 block mb-2">{t.name}</label>
                                     <input 
                                        type="text" 
                                        value={photoName}
                                        onChange={(e) => setPhotoName(e.target.value)}
                                        placeholder="Your Name"
                                        className="w-full p-3 text-sm font-bold border-2 rounded-xl bg-white dark:bg-gray-800 dark:text-white border-gray-100 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                     />
                                  </div>
                                  <div>
                                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 block mb-2">{t.date}</label>
                                     <input 
                                        type="date" 
                                        value={photoDate}
                                        onChange={(e) => setPhotoDate(e.target.value)}
                                        className="w-full p-3 text-sm font-bold border-2 rounded-xl bg-white dark:bg-gray-800 dark:text-white border-gray-100 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
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
                           <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-[2rem] bg-gray-50/50 dark:bg-gray-900/50 p-8 text-center group transition-colors hover:border-brand/20">
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
                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden relative">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full"></div>
                   <div className="grid md:grid-cols-2 gap-12 relative z-10">
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
                           <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-[2rem] bg-gray-50/50 dark:bg-gray-900/50 p-8 text-center group transition-colors hover:border-orange-500/20">
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
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                  <button 
                    onClick={processImages}
                    disabled={(!photoOriginal && !signOriginal) || isProcessing}
                    className={`
                      relative overflow-hidden w-full sm:w-2/3 px-12 py-6 rounded-2xl font-black text-2xl shadow-2xl transition-all duration-300 group
                      ${(!photoOriginal && !signOriginal) || isProcessing
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800'
                        : 'bg-gradient-to-r from-brand via-blue-600 to-brand bg-[length:200%_auto] animate-gradient text-white hover:shadow-brand/40 hover:-translate-y-1.5 active:scale-95'
                      }
                    `}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      {isProcessing ? (
                         <><div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full"/> {t.processing}</>
                      ) : (
                         <><Zap size={28} className={(!photoOriginal && !signOriginal) ? "" : "fill-current"}/> {t.compress}</>
                      )}
                    </span>
                  </button>

                  {(photoProcessed || signProcessed) && (
                    <button
                      onClick={downloadAsPDF}
                      className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-6 rounded-2xl font-black text-xl bg-white dark:bg-gray-800 text-brand dark:text-blue-400 border-2 border-brand dark:border-blue-400 hover:bg-brand hover:text-white dark:hover:bg-blue-500 dark:hover:text-white shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
                    >
                      <FileDown size={24} />
                      {t.downloadPDF}
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
    </div>
  );
}