import React, { useState } from 'react';
import { Copy, Check, Settings2 } from 'lucide-react';
import { ExamRequirement, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Unit, fromPixels } from '../utils/units';

interface SpecTicketProps {
  exam: ExamRequirement;
  lang: Language;
  onEditCustom?: (field: string, value: string, type: 'photo' | 'signature') => void;
}

const UNITS: Unit[] = ['px', 'mm', 'cm', 'in'];

/**
 * The signature element: a tear-off requirement docket, set like the header
 * of an admit card. It restates the form's numbers in one place so the
 * aspirant can check them against the official notification before uploading.
 */
const SpecTicket = ({ exam, lang, onEditCustom }: SpecTicketProps) => {
  const t = TRANSLATIONS[lang];
  const [unit, setUnit] = useState<Unit>('px');
  const [dpi, setDpi] = useState(300);
  const [copied, setCopied] = useState(false);

  const dim = (px: number) => (unit === 'px' ? `${px} px` : `${fromPixels(px, unit, dpi)} ${unit}`);

  const copySpecs = () => {
    const text =
      `${exam.name}\n` +
      `Photo: ${exam.photo.width}x${exam.photo.height} px, ${exam.photo.minKB}-${exam.photo.maxKB} KB\n` +
      `Signature: ${exam.signature.width}x${exam.signature.height} px, ${exam.signature.minKB}-${exam.signature.maxKB} KB`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const isCustom = exam.id === 'custom';

  return (
    <section className="card perforated-top overflow-hidden">
      {/* Docket head */}
      <header className="px-4 pt-5 pb-3 border-b border-dashed border-rule">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="label-field">{t.specTicket}</div>
            <h2 className="font-display text-[20px] font-bold text-ink mt-1 leading-tight truncate">
              {exam.name}
            </h2>
          </div>
          <span className="font-mono text-[10px] text-muted border border-rule rounded px-1.5 py-1 shrink-0 uppercase">
            {exam.category}
          </span>
        </div>
      </header>

      {/* Unit switch — forms say cm, upload boxes say px */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-rule bg-card-sunk">
        <div className="flex rounded-md border border-rule overflow-hidden bg-card">
          {UNITS.map(u => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              aria-pressed={unit === u}
              className={`px-2 py-1 font-mono text-[11px] transition-colors ${
 unit === u ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
 }`}
            >
              {u}
            </button>
          ))}
        </div>
        {unit !== 'px' && (
          <label className="flex items-center gap-1.5 font-mono text-[11px] text-muted ml-auto">
            DPI
            <input
              type="number"
              value={dpi}
              min={72}
              max={1200}
              onChange={e => setDpi(Math.max(72, Number(e.target.value) || 300))}
              className="w-16 px-1.5 py-1 rounded border border-rule bg-card text-ink text-[11px] outline-none focus:border-signal"
            />
          </label>
        )}
      </div>

      {/* Spec rows */}
      <div className="px-4 py-3">
        <div className="label-field mb-1">{t.photoParams}</div>
        <dl>
          <div className="spec-row"><dt>{t.width}</dt><dd>{dim(exam.photo.width)}</dd></div>
          <div className="spec-row"><dt>{t.height}</dt><dd>{dim(exam.photo.height)}</dd></div>
          <div className="spec-row"><dt>{t.fileSize}</dt><dd>{exam.photo.minKB}–{exam.photo.maxKB} KB</dd></div>
          <div className="spec-row"><dt>{t.fit}</dt><dd>{exam.photo.resizeMode}</dd></div>
        </dl>
      </div>

      <div className="px-4 py-3 border-t border-dashed border-rule">
        <div className="label-field mb-1">{t.signParams}</div>
        <dl>
          <div className="spec-row"><dt>{t.width}</dt><dd>{dim(exam.signature.width)}</dd></div>
          <div className="spec-row"><dt>{t.height}</dt><dd>{dim(exam.signature.height)}</dd></div>
          <div className="spec-row"><dt>{t.fileSize}</dt><dd>{exam.signature.minKB}–{exam.signature.maxKB} KB</dd></div>
          <div className="spec-row"><dt>{t.fit}</dt><dd>{exam.signature.resizeMode}</dd></div>
        </dl>
      </div>

      {/* Custom entry, only when there is nothing to preset */}
      {isCustom && onEditCustom && (
        <div className="px-4 py-4 border-t border-rule bg-card-sunk space-y-4">
          <div className="flex items-center gap-2 label-field">
            <Settings2 size={12} /> {t.customSize}
          </div>

          {(['photo', 'signature'] as const).map(kind => (
            <div key={kind}>
              <div className="label-field mb-2 normal-case tracking-normal text-[11px] text-ink">
                {kind === 'photo' ? t.photoParams : t.signParams}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {([
                  ['width', t.width],
                  ['height', t.height],
                  ['minKB', t.minSize],
                  ['maxKB', t.maxSize],
                ] as const).map(([field, fieldLabel]) => (
                  <label key={field} className="block">
                    <span className="label-field block mb-1">{fieldLabel}</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={exam[kind][field]}
                      onChange={e => onEditCustom(field, e.target.value, kind)}
                      className="field"
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="px-4 py-3 border-t border-rule">
        <button onClick={copySpecs} className="btn btn-quiet btn-sm w-full">
          {copied ? <Check size={14} className="text-pass" /> : <Copy size={14} />}
          {copied ? t.copied : t.copySpecs}
        </button>
      </footer>
    </section>
  );
};

export default SpecTicket;
