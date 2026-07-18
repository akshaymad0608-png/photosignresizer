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
  group: 'Convert' | 'Optimise' | 'Edit';
  /** Output container. 'same' keeps the source format. */
  output: 'png' | 'jpeg' | 'webp' | 'same';
  /** JPEG/WebP quality, 0–1. Ignored for PNG. */
  quality?: number;
  /** Canvas filter applied before encoding. */
  filter?: string;
  /** Runs the background-removal model instead of a plain re-encode. */
  removeBackground?: boolean;
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
];

export const getTool = (id?: string) => TOOLS.find(t => t.id === id);

export const TOOL_GROUPS = ['Convert', 'Optimise', 'Edit'] as const;

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
