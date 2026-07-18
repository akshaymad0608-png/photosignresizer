import React from 'react';

interface SizeGaugeProps {
  sizeKB: number;
  minKB: number;
  maxKB: number;
  compact?: boolean;
}

/**
 * The file-size band, drawn the way a tolerance is drawn on an engineering
 * drawing: the accepted window is the shaded zone, your value is the needle.
 * Far clearer than "45 KB / 50 KB" for someone deciding whether to re-shoot.
 */
const SizeGauge = ({ sizeKB, minKB, maxKB, compact = false }: SizeGaugeProps) => {
  const scaleMax = Math.max(maxKB * 1.35, sizeKB * 1.12, maxKB + 1);
  const pct = (v: number) => Math.max(0, Math.min(100, (v / scaleMax) * 100));

  const inBand = sizeKB >= minKB && sizeKB <= maxKB;
  const tone = inBand ? 'text-pass' : sizeKB > maxKB ? 'text-fail' : 'text-warn';

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-2">
        <span className="label-field">File size</span>
        <span className={`font-mono text-[13px] font-semibold ${tone}`}>
          {sizeKB.toFixed(1)} KB
        </span>
      </div>

      <div className={`relative w-full ${compact ? 'h-2' : 'h-3'} rounded-full bg-card-sunk border border-rule overflow-hidden`}>
        <div
          className="absolute inset-y-0 bg-pass/25"
          style={{ left: `${pct(minKB)}%`, width: `${pct(maxKB) - pct(minKB)}%` }}
        />
        <div
          className={`absolute inset-y-0 w-[3px] rounded-full ${
 inBand ? 'bg-pass' : sizeKB > maxKB ? 'bg-fail' : 'bg-warn'
 }`}
          style={{ left: `calc(${pct(sizeKB)}% - 1.5px)` }}
        />
      </div>

      <div className="flex justify-between mt-1.5 font-mono text-[10px] text-muted">
        <span>0</span>
        <span className="text-pass">
          allowed {minKB}–{maxKB} KB
        </span>
        <span>{Math.round(scaleMax)}</span>
      </div>
    </div>
  );
};

export default SizeGauge;
