import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS, FAQ_DATA } from '../../constants';

const FAQSection = ({ lang }: { lang: Language }) => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="mb-2">{TRANSLATIONS[lang].faq}</h2>
      <p className="text-[15px] text-muted mb-8">
        The questions that come up most often about sizes, rejections and privacy.
      </p>

      <dl className="border-t border-ink">
        {FAQ_DATA.map((item: { q: string; a: string }, i: number) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-rule">
              <dt>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 py-4 text-left"
                >
                  <span className="font-display text-[17px] font-bold text-ink">{item.q}</span>
                  <span className="shrink-0 mt-1 text-signal">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
              </dt>
              {isOpen && (
                <dd className="pb-5 pr-8 text-[15px] text-muted leading-relaxed animate-fade-in">
                  {item.a}
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </div>
  );
};

export default FAQSection;
