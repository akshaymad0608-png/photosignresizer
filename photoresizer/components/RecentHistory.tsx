import React from 'react';
import { Download, X } from 'lucide-react';
import { ProcessedImage } from '../types';

interface RecentHistoryProps {
  history: ProcessedImage[];
  onClear: () => void;
  title: string;
}

const RecentHistory = ({ history, onClear, title }: RecentHistoryProps) => {
  if (!history.length) return null;

  return (
    <section className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="label-field">{title}</h3>
        <button onClick={onClear} className="flex items-center gap-1 text-[11px] text-muted hover:text-fail transition-colors">
          <X size={11} /> Clear
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {history.map((item, i) =>
          item.processedUrl ? (
            <div key={i} className="shrink-0 w-28">
              <div className="h-24 rounded-lg border border-rule checkerboard flex items-center justify-center overflow-hidden p-1.5">
                <img src={item.processedUrl} alt="" className="max-w-full max-h-full object-contain" />
              </div>
              <p className="font-mono text-[10px] text-muted mt-1.5 truncate">
                {item.width}×{item.height} · {item.fileSizeKB.toFixed(0)}KB
              </p>
              <a
                href={item.processedUrl}
                download={item.name}
                className="mt-1 flex items-center justify-center gap-1 py-1 rounded-md border border-rule text-[11px] font-medium text-ink hover:border-signal hover:text-signal transition-colors"
              >
                <Download size={11} /> Save
              </a>
            </div>
          ) : null
        )}
      </div>
    </section>
  );
};

export default RecentHistory;
