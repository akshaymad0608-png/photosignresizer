import React, { useEffect, useMemo, useState } from 'react';
import { Download, Share2, Maximize2, X } from 'lucide-react';
import { formatFileSize } from '../utils/imageProcessing';
import { measureImage, runChecks, verdictOf, Check as CheckItem } from '../utils/analyze';
import BeforeAfterPreview from './BeforeAfterPreview';
import SizeGauge from './SizeGauge';
import ComplianceChecklist from './ComplianceChecklist';

interface ResultCardProps {
  originalUrl?: string;
  processedUrl: string | null;
  fileSizeKB: number;
  width: number;
  height: number;
  reqMin: number;
  reqMax: number;
  onDownload: () => void;
  fileName: string;
  type: string;
  kind: 'photo' | 'signature';
}

const VERDICT = {
  pass: { text: 'Perfect', tone: 'text-pass' },
  warn: { text: 'Check it', tone: 'text-warn' },
  fail: { text: 'Needs Changes', tone: 'text-fail' },
} as const;

const ResultCard = ({
  originalUrl, processedUrl, fileSizeKB, width, height,
  reqMin, reqMax, onDownload, fileName, type, kind,
}: ResultCardProps) => {
  const [zoomed, setZoomed] = useState(false);
  const [checks, setChecks] = useState<CheckItem[]>([]);

  const originalSizeKB = useMemo(() => {
    if (!originalUrl) return 0;
    const b64 = originalUrl.split(',')[1]?.length || 0;
    return (b64 * (3 / 4)) / 1024;
  }, [originalUrl]);

  useEffect(() => {
    let cancelled = false;
    if (!processedUrl) return;
    measureImage(processedUrl)
      .then(stats => {
        if (cancelled) return;
        setChecks(runChecks({
          stats, sizeKB: fileSizeKB, minKB: reqMin, maxKB: reqMax,
          targetW: width, targetH: height, kind,
        }));
      })
      .catch(() => setChecks([]));
    return () => { cancelled = true; };
  }, [processedUrl, fileSizeKB, reqMin, reqMax, width, height, kind]);

  if (!processedUrl) return null;

  const verdict = checks.length ? verdictOf(checks) : 'warn';
  const saved = originalSizeKB > 0 ? Math.round((1 - fileSizeKB / originalSizeKB) * 100) : 0;

  const share = async () => {
    try {
      const blob = await (await fetch(processedUrl)).blob();
      const file = new File([blob], fileName, { type: blob.type });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: 'Resized image', files: [file] });
      } else {
        await navigator.share({ title: 'PhotoResizer', url: 'https://photoresizer.click' });
      }
    } catch (err) {
      console.error('Share failed', err);
    }
  };

  return (
    <div className="card overflow-hidden animate-rise">
      {/* Verdict stamp — the moment the whole page is built around */}
      <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-rule">
        <div className="min-w-0">
          <div className="label-field">{type}</div>
          <div className="font-mono text-[12px] text-ink truncate">{width}×{height} px</div>
        </div>
        <span className={`stamp text-[12px] shrink-0 animate-stamp ${VERDICT[verdict].tone}`}>
          {VERDICT[verdict].text}
        </span>
      </header>

      <div className="relative checkerboard border-b border-rule">
        <div className="h-44 sm:h-52 flex items-center justify-center p-3">
          {originalUrl ? (
            <BeforeAfterPreview originalUrl={originalUrl} processedUrl={processedUrl} className="h-full" />
          ) : (
            <img src={processedUrl} alt={`${type} result`} className="max-h-full object-contain" />
          )}
        </div>
        <button
          onClick={() => setZoomed(true)}
          className="absolute top-2 right-2 p-1.5 rounded-md bg-card/90 border border-rule text-muted hover:text-ink transition-colors"
          aria-label="Open full preview"
        >
          <Maximize2 size={14} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <SizeGauge sizeKB={fileSizeKB} minKB={reqMin} maxKB={reqMax} />

        {originalSizeKB > 0 && (
          <p className="font-mono text-[11px] text-muted">
            {formatFileSize(originalSizeKB)} → {formatFileSize(fileSizeKB)}
            {saved > 0 && <span className="text-pass"> · {saved}% smaller</span>}
          </p>
        )}

        <ComplianceChecklist checks={checks} />

        <div className="flex gap-2">
          <button onClick={onDownload} className="btn btn-primary flex-1">
            <Download size={16} /> Download JPG
          </button>
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button onClick={share} className="btn btn-quiet px-3.5" aria-label="Share image">
              <Share2 size={16} />
            </button>
          )}
        </div>
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setZoomed(false)}
        >
          <button className="absolute top-4 right-4 p-2 text-paper" aria-label="Close preview">
            <X size={22} />
          </button>
          <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            {originalUrl ? (
              <BeforeAfterPreview originalUrl={originalUrl} processedUrl={processedUrl} className="w-full max-h-[75vh]" />
            ) : (
              <img src={processedUrl} alt={`${type} full preview`} className="max-h-[75vh] mx-auto object-contain" />
            )}
            <p className="text-center font-mono text-[12px] text-paper/70 mt-4">
              {width}×{height} px · {formatFileSize(fileSizeKB)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
