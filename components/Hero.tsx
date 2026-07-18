import React from 'react';
import { ShieldCheck, WifiOff, IndianRupee, Sparkles, ArrowRight, Gauge } from 'lucide-react';
import { ExamRequirement, Language } from '../types';
import { EXAM_PRESETS } from '../constants';

interface HeroProps {
  lang: Language;
  exam: ExamRequirement;
  onSelectExam: (exam: ExamRequirement) => void;
  onStart?: () => void;
}

const COPY = {
  en: {
    eyebrow: 'Runs entirely in your browser',
    h1a: 'Exam photos that pass',
    h1b: 'on the first upload.',
    sub: 'Pick your exam and we set the exact pixels and kilobytes the notification asks for. Your files never leave this device.',
    cta: 'Resize my photo',
    ctaAlt: 'See supported exams',
    badges: ['No upload to any server', 'Works offline', 'Free, no sign-up'],
    quick: 'Popular right now',
    photo: 'Photograph',
    sign: 'Signature',
  },
  hi: {
    eyebrow: 'पूरी तरह आपके ब्राउज़र में चलता है',
    h1a: 'फॉर्म वाली फोटो, जो',
    h1b: 'पहली बार में चढ़ जाए।',
    sub: 'अपनी परीक्षा चुनिए और अधिसूचना में माँगे गए ठीक पिक्सेल और किलोबाइट अपने आप सेट हो जाते हैं। आपकी फाइल इस डिवाइस से बाहर नहीं जाती।',
    cta: 'मेरी फोटो रिसाइज़ करें',
    ctaAlt: 'सभी परीक्षाएँ देखें',
    badges: ['किसी सर्वर पर अपलोड नहीं', 'ऑफलाइन चलता है', 'मुफ्त, बिना साइन-अप'],
    quick: 'अभी लोकप्रिय',
    photo: 'फोटो',
    sign: 'हस्ताक्षर',
  },
};

/** Live spec preview card — redraws from whichever exam is selected. */
const SpecPreview = ({ exam, labels }: { exam: ExamRequirement; labels: { photo: string; sign: string } }) => {
  const { width, height } = exam.photo;
  const ratio = width / height;
  const boxH = 150;
  const boxW = Math.max(70, Math.min(180, Math.round(boxH * ratio)));

  return (
    <div className="glass-strong rounded-2xl p-6 sm:p-7 shadow-xl grad-border">
      <div className="flex items-center gap-2 mb-5">
        <Gauge size={15} className="text-brand-600" />
        <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-fg-muted">
          {exam.name}
        </span>
      </div>

      <div className="flex items-end gap-6">
        {/* Photo frame with caliper marks */}
        <figure className="relative shrink-0 pt-6 pr-12">
          <div className="absolute top-0 left-0 flex flex-col items-center" style={{ width: boxW }}>
            <span className="font-mono text-[11px] text-brand-600 mb-1">{width}px</span>
            <div className="relative w-full h-1.5">
              <span className="absolute inset-x-0 top-1/2 h-px bg-brand-500" />
              <span className="absolute left-0 inset-y-0 w-px bg-brand-500" />
              <span className="absolute right-0 inset-y-0 w-px bg-brand-500" />
            </div>
          </div>

          <div
            className="rounded-lg border-2 border-dashed border-line-strong bg-surface-2 flex items-center justify-center"
            style={{ width: boxW, height: boxH }}
          >
            <span className="text-[11px] text-fg-faint text-center px-2 leading-tight">
              {labels.photo}
            </span>
          </div>

          <div
            className="absolute right-0 bottom-2 flex items-center gap-1"
            style={{ height: boxH }}
          >
            <div className="relative h-full w-1.5">
              <span className="absolute inset-y-0 left-1/2 w-px bg-brand-500" />
              <span className="absolute inset-x-0 top-0 h-px bg-brand-500" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-brand-500" />
            </div>
            <span className="font-mono text-[11px] text-brand-600 [writing-mode:vertical-rl]">
              {height}px
            </span>
          </div>
        </figure>

        {/* Numbers */}
        <dl className="flex-1 min-w-0 space-y-3 pb-2">
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-fg-muted">{labels.photo}</dt>
            <dd className="font-mono text-[15px] font-semibold text-fg tabular-nums">
              {exam.photo.width}×{exam.photo.height}
              <span className="text-fg-muted font-normal"> · {exam.photo.maxKB}KB</span>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-fg-muted">{labels.sign}</dt>
            <dd className="font-mono text-[15px] font-semibold text-fg tabular-nums">
              {exam.signature.width}×{exam.signature.height}
              <span className="text-fg-muted font-normal"> · {exam.signature.maxKB}KB</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

const BADGE_ICONS = [ShieldCheck, WifiOff, IndianRupee];

export default function Hero({ lang, exam, onSelectExam, onStart }: HeroProps) {
  const c = COPY[lang === 'hi' ? 'hi' : 'en'];
  const popular = EXAM_PRESETS.slice(1, 6);

  return (
    <section className="relative isolate overflow-hidden">
      {/* Decorative layers. `.aurora` positions itself absolutely and bleeds
          past the edges, so it must be a child — never the section itself. */}
      <div className="aurora -z-10" aria-hidden="true" />
      <div className="grid-bg -z-10" aria-hidden="true" />

      <div className="shell relative pt-10 pb-14 sm:pt-16 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:items-center">
          {/* Copy */}
          <div className="min-w-0">
            <span className="pill pill-brand mb-5">
              <Sparkles size={13} />
              {c.eyebrow}
            </span>

            <h1 className="font-display text-[clamp(2.1rem,1.2rem+3.6vw,3.75rem)] leading-[1.05] font-extrabold tracking-tight text-fg">
              {c.h1a}
              <br />
              <span className="grad-text">{c.h1b}</span>
            </h1>

            <p className="mt-5 text-[16px] sm:text-[17px] leading-relaxed text-fg-soft max-w-[54ch]">
              {c.sub}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={onStart} className="btn btn-primary btn-lg">
                {c.cta}
                <ArrowRight size={17} />
              </button>
              <a href="#supported-exams" className="btn btn-outline btn-lg">
                {c.ctaAlt}
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {c.badges.map((b, i) => {
                const Icon = BADGE_ICONS[i];
                return (
                  <li key={b} className="flex items-center gap-2 text-[13px] font-medium text-fg-soft">
                    <Icon size={15} className="text-success" />
                    {b}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Live spec card */}
          <div className="min-w-0">
            <SpecPreview exam={exam} labels={{ photo: c.photo, sign: c.sign }} />

            <div className="mt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-muted mb-2.5">
                {c.quick}
              </p>
              <div className="flex flex-wrap gap-2">
                {popular.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelectExam(p)}
                    aria-pressed={p.id === exam.id}
                    className={`pill transition-colors ${
                      p.id === exam.id
                        ? 'pill-brand'
                        : 'bg-surface border border-line text-fg-soft hover:border-brand-400 hover:text-brand-600'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
