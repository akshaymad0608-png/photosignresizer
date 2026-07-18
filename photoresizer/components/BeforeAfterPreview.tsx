import React, { useState, useRef, useEffect } from 'react';
import { GripVertical } from 'lucide-react';

interface BeforeAfterPreviewProps {
  originalUrl: string;
  processedUrl: string;
  className?: string;
  onClick?: () => void;
}

const BeforeAfterPreview: React.FC<BeforeAfterPreviewProps> = ({ originalUrl, processedUrl, className = "", onClick }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none touch-none ${className}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={onClick}
    >
      {/* Original Image (Background) */}
      <img 
        src={originalUrl} 
        alt="Original" 
        className="w-full h-full object-contain pointer-events-none"
      />
      <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md z-10">
        BEFORE
      </div>

      {/* Processed Image (Foreground, clipped) */}
      <div 
        className="absolute inset-0 z-20 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        <img 
          src={processedUrl} 
          alt="Processed" 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
        <div className="absolute top-2 right-2 bg-signal/90 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md z-10">
          AFTER
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 z-30 cursor-ew-resize flex items-center justify-center group"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={(e) => { e.stopPropagation(); setIsDragging(true); }}
        onTouchStart={(e) => { e.stopPropagation(); setIsDragging(true); }}
      >
        <div className="absolute inset-y-0 w-0.5 bg-card shadow-[0_0_5px_rgba(0,0,0,0.5)]"></div>
        <div className="w-8 h-8 bg-card text-ink rounded-full shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 active:scale-95">
          <GripVertical size={16} />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterPreview;
