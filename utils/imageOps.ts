/**
 * Canvas image operations. Everything runs client-side — no bytes leave the device.
 * All functions take and return data URLs so they compose freely.
 */

export type ExportFormat = 'jpeg' | 'png' | 'webp';

export const MIME: Record<ExportFormat, string> = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

export const EXT: Record<ExportFormat, string> = { jpeg: 'jpg', png: 'png', webp: 'webp' };

/** Load a data URL into an HTMLImageElement. */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not read that image file.'));
    img.src = src;
  });
}

function ctxOf(w: number, h: number) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(w));
  canvas.height = Math.max(1, Math.round(h));
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas is not available in this browser.');
  return { canvas, ctx };
}

/** Approximate byte size of a data URL payload. */
export function dataUrlBytes(dataUrl: string) {
  const b64 = dataUrl.split(',')[1] || '';
  return Math.round(b64.length * 0.75);
}

export const bytesToKB = (b: number) => b / 1024;

/** Convert between formats. PNG ignores quality; JPEG gets a white matte. */
export async function convertFormat(
  src: string,
  format: ExportFormat,
  quality = 0.92
): Promise<string> {
  const img = await loadImage(src);
  const { canvas, ctx } = ctxOf(img.naturalWidth, img.naturalHeight);
  if (format === 'jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL(MIME[format], quality);
}

/** Mirror horizontally or vertically. */
export async function flipImage(src: string, axis: 'x' | 'y'): Promise<string> {
  const img = await loadImage(src);
  const { canvas, ctx } = ctxOf(img.naturalWidth, img.naturalHeight);
  ctx.translate(axis === 'x' ? canvas.width : 0, axis === 'y' ? canvas.height : 0);
  ctx.scale(axis === 'x' ? -1 : 1, axis === 'y' ? -1 : 1);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/png');
}

/** Rotate by an arbitrary angle, growing the canvas to fit. */
export async function rotateImage(src: string, deg: number): Promise<string> {
  const img = await loadImage(src);
  const rad = (deg * Math.PI) / 180;
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const nw = Math.abs(w * Math.cos(rad)) + Math.abs(h * Math.sin(rad));
  const nh = Math.abs(w * Math.sin(rad)) + Math.abs(h * Math.cos(rad));
  const { canvas, ctx } = ctxOf(nw, nh);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rad);
  ctx.drawImage(img, -w / 2, -h / 2);
  return canvas.toDataURL('image/png');
}

/** Generic 3x3 convolution used by sharpen and blur. */
async function convolve(src: string, kernel: number[], divisor?: number): Promise<string> {
  const img = await loadImage(src);
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const { canvas, ctx } = ctxOf(w, h);
  ctx.drawImage(img, 0, 0);
  const input = ctx.getImageData(0, 0, w, h);
  const output = ctx.createImageData(w, h);
  const div = divisor ?? (kernel.reduce((a, b) => a + b, 0) || 1);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = 0, g = 0, b = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const px = Math.min(w - 1, Math.max(0, x + kx));
          const py = Math.min(h - 1, Math.max(0, y + ky));
          const k = kernel[(ky + 1) * 3 + (kx + 1)];
          const i = (py * w + px) * 4;
          r += input.data[i] * k;
          g += input.data[i + 1] * k;
          b += input.data[i + 2] * k;
        }
      }
      const o = (y * w + x) * 4;
      output.data[o] = Math.min(255, Math.max(0, r / div));
      output.data[o + 1] = Math.min(255, Math.max(0, g / div));
      output.data[o + 2] = Math.min(255, Math.max(0, b / div));
      output.data[o + 3] = input.data[o + 3];
    }
  }
  ctx.putImageData(output, 0, 0);
  return canvas.toDataURL('image/png');
}

export const sharpenImage = (src: string) =>
  convolve(src, [0, -1, 0, -1, 5, -1, 0, -1, 0], 1);

export const blurImage = (src: string) =>
  convolve(src, [1, 2, 1, 2, 4, 2, 1, 2, 1], 16);

/**
 * Auto enhance: histogram stretch on luminance with a mild saturation lift.
 * Clips the top and bottom 0.5% so a few stray pixels can't skew the range.
 */
export async function autoEnhance(src: string): Promise<string> {
  const img = await loadImage(src);
  const { canvas, ctx } = ctxOf(img.naturalWidth, img.naturalHeight);
  ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const px = d.data;

  const hist = new Array(256).fill(0);
  for (let i = 0; i < px.length; i += 4) {
    const l = Math.round(0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]);
    hist[l]++;
  }
  const total = px.length / 4;
  const clip = total * 0.005;
  let lo = 0, hi = 255, acc = 0;
  for (let i = 0; i < 256; i++) { acc += hist[i]; if (acc > clip) { lo = i; break; } }
  acc = 0;
  for (let i = 255; i >= 0; i--) { acc += hist[i]; if (acc > clip) { hi = i; break; } }
  const range = Math.max(1, hi - lo);

  for (let i = 0; i < px.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      px[i + c] = Math.min(255, Math.max(0, ((px[i + c] - lo) / range) * 255));
    }
    const avg = (px[i] + px[i + 1] + px[i + 2]) / 3;
    for (let c = 0; c < 3; c++) {
      px[i + c] = Math.min(255, Math.max(0, avg + (px[i + c] - avg) * 1.12));
    }
  }
  ctx.putImageData(d, 0, 0);
  return canvas.toDataURL('image/png');
}

