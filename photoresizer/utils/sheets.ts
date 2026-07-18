/**
 * Two things every aspirant ends up doing by hand in MS Paint:
 * pasting photo + signature into one box, and printing a strip of
 * passport copies at the local studio. Both are done here on canvas.
 */

const load = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const encode = (canvas: HTMLCanvasElement, maxKB?: number) => {
  let quality = 0.95;
  let url = canvas.toDataURL('image/jpeg', quality);
  const bytes = (u: string) => Math.round((u.length * 3) / 4);
  if (maxKB) {
    let guard = 0;
    while (bytes(url) > maxKB * 1024 && quality > 0.15 && guard < 30) {
      quality -= 0.05;
      url = canvas.toDataURL('image/jpeg', quality);
      guard++;
    }
  }
  return { url, sizeKB: bytes(url) / 1024 };
};

/** Photo above, signature below, on one white JPG — what SSC/RRB forms want. */
export const buildCombinedSheet = async (
  photoUrl: string,
  signUrl: string,
  maxKB?: number
): Promise<{ url: string; sizeKB: number; width: number; height: number }> => {
  const [photo, sign] = await Promise.all([load(photoUrl), load(signUrl)]);

  const width = Math.max(photo.width, sign.width);
  const gap = Math.round(width * 0.04);
  const pad = Math.round(width * 0.05);

  const photoH = Math.round((photo.height / photo.width) * width);
  const signH = Math.round((sign.height / sign.width) * width);
  const height = pad * 2 + photoH + gap + signH;

  const canvas = document.createElement('canvas');
  canvas.width = width + pad * 2;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(photo, pad, pad, width, photoH);
  ctx.drawImage(sign, pad, pad + photoH + gap, width, signH);

  const { url, sizeKB } = encode(canvas, maxKB);
  return { url, sizeKB, width: canvas.width, height: canvas.height };
};

/**
 * A 4×6 inch print sheet at 300 DPI, tiled with copies of the photo at
 * its true physical size, with cut guides. Take it to any print shop.
 */
export const buildPrintSheet = async (
  photoUrl: string,
  photoWidthMM: number,
  photoHeightMM: number,
  copies: number
): Promise<{ url: string; rows: number; cols: number; fits: number }> => {
  const dpi = 300;
  const sheetW = 6 * dpi;
  const sheetH = 4 * dpi;
  const margin = Math.round(0.15 * dpi);
  const gutter = Math.round(0.06 * dpi);

  const cellW = Math.round((photoWidthMM / 25.4) * dpi);
  const cellH = Math.round((photoHeightMM / 25.4) * dpi);

  const cols = Math.max(1, Math.floor((sheetW - margin * 2 + gutter) / (cellW + gutter)));
  const rows = Math.max(1, Math.floor((sheetH - margin * 2 + gutter) / (cellH + gutter)));
  const fits = cols * rows;

  const photo = await load(photoUrl);
  const canvas = document.createElement('canvas');
  canvas.width = sheetW;
  canvas.height = sheetH;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, sheetW, sheetH);

  const gridW = cols * cellW + (cols - 1) * gutter;
  const gridH = rows * cellH + (rows - 1) * gutter;
  const startX = Math.round((sheetW - gridW) / 2);
  const startY = Math.round((sheetH - gridH) / 2);

  const wanted = Math.min(copies, fits);
  let placed = 0;
  for (let r = 0; r < rows && placed < wanted; r++) {
    for (let c = 0; c < cols && placed < wanted; c++) {
      const x = startX + c * (cellW + gutter);
      const y = startY + r * (cellH + gutter);
      ctx.drawImage(photo, x, y, cellW, cellH);
      ctx.strokeStyle = '#c8c8c8';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);
      ctx.strokeRect(x - 0.5, y - 0.5, cellW + 1, cellH + 1);
      placed++;
    }
  }

  ctx.setLineDash([]);
  ctx.fillStyle = '#9aa3b5';
  ctx.font = `${Math.round(dpi * 0.075)}px monospace`;
  ctx.fillText(
    `4x6in @ 300dpi  ·  ${photoWidthMM}x${photoHeightMM}mm  ·  ${placed} copies  ·  photoresizer.click`,
    margin,
    sheetH - Math.round(margin * 0.45)
  );

  return { url: canvas.toDataURL('image/jpeg', 0.94), rows, cols, fits };
};
