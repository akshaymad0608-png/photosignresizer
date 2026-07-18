import React from 'react';
import { Check } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS, SEO_CONTENT } from '../../constants';

const PILLARS = [
  {
    heading: 'Nothing leaves your phone',
    body: 'Resizing happens on a canvas in your own browser. There is no upload step, so there is no copy of your face or signature sitting on someone else\'s server.',
  },
  {
    heading: 'Built from the real limits',
    body: 'Every preset carries the pixel dimensions and the KB floor and ceiling from the notification, including the minimum size that trips up most rejected uploads.',
  },
  {
    heading: 'It tells you when it is wrong',
    body: 'A blurry or badly lit photo passes the size check and still gets rejected at the counter. The form checks catch that before you submit.',
  },
];

const WhyUseSection = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="mb-16">
      <h2 className="mb-2">{t.whyUse}</h2>
      <p className="text-[15px] text-muted mb-8 max-w-[62ch]">{t.whyUseText}</p>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {PILLARS.map(pillar => (
          <div key={pillar.heading} className="card p-5">
            <h3 className="font-display text-[18px] font-bold text-ink mb-2">{pillar.heading}</h3>
            <p className="text-[14px] text-muted leading-relaxed">{pillar.body}</p>
          </div>
        ))}
      </div>

      <h3 className="label-field mb-4">{t.features}</h3>
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {SEO_CONTENT.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-start gap-2.5 py-2 border-b border-rule">
            <Check size={15} className="text-signal shrink-0 mt-0.5" />
            <span className="text-[14px] text-ink-soft leading-snug">{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhyUseSection;
