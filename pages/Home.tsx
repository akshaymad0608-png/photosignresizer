import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Zap, RotateCcw, ArrowUp, MessageCircle, Camera, PenLine } from 'lucide-react';
import { EXAM_PRESETS, TRANSLATIONS } from '../constants';
import { ExamRequirement, Language, ProcessedImage } from '../types';
import { processImage, readFileAsDataURL } from '../utils/imageProcessing';

import Header from '../components/Header';
// Imported eagerly, not via React.lazy like the other sections. Its whole job
// is to put the guide pages back into the rendered link graph, so it must not
// sit behind a Suspense boundary and a separate chunk fetch.
import GuideLinksSection from '../components/sections/GuideLinksSection';
import CommandPalette from '../components/CommandPalette';
import MobileBottomNav from '../components/MobileBottomNav';
import Hero from '../components/Hero';
import SpecTicket from '../components/SpecTicket';
import ExamDropdown from '../components/ExamDropdown';
import ImageUploader from '../components/ImageUploader';
import ImageControls from '../components/ImageControls';
import ResultCard from '../components/ResultCard';
import ExtraOutputs from '../components/ExtraOutputs';
import RecentHistory from '../components/RecentHistory';
import FloatingShare from '../components/FloatingShare';
import InstallBanner from '../components/InstallBanner';
import UpdatesMarquee from '../components/sections/UpdatesMarquee';
import Seo from '../seo/Seo';
import {
  organizationSchema, websiteSchema, softwareApplicationSchema, howToSchema, webPageSchema,
} from '../seo/schema';
import SupportedExamsSection from '../components/sections/SupportedExamsSection';

const Footer = React.lazy(() => import('../components/Footer'));
const ToolCategorySection = React.lazy(() => import('../components/sections/ToolCategorySection'));
const FAQSection = React.lazy(() => import('../components/sections/FAQSection'));
const HowItWorksSection = React.lazy(() => import('../components/sections/HowItWorksSection'));
const WhyUseSection = React.lazy(() => import('../components/sections/WhyUseSection'));
const BlogSection = React.lazy(() => import('../components/sections/BlogSection'));
const MajorExamsLinksSection = React.lazy(() => import('../components/sections/MajorExamsLinksSection'));
const LatestVacanciesSection = React.lazy(() => import('../components/sections/LatestVacanciesSection'));
const PopularToolsSection = React.lazy(() => import('../components/sections/PopularToolsSection'));

type Tab = 'home' | 'faq' | 'blog' | 'tools' | 'jobs' | 'links';

