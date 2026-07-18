/**
 * Client-side quality checks on a processed image.
 * Everything here runs on a canvas in the browser — no upload, ever.
 */

export type CheckStatus = 'pass' | 'warn' | 'fail';

export interface Check {
  id: string;
  status: CheckStatus;
  label: string;
  detail: string;
}

export interface ImageStats {
  width: number;
  height: number;
  meanLuma: number;        // 0..255
  sharpness: number;       // variance of Laplacian, higher = sharper
  borderLuma: number;      // mean luma of the outer frame (background proxy)
  borderSpread: number;    // std-dev of the border (plain background => low)
  inkCoverage: number;     // share of dark pixels — used for signatures
}

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

export const measureImage = async (src: string): Promise<ImageStats | null> => {
  const img = await loadImage(src);
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (!w || !h) return null;

  // Work on a bounded copy so big uploads stay fast on cheap phones.
  const scale = Math.min(1, 320 / Math.max(w, h));
  const cw = Math.max(2, Math.round(w * scale));
  const ch = Math.max(2, Math.round(h * scale));

  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, cw, ch);

  const { data } = ctx.getImageData(0, 0, cw, ch);
  const luma = new Float32Array(cw * ch);
  let sum = 0;
  let dark = 0;

  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const l = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    luma[p] = l;
    sum += l;
    if (l < 110) dark++;
  }
  const meanLuma = sum / luma.length;

  // Variance of the Laplacian — the standard cheap blur estimate.
  let lapSum = 0;
  let lapSqSum = 0;
  let lapCount = 0;
  for (let y = 1; y < ch - 1; y++) {
    for (let x = 1; x < cw - 1; x++) {
      const i = y * cw + x;
      const lap =
        4 * luma[i] - luma[i - 1] - luma[i + 1] - luma[i - cw] - luma[i + cw];
      lapSum += lap;
      lapSqSum += lap * lap;
      lapCount++;
    }
  }
  const lapMean = lapSum / lapCount;
  const sharpness = lapSqSum / lapCount - lapMean * lapMean;

  // Outer 6% frame stands in for "the background behind the head".
  const band = Math.max(2, Math.round(Math.min(cw, ch) * 0.06));
  let bSum = 0;
  let bSqSum = 0;
  let bCount = 0;
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const onBorder = x < band || y < band || x >= cw - band || y >= ch - band;
      if (!onBorder) continue;
      const l = luma[y * cw + x];
      bSum += l;
      bSqSum += l * l;
      bCount++;
    }
  }
  const borderLuma = bSum / bCount;
  const borderSpread = Math.sqrt(Math.max(0, bSqSum / bCount - borderLuma * borderLuma));

  return {
    width: w,
    height: h,
    meanLuma,
    sharpness,
    borderLuma,
    borderSpread,
    inkCoverage: dark / luma.length,
  };
};

interface CheckInput {
  stats: ImageStats | null;
  sizeKB: number;
  minKB: number;
  maxKB: number;
  targetW: number;
  targetH: number;
  kind: 'photo' | 'signature';
}

/**
 * Turns raw measurements into the checklist a form clerk would run through.
 * Wording is deliberately actionable: each failure says what to change.
 */
export const runChecks = ({
  stats, sizeKB, minKB, maxKB, targetW, targetH, kind,
}: CheckInput): Check[] => {
  const checks: Check[] = [];

  checks.push({
    id: 'dimensions',
    status: stats && stats.width === targetW && stats.height === targetH ? 'pass' : 'warn',
    label: 'Dimensions',
    detail: stats
      ? `${stats.width} × ${stats.height} px — form wants ${targetW} × ${targetH} px`
      : `Target ${targetW} × ${targetH} px`,
  });

  const inBand = sizeKB >= minKB && sizeKB <= maxKB;
  checks.push({
    id: 'filesize',
    status: inBand ? 'pass' : 'fail',
    label: 'File size',
    detail: inBand
      ? `${sizeKB.toFixed(1)} KB, inside the ${minKB}–${maxKB} KB band`
      : sizeKB > maxKB
        ? `${sizeKB.toFixed(1)} KB is over the ${maxKB} KB ceiling. Crop tighter or drop quality.`
        : `${sizeKB.toFixed(1)} KB is under the ${minKB} KB floor. Upload a sharper original.`,
  });

  if (!stats) return checks;

  // Sharpness thresholds tuned on downscaled 320px previews.
  const blurStatus: CheckStatus =
    stats.sharpness > 120 ? 'pass' : stats.sharpness > 45 ? 'warn' : 'fail';
  checks.push({
    id: 'sharpness',
    status: blurStatus,
    label: 'Sharpness',
    detail:
      blurStatus === 'pass'
        ? 'Edges are crisp enough to print'
        : blurStatus === 'warn'
          ? 'Slightly soft. Retake in brighter light if the form rejects it.'
          : 'Too blurry. Retake the shot — scaling a small image up will not fix this.',
  });

  if (kind === 'photo') {
    const expStatus: CheckStatus =
      stats.meanLuma > 95 && stats.meanLuma < 195 ? 'pass' : 'warn';
    checks.push({
      id: 'exposure',
      status: expStatus,
      label: 'Exposure',
      detail:
        expStatus === 'pass'
          ? 'Face is evenly lit'
          : stats.meanLuma <= 95
            ? 'Photo reads dark. Raise brightness a little.'
            : 'Photo reads washed out. Lower brightness a little.',
    });

    const bgStatus: CheckStatus =
      stats.borderLuma > 175 && stats.borderSpread < 34
        ? 'pass'
        : stats.borderSpread < 55
          ? 'warn'
          : 'fail';
    checks.push({
      id: 'background',
      status: bgStatus,
      label: 'Background',
      detail:
        bgStatus === 'pass'
          ? 'Plain and light, the way most forms require'
          : bgStatus === 'warn'
            ? 'Background is busy or dim. Most forms ask for plain white.'
            : 'Cluttered background. Shoot against a plain wall or turn on Remove background.',
    });
  } else {
    const inkStatus: CheckStatus =
      stats.inkCoverage > 0.02 && stats.inkCoverage < 0.42
        ? 'pass'
        : stats.inkCoverage <= 0.02
          ? 'fail'
          : 'warn';
    checks.push({
      id: 'ink',
      status: inkStatus,
      label: 'Ink contrast',
      detail:
        inkStatus === 'pass'
          ? 'Signature stands out clearly against the paper'
          : stats.inkCoverage <= 0.02
            ? 'Signature is too faint to read. Sign with a dark pen on white paper.'
            : 'Paper looks shadowed. Turn on black & white to clean it up.',
    });
  }

  return checks;
};

export const verdictOf = (checks: Check[]): CheckStatus => {
  if (checks.some(c => c.status === 'fail')) return 'fail';
  if (checks.some(c => c.status === 'warn')) return 'warn';
  return 'pass';
};
