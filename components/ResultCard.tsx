import React, { useMemo } from 'react';
import { Download, AlertTriangle, FileCheck, Share2, MoveRight } from 'lucide-react';
import { formatFileSize } from '../utils/imageProcessing';
import BeforeAfterPreview from './BeforeAfterPreview';

interface ResultCardProps {
  originalUrl?: string;
  processedUrl: string | null;
  fileSizeKB: number;
  width: number;
  height: number;
  reqMin: number;
  reqMax: number;
  onDownload: () => void;
  fileName: string;
  type: string;
}

const ResultCard: React.FC<ResultCardProps> = ({
  originalUrl,
  processedUrl,
  fileSizeKB,
  width,
  height,
  reqMin,
  reqMax,
  onDownload,
  fileName,
  type
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  // Estimate original size from data URL
  const originalSizeKB = useMemo(() => {
    if (!originalUrl) return 0;
    const base64Length = originalUrl.split(',')[1]?.length || 0;
    return (base64Length * (3 / 4)) / 1024;
  }, [originalUrl]);

  if (!processedUrl) return null;

  const isSizeValid = fileSizeKB >= reqMin && fileSizeKB <= reqMax;
  
  const compressionRatio = originalSizeKB > 0 
    ? Math.round((1 - fileSizeKB / originalSizeKB) * 100) 
    : 0;

  return (
    <div className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in relative overflow-hidden">
      
      {/* Full Screen Preview Modal */}
      {isPreviewOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2"
              onClick={() => setIsPreviewOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            
            <div className="bg-gray-900/50 p-2 rounded-2xl flex-grow overflow-hidden flex items-center justify-center">
              {originalUrl ? (
                <BeforeAfterPreview 
                  originalUrl={originalUrl}
                  processedUrl={processedUrl}
                  className="w-full max-h-[80vh]"
                />
              ) : (
                <img 
                  src={processedUrl} 
                  alt={`${type} Full Preview`} 
                  className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-sm"
                />
              )}
            </div>
            
            <div className="mt-4 flex justify-center pointer-events-none">
               <div className="bg-black/60 text-white px-6 py-3 rounded-2xl text-sm font-medium flex items-center gap-4 backdrop-">
                 <div className="flex flex-col items-center">
                   <span className="text-gray-400 text-xs">Size</span>
                   <span>{width}x{height}px</span>
                 </div>
                 <div className="w-px h-8 bg-white/20"></div>
                 <div className="flex flex-col items-center">
                   <span className="text-gray-400 text-xs">File Size</span>
                   <span>{formatFileSize(fileSizeKB)}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 relative z-10">
        <div className="space-y-1">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{type} Result</h4>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono border border-gray-200 dark:border-gray-700">{width}x{height}px</span>
          </div>
        </div>
        
        <div>
            {isSizeValid ? (
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand border border-brand/20 dark:border-brand/20">
                      <FileCheck size={14} className="mr-1.5" /> Perfect
                  </span>
                  <span className="text-[10px] font-semibold text-brand dark:text-brand uppercase tracking-wider">Ready to Upload</span>
                </div>
            ) : (
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent border border-accent/20 dark:border-accent/20">
                      <AlertTriangle size={14} className="mr-1.5" /> Check Size
                  </span>
                  <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-500 uppercase tracking-wider">Needs Adjustment</span>
                </div>
            )}
        </div>
      </div>

      {/* Live Preview Image */}
      <div 
        className="mb-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col group cursor-zoom-in relative"
        onClick={() => setIsPreviewOpen(true)}
      >
        <div className="absolute top-2 left-2 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg z-20 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          Before & After
        </div>
        
        <div className="h-48 sm:h-56 p-4 flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIvPgo8cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmM2YzZjMiLz4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmM2YzZjMiLz4KPC9zdmc+')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzExMTExMSIvPgo8cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMxYTFhMWEiLz4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMxYTFhMWEiLz4KPC9zdmc+')]">
          {originalUrl ? (
            <BeforeAfterPreview 
              originalUrl={originalUrl}
              processedUrl={processedUrl}
              className="h-full rounded-lg shadow-sm"
            />
          ) : (
            <img 
              src={processedUrl} 
              alt="Processed Preview" 
              className="max-h-full object-contain rounded-lg shadow-sm"
            />
          )}
        </div>
        
        {/* File Size Comparison Bar */}
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-3 flex items-center justify-between z-20 text-xs sm:text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Original</span>
            <span className="font-mono font-medium text-gray-700 dark:text-gray-300">{formatFileSize(originalSizeKB)}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 px-2">
            <MoveRight size={16} />
            {compressionRatio > 0 && (
              <span className="text-[10px] font-bold text-green-600 dark:text-green-500 mt-0.5 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">-{compressionRatio}%</span>
            )}
          </div>
          
          <div className="flex flex-col text-right">
            <span className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Processed</span>
            <span className={`font-mono font-bold ${isSizeValid ? 'text-brand dark:text-brand' : 'text-amber-600 dark:text-amber-500'}`}>
              {formatFileSize(fileSizeKB)}
            </span>
          </div>
        </div>
      </div>
      
      {!isSizeValid && (
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 text-sm font-medium text-amber-700 dark:text-amber-400">
          <span className="block mb-1 text-xs font-semibold flex items-center gap-1.5"><AlertTriangle size={14}/> Requirement: {reqMin}-{reqMax} KB</span>
          Current size is {fileSizeKB.toFixed(1)} KB.
          <br/> <span className="text-amber-600 dark:text-amber-500 opacity-90 mt-1 block">{fileSizeKB < reqMin ? "Try uploading a higher quality original image." : "Try adjusting brightness/contrast, compressing further, or cropping."}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-brand hover:bg-brand/90 text-white font-bold py-3 px-6 rounded-xl transition-colors active:scale-95 shadow-sm"
        >
          <Download size={18} /> 
          <span>Download {fileName}</span>
        </button>
        
        {navigator.share && (
          <button
            onClick={async () => {
              try {
                const response = await fetch(processedUrl);
                const blob = await response.blob();
                const file = new File([blob], fileName, { type: blob.type });
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                  await navigator.share({
                    title: 'Resized Image',
                    text: 'Here is my resized image from PhotoResizer.click',
                    files: [file],
                  });
                } else {
                  await navigator.share({
                    title: 'PhotoResizer.click',
                    text: 'Check out this awesome tool to resize photos for Govt Exams! https://photoresizer.click'
                  });
                }
              } catch (err) {
                console.error('Share failed:', err);
              }
            }}
            className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 px-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors active:scale-95 shadow-sm"
            title="Share Image"
          >
            <Share2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
