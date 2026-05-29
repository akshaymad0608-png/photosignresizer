import React, { useState, useRef } from 'react';
import { Upload, X, File, Settings, Download, Zap, Loader2 } from 'lucide-react';

interface GenericUploaderProps {
  toolId?: string;
  toolName: string;
}

export default function GenericUploader({ toolName }: GenericUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setCompleted(false);
    setProgress(0);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const simulateProcessing = () => {
    setIsProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setCompleted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getOutputExtension = (toolStr: string, originalName: string) => {
    const lowerToolName = toolStr.toLowerCase();
    const originalExt = originalName.split('.').pop() || '';
    
    if (lowerToolName.includes('to png')) return 'png';
    if (lowerToolName.includes('to jpg')) return 'jpg';
    if (lowerToolName.includes('webp')) return 'webp';
    if (lowerToolName.includes('to word')) return 'docx';
    if (lowerToolName.includes('to pdf')) return 'pdf';
    if (lowerToolName.includes('to mp3')) return 'mp3';
    if (lowerToolName.includes('to mp4')) return 'mp4';
    if (lowerToolName.includes('compress')) return `compressed.${originalExt}`;
    
    return originalExt;
  };

  const handleDownloadAll = async () => {
    for (const file of files) {
      const ext = getOutputExtension(toolName, file.name);
      const originalNameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      const downloadName = `${originalNameWithoutExt}-converted.${ext}`;

      let finalBlob: Blob = file;

      // Simulate basic client-side image conversion
      if (file.type.startsWith('image/') && ['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
        try {
          const img = new Image();
          const url = URL.createObjectURL(file);
          
          await new Promise((resolve) => {
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              
              if (ctx) {
                ctx.drawImage(img, 0, 0);
                
                let mimeType = file.type;
                if (ext === 'png') mimeType = 'image/png';
                if (ext === 'jpg' || ext === 'jpeg') mimeType = 'image/jpeg';
                if (ext === 'webp') mimeType = 'image/webp';
                
                canvas.toBlob((blob) => {
                  if (blob) finalBlob = blob;
                  resolve(true);
                }, mimeType, 0.9);
              } else {
                resolve(false);
              }
            };
            img.onerror = resolve;
            img.src = url;
          });
          URL.revokeObjectURL(url);
        } catch (e) {
          console.error("Simulation conversion error", e);
        }
      }

      const url = URL.createObjectURL(finalBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {files.length === 0 ? (
        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-3xl rounded-[3rem] p-8 md:p-16 border-2 border-dashed shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-h-[400px] transition-colors group cursor-pointer relative overflow-hidden
            ${isDragging ? 'border-brand dark:border-cyan-500 bg-brand/5 dark:bg-cyan-500/10' : 'border-gray-200 dark:border-gray-800 hover:border-brand/50 dark:hover:border-cyan-500/50'}
          `}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onFileInput} 
            className="hidden" 
            multiple 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent dark:from-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="w-24 h-24 bg-brand/10 dark:bg-cyan-500/10 rounded-3xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 relative z-10 w-24 h-24 text-brand dark:text-cyan-400">
            <Upload size={40} className={isDragging ? "animate-bounce" : "group-hover:animate-bounce"} />
          </div>
          
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 relative z-10">Select Files Here</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 relative z-10">or drag and drop them directly</p>
          
          <button className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-transform shadow-xl relative z-10">
            Browse Device
          </button>
        </div>
      ) : (
        <div className="w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white">Selected Files ({files.length})</h3>
             {!isProcessing && !completed && (
                <button onClick={() => fileInputRef.current?.click()} className="text-sm font-bold text-brand hover:text-brand/80 transition-colors">
                  + Add More
                </button>
             )}
             <input type="file" ref={fileInputRef} onChange={onFileInput} className="hidden" multiple />
          </div>
          
          <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-gray-50 dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 group relative">
                <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm text-gray-500">
                  <File size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white truncate">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatSize(file.size)}</p>
                </div>
                {!isProcessing && !completed && (
                  <button onClick={() => removeFile(idx)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                    <X size={20} />
                  </button>
                )}
                {(isProcessing || completed) && (
                   <div className="px-3">
                     {completed ? (
                       <span className="text-green-500 font-bold text-sm">Done</span>
                     ) : (
                       <span className="text-brand font-bold text-sm">{progress}%</span>
                     )}
                   </div>
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-brand">Processing...</span>
                <span className="text-gray-500">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-brand to-accent transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
             {completed ? (
               <>
                 <button 
                  onClick={() => {
                     setFiles([]);
                     setCompleted(false);
                     setProgress(0);
                  }}
                  className="flex-1 py-4 font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto"
                 >
                   Start Over
                 </button>
                 <button 
                  onClick={handleDownloadAll}
                  className="flex-[2] py-4 font-black text-white bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl shadow-lg hover:shadow-green-500/25 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                 >
                   <Download size={20} /> Download All
                 </button>
               </>
             ) : (
               <>
                 <button className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors tooltip" aria-label="Tool Settings">
                   <Settings size={24} />
                 </button>
                 <button 
                  onClick={simulateProcessing}
                  disabled={isProcessing}
                  className="flex-1 py-4 font-black text-white bg-gradient-to-r from-brand to-accent rounded-2xl shadow-lg hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 w-full disabled:opacity-50 disabled:pointer-events-none"
                 >
                   {isProcessing ? (
                     <><Loader2 size={24} className="animate-spin" /> Processing...</>
                   ) : (
                     <><Zap size={24} className="animate-pulse-slow fill-current" /> Convert {files.length > 1 ? 'Files' : 'File'}</>
                   )}
                 </button>
               </>
             )}
          </div>
        </div>
      )}
    </div>
  );
}
