/** Forms ask for cm, studios print in inches, upload boxes want pixels. */

export type Unit = 'px' | 'mm' | 'cm' | 'in';

export const toPixels = (value: number, unit: Unit, dpi: number): number => {
  switch (unit) {
    case 'px': return Math.round(value);
    case 'mm': return Math.round((value / 25.4) * dpi);
    case 'cm': return Math.round((value / 2.54) * dpi);
    case 'in': return Math.round(value * dpi);
  }
};

export const fromPixels = (px: number, unit: Unit, dpi: number): number => {
  switch (unit) {
    case 'px': return Math.round(px);
    case 'mm': return +((px / dpi) * 25.4).toFixed(1);
    case 'cm': return +((px / dpi) * 2.54).toFixed(2);
    case 'in': return +(px / dpi).toFixed(2);
  }
};

export const describeInAllUnits = (px: number, dpi: number) =>
  `${px} px · ${fromPixels(px, 'mm', dpi)} mm · ${fromPixels(px, 'in', dpi)} in`;
