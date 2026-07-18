/**
 * The tool catalogue.
 *
 * RULE: only list a tool here if it genuinely works in the browser today.
 * Everything in this file is canvas-based, so it can decode and re-encode
 * raster images and nothing else. PDF, Office, video and archive conversion
 * are NOT possible with this pipeline — listing them would mean handing the
 * user back their original file under a new extension, which is worse than
 * not offering the tool at all.
 */

export interface Tool {
  id: string;
  name: string;
  /** Short description used on cards and as the meta description. */
  blurb: string;
  group: 'Convert' | 'Optimise' | 'Edit' | 'Resize';
  /** Output container. 'same' keeps the source format, 'pdf' wraps it. */
  output: 'png' | 'jpeg' | 'webp' | 'same' | 'pdf';
  /** JPEG/WebP quality, 0–1. Ignored for PNG. */
  quality?: number;
  /** Canvas filter applied before encoding. */
  filter?: string;
  /** Runs the background-removal model instead of a plain re-encode. */
  removeBackground?: boolean;
  /** Resize the output to these pixel dimensions. */
  resize?: { width: number; height: number; fit: 'cover' | 'contain' };
  /** Composite onto a solid background before encoding (kills transparency). */
  background?: string;
  /** Rotate clockwise by this many degrees before encoding. */
  rotate?: 90 | 180 | 270;
  /** Mirror horizontally. */
  flip?: boolean;
  /** MIME types the file picker will accept. */
  accept: string;
}

export const TOOLS: Tool[] = [
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG',
    blurb: 'Convert JPG or JPEG images to lossless PNG, straight in your browser.',
    group: 'Convert',
    output: 'png',
    accept: 'image/jpeg,image/jpg',
  },
  {
    id: 'png-to-jpg',
    name: 'PNG to JPG',
    blurb: 'Turn PNG images into smaller JPG files without uploading them anywhere.',
    group: 'Convert',
    output: 'jpeg',
    quality: 0.92,
    accept: 'image/png',
  },
  {
    id: 'webp-converter',
    name: 'Convert to WebP',
    blurb: 'Re-encode JPG or PNG images as WebP for noticeably smaller files.',
    group: 'Convert',
    output: 'webp',
    quality: 0.9,
    accept: 'image/jpeg,image/png',
  },
  {
    id: 'webp-to-jpg',
    name: 'WebP to JPG',
    blurb: 'Convert WebP images back to JPG for forms and apps that reject WebP.',
    group: 'Convert',
    output: 'jpeg',
    quality: 0.92,
    accept: 'image/webp',
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    blurb: 'Shrink JPG, PNG or WebP files by re-encoding them at a lower quality.',
    group: 'Optimise',
    output: 'jpeg',
    quality: 0.7,
    accept: 'image/jpeg,image/png,image/webp',
  },
  {
    id: 'grayscale-converter',
    name: 'Convert to Grayscale',
    blurb: 'Turn a colour photo black and white, as some application forms require.',
    group: 'Edit',
    output: 'same',
    quality: 0.92,
    filter: 'grayscale(100%)',
    accept: 'image/jpeg,image/png,image/webp',
  },
  {
    id: 'remove-background',
    name: 'Remove Background',
    blurb: 'Cut the background out of a portrait and get a transparent PNG.',
    group: 'Edit',
    output: 'png',
    removeBackground: true,
    accept: 'image/jpeg,image/png,image/webp',
  },
  {
    id: 'add-white-background',
    name: 'Add White Background',
    blurb: 'Flatten a transparent PNG onto solid white, which most exam forms require.',
    group: 'Edit',
    output: 'jpeg',
    quality: 0.92,
    background: '#ffffff',
    accept: 'image/png,image/webp,image/jpeg',
  },
  {
    id: 'passport-photo',
    name: 'Passport Size Photo',
    blurb: 'Resize any photo to a standard 35x45 mm passport size at 300 DPI.',
    group: 'Resize',
    output: 'jpeg',
    quality: 0.92,
    resize: { width: 413, height: 531, fit: 'cover' },
    background: '#ffffff',
    accept: 'image/jpeg,image/png,image/webp',
  },
  {
    id: 'resize-200x230',
    name: 'Resize to 200x230',
    blurb: 'The photo size printed in most UPSC and SSC notifications.',
    group: 'Resize',
    output: 'jpeg',
    quality: 0.92,
    resize: { width: 200, height: 230, fit: 'cover' },
    background: '#ffffff',
    accept: 'image/jpeg,image/png,image/webp',
  },
  {
    id: 'signature-300x80',
    name: 'Resize Signature 300x80',
    blurb: 'Trim a scanned signature to the 300x80 pixel box many forms ask for.',
    group: 'Resize',
    output: 'jpeg',
    quality: 0.92,
    resize: { width: 300, height: 80, fit: 'contain' },
    background: '#ffffff',
    accept: 'image/jpeg,image/png,image/webp',
  },
  {
    id: 'rotate-image',
    name: 'Rotate 90 degrees',
    blurb: 'Fix a sideways scan or photo without losing quality.',
    group: 'Edit',
    output: 'same',
    quality: 0.95,
    rotate: 90,
    accept: 'image/jpeg,image/png,image/webp',
  },
  {
    id: 'flip-image',
    name: 'Mirror / Flip Image',
    blurb: 'Flip a photo horizontally, useful for selfie-camera signatures.',
    group: 'Edit',
    output: 'same',
    quality: 0.95,
    flip: true,
    accept: 'image/jpeg,image/png,image/webp',
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    blurb: 'Wrap a photo or scan into a single-page PDF for upload counters.',
    group: 'Convert',
    output: 'pdf',
    accept: 'image/jpeg,image/png,image/webp',
  },
];

export const getTool = (id?: string) => TOOLS.find(t => t.id === id);

export const TOOL_GROUPS = ['Resize', 'Convert', 'Optimise', 'Edit'] as const;

/**
 * Tools that were previously advertised but are not implemented. Kept only so
 * old URLs can redirect to the catalogue instead of rendering a broken page.
 */
export const RETIRED_TOOL_IDS = [
  'jpg-', 'png-', 'heic-', 'pdf-', 'word-', 'mp4-', 'video-', 'mov-', 'wav-', 'rar-',
  'merge-pdf', 'split-pdf', 'compress-pdf', 'unlock-pdf',
  'video-compressor', 'trim-video', 'crop-image',
  'metadata', 'palette', 'watermark',
];
