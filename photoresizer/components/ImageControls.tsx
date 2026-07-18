import React, { useState } from 'react';
import { Sliders, RotateCcw, ChevronDown } from 'lucide-react';

interface ImageControlsProps {
  brightness: number;
  setBrightness: (v: number) => void;
  contrast: number;
  setContrast: (v: number) => void;
  grayscale: boolean;
  setGrayscale: (v: boolean) => void;
  removeBg?: boolean;
  setRemoveBg?: (v: boolean) => void;
  t: any;
}

const Toggle = ({ checked, onChange, label, note }: {
  checked: boolean; onChange: (v: boolean) => void; label: string; note?: string;
}) => (
  <label className="flex items-start gap-2.5 cursor-pointer select-none py-1">
    <span className="relative flex items-center mt-0.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="peer w-4.5 h-4.5 appearance-none rounded border border-rule bg-card checked:bg-signal checked:border-signal transition-colors cursor-pointer"
        style={{ width: 18, height: 18 }}
      />
      <svg className="absolute left-[3px] top-[4px] w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 14 10" fill="none">
        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
    <span>
      <span className="block text-[13px] font-medium text-ink">{label}</span>
      {note && <span className="block text-[11px] text-muted leading-snug">{note}</span>}
    </span>
  </label>
);

const Slider = ({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) => (
  <div>
    <div className="flex justify-between items-baseline mb-1.5">
      <span className="label-field">{label}</span>
      <span className="font-mono text-[11px] text-ink">{value > 0 ? `+${value}` : value}</span>
    </div>
    <input
      type="range" min="-50" max="50" value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full"
      aria-label={label}
    />
  </div>
);

const ImageControls = ({
  brightness, setBrightness, contrast, setContrast,
  grayscale, setGrayscale, removeBg, setRemoveBg, t,
}: ImageControlsProps) => {
  const [open, setOpen] = useState(false);
  const touched = brightness !== 0 || contrast !== 0;

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-rule bg-card-sunk text-[13px] font-medium text-ink hover:border-muted transition-colors"
      >
        <span className="flex items-center gap-2">
          <Sliders size={14} className="text-muted" /> {t.advancedAdjustments}
          {touched && <span className="w-1.5 h-1.5 rounded-full bg-signal" />}
        </span>
        <ChevronDown size={15} className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="mt-2 card-sunk p-4 space-y-4 animate-fade-in">
          <div className="space-y-1">
            <Toggle checked={grayscale} onChange={setGrayscale} label={t.grayscale} note={t.grayscaleNote} />
            {setRemoveBg && (
              <Toggle checked={!!removeBg} onChange={setRemoveBg} label={t.removeBg} note={t.removeBgNote} />
            )}
          </div>

          <Slider label={t.brightness} value={brightness} onChange={setBrightness} />
          <Slider label={t.contrast} value={contrast} onChange={setContrast} />

          <button
            onClick={() => { setBrightness(0); setContrast(0); setGrayscale(false); setRemoveBg?.(false); }}
            className="w-full flex items-center justify-center gap-1.5 pt-3 border-t border-rule text-[12px] font-medium text-muted hover:text-signal transition-colors"
          >
            <RotateCcw size={13} /> {t.resetAdjustments}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageControls;
