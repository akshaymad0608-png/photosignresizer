import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Camera, Settings, Upload, Copy, Zap, FileDown, Trash2, FileText
} from 'lucide-react';
import { EXAM_PRESETS, TRANSLATIONS } from '../constants';
import { ExamRequirement, Language, ProcessedImage } from '../types';
import { processImage, readFileAsDataURL } from '../utils/imageProcessing';
import ExamDropdown from '../components/ExamDropdown';
import ImageUploader from '../components/ImageUploader';
import ResultCard from '../components/ResultCard';
import FloatingShare from '../components/FloatingShare';

// --- New Components ---
import Navbar from '../components/Navbar';
import MobileBottomNav from '../components/MobileBottomNav';
import Header from '../components/Header';
import ImageControls from '../components/ImageControls';
import UpdatesMarquee from "../components/sections/UpdatesMarquee";

import RecentHistory from "../components/RecentHistory";
// Lazy loaded below the fold components
const Footer = React.lazy(() => import('../components/Footer'));
const ToolCategorySection = React.lazy(() => import('../components/sections/ToolCategorySection'));
const FAQSection = React.lazy(() => import('../components/sections/FAQSection'));
const HowItWorksSection = React.lazy(() => import('../components/sections/HowItWorksSection'));
const WhyUseSection = React.lazy(() => import('../components/sections/WhyUseSection'));
const BlogSection = React.lazy(() => import('../components/sections/BlogSection'));
const MajorExamsLinksSection = React.lazy(() => import('../components/sections/MajorExamsLinksSection'));
const LatestVacanciesSection = React.lazy(() => import('../components/sections/LatestVacanciesSection'));

