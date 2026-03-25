import React from 'react';
import { Download, AlertTriangle, FileCheck } from 'lucide-react';
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
    <div className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <h4 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">{type} Result</h4>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400">
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-md font-mono">{width}x{height}px</span>
            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-md font-mono">{formatFileSize(fileSizeKB)}</span>
          </div>
        </div>
        <div>
            {isSizeValid ? (
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 uppercase tracking-wider">
                      <FileCheck size={14} className="mr-1.5" /> Perfect
                  </span>
                  <span className="text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-tighter">Ready to Upload</span>
                </div>
            ) : (
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800 uppercase tracking-wider">
                      <AlertTriangle size={14} className="mr-1.5" /> Check Size
                  </span>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-tighter">Needs Adjustment</span>
                </div>
            )}
        </div>
      </div>
      
      {!isSizeValid && (
        <div className="mb-6 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-400 leading-relaxed">
          <span className="block mb-1 opacity-70 uppercase tracking-widest text-[10px]">Requirement: {reqMin}-{reqMax} KB</span>
          Current: {fileSizeKB.toFixed(1)} KB.
          <br/> {fileSizeKB < reqMin ? "Try uploading a higher quality original." : "Try adjusting brightness/contrast or crop."}
        </div>
      )}

      <button
        onClick={onDownload}
        className="group w-full flex items-center justify-center gap-3 bg-brand hover:bg-blue-600 text-white font-black py-4 px-6 rounded-xl shadow-lg shadow-brand/20 transition-all hover:scale-[1.02] active:scale-95"
      >
        <Download size={20} className="group-hover:translate-y-0.5 transition-transform" /> 
        Download {fileName}
      </button>
    </div>
  );
};

export default ResultCard;