export interface WatermarkOptions {
  text: string;
  opacity?: number;
  position?: 'center' | 'bottom-right' | 'bottom-left' | 'tile';
  color?: string;
  scale?: number;
}

/** Text watermark. 'tile' repeats diagonally across the whole frame. */
export async function watermarkImage(src: string, opt: WatermarkOptions): Promise<string> {
  const { text, opacity = 0.35, position = 'bottom-right', color = '#ffffff', scale = 0.045 } = opt;
  const img = await loadImage(src);
  const { canvas, ctx } = ctxOf(img.naturalWidth, img.naturalHeight);
  ctx.drawImage(img, 0, 0);

  const size = Math.max(11, canvas.width * scale);
  ctx.font = `700 ${size}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = size * 0.15;

  const pad = size * 0.7;
  const m = ctx.measureText(text);

  if (position === 'tile') {
    ctx.save();
    ctx.rotate(-Math.PI / 8);
    const stepX = m.width + size * 2.5;
    const stepY = size * 3.5;
    for (let y = -canvas.height; y < canvas.height * 2; y += stepY) {
      for (let x = -canvas.width; x < canvas.width * 2; x += stepX) {
        ctx.fillText(text, x, y);
      }
    }
    ctx.restore();
  } else if (position === 'center') {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  } else {
    ctx.textBaseline = 'bottom';
    const x = position === 'bottom-right' ? canvas.width - m.width - pad : pad;
    ctx.fillText(text, x, canvas.height - pad);
  }

  ctx.globalAlpha = 1;
  return canvas.toDataURL('image/png');
}

/**
 * Re-encoding through canvas discards every EXIF/IPTC/XMP block, including
 * GPS coordinates and device identifiers. This is the metadata remover.
 */
export async function stripMetadata(src: string, format: ExportFormat = 'jpeg'): Promise<string> {
  return convertFormat(src, format, 0.95);
}

export interface ImageMetadata {
  width: number;
  height: number;
  aspectRatio: string;
  megapixels: string;
  sizeKB: number;
  format: string;
  hasAlpha: boolean;
  colorDepth: string;
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/** Reads structural metadata that survives a canvas round-trip. */
export async function readMetadata(src: string): Promise<ImageMetadata> {
  const img = await loadImage(src);
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const g = gcd(w, h) || 1;

  const { canvas, ctx } = ctxOf(Math.min(w, 80), Math.min(h, 80));
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let hasAlpha = false;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 250) { hasAlpha = true; break; }
  }

  const mimeMatch = /^data:([^;]+);/.exec(src);
  return {
    width: w,
    height: h,
    aspectRatio: `${w / g}:${h / g}`,
    megapixels: ((w * h) / 1_000_000).toFixed(2),
    sizeKB: Math.round(bytesToKB(dataUrlBytes(src))),
    format: (mimeMatch?.[1] || 'image/unknown').replace('image/', '').toUpperCase(),
    hasAlpha,
    colorDepth: '8-bit / channel',
  };
}

/** Dominant colour palette via a coarse RGB histogram (4-bit per channel). */
export async function extractPalette(src: string, count = 6): Promise<string[]> {
  const img = await loadImage(src);
  const { canvas, ctx } = ctxOf(Math.min(img.naturalWidth, 160), Math.min(img.naturalHeight, 160));
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  const buckets = new Map<number, { n: number; r: number; g: number; b: number }>();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    const cur = buckets.get(key) || { n: 0, r: 0, g: 0, b: 0 };
    cur.n++; cur.r += r; cur.g += g; cur.b += b;
    buckets.set(key, cur);
  }

  return [...buckets.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, count)
    .map(c => {
      const hex = (v: number) => Math.round(v / c.n).toString(16).padStart(2, '0');
      return `#${hex(c.r)}${hex(c.g)}${hex(c.b)}`;
    });
}

/** Colour of a single pixel, for the eyedropper. */
export async function pickColorAt(src: string, xRatio: number, yRatio: number): Promise<string> {
  const img = await loadImage(src);
  const { canvas, ctx } = ctxOf(img.naturalWidth, img.naturalHeight);
  ctx.drawImage(img, 0, 0);
  const x = Math.min(canvas.width - 1, Math.max(0, Math.round(xRatio * canvas.width)));
  const y = Math.min(canvas.height - 1, Math.max(0, Math.round(yRatio * canvas.height)));
  const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
  const hex = (v: number) => v.toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}
