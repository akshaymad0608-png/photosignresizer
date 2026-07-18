import React, { useState, useRef } from 'react';
import { removeBackground } from '@imgly/background-removal';
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

  const simulateProcessing = async () => {
    if (toolName.toLowerCase().includes('remove background')) {
      setIsProcessing(true);
      setProgress(50);
      setCompleted(true);
      setIsProcessing(false);
      return;
    }
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
            if (toolName.toLowerCase().includes('remove background')) {
               const url = URL.createObjectURL(file);
               const bgBlob = await removeBackground(url);
               finalBlob = bgBlob;
               URL.revokeObjectURL(url);
            } else {
               const img = new Image();

          const url = URL.createObjectURL(file);
          
          await new Promise((resolve) => {
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              
              if (ctx) {
                // If the tool is a grayscale or black & white converter, apply a filter
                if (toolName.toLowerCase().includes('grayscale') || toolName.toLowerCase().includes('black and white')) {
                  ctx.filter = 'grayscale(100%)';
                }
                
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
            }
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
          className={`w-full bg-card backdrop-blur-md rounded-[3rem] p-8 md:p-16 border-2 border-dashed shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-h-[400px] transition-colors group cursor-pointer relative overflow-hidden ${isDragging ? 'border-signal bg-signal/5 ' : 'border-rule hover:border-signal dark:hover:border-signal'}`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onFileInput} 
            className="hidden" 
            multiple 
          />
          <div className="absolute inset-0 bg-signal text-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="w-24 h-24 bg-signal/10 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 relative z-10 text-signal">
            <Upload size={40} className={isDragging ? "animate-bounce" : "group-hover:animate-bounce"} />
          </div>
          
          <h3 className="text-2xl font-bold text-ink mb-4 relative z-10">Select Files Here</h3>
          <p className="text-muted mb-8 relative z-10">or drag and drop them directly</p>
          
          <button className="btn btn-primary px-8 relative z-10">
            Browse Device
          </button>
        </div>
      ) : (
        <div className="w-full bg-card backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 border border-rule shadow-sm">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-xl font-bold text-ink">Selected Files ({files.length})</h3>
             {!isProcessing && !completed && (
                <button onClick={() => fileInputRef.current?.click()} className="text-sm font-bold text-signal hover:text-signal/80 transition-colors">
                  + Add More
                </button>
             )}
             <input type="file" ref={fileInputRef} onChange={onFileInput} className="hidden" multiple />
          </div>
          
          <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-card-sunk p-4 rounded-2xl border border-rule group relative">
                <div className="p-3 bg-card rounded-xl shadow-sm text-muted">
                  <File size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-ink truncate">{file.name}</p>
                  <p className="text-xs text-muted mt-1">{formatSize(file.size)}</p>
                </div>
                {!isProcessing && !completed && (
                  <button onClick={() => removeFile(idx)} className="p-2 text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                    <X size={20} />
                  </button>
                )}
                {(isProcessing || completed) && (
                   <div className="px-3">
                     {completed ? (
                       <span className="text-green-500 font-bold text-sm">Done</span>
                     ) : (
                       <span className="text-signal font-bold text-sm">{progress}%</span>
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
                <span className="text-signal">Processing...</span>
                <span className="text-muted">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-card-sunk rounded-full overflow-hidden">
                <div 
                  className="h-full bg-signal transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-rule pt-6">
             {completed ? (
               <>
                 <button 
                  onClick={() => {
                     setFiles([]);
                     setCompleted(false);
                     setProgress(0);
                  }}
                  className="flex-1 py-4 font-bold text-muted bg-card-sunk rounded-2xl hover:bg-card-sunk transition-colors w-full sm:w-auto"
                 >
                   Start Over
                 </button>
                 <button 
                  onClick={handleDownloadAll}
                  className="flex-[2] py-4 font-bold text-white bg-signal rounded-2xl shadow-sm hover:-translate-y-1 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                 >
                   <Download size={20} /> Download All
                 </button>
               </>
             ) : (
               <>
                 <button className="p-4 bg-card-sunk text-muted rounded-2xl hover:bg-card-sunk transition-colors tooltip" aria-label="Tool Settings">
                   <Settings size={24} />
                 </button>
                 <button 
                  onClick={simulateProcessing}
                  disabled={isProcessing}
                  className="flex-1 py-4 font-bold text-white bg-signal rounded-2xl shadow-sm hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 w-full disabled:opacity-50 disabled:pointer-events-none"
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
