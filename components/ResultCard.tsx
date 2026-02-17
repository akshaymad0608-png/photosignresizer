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
    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{type} Result</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {width}x{height}px | {formatFileSize(fileSizeKB)}
          </p>
        </div>
        <div>
            {isSizeValid ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <FileCheck size={12} className="mr-1" /> Perfect
                </span>
            ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    <AlertTriangle size={12} className="mr-1" /> Check Size
                </span>
            )}
        </div>
      </div>
      
      {!isSizeValid && (
        <div className="mb-3 text-xs text-red-500 dark:text-red-400">
          Target: {reqMin}-{reqMax} KB. Current: {fileSizeKB.toFixed(1)} KB.
          <br/> Try uploading a smaller original or adjusting crop.
        </div>
      )}

      <button
        onClick={onDownload}
        className="w-full flex items-center justify-center gap-2 bg-govBlue hover:bg-blue-800 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        <Download size={16} /> Download {fileName}
      </button>
    </div>
  );
};

export default ResultCard;