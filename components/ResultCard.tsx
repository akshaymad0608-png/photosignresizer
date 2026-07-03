import React from 'react';
import { Download, AlertTriangle, FileCheck, Share2 } from 'lucide-react';
import { formatFileSize } from '../utils/imageProcessing';

interface ResultCardProps {
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

  if (!processedUrl) return null;

  const isSizeValid = fileSizeKB >= reqMin && fileSizeKB <= reqMax;

  return (
    <div className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in relative overflow-hidden">
      
      {/* Full Screen Preview Modal */}
      {isPreviewOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="relative max-w-full max-h-full">
            <img 
              src={processedUrl} 
              alt={`${type} Full Preview`} 
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
            <button 
              className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              onClick={() => setIsPreviewOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
               <span className="bg-black/60 text-white px-4 py-2 rounded-xl text-sm font-medium">
                 {width}x{height}px • {formatFileSize(fileSizeKB)}
               </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 relative z-10">
        <div className="space-y-1">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{type} Result</h4>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono border border-gray-200 dark:border-gray-700">{width}x{height}px</span>
            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
            <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono border border-gray-200 dark:border-gray-700">{formatFileSize(fileSizeKB)}</span>
          </div>
        </div>
        <div>
            {isSizeValid ? (
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                      <FileCheck size={14} className="mr-1.5" /> Perfect
                  </span>
                  <span className="text-[10px] font-semibold text-green-600 dark:text-green-500 uppercase tracking-wider">Ready to Upload</span>
                </div>
            ) : (
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                      <AlertTriangle size={14} className="mr-1.5" /> Check Size
                  </span>
                  <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-500 uppercase tracking-wider">Needs Adjustment</span>
                </div>
            )}
        </div>
      </div>

      {/* Live Preview Image */}
      <div 
        className="mb-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-4 relative group cursor-zoom-in"
        onClick={() => setIsPreviewOpen(true)}
      >
        <div className="absolute top-2 left-2 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg z-20 border border-gray-200 dark:border-gray-700">Live Preview</div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10 hidden sm:block"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
           <span className="bg-black/70 text-white px-4 py-2 rounded-xl backdrop-blur-md text-sm font-bold flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
             Enlarge
           </span>
        </div>
        <img 
          src={processedUrl} 
          alt="Processed Preview" 
          className="max-h-64 object-contain rounded-lg transition-transform duration-300 relative z-0"
        />
      </div>
      
      {!isSizeValid && (
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 text-sm font-medium text-amber-700 dark:text-amber-400">
          <span className="block mb-1 text-xs font-semibold">Requirement: {reqMin}-{reqMax} KB</span>
          Current: {fileSizeKB.toFixed(1)} KB.
          <br/> <span className="text-amber-600 dark:text-amber-500">{fileSizeKB < reqMin ? "Try uploading a higher quality original." : "Try adjusting brightness/contrast or crop."}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-brand hover:bg-brand/90 text-white font-bold py-3 px-6 rounded-lg transition-colors active:scale-95"
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
                  // Fallback if file sharing is not supported
                  await navigator.share({
                    title: 'PhotoResizer.click',
                    text: 'Check out this awesome tool to resize photos for Govt Exams! https://photoresizer.click'
                  });
                }
              } catch (err) {
                console.error('Share failed:', err);
              }
            }}
            className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 px-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors active:scale-95"
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