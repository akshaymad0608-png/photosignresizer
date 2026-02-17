import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sun, Moon, Languages, Home, Info, FileText, Camera, ShieldCheck, Zap, Smartphone, Check, Calendar, Settings,
  Upload, Scissors, Download, AlertCircle, RefreshCw
} from 'lucide-react';
import { EXAM_PRESETS, TRANSLATIONS, FAQ_DATA, SEO_CONTENT } from './constants';
import { ExamRequirement, Language, ProcessedImage } from './types';
import { processImage, readFileAsDataURL } from './utils/imageProcessing';
import ExamDropdown from './components/ExamDropdown';
import ImageUploader from './components/ImageUploader';
import ResultCard from './components/ResultCard';
import AdPlaceholder from './components/AdPlaceholder';

// --- Sub-Components ---

const StepCard = ({ icon: Icon, title, desc, step }: { icon: any, title: string, desc: string, step: string }) => (
  <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
    <div className="absolute -top-4 -left-4 w-8 h-8 bg-govSaffron text-white rounded-full flex items-center justify-center font-bold shadow-sm">
      {step}
    </div>
    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-govBlue dark:text-blue-300 rounded-xl flex items-center justify-center mb-4">
      <Icon size={24} />
    </div>
    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
  </div>
);

const FAQSection = ({ lang }: { lang: Language }) => (
  <div className="max-w-3xl mx-auto py-8 px-4 animate-fade-in">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
      {TRANSLATIONS[lang].faq}
    </h2>
    <div className="space-y-4">
      {FAQ_DATA.map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-govBlue dark:text-blue-400 mb-2">{item.q}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
);

const BlogSection = ({ lang }: { lang: Language }) => (
  <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
      {TRANSLATIONS[lang].blog}
    </h2>
    
    <article className="prose dark:prose-invert max-w-none space-y-8">
      
      {/* Dynamic SEO Content from Constants */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
        <h3 className="text-2xl font-bold text-govBlue dark:text-blue-300 mb-4">{SEO_CONTENT.intro.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{SEO_CONTENT.intro.text}</p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {SEO_CONTENT.exams.map((exam, idx) => (
           <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-govSaffron">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{exam.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{exam.content}</p>
           </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Official Dimensions Reference</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-govBlue text-white">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Exam</th>
                <th className="px-4 py-3">Photo Size</th>
                <th className="px-4 py-3">Sign Size</th>
                <th className="px-4 py-3 rounded-tr-lg">Format</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {EXAM_PRESETS.slice(0, 8).map((exam) => (
                <tr key={exam.id}>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{exam.name.split('(')[0]}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{exam.photo.width}x{exam.photo.height}px ({exam.photo.minKB}-{exam.photo.maxKB}KB)</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{exam.signature.width}x{exam.signature.height}px ({exam.signature.minKB}-{exam.signature.maxKB}KB)</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 uppercase">{exam.photo.format}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  </div>
);

// --- Main App ---

export default function App() {
  // State
  const [lang, setLang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'faq' | 'blog'>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // Exam State
  const [selectedExam, setSelectedExam] = useState<ExamRequirement>(EXAM_PRESETS[0]); 
  
  // Custom Date/Name overlay state
  const [addDate, setAddDate] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [photoDate, setPhotoDate] = useState('');

  // Image State
  const [photoOriginal, setPhotoOriginal] = useState<string | null>(null);
  const [photoRotation, setPhotoRotation] = useState(0);
  const [photoProcessed, setPhotoProcessed] = useState<ProcessedImage | null>(null);
  
  const [signOriginal, setSignOriginal] = useState<string | null>(null);
  const [signRotation, setSignRotation] = useState(0);
  const [signProcessed, setSignProcessed] = useState<ProcessedImage | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  // Dynamic Title for SEO
  useEffect(() => {
    let title = "Exam Photo & Sign Resizer Pro";
    if (activeTab === 'home') {
      title = `Resize Photo for ${selectedExam.name.split('(')[0].trim()} - ${title}`;
    } else if (activeTab === 'blog') {
      title = `Exam Guidelines & Dimensions - ${title}`;
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
    } else {
      document.documentElement.classList.remove('dark');
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
          grayscale: false,
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
          grayscale: true, // Auto convert signature to grayscale for better contrast
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

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Navbar */}
      <nav className="bg-govBlue text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setActiveTab('home')}>
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-govSaffron shadow-sm text-govBlue group-hover:rotate-12 transition-transform duration-300">
                 <Camera size={22} />
               </div>
               <div className="flex flex-col">
                 <span className="font-bold text-lg leading-tight tracking-tight hidden sm:block">{t.title}</span>
                 <span className="text-[10px] text-blue-200 hidden sm:block tracking-wider uppercase font-medium">Free Tool for Indian Students</span>
                 <span className="font-bold text-lg tracking-tight sm:hidden">ExamResizer</span>
               </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button onClick={() => setActiveTab('home')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'home' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'}`}>{t.home}</button>
                <button onClick={() => setActiveTab('blog')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'blog' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'}`}>{t.blog}</button>
                <button onClick={() => setActiveTab('faq')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'faq' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'}`}>{t.faq}</button>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
               <button onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors text-sm font-medium border border-transparent hover:border-white/20">
                 <Languages size={16} /> {lang === 'en' ? 'Hindi' : 'English'}
               </button>
               <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-white/10 transition-colors text-yellow-300">
                 {darkMode ? <Sun size={20} /> : <Moon size={20} />}
               </button>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-700 focus:outline-none">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-blue-800 pb-4 shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => { setActiveTab('home'); setMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 w-full text-left flex gap-2"><Home size={18}/> {t.home}</button>
              <button onClick={() => { setActiveTab('blog'); setMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 w-full text-left flex gap-2"><FileText size={18}/> {t.blog}</button>
              <button onClick={() => { setActiveTab('faq'); setMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 w-full text-left flex gap-2"><Info size={18}/> {t.faq}</button>
            </div>
            <div className="pt-4 pb-3 border-t border-blue-700 flex justify-around">
               <button onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')} className="flex items-center gap-2 text-white">
                 <Languages size={18} /> {lang === 'en' ? 'Hi' : 'En'}
               </button>
               <button onClick={() => setDarkMode(!darkMode)} className="text-white">
                 {darkMode ? <Sun size={20} /> : <Moon size={20} />}
               </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            
            <header className="text-center mb-12 animate-fade-in-up">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
                100% Free & Secure
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                 Resize Your Photos for <br className="hidden md:block" />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-govBlue to-blue-500 dark:from-blue-200 dark:to-blue-500">
                    Indian Government Exams
                 </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                {t.subtitle}. No signup required. Secure client-side processing.
              </p>
              
              {/* Steps Component */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left mt-8">
                <StepCard step="1" icon={Settings} title="Select Exam" desc="Choose from 50+ presets like UPSC, SSC, or set custom size." />
                <StepCard step="2" icon={Upload} title="Upload Image" desc="Select your photo and signature. Rotate if needed." />
                <StepCard step="3" icon={Download} title="Download" desc="Get perfectly resized, compressed JPGs instantly." />
              </div>
            </header>

            <AdPlaceholder text={t.ad_placeholder} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 mt-8">
              {/* Left Column: Controls */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-govBlue sticky top-24">
                  <ExamDropdown 
                    selectedExam={selectedExam} 
                    onSelect={setSelectedExam} 
                    label={t.selectExam}
                  />

                  {/* CUSTOM DIMENSION INPUTS */}
                  {selectedExam.id === 'custom' && (
                      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg animate-fade-in">
                          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2"><Settings size={14}/> {t.customSize}</h4>
                          
                          <div className="space-y-4">
                              {/* Photo Inputs */}
                              <div>
                                  <label className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 block">Photo (px & KB)</label>
                                  <div className="grid grid-cols-2 gap-2">
                                      <input type="number" placeholder="W" value={selectedExam.photo.width} onChange={(e) => updateCustomExam('width', e.target.value, 'photo')} className="p-2 text-sm border rounded bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" />
                                      <input type="number" placeholder="H" value={selectedExam.photo.height} onChange={(e) => updateCustomExam('height', e.target.value, 'photo')} className="p-2 text-sm border rounded bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" />
                                      <input type="number" placeholder="Min KB" value={selectedExam.photo.minKB} onChange={(e) => updateCustomExam('minKB', e.target.value, 'photo')} className="p-2 text-sm border rounded bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" />
                                      <input type="number" placeholder="Max KB" value={selectedExam.photo.maxKB} onChange={(e) => updateCustomExam('maxKB', e.target.value, 'photo')} className="p-2 text-sm border rounded bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" />
                                  </div>
                              </div>

                              {/* Sign Inputs */}
                              <div>
                                  <label className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1 block">Signature (px & KB)</label>
                                  <div className="grid grid-cols-2 gap-2">
                                      <input type="number" placeholder="W" value={selectedExam.signature.width} onChange={(e) => updateCustomExam('width', e.target.value, 'signature')} className="p-2 text-sm border rounded bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 outline-none" />
                                      <input type="number" placeholder="H" value={selectedExam.signature.height} onChange={(e) => updateCustomExam('height', e.target.value, 'signature')} className="p-2 text-sm border rounded bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 outline-none" />
                                      <input type="number" placeholder="Min KB" value={selectedExam.signature.minKB} onChange={(e) => updateCustomExam('minKB', e.target.value, 'signature')} className="p-2 text-sm border rounded bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 outline-none" />
                                      <input type="number" placeholder="Max KB" value={selectedExam.signature.maxKB} onChange={(e) => updateCustomExam('maxKB', e.target.value, 'signature')} className="p-2 text-sm border rounded bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 outline-none" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  <div className="mt-6 space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800 transition-all hover:shadow-md">
                      <h4 className="text-sm font-bold text-govBlue dark:text-blue-300 uppercase tracking-wide mb-2 flex items-center gap-2"><Camera size={16}/> {t.photoParams}</h4>
                      <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="text-gray-500">{t.width}:</div> <div className="font-mono font-medium text-right">{selectedExam.photo.width}px</div>
                        <div className="text-gray-500">{t.height}:</div> <div className="font-mono font-medium text-right">{selectedExam.photo.height}px</div>
                        <div className="text-gray-500">{t.minSize}:</div> <div className="font-mono font-medium text-right">{selectedExam.photo.minKB}KB</div>
                        <div className="text-gray-500">{t.maxSize}:</div> <div className="font-mono font-medium text-right">{selectedExam.photo.maxKB}KB</div>
                        <div className="col-span-2 border-t dark:border-gray-700 mt-2 pt-2 text-xs text-gray-400 flex justify-between">
                            <span>Resize Mode:</span> <span className="uppercase font-semibold">{selectedExam.photo.resizeMode}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800 transition-all hover:shadow-md">
                      <h4 className="text-sm font-bold text-govSaffron dark:text-orange-400 uppercase tracking-wide mb-2 flex items-center gap-2"><FileText size={16}/> {t.signParams}</h4>
                      <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="text-gray-500">{t.width}:</div> <div className="font-mono font-medium text-right">{selectedExam.signature.width}px</div>
                        <div className="text-gray-500">{t.height}:</div> <div className="font-mono font-medium text-right">{selectedExam.signature.height}px</div>
                        <div className="text-gray-500">{t.minSize}:</div> <div className="font-mono font-medium text-right">{selectedExam.signature.minKB}KB</div>
                        <div className="text-gray-500">{t.maxSize}:</div> <div className="font-mono font-medium text-right">{selectedExam.signature.maxKB}KB</div>
                        <div className="col-span-2 border-t dark:border-gray-700 mt-2 pt-2 text-xs text-gray-400 flex justify-between">
                            <span>Resize Mode:</span> <span className="uppercase font-semibold">{selectedExam.signature.resizeMode}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Uploaders */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Photo Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <ImageUploader 
                            title={t.uploadPhoto}
                            image={photoOriginal} 
                            onUpload={handlePhotoUpload} 
                            onClear={() => { setPhotoOriginal(null); setPhotoProcessed(null); }}
                            label={t.dragDrop}
                            rotation={photoRotation}
                            onRotate={setPhotoRotation}
                        />

                        {/* NAME & DATE OVERLAY TOGGLE */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                           <div className="flex items-center gap-2 mb-2">
                             <input 
                               type="checkbox" 
                               id="addDate" 
                               checked={addDate} 
                               onChange={(e) => setAddDate(e.target.checked)}
                               className="w-4 h-4 text-govBlue rounded focus:ring-govBlue cursor-pointer"
                             />
                             <label htmlFor="addDate" className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                               {t.addDate}
                             </label>
                           </div>
                           
                           {addDate && (
                               <div className="grid grid-cols-2 gap-3 mt-3 animate-fade-in">
                                  <div>
                                     <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{t.name}</label>
                                     <input 
                                        type="text" 
                                        value={photoName}
                                        onChange={(e) => setPhotoName(e.target.value)}
                                        placeholder="Your Name"
                                        className="w-full p-2 text-sm border rounded bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                     />
                                  </div>
                                  <div>
                                     <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{t.date}</label>
                                     <input 
                                        type="date" 
                                        value={photoDate}
                                        onChange={(e) => setPhotoDate(e.target.value)}
                                        className="w-full p-2 text-sm border rounded bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                     />
                                  </div>
                               </div>
                           )}
                        </div>

                      </div>
                      <div className="flex flex-col justify-end h-full min-h-[160px]">
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
                           <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 p-6 text-center">
                             <span className="mb-2 opacity-50"><Camera size={32}/></span>
                             <span>{t.result} {t.preview}</span>
                             <span className="text-xs text-gray-500 mt-1 max-w-[200px]">Preview will appear here after processing</span>
                           </div>
                         )}
                      </div>
                   </div>
                </div>

                {/* Signature Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                          <ImageUploader 
                            title={t.uploadSign}
                            image={signOriginal} 
                            onUpload={handleSignUpload} 
                            onClear={() => { setSignOriginal(null); setSignProcessed(null); }}
                            label={t.dragDrop}
                            rotation={signRotation}
                            onRotate={setSignRotation}
                          />
                      </div>
                       <div className="flex flex-col justify-end h-full min-h-[160px]">
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
                           <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 p-6 text-center">
                             <span className="mb-2 opacity-50"><FileText size={32}/></span>
                             <span>{t.result} {t.preview}</span>
                             <span className="text-xs text-gray-500 mt-1 max-w-[200px]">Preview will appear here after processing</span>
                           </div>
                         )}
                      </div>
                   </div>
                </div>

                {/* Global Action */}
                <div className="flex justify-center pt-2">
                  <button 
                    onClick={processImages}
                    disabled={(!photoOriginal && !signOriginal) || isProcessing}
                    className={`
                      relative overflow-hidden w-full md:w-2/3 px-10 py-5 rounded-xl font-bold text-xl shadow-lg transition-all duration-300 group
                      ${(!photoOriginal && !signOriginal) || isProcessing
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700'
                        : 'bg-gradient-to-r from-govBlue to-blue-600 text-white hover:shadow-2xl hover:-translate-y-1 active:scale-95'
                      }
                    `}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isProcessing ? (
                         <><div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/> {t.processing}</>
                      ) : (
                         <><Zap size={24} className={(!photoOriginal && !signOriginal) ? "" : "fill-current"}/> {t.compress}</>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* SEO Content Section for Home Page */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 mb-12">
               <div className="max-w-4xl mx-auto">
                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t.whyUse}</h2>
                 <p className="text-gray-600 dark:text-gray-300 text-center mb-10 text-lg">
                    {t.whyUseText}
                 </p>
                 
                 <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-4">
                       <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                         <ShieldCheck size={24} />
                       </div>
                       <h3 className="font-bold text-gray-900 dark:text-white mb-2">100% Secure</h3>
                       <p className="text-sm text-gray-500 dark:text-gray-400">Client-side processing means your photos never leave your browser.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4">
                       <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                         <Zap size={24} />
                       </div>
                       <h3 className="font-bold text-gray-900 dark:text-white mb-2">Fastest Resizer</h3>
                       <p className="text-sm text-gray-500 dark:text-gray-400">Instant compression and cropping without server latency.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4">
                       <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-4">
                         <Smartphone size={24} />
                       </div>
                       <h3 className="font-bold text-gray-900 dark:text-white mb-2">Mobile Ready</h3>
                       <p className="text-sm text-gray-500 dark:text-gray-400">Works perfectly on Android and iPhone devices.</p>
                    </div>
                 </div>

                 <div className="mt-12 pt-10 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t.features}</h3>
                    <ul className="grid md:grid-cols-2 gap-4">
                       {SEO_CONTENT.features.map((feature, i) => (
                         <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                            <Check size={20} className="text-green-500 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
               </div>
            </div>

            <AdPlaceholder text={t.ad_placeholder} />
          </div>
        )}

        {activeTab === 'faq' && <FAQSection lang={lang} />}
        {activeTab === 'blog' && <BlogSection lang={lang} />}

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                   <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-govBlue">
                     <Camera size={18} />
                   </div>
                   <span className="text-white font-bold text-xl">{t.title}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                  The most trusted tool for Indian students to resize, crop and compress exam documents. We support UPSC, SSC, IBPS, RRB, JEE, NEET and all major State PSC exams.
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                   <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Resize Now</button></li>
                   <li><button onClick={() => setActiveTab('blog')} className="hover:text-white transition-colors">Exam Guidelines</button></li>
                   <li><button onClick={() => setActiveTab('faq')} className="hover:text-white transition-colors">Help & FAQ</button></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Legal</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                   <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
                </ul>
                <p className="text-xs text-gray-500 mt-4">
                  {t.disclaimer}
                </p>
              </div>
           </div>
           
           <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
             <p>&copy; {new Date().getFullYear()} ExamResizer Pro. All rights reserved.</p>
             <p>Made in India 🇮🇳 with ❤️</p>
           </div>
        </div>
      </footer>
    </div>
  );
}