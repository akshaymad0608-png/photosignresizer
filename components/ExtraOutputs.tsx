import React, { useState } from 'react';
import { Layers, Printer, FileDown, Loader2, X, Download } from 'lucide-react';
import { ExamRequirement, ProcessedImage, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { buildCombinedSheet, buildPrintSheet } from '../utils/sheets';
import { fromPixels } from '../utils/units';

interface ExtraOutputsProps {
  lang: Language;
  exam: ExamRequirement;
  photo: ProcessedImage | null;
  sign: ProcessedImage | null;
}

interface Sheet {
  url: string;
  title: string;
  caption: string;
  filename: string;
}

const download = (url: string, filename: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

/**
 * The three things people otherwise do by hand after resizing: paste photo and
 * signature into one box, print a strip of copies, and file a PDF of both.
 */
const ExtraOutputs = ({ lang, exam, photo, sign }: ExtraOutputsProps) => {
  const t = TRANSLATIONS[lang];
  const [busy, setBusy] = useState<string | null>(null);
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [copies, setCopies] = useState(8);
  const [error, setError] = useState<string | null>(null);

  if (!photo && !sign) return null;

  const run = async (id: string, fn: () => Promise<void>) => {
    setBusy(id);
    setError(null);
    try {
      await fn();
    } catch (err) {
      console.error(err);
      setError(t.sheetFailed);
    } finally {
      setBusy(null);
    }
  };

  const makeCombined = () =>
    run('combined', async () => {
      if (!photo?.processedUrl || !sign?.processedUrl) return;
      const result = await buildCombinedSheet(photo.processedUrl, sign.processedUrl);
      setSheet({
        url: result.url,
        title: t.combinedTitle,
        caption: `${result.width}×${result.height} px · ${result.sizeKB.toFixed(1)} KB`,
        filename: `photo_sign_${exam.id}.jpg`,
      });
    });

  const makePrint = () =>
    run('print', async () => {
      if (!photo?.processedUrl) return;
      const widthMM = fromPixels(exam.photo.width, 'mm', 300);
      const heightMM = fromPixels(exam.photo.height, 'mm', 300);
      const result = await buildPrintSheet(photo.processedUrl, widthMM, heightMM, copies);
      setSheet({
        url: result.url,
        title: t.printTitle,
        caption: `${result.cols}×${result.rows} grid · ${Math.min(copies, result.fits)} ${t.copiesWord} · 4×6in @ 300dpi`,
        filename: `print_sheet_${exam.id}.jpg`,
      });
    });

  const makePDF = () =>
    run('pdf', async () => {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      let y = 20;

      doc.setFontSize(15);
      doc.text('Application documents', 20, y);
      y += 7;
      doc.setFontSize(10);
      doc.text(exam.name, 20, y);
      y += 12;

      if (photo?.processedUrl) {
        doc.text('Photograph', 20, y);
        y += 4;
        const w = 38;
        const h = (exam.photo.height / exam.photo.width) * w;
        doc.addImage(photo.processedUrl, 'JPEG', 20, y, w, h);
        y += h + 12;
      }
      if (sign?.processedUrl) {
        doc.text('Signature', 20, y);
        y += 4;
        const w = 52;
        const h = (exam.signature.height / exam.signature.width) * w;
        doc.addImage(sign.processedUrl, 'JPEG', 20, y, w, h);
      }
      doc.save(`documents_${exam.id}.pdf`);
    });

  const actions = [
    {
      id: 'combined',
      icon: Layers,
      title: t.combinedTitle,
      body: t.combinedBody,
      onClick: makeCombined,
      disabled: !photo || !sign,
      disabledNote: t.needBoth,
    },
    {
      id: 'print',
      icon: Printer,
      title: t.printTitle,
      body: t.printBody,
      onClick: makePrint,
      disabled: !photo,
      disabledNote: t.needPhoto,
    },
    {
      id: 'pdf',
      icon: FileDown,
      title: t.pdfTitle,
      body: t.pdfBody,
      onClick: makePDF,
      disabled: false,
      disabledNote: '',
    },
  ];

  return (
    <section className="card p-5">
      <h2 className="label-field mb-1">{t.extrasHeading}</h2>
      <p className="text-[13px] text-muted mb-4">{t.extrasBody}</p>

      <div className="grid sm:grid-cols-3 gap-3">
        {actions.map(action => {
          const Icon = action.icon;
          return (
            <div key={action.id} className="card-sunk p-3.5 flex flex-col">
              <Icon size={17} className="text-signal mb-2.5" />
              <h3 className="font-display text-[15px] font-bold text-ink mb-1">{action.title}</h3>
              <p className="text-[12px] text-muted leading-snug flex-1 mb-3">
                {action.disabled ? action.disabledNote : action.body}
              </p>

              {action.id === 'print' && !action.disabled && (
                <label className="flex items-center gap-2 mb-2.5 label-field">
                  {t.copiesWord}
                  <input
                    type="number"
                    min={1}
                    max={24}
                    value={copies}
                    onChange={e => setCopies(Math.max(1, Math.min(24, Number(e.target.value) || 1)))}
                    className="w-14 px-1.5 py-1 rounded border border-rule bg-card text-ink font-mono text-[11px] outline-none focus:border-signal"
                  />
                </label>
              )}

              <button
                onClick={action.onClick}
                disabled={action.disabled || busy !== null}
                className="btn btn-quiet btn-sm w-full"
              >
                {busy === action.id ? <Loader2 size={14} className="animate-spin" /> : null}
                {busy === action.id ? t.building : t.build}
              </button>
            </div>
          );
        })}
      </div>

      {error && <p className="mt-3 text-[13px] text-fail">{error}</p>}

      {sheet && (
        <div
          className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSheet(null)}
        >
          <div className="card max-w-2xl w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <header className="flex items-center justify-between px-4 py-3 border-b border-rule">
              <div>
                <h3 className="font-display text-[16px] font-bold text-ink">{sheet.title}</h3>
                <p className="font-mono text-[11px] text-muted">{sheet.caption}</p>
              </div>
              <button onClick={() => setSheet(null)} className="p-1.5 text-muted hover:text-ink" aria-label={t.close}>
                <X size={18} />
              </button>
            </header>

            <div className="p-4 checkerboard flex items-center justify-center max-h-[60vh] overflow-auto">
              <img src={sheet.url} alt={sheet.title} className="max-w-full object-contain" />
            </div>

            <footer className="p-4 border-t border-rule">
              <button onClick={() => download(sheet.url, sheet.filename)} className="btn btn-primary w-full">
                <Download size={16} /> {t.download} {sheet.filename}
              </button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExtraOutputs;