const readStored = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  /* ---------------- Preferences ---------------- */
  const [lang, setLang] = useState<Language>(() =>
    readStored<Language>('lang', 'en') === 'hi' ? 'hi' : 'en'
  );

  useEffect(() => {
    localStorage.setItem('lang', JSON.stringify(lang));
    document.documentElement.lang = lang;
  }, [lang]);


  const t = TRANSLATIONS[lang];

  /* ---------------- Routing ---------------- */
  const pathname = location.pathname;
  const activeTab: Tab =
    pathname === '/faq' ? 'faq'
    : pathname === '/blog' ? 'blog'
    : pathname === '/free-image-tools' ? 'tools'
    : pathname === '/jobs' ? 'jobs'
    : pathname === '/links' ? 'links'
    : 'home';

  const handleTabChange = (tab: Tab) => {
    const routes: Record<Tab, string> = {
      home: '/', faq: '/faq', blog: '/blog',
      tools: '/free-image-tools', jobs: '/jobs', links: '/links',
    };
    navigate(routes[tab]);
    window.scrollTo({ top: 0 });
  };

  /* ---------------- Exam ---------------- */
  const [selectedExam, setSelectedExam] = useState<ExamRequirement>(() => {
    const savedId = readStored<string>('lastExam', '');
    return EXAM_PRESETS.find(e => e.id === savedId) || EXAM_PRESETS[1] || EXAM_PRESETS[0];
  });

  useEffect(() => {
    localStorage.setItem('lastExam', JSON.stringify(selectedExam.id));
  }, [selectedExam.id]);

  /* ---------------- Images ---------------- */
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [addDate, setAddDate] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [photoDate, setPhotoDate] = useState('');

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
  const [error, setError] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 480);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  // A new exam means new limits, so old results no longer mean anything.
  useEffect(() => {
    setPhotoProcessed(null);
    setSignProcessed(null);
  }, [selectedExam.id]);

  const processImages = useCallback(async () => {
    if (!photoOriginal && !signOriginal) return;
    navigator.vibrate?.(30);
    setIsProcessing(true);
    setError(null);

    try {
      if (photoOriginal) {
        let formattedDate = photoDate;
        if (photoDate) {
          const [y, m, d] = photoDate.split('-');
          formattedDate = `${d}-${m}-${y}`;
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
          textOverlay: addDate ? { name: photoName, date: formattedDate } : undefined,
        });
        const next: ProcessedImage = {
          originalUrl: photoOriginal,
          processedUrl: res.url,
          fileSizeKB: res.sizeKB,
          width: selectedExam.photo.width,
          height: selectedExam.photo.height,
          name: `photo_${selectedExam.id}.jpg`,
        };
        setPhotoProcessed(next);
        setHistory(prev => [next, ...prev].slice(0, 6));
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
          rotation: signRotation,
        });
        const next: ProcessedImage = {
          originalUrl: signOriginal,
          processedUrl: res.url,
          fileSizeKB: res.sizeKB,
          width: selectedExam.signature.width,
          height: selectedExam.signature.height,
          name: `sign_${selectedExam.id}.jpg`,
        };
        setSignProcessed(next);
        setHistory(prev => [next, ...prev].slice(0, 6));
      }
    } catch (err) {
      console.error(err);
      setError(t.error_compression);
    } finally {
      setIsProcessing(false);
    }
  }, [
    photoOriginal, signOriginal, selectedExam, photoGrayscale, photoRemoveBg,
    photoBrightness, photoContrast, photoRotation, addDate, photoName, photoDate,
    signGrayscale, signRemoveBg, signBrightness, signContrast, signRotation, t,
  ]);

  // Live re-render only once a result already exists, so nothing runs unasked.
  useEffect(() => {
    if (!photoProcessed && !signProcessed) return;
    const id = setTimeout(processImages, 220);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    photoRotation, photoBrightness, photoContrast, photoGrayscale, photoRemoveBg,
    signRotation, signBrightness, signContrast, signGrayscale, signRemoveBg,
    addDate, photoName, photoDate,
  ]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        processImages();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [processImages]);

  const downloadImage = (dataUrl: string, filename: string) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const resetAll = () => {
    setPhotoOriginal(null); setPhotoProcessed(null); setPhotoRotation(0);
    setPhotoBrightness(0); setPhotoContrast(0); setPhotoGrayscale(false); setPhotoRemoveBg(false);
    setSignOriginal(null); setSignProcessed(null); setSignRotation(0);
    setSignBrightness(0); setSignContrast(0); setSignGrayscale(true); setSignRemoveBg(false);
    setPhotoName(''); setPhotoDate(''); setAddDate(false); setError(null);
  };

  const updateCustomExam = (field: string, value: string, type: 'photo' | 'signature') => {
    setSelectedExam(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: Number(value) || 0 },
    }));
  };

  const hasInput = !!(photoOriginal || signOriginal);

  /* Each tab is served on its own URL, so each needs its own title, description
     and canonical — otherwise all six routes look like duplicates to search
     engines. Keyed off activeTab rather than a bare document.title write. */
  const seo = React.useMemo(() => {
    const exam = selectedExam.name.split('(')[0].trim();
    switch (activeTab) {
      case 'jobs':
        return {
          path: '/jobs',
          title: 'Latest govt job vacancies 2026 — last dates and official links | PhotoResizer',
          description:
            'Currently open government job notifications with vacancy counts, closing dates and links to the official recruitment portals.',
        };
      case 'links':
        return {
          path: '/links',
          title: 'Major exam direct links — official portals | PhotoResizer',
          description:
            'Direct links to the official portals for UPSC, SSC, IBPS, RRB and State PSC applications, admit cards and results.',
        };
      case 'faq':
        return {
          path: '/faq',
          title: 'Photo and signature size FAQ for exam forms | PhotoResizer',
          description:
            'Answers to common questions about photo and signature size, format and background for Indian government exam application forms.',
        };
      case 'blog':
        return {
          path: '/blog',
          title: 'Guides for exam form photos and signatures | PhotoResizer',
          description:
            'Guides explaining the photo and signature rules printed in Indian government exam notifications, and how to meet them.',
        };
      case 'tools':
        return {
          path: '/free-image-tools',
          title: 'Free image tools — compress, convert, grayscale | PhotoResizer',
          description:
            'Free browser-based image tools: compress, convert between JPG, PNG and WebP, convert to grayscale and remove backgrounds. Nothing is uploaded.',
        };
      default:
        return {
          path: '/',
          title: `${exam} photo & signature resizer — exact px and KB | PhotoResizer`,
          description:
            'Resize your photo and signature to the exact pixel and KB limits required by UPSC, SSC, IBPS, RRB and State PSC forms. Runs entirely in your browser.',
        };
    }
  }, [activeTab, selectedExam]);

  const scrollToTool = useCallback(() => {
    document.getElementById('resize')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const EmptyResult = ({ icon: Icon }: { icon: typeof Camera }) => (
    <div className="card-sunk h-full min-h-[220px] flex flex-col items-center justify-center text-center px-6 py-10">
      <Icon size={22} className="text-muted mb-3" />
      <p className="text-[14px] font-semibold text-ink">{t.resultPending}</p>
      <p className="text-[12px] text-muted mt-1 max-w-[28ch]">{t.resultPendingNote}</p>
    </div>
  );

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        schema={
          activeTab === 'home'
            ? [organizationSchema(), websiteSchema(), softwareApplicationSchema(), howToSchema()]
            : [webPageSchema({ title: seo.title, description: seo.description, path: seo.path })]
        }
      />

    <div className="min-h-screen flex flex-col bg-bg">
      <Header lang={lang} onLangChange={setLang} onOpenSearch={() => setPaletteOpen(true)} />

      <main id="main" className="flex-grow pt-20 pb-28 lg:pb-8">
        <UpdatesMarquee setActiveTab={handleTabChange} />

        {activeTab === 'home' && (
          <>
            <Hero lang={lang} exam={selectedExam} onSelectExam={setSelectedExam} onStart={scrollToTool} />

            <div id="resize" className="shell scroll-mt-24">
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Left rail: what the form demands */}
                <aside className="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-20 lg:self-start">
                  <ExamDropdown
                    selectedExam={selectedExam}
                    onSelect={setSelectedExam}
                    label={t.selectExam}
                  />
                  <SpecTicket exam={selectedExam} lang={lang} onEditCustom={updateCustomExam} />
                </aside>

                {/* Right: what you supply */}
                <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-display text-[22px] font-bold text-ink">
                      {t.yourFiles}
                    </h2>
                    {hasInput && (
                      <button onClick={resetAll} className="btn btn-quiet btn-sm">
                        <RotateCcw size={13} /> {t.resetAll}
                      </button>
                    )}
                  </div>

                  {/* Photograph */}
                  <section className="card p-4 sm:p-5">
                    <div className="grid md:grid-cols-2 gap-5 md:gap-7">
                      <div>
                        <ImageUploader
                          title={t.photoSlot}
                          hint={t.photoHint}
                          image={photoOriginal}
                          onUpload={async file => {
                            setPhotoOriginal(await readFileAsDataURL(file));
                            setPhotoRotation(0);
                            setPhotoProcessed(null);
                          }}
                          onClear={() => { setPhotoOriginal(null); setPhotoProcessed(null); }}
                          rotation={photoRotation}
                          onRotate={setPhotoRotation}
                          onCropApply={url => { setPhotoOriginal(url); setPhotoProcessed(null); }}
                          aspect={selectedExam.photo.width / selectedExam.photo.height}
                          lang={lang}
                        />

                        <ImageControls
                          brightness={photoBrightness} setBrightness={setPhotoBrightness}
                          contrast={photoContrast} setContrast={setPhotoContrast}
                          grayscale={photoGrayscale} setGrayscale={setPhotoGrayscale}
                          removeBg={photoRemoveBg} setRemoveBg={setPhotoRemoveBg}
                          t={t}
                        />

                        {/* SSC and a few others want the name and date printed on the photo */}
                        <div className="mt-3 card-sunk p-4">
                          <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={addDate}
                              onChange={e => setAddDate(e.target.checked)}
                              className="w-4 h-4 accent-signal cursor-pointer"
                            />
                            <span className="text-[13px] font-medium text-ink">{t.addDate}</span>
                          </label>

                          {addDate && (
                            <div className="grid sm:grid-cols-2 gap-3 mt-3 animate-fade-in">
                              <label className="block">
                                <span className="label-field block mb-1">{t.name}</span>
                                <input
                                  type="text"
                                  value={photoName}
                                  onChange={e => setPhotoName(e.target.value)}
                                  placeholder="As written on the form"
                                  className="field field-text"
                                />
                              </label>
                              <label className="block">
                                <span className="label-field block mb-1">{t.date}</span>
                                <input
                                  type="date"
                                  value={photoDate}
                                  onChange={e => setPhotoDate(e.target.value)}
                                  className="field"
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
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
                            type={t.photoSlot}
                            kind="photo"
                          />
                        ) : (
                          <EmptyResult icon={Camera} />
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Signature */}
                  <section id="signature" className="card p-4 sm:p-5 scroll-mt-24">
                    <div className="grid md:grid-cols-2 gap-5 md:gap-7">
                      <div>
                        <ImageUploader
                          title={t.signSlot}
                          hint={t.signHint}
                          image={signOriginal}
                          onUpload={async file => {
                            setSignOriginal(await readFileAsDataURL(file));
                            setSignRotation(0);
                            setSignProcessed(null);
                          }}
                          onClear={() => { setSignOriginal(null); setSignProcessed(null); }}
                          rotation={signRotation}
                          onRotate={setSignRotation}
                          onCropApply={url => { setSignOriginal(url); setSignProcessed(null); }}
                          aspect={selectedExam.signature.width / selectedExam.signature.height}
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

                      <div>
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
                            type={t.signSlot}
                            kind="signature"
                          />
                        ) : (
                          <EmptyResult icon={PenLine} />
                        )}
                      </div>
                    </div>
                  </section>

                  {error && (
                    <p className="card px-4 py-3 text-[13px] text-fail border-fail/40">{error}</p>
                  )}

                  {/* Desktop primary action */}
                  <div className="hidden lg:flex items-center gap-3">
                    <button
                      onClick={processImages}
                      disabled={!hasInput || isProcessing}
                      className="btn btn-primary px-8"
                    >
                      {isProcessing
                        ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> {t.remaking}</>
                        : <><Zap size={17} /> {t.makeFiles}</>}
                    </button>
                    <span className="font-mono text-[11px] text-muted">
                      {hasInput ? 'Ctrl + Enter' : t.waitingForUpload}
                    </span>
                  </div>

                  <div id="extras" className="scroll-mt-24">
                    <ExtraOutputs lang={lang} exam={selectedExam} photo={photoProcessed} sign={signProcessed} />
                  </div>
                  <RecentHistory history={history} onClear={() => setHistory([])} title={t.recentResizes} />
                </div>
              </div>
            </div>
          </>
        )}

        <React.Suspense fallback={<div className="h-72 animate-pulse" />}>
          {activeTab === 'jobs' && <div className="shell mt-8"><LatestVacanciesSection /></div>}
          {activeTab === 'links' && <div className="shell mt-8"><MajorExamsLinksSection /></div>}
          {activeTab === 'home' && <PopularToolsSection />}
          {activeTab === 'home' && (
            <div className="shell mt-16 space-y-4">
              <div id="how-it-works" className="scroll-mt-24">
                <HowItWorksSection lang={lang} />
              </div>
              <div id="supported-exams" className="scroll-mt-24">
                <SupportedExamsSection lang={lang} onSelectExam={setSelectedExam} />
              </div>
              <LatestVacanciesSection />
              <GuideLinksSection />
              <WhyUseSection lang={lang} />
            </div>
          )}
          {activeTab === 'faq' && <FAQSection lang={lang} />}
          {activeTab === 'blog' && <BlogSection lang={lang} />}
          {activeTab === 'tools' && <ToolCategorySection />}
        </React.Suspense>
      </main>

      <React.Suspense fallback={<div className="h-56" />}>
        <Footer lang={lang} />
      </React.Suspense>

      {/* Mobile action bar sits above the tab bar and only when there is work to do */}
      {activeTab === 'home' && hasInput && (
        <div className="lg:hidden fixed bottom-[60px] inset-x-0 z-40 px-3 pb-2 pt-2 glass-strong border-t border-line">
          <button
            onClick={processImages}
            disabled={isProcessing}
            className="btn btn-primary w-full"
          >
            {isProcessing
              ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> {t.remaking}</>
              : <><Zap size={17} /> {t.makeFiles}</>}
          </button>
        </div>
      )}

      <div className="fixed right-3 sm:right-5 bottom-24 lg:bottom-6 z-40 flex flex-col gap-2">
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full glass-strong border border-line text-fg-muted hover:text-brand-600 flex items-center justify-center transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={17} />
          </button>
        )}
        <a
          href="https://wa.me/917600885080"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full grad-fill text-white flex items-center justify-center hover:opacity-90 transition-opacity"
          aria-label="Ask a question on WhatsApp"
        >
          <MessageCircle size={17} />
        </a>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelectExam={exam => { setSelectedExam(exam); scrollToTool(); }}
      />

      <InstallBanner />
      <FloatingShare />
      <MobileBottomNav lang={lang} activeTab={activeTab} setActiveTab={handleTabChange} />
    </div>
    </>
  );
}