// --- Main App ---

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // State
  const [lang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  // Sync activeTab with pathname
  const pathname = location.pathname;
  const activeTab = pathname === '/faq' ? 'faq' :
                    pathname === '/blog' ? 'blog' :
                    pathname === '/free-image-tools' ? 'tools' : 
                    pathname === '/jobs' ? 'jobs' :
                    pathname === '/links' ? 'links' : 'home';
  
  const handleTabChange = (tab: 'home' | 'faq' | 'blog' | 'tools' | 'jobs' | 'links') => {
    if (tab === 'faq') navigate('/faq');
    else if (tab === 'blog') navigate('/blog');
    else if (tab === 'tools') navigate('/free-image-tools');
    else if (tab === 'jobs') navigate('/jobs');
    else if (tab === 'links') navigate('/links');
    else navigate('/');
  };

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
  const [photoRemoveBg, setPhotoRemoveBg] = useState(false);
  const [photoProcessed, setPhotoProcessed] = useState<ProcessedImage | null>(null);
  
  const [signOriginal, setSignOriginal] = useState<string | null>(null);
  const [signRotation, setSignRotation] = useState(0);
  const [signBrightness, setSignBrightness] = useState(0);
  const [signContrast, setSignContrast] = useState(0);
  const [signGrayscale, setSignGrayscale] = useState(true);
  const [signRemoveBg, setSignRemoveBg] = useState(false);
  const [signProcessed, setSignProcessed] = useState<ProcessedImage | null>(null);
  const [history, setHistory] = useState<ProcessedImage[]>([]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Title for SEO
  useEffect(() => {
    let title = "PHOTORESIZER: Govt Exam Photo Maker | Resize & Compress Image Online";
    if (activeTab === 'home') {
      title = `Resize Photo & Sign for ${selectedExam.name.split('(')[0].trim()} - ${title}`;
    } else if (activeTab === 'blog') {
      title = `Exam Photo Guidelines & Dimensions - ${title}`;
    } else if (activeTab === 'faq') {
      title = `FAQ - ${title}`;
    } else if (activeTab === 'tools') {
      title = `All Files Converters & Free Image Tools - ${title}`;
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

  // Real-time processing for controls
  useEffect(() => {
    if (photoProcessed || signProcessed) {
      const timeoutId = setTimeout(() => {
        processImages();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    photoRotation, photoBrightness, photoContrast, photoGrayscale, photoRemoveBg,
    signRotation, signBrightness, signContrast, signGrayscale, signRemoveBg,
    addDate, photoName, photoDate
  ]);

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
    if ('vibrate' in navigator) navigator.vibrate(50);
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
          removeBg: photoRemoveBg,
          brightness: photoBrightness,
          contrast: photoContrast,
          resizeMode: selectedExam.photo.resizeMode,
          rotation: photoRotation,
          textOverlay: addDate ? { name: photoName, date: formattedDate } : undefined
        });
        const newPhoto = {
          originalUrl: photoOriginal,
          processedUrl: res.url,
          fileSizeKB: res.sizeKB,
          width: selectedExam.photo.width,
          height: selectedExam.photo.height,
          name: `photo_${selectedExam.id}.jpg`
        };
        setPhotoProcessed(newPhoto);
        setHistory(prev => [newPhoto, ...prev].slice(0, 5));
      }

      if (signOriginal) {
        const res = await processImage(signOriginal, {
          width: selectedExam.signature.width,
          height: selectedExam.signature.height,
          maxKB: selectedExam.signature.maxKB,
          grayscale: signGrayscale,
          removeBg: signRemoveBg,
          brightness: signBrightness,
          contrast: signContrast,
          resizeMode: selectedExam.signature.resizeMode,
          rotation: signRotation
        });
        const newSign = {
          originalUrl: signOriginal,
          processedUrl: res.url,
          fileSizeKB: res.sizeKB,
          width: selectedExam.signature.width,
          height: selectedExam.signature.height,
          name: `sign_${selectedExam.id}.jpg`
        };
        setSignProcessed(newSign);
        setHistory(prev => [newSign, ...prev].slice(0, 5));
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

  const downloadAsPDF = async () => {
    if (!photoProcessed && !signProcessed) return;

    const { jsPDF } = await import('jspdf');
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
      </div>
      
      <Navbar 
        lang={lang} 
        isScrolled={isScrolled} 
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-20 sm:pt-24 md:pt-24 lg:pt-24 pb-24 sm:pb-0">
        <div className="mb-6"><UpdatesMarquee setActiveTab={handleTabChange} /></div>
        {activeTab === 'home' && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 sm:mb-24 mt-4 sm:mt-8">
              {/* Left Column: Controls */}
              <div className="lg:col-span-4 space-y-6 sm:space-y-8">
                <div className="bg-white dark:bg-gray-900 p-5 sm:p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 lg:sticky lg:top-24">
                    <ExamDropdown 
                      selectedExam={selectedExam} 
                      onSelect={setSelectedExam} 
                      label={t.selectExam}
                    />

                  {/* CUSTOM DIMENSION INPUTS */}
                  {selectedExam.id === 'custom' && (
                      <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2">
                            <Settings size={14}/> {t.customSize}
                          </h2>
                          
                          <div className="space-y-6">
                              {/* Photo Inputs */}
                              <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand dark:text-accent mb-4 flex items-center gap-2"><Camera size={12}/> Photo (px & KB)</label>
                                  <div className="grid grid-cols-2 gap-3">
                                      <input type="number" placeholder="W" value={selectedExam.photo.width} onChange={(e) => updateCustomExam('width', e.target.value, 'photo')} className="p-3 text-sm font-semibold border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-colors placeholder:text-gray-400" />
                                      <input type="number" placeholder="H" value={selectedExam.photo.height} onChange={(e) => updateCustomExam('height', e.target.value, 'photo')} className="p-3 text-sm font-semibold border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-colors placeholder:text-gray-400" />
                                      <input type="number" placeholder="Min KB" value={selectedExam.photo.minKB} onChange={(e) => updateCustomExam('minKB', e.target.value, 'photo')} className="p-3 text-sm font-semibold border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-colors placeholder:text-gray-400" />
                                      <input type="number" placeholder="Max KB" value={selectedExam.photo.maxKB} onChange={(e) => updateCustomExam('maxKB', e.target.value, 'photo')} className="p-3 text-sm font-semibold border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-colors placeholder:text-gray-400" />
                                  </div>
                              </div>

                              {/* Sign Inputs */}
                              <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-accent mb-4 flex items-center gap-2"><FileText size={12}/> Signature (px & KB)</label>
                                  <div className="grid grid-cols-2 gap-3">
                                      <input type="number" placeholder="W" value={selectedExam.signature.width} onChange={(e) => updateCustomExam('width', e.target.value, 'signature')} className="p-3 text-sm font-semibold border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors placeholder:text-gray-400" />
                                      <input type="number" placeholder="H" value={selectedExam.signature.height} onChange={(e) => updateCustomExam('height', e.target.value, 'signature')} className="p-3 text-sm font-semibold border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors placeholder:text-gray-400" />
                                      <input type="number" placeholder="Min KB" value={selectedExam.signature.minKB} onChange={(e) => updateCustomExam('minKB', e.target.value, 'signature')} className="p-3 text-sm font-semibold border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors placeholder:text-gray-400" />
                                      <input type="number" placeholder="Max KB" value={selectedExam.signature.maxKB} onChange={(e) => updateCustomExam('maxKB', e.target.value, 'signature')} className="p-3 text-sm font-semibold border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors placeholder:text-gray-400" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  <div className="mt-8 space-y-4 relative">
                    <button 
                      onClick={copyRequirements}
                      className="text-xs font-semibold flex items-center justify-center gap-2 text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-brand bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg transition-colors w-full"
                      title="Copy Requirements"
                    >
                      <Copy size={14} /> Copy Specs
                    </button>
                    
                    <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h2 className="text-xs font-bold text-brand dark:text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Camera size={14}/> {t.photoParams}
                      </h2>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                        <div className="text-gray-500 dark:text-gray-400 font-medium text-xs tracking-wider flex items-center">{t.width}</div> <div className="font-mono text-right text-gray-900 dark:text-white">{selectedExam.photo.width}px</div>
                        <div className="text-gray-500 dark:text-gray-400 font-medium text-xs tracking-wider flex items-center">{t.height}</div> <div className="font-mono text-right text-gray-900 dark:text-white">{selectedExam.photo.height}px</div>
                        <div className="text-gray-500 dark:text-gray-400 font-medium text-xs tracking-wider flex items-center">{t.minSize}</div> <div className="font-mono text-right text-gray-900 dark:text-white">{selectedExam.photo.minKB}KB</div>
                        <div className="text-gray-500 dark:text-gray-400 font-medium text-xs tracking-wider flex items-center">{t.maxSize}</div> <div className="font-mono text-right text-gray-900 dark:text-white">{selectedExam.photo.maxKB}KB</div>
                        <div className="col-span-2 border-t border-gray-200 dark:border-gray-700 mt-2 pt-3 text-xs text-gray-500 dark:text-gray-400 font-medium flex justify-between items-center tracking-wider">
                            <span>Resize Mode</span> <span className="text-brand dark:text-accent font-semibold">{selectedExam.photo.resizeMode}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h2 className="text-xs font-bold text-accent dark:text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileText size={14}/> {t.signParams}
                      </h2>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                        <div className="text-gray-500 dark:text-gray-400 font-medium text-xs tracking-wider flex items-center">{t.width}</div> <div className="font-mono text-right text-gray-900 dark:text-white">{selectedExam.signature.width}px</div>
                        <div className="text-gray-500 dark:text-gray-400 font-medium text-xs tracking-wider flex items-center">{t.height}</div> <div className="font-mono text-right text-gray-900 dark:text-white">{selectedExam.signature.height}px</div>
                        <div className="text-gray-500 dark:text-gray-400 font-medium text-xs tracking-wider flex items-center">{t.minSize}</div> <div className="font-mono text-right text-gray-900 dark:text-white">{selectedExam.signature.minKB}KB</div>
                        <div className="text-gray-500 dark:text-gray-400 font-medium text-xs tracking-wider flex items-center">{t.maxSize}</div> <div className="font-mono text-right text-gray-900 dark:text-white">{selectedExam.signature.maxKB}KB</div>
                        <div className="col-span-2 border-t border-gray-200 dark:border-gray-700 mt-2 pt-3 text-xs text-gray-500 dark:text-gray-400 font-medium flex justify-between items-center tracking-wider">
                            <span>Resize Mode</span> <span className="text-accent dark:text-accent font-semibold">{selectedExam.signature.resizeMode}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Uploaders */}
              <div className="lg:col-span-8 space-y-8 sm:space-y-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 gap-4 sm:gap-0">
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-brand/10 dark:border-accent/20 shadow-sm relative overflow-hidden group">
                      <div className="absolute inset-0 bg-brand/10 dark:bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-brand dark:text-accent relative z-10" />
                    </div>
                    {t.upload_section || 'Upload Section'}
                  </h2>
                  <button 
                    onClick={resetAll}
                    className="group text-[10px] sm:text-[11px] flex items-center gap-2 text-red-500 hover:text-white font-black transition-all bg-red-50 dark:bg-red-900/20 hover:bg-red-500 dark:hover:bg-red-600 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-red-100 dark:border-red-800 uppercase tracking-[0.2em] shadow-sm hover:shadow-sm hover:shadow-sm active:scale-95"
                  >
                    <Trash2 size={14} className="group-hover:rotate-12 transition-transform" /> {t.resetAll}
                  </button>
                </div>
                
                {/* Photo Section */}
                <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
                   <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                      <div className="space-y-6">
                        <ImageUploader 
                            title={t.uploadPhoto}
                            image={photoOriginal} 
                            onUpload={handlePhotoUpload} 
                            onClear={() => { setPhotoOriginal(null); setPhotoProcessed(null); }}
                            rotation={photoRotation}
                            onRotate={setPhotoRotation}
                            onCropApply={(url) => { setPhotoOriginal(url); setPhotoProcessed(null); }}
                            lang={lang}
                        />
                        <ImageControls 
                          brightness={photoBrightness} setBrightness={setPhotoBrightness}
                          contrast={photoContrast} setContrast={setPhotoContrast}
                          grayscale={photoGrayscale} setGrayscale={setPhotoGrayscale}
                          removeBg={photoRemoveBg} setRemoveBg={setPhotoRemoveBg}
                          t={t}
                        />

                        {/* NAME & DATE OVERLAY TOGGLE */}
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mt-6">
                           <div className="flex items-center gap-4 mb-2">
                             <label className="flex items-center gap-4 cursor-pointer select-none">
                               <div className="relative flex items-center">
                                 <input 
                                   type="checkbox" 
                                   checked={addDate} 
                                   onChange={(e) => setAddDate(e.target.checked)}
                                   className="peer w-6 h-6 appearance-none border border-gray-300 dark:border-gray-600 rounded-md checked:bg-brand dark:checked:bg-accent checked:border-brand dark:checked:border-accent transition-colors cursor-pointer bg-white dark:bg-gray-700"
                                 />
                                 <svg className="absolute w-4 h-4 text-white left-1 top-1 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                 </svg>
                               </div>
                               <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t.addDate}</span>
                             </label>
                           </div>
                           
                           {addDate && (
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                  <div className="space-y-2">
                                     <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block">{t.name}</label>
                                      <input 
                                        type="text" 
                                        value={photoName}
                                        onChange={(e) => setPhotoName(e.target.value)}
                                        placeholder="e.g. John Doe"
                                        className="w-full p-3 sm:p-4 text-sm font-bold border-2 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-gray-900/80 dark:text-white border-gray-200/80 dark:border-gray-700/80 focus:ring-4 focus:ring-brand/10 dark:focus:ring-accent/10 focus:border-brand dark:focus:border-accent outline-none transition-all shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 hover:border-gray-300 dark:hover:border-gray-600"
                                     />
                                  </div>
                                  <div className="space-y-3">
                                     <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 block">{t.date}</label>
                                     <input 
                                        type="date" 
                                        value={photoDate}
                                        onChange={(e) => setPhotoDate(e.target.value)}
                                        className="w-full p-3 sm:p-4 text-sm font-bold border-2 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-gray-900/80 dark:text-white border-gray-200/80 dark:border-gray-700/80 focus:ring-4 focus:ring-brand/10 dark:focus:ring-accent/10 focus:border-brand dark:focus:border-accent outline-none transition-all shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
                                     />
                                  </div>
                               </div>
                           )}
                        </div>

                      </div>
                      <div className="flex flex-col justify-end h-full min-h-[200px]">
                         {photoProcessed ? (
                            <ResultCard 
                              originalUrl={photoProcessed.originalUrl}
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
                <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
                   <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                      <div className="space-y-6">
                          <ImageUploader 
                            title={t.uploadSign}
                            image={signOriginal} 
                            onUpload={handleSignUpload} 
                            onClear={() => { setSignOriginal(null); setSignProcessed(null); }}
                            rotation={signRotation}
                            onRotate={setSignRotation}
                            onCropApply={(url) => { setSignOriginal(url); setSignProcessed(null); }}
                            lang={lang}
                          />
                          <ImageControls 
                            brightness={signBrightness} setBrightness={setSignBrightness}
                            contrast={signContrast} setContrast={setSignContrast}
                            grayscale={signGrayscale} setGrayscale={setSignGrayscale}
                            removeBg={signRemoveBg} setRemoveBg={setSignRemoveBg}
                            t={t}
                          />
                      </div>
                       <div className="flex flex-col justify-end h-full min-h-[200px]">
                         {signProcessed ? (
                            <ResultCard 
                              originalUrl={signProcessed.originalUrl}
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
                           <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 p-6 md:p-8 text-center transition-colors">
                             <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                               <FileText size={32} className="opacity-40" />
                             </div>
                             <span className="font-bold uppercase tracking-wider text-[10px] mb-1">{t.result} {t.preview}</span>
                             <span className="text-xs text-gray-500 mt-1 max-w-[200px]">Preview will appear here after processing</span>
                           </div>
                         )}
                      </div>
                   </div>
                </div>

                {/* Global Action */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-12 relative z-20">
                  <button 
                    onClick={processImages}
                    disabled={(!photoOriginal && !signOriginal) || isProcessing}
                    className={`w-full sm:w-2/3 px-8 py-4 sm:px-12 sm:py-4 rounded-xl font-bold text-lg shadow-sm transition-colors ${(!photoOriginal && !signOriginal) || isProcessing ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800' : 'bg-brand text-white hover:bg-brand/90 active:scale-[0.98]' }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isProcessing ? (
                         <><div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/> {t.processing}</>
                      ) : (
                         <><Zap size={20} /> {t.compress}</>
                      )}
                    </span>
                  </button>

                  {(photoProcessed || signProcessed) && (
                    <button
                      onClick={downloadAsPDF}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 sm:px-8 rounded-xl font-bold text-lg bg-white dark:bg-gray-800 text-brand dark:text-accent border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-colors active:scale-[0.98]"
                    >
                      <FileDown size={20} />
                      <span>{t.downloadPDF}</span>
                    </button>
                  )}
                </div>
                
                <RecentHistory history={history} onClear={() => setHistory([])} title={t.recentResizes} />
              </div>
            </div>
            
            <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-16">
              <Header lang={lang} onSelectExam={setSelectedExam} />
            </div>

            {/* Remove SEO Content Sections from bottom of Home Page since they'll have their own tabs */}
          </div>
        )}

        <React.Suspense fallback={<div className="h-96 flex items-center justify-center animate-pulse bg-gray-50 dark:bg-gray-800/50 rounded-3xl m-8"></div>}>
          {activeTab === 'jobs' && <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-12"><LatestVacanciesSection /></div>}
          {activeTab === 'links' && <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-12"><MajorExamsLinksSection /></div>}
          {activeTab === 'home' && <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-12"><LatestVacanciesSection /><HowItWorksSection /><WhyUseSection lang={lang} /></div>}
          {activeTab === 'faq' && <FAQSection lang={lang} />}
          {activeTab === 'blog' && <BlogSection lang={lang} />}
          {activeTab === 'tools' && <ToolCategorySection />}
        </React.Suspense>

      </main>

      <React.Suspense fallback={<div className="h-64"></div>}>
        <Footer lang={lang} />
      </React.Suspense>
      
      {/* Mobile Sticky Action Bar */}
      <div className={`sm:hidden fixed bottom-16 left-0 right-0 p-4 pb-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40 transition-transform duration-300 shadow-sm ${ ((photoOriginal || signOriginal) && activeTab === 'home') ? 'translate-y-0' : 'translate-y-full' }`}>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              setPhotoOriginal(null); setPhotoProcessed(null);
              setSignOriginal(null); setSignProcessed(null);
            }}
            className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-red-500 active:scale-95 transition-colors"
            aria-label="Clear All"
          >
            <Trash2 className="w-5 h-5 flex-shrink-0" />
          </button>
          
          <button 
            onClick={processImages}
            disabled={(!photoOriginal && !signOriginal) || isProcessing}
            className={`flex-1 py-3 px-2 rounded-lg font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-1.5 ${(!photoOriginal && !signOriginal) || isProcessing ? 'bg-gray-100 text-gray-400 dark:bg-gray-800' : 'bg-brand text-white active:bg-brand/90' }`}
          >
            {isProcessing ? (
              <><div className="animate-spin h-4 w-4 flex-shrink-0 border-2 border-white border-t-transparent rounded-full"/> {t.processing}</>
            ) : (
              <><Zap size={18} className="flex-shrink-0" /> {t.compress}</>
            )}
          </button>
          
          {(photoProcessed || signProcessed) && (
            <button
              onClick={downloadAsPDF}
              className="flex-1 py-3 px-2 rounded-lg font-bold text-sm bg-white dark:bg-gray-800 text-brand dark:text-accent border border-gray-200 dark:border-gray-700 active:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <FileDown size={18} className="flex-shrink-0" />
              {t.downloadPDF}
            </button>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-24 right-6 z-40 bg-white dark:bg-gray-800 text-brand dark:text-accent p-3 rounded-full shadow-sm border border-gray-100 dark:border-gray-700 hover:scale-110 transition-all duration-300 ${ showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none' }`}
        title="Scroll to Top"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
      </button>

      {/* Floating WhatsApp Contact Button */}
      <a
        href="https://wa.me/917600885080"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed right-4 sm:right-6 z-50 bg-[#25D366] text-white p-3 sm:p-4 rounded-full shadow-sm hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-300 group flex items-center justify-center ${ (photoOriginal || signOriginal) ? 'bottom-24 sm:bottom-6' : 'bottom-6 sm:bottom-6' }`}
        title="Contact us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="fill-current text-white sm:w-[28px] sm:h-[28px]"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.065-.301-.15-1.265-.462-2.406-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.21 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.195-.572-.345z"></path><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.45zM12.046 21.77c-1.775 0-3.516-.476-5.04-1.375l-.36-.214-3.75.975.996-3.645-.235-.373c-.987-1.565-1.508-3.38-1.508-5.245 0-5.445 4.445-9.885 9.9-9.885 2.64 0 5.12 1.025 6.985 2.885 1.865 1.86 2.89 4.335 2.89 6.975-.005 5.44-4.45 9.885-9.888 9.885z"></path></svg>
      </a>

      {/* Floating Share Button */}
      <FloatingShare />

      <MobileBottomNav lang={lang} activeTab={activeTab} setActiveTab={handleTabChange} />
    </div>
  );
}