import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, X, Camera, RotateCw, RotateCcw, Crop as CropIcon, Check } from 'lucide-react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { getCroppedImg } from '../utils/cropImage';

interface ImageUploaderProps {
  title: string;
  hint: string;
  image: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
  rotation?: number;
  onRotate?: (deg: number) => void;
  onCropApply?: (croppedImageUrl: string) => void;
  aspect?: number;
  accept?: string;
  lang: Language;
}

const ImageUploader = ({
  title, hint, image, onUpload, onClear,
  rotation = 0, onRotate, onCropApply, aspect,
  accept = 'image/*', lang,
}: ImageUploaderProps) => {
  const t = TRANSLATIONS[lang];
  const [isCropping, setIsCropping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    const file = files?.[0];
    if (file && file.type.startsWith('image/')) onUpload(file);
  }, [onUpload]);

  // Paste straight from a screenshot — how most people get a signature scan.
  useEffect(() => {
    if (image) return;
    const onPaste = (e: ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items || []).find(i => i.type.startsWith('image/'));
      const file = item?.getAsFile();
      if (file) onUpload(file);
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [image, onUpload]);

  const applyCrop = async () => {
    if (imgRef.current && completedCrop && onCropApply) {
      try {
        const url = await getCroppedImg(imgRef.current, completedCrop);
        onCropApply(url);
        setIsCropping(false);
        onRotate?.(0);
      } catch (err) {
        console.error('Crop failed', err);
      }
    }
  };

  if (!image) {
    return (
      <div>
        <div className="flex items-baseline justify-between mb-2.5">
          <h3 className="font-display text-[17px] font-bold text-ink">{title}</h3>
          <span className="label-field">{t.notUploaded}</span>
        </div>

        <div
          ref={dropRef}
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={e => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
          className={`affix-box ${isDragging ? 'is-active' : ''} p-5 text-center`}
        >
          <p className="label-field mb-1">{t.affixHere}</p>
          <p className="text-[13px] text-muted mb-4 max-w-[26ch] mx-auto leading-snug">{hint}</p>

          <div className="flex gap-2 justify-center">
            <label className="btn btn-primary btn-sm cursor-pointer">
              <Camera size={15} /> {t.takePhoto}
              <input type="file" className="sr-only" accept="image/*" capture="environment"
                onChange={e => handleFiles(e.target.files)} />
            </label>
            <label className="btn btn-quiet btn-sm cursor-pointer">
              <Upload size={15} /> {t.chooseFile}
              <input type="file" className="sr-only" accept={accept}
                onChange={e => handleFiles(e.target.files)} />
            </label>
          </div>

          <p className="hidden sm:block font-mono text-[10px] text-muted mt-4">
            {t.dropOrPaste}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2.5">
        <h3 className="font-display text-[17px] font-bold text-ink">{title}</h3>
        <span className="label-field text-pass">{t.loaded}</span>
      </div>

      <div className="relative rounded-xl border border-rule bg-card-sunk overflow-hidden">
        <div className="min-h-[180px] flex items-center justify-center p-3 checkerboard">
          {isCropping ? (
            <ReactCrop
              crop={crop}
              aspect={aspect}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={c => setCompletedCrop(c)}
            >
              <img ref={imgRef} src={image} alt={title} className="max-h-[340px] w-auto object-contain" />
            </ReactCrop>
          ) : (
            <img
              src={image}
              alt={title}
              className="max-h-[240px] max-w-full object-contain transition-transform duration-200"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-2.5">
        {isCropping ? (
          <>
            <button onClick={() => setIsCropping(false)} className="btn btn-quiet btn-sm flex-1">
              <X size={14} /> {t.cancel}
            </button>
            <button onClick={applyCrop} className="btn btn-primary btn-sm flex-1">
              <Check size={14} /> {t.applyCrop}
            </button>
          </>
        ) : (
          <>
            {onRotate && (
              <>
                <button onClick={() => onRotate(rotation - 90)} className="btn btn-quiet btn-sm px-3" aria-label={t.rotateLeft}>
                  <RotateCcw size={15} />
                </button>
                <button onClick={() => onRotate(rotation + 90)} className="btn btn-quiet btn-sm px-3" aria-label={t.rotateRight}>
                  <RotateCw size={15} />
                </button>
              </>
            )}
            {onCropApply && (
              <button onClick={() => setIsCropping(true)} className="btn btn-quiet btn-sm flex-1">
                <CropIcon size={15} /> {t.crop}
              </button>
            )}
            <button onClick={onClear} className="btn btn-quiet btn-sm px-3 text-fail" aria-label={t.remove}>
              <X size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
