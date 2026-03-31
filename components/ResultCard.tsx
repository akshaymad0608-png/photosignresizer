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
  if (!processedUrl) return null;

  const isSizeValid = fileSizeKB >= reqMin && fileSizeKB <= reqMax;

  return (
    <div className="mt-6 p-6 md:p-8 bg-white/90 dark:bg-gray-900/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] border border-gray-200/50 dark:border-gray-800/50 animate-fade-in relative overflow-hidden group/result transition-all duration-500 hover:shadow-[0_16px_60px_-15px_rgba(79,70,229,0.15)] dark:hover:shadow-[0_16px_60px_-15px_rgba(6,182,212,0.15)] hover:border-brand/20 dark:hover:border-cyan-500/20">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-brand/10 to-transparent dark:from-cyan-500/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700 opacity-40 group-hover/result:opacity-80 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gradient-to-tr from-accent/10 to-transparent dark:from-blue-500/10 blur-[60px] rounded-full pointer-events-none transition-opacity duration-700 opacity-30 group-hover/result:opacity-60 -translate-x-1/3 translate-y-1/3"></div>
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="space-y-2">
          <h4 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{type} Result</h4>
          <div className="flex items-center gap-3 text-sm font-bold text-gray-500 dark:text-gray-400">
            <span className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-xl font-mono border border-gray-100 dark:border-gray-700 shadow-sm">{width}x{height}px</span>
            <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
            <span className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-xl font-mono border border-gray-100 dark:border-gray-700 shadow-sm">{formatFileSize(fileSizeKB)}</span>
          </div>
        </div>
        <div>
            {isSizeValid ? (
                <div className="flex flex-col items-end gap-2">
                  <span className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-black bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border border-green-200/50 dark:border-green-800/50 uppercase tracking-widest shadow-sm">
                      <FileCheck size={16} className="mr-2" /> Perfect
                  </span>
                  <span className="text-[10px] font-black text-green-500 dark:text-green-600 uppercase tracking-widest">Ready to Upload</span>
                </div>
            ) : (
                <div className="flex flex-col items-end gap-2">
                  <span className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-black bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50 uppercase tracking-widest shadow-sm">
                      <AlertTriangle size={16} className="mr-2" /> Check Size
                  </span>
                  <span className="text-[10px] font-black text-amber-500 dark:text-amber-600 uppercase tracking-widest">Needs Adjustment</span>
                </div>
            )}
        </div>
      </div>

      {/* Live Preview Image */}
      <div className="mb-8 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50 flex items-center justify-center p-6 md:p-8 relative group backdrop-blur-sm shadow-inner">
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-900 dark:text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl z-10 shadow-sm border border-gray-100 dark:border-gray-700">Live Preview</div>
        <img 
          src={processedUrl} 
          alt="Processed Preview" 
          className="max-h-64 object-contain rounded-2xl shadow-lg group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      
      {!isSizeValid && (
        <div className="mb-8 p-5 bg-amber-50/80 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800/50 text-sm font-bold text-amber-700 dark:text-amber-400 leading-relaxed shadow-sm">
          <span className="block mb-2 opacity-70 uppercase tracking-widest text-[10px] font-black">Requirement: {reqMin}-{reqMax} KB</span>
          Current: {fileSizeKB.toFixed(1)} KB.
          <br/> <span className="font-medium opacity-90">{fileSizeKB < reqMin ? "Try uploading a higher quality original." : "Try adjusting brightness/contrast or crop."}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <button
          onClick={onDownload}
          className="group flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-brand to-accent hover:from-brand hover:to-brand text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-brand/20 transition-all duration-300 hover:-translate-y-1 active:scale-95 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          <Download size={20} className="group-hover:translate-y-0.5 transition-transform relative z-10" /> 
          <span className="relative z-10">Download {fileName}</span>
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
            className="group flex items-center justify-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-black py-4 px-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 active:scale-95"
            title="Share Image"
          >
            <Share2 size={20} className="group-hover:-rotate-12 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultCard;