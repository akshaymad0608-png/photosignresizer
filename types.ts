export interface ExamRequirement {
  id: string;
  name: string;
  category: 'Central' | 'Entrance' | 'Defence' | 'State PSC' | 'Custom';
  photo: {
    width: number; // in pixels (approx)
    height: number;
    minKB: number;
    maxKB: number;
    format: 'jpg' | 'jpeg';
    resizeMode: 'cover' | 'contain' | 'fill';
  };
  signature: {
    width: number;
    height: number;
    minKB: number;
    maxKB: number;
    format: 'jpg' | 'jpeg';
    resizeMode: 'cover' | 'contain' | 'fill';
  };
}

export type Language = 'en' | 'hi';

export interface ProcessedImage {
  originalUrl: string;
  processedUrl: string | null;
  fileSizeKB: number;
  width: number;
  height: number;
  name: string;
}

export interface ImageConfig {
  width: number;
  height: number;
  maxKB: number;
  grayscale: boolean;
  resizeMode: 'cover' | 'contain' | 'fill';
  rotation?: number;
  textOverlay?: {
    name?: string;
    date?: string;
  };
}