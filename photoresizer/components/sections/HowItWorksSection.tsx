import React from 'react';
import { ListChecks, ImageUp, ShieldCheck, Download } from 'lucide-react';
import { Language } from '../../types';

const ICONS = [ListChecks, ImageUp, ShieldCheck, Download];

const COPY = {
  en: {
    heading: 'How it works',
    sub: 'Four steps, all of them on your own device.',
    steps: [
      {
        title: 'Pick the exam',
        body: 'The requirement sheet fills in with the pixel and KB limits printed in that notification. Not on the list? Type your own numbers under Custom.',
      },
      {
        title: 'Add photo and signature',
        body: 'Shoot from the camera, choose a file, drag one in, or paste a screenshot. Rotate and crop until the frame looks right.',
      },
      {
        title: 'Read the checks',
        body: 'Each result is measured for size, sharpness, exposure and background, and tells you what to change if something is off.',
      },
      {
        title: 'Download and upload',
        body: 'Save the JPGs, or build a combined sheet, a print sheet, or a PDF from the same files.',
      },
    ],
  },
  hi: {
    heading: 'यह कैसे काम करता है',
    sub: 'चार कदम, और सब कुछ आपके अपने डिवाइस पर।',
    steps: [
      {
        title: 'परीक्षा चुनिए',
        body: 'उस अधिसूचना में छपी पिक्सेल और KB की सीमाएँ अपने आप भर जाती हैं। सूची में नहीं है? Custom में अपने नंबर डाल दीजिए।',
      },
      {
        title: 'फोटो और हस्ताक्षर जोड़िए',
        body: 'कैमरे से खींचिए, फाइल चुनिए, खींचकर छोड़िए, या स्क्रीनशॉट पेस्ट कीजिए। घुमाकर और काटकर फ्रेम ठीक कर लीजिए।',
      },
      {
        title: 'जाँच पढ़िए',
        body: 'हर नतीजे का आकार, स्पष्टता, रोशनी और बैकग्राउंड नापा जाता है, और कुछ गड़बड़ हो तो क्या बदलना है यह बताया जाता है।',
      },
      {
        title: 'डाउनलोड कीजिए',
        body: 'JPG सेव कीजिए, या उन्हीं फाइलों से मिलीजुली शीट, प्रिंट शीट या PDF बना लीजिए।',
      },
    ],
  },
};

const HowItWorksSection = ({ lang = 'en' }: { lang?: Language }) => {
  const c = COPY[lang === 'hi' ? 'hi' : 'en'];

  return (
    <section className="mb-16">
      <h2 className="mb-2">{c.heading}</h2>
      <p className="text-[15px] text-muted mb-8 max-w-[58ch]">{c.sub}</p>

      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {c.steps.map((step, i) => {
          const Icon = ICONS[i];
          return (
            <li key={step.title} className="pt-4 border-t-2 border-ink">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] text-signal">{String(i + 1).padStart(2, '0')}</span>
                <Icon size={17} className="text-muted" />
              </div>
              <h3 className="font-display text-[18px] font-bold text-ink mb-1.5">{step.title}</h3>
              <p className="text-[14px] text-muted leading-relaxed">{step.body}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default HowItWorksSection;
