/**
 * QR generation. The `qrcode` package is loaded dynamically so it is only
 * fetched when a user actually opens the QR tool — it stays out of the
 * initial bundle and off the critical path.
 */

export interface QrOptions {
  size?: number;
  dark?: string;
  light?: string;
  margin?: number;
  /** 'L' | 'M' | 'Q' | 'H' — higher survives more damage but holds less data. */
  level?: 'L' | 'M' | 'Q' | 'H';
}

const defaults = (o: QrOptions = {}) => ({
  width: o.size ?? 512,
  margin: o.margin ?? 2,
  errorCorrectionLevel: o.level ?? 'M',
  color: { dark: o.dark ?? '#0b1020', light: o.light ?? '#ffffff' },
});

/** PNG data URL — for downloading. */
export async function qrToDataUrl(text: string, opts: QrOptions = {}): Promise<string> {
  const QR = await import('qrcode');
  return QR.toDataURL(text, defaults(opts));
}

/** Inline SVG string — crisp at any size, good for on-screen preview. */
export async function qrToSvg(text: string, opts: QrOptions = {}): Promise<string> {
  const QR = await import('qrcode');
  return QR.toString(text, { ...defaults(opts), type: 'svg' });
}

/** Rough capacity guard so the UI can warn before encoding throws. */
export const QR_MAX_CHARS = 1200;
