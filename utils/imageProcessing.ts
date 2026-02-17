import { ImageConfig } from '../types';

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const processImage = async (
  sourceUrl: string,
  config: ImageConfig
): Promise<{ url: string; sizeKB: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // 1. Handle Rotation via Intermediate Canvas if needed
      let sourceImage: CanvasImageSource = img;
      let srcWidth = img.width;
      let srcHeight = img.height;

      if (config.rotation && config.rotation % 360 !== 0) {
         const canvasR = document.createElement('canvas');
         const ctxR = canvasR.getContext('2d');
         if (ctxR) {
             const rads = config.rotation * Math.PI / 180;
             const sine = Math.abs(Math.sin(rads));
             const cosine = Math.abs(Math.cos(rads));
             
             // New bounding box dimensions
             canvasR.width = img.width * cosine + img.height * sine;
             canvasR.height = img.width * sine + img.height * cosine;
             
             ctxR.translate(canvasR.width/2, canvasR.height/2);
             ctxR.rotate(rads);
             ctxR.drawImage(img, -img.width/2, -img.height/2);
             
             sourceImage = canvasR;
             srcWidth = canvasR.width;
             srcHeight = canvasR.height;
         }
      }

      // 2. Setup Main Canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      canvas.width = config.width;
      canvas.height = config.height;
      
      // Draw white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Calculate Crop/Fit dimensions
      let dx = 0, dy = 0, dWidth = config.width, dHeight = config.height;
      const imgRatio = srcWidth / srcHeight;
      const targetRatio = config.width / config.height;

      if (config.resizeMode === 'cover') {
        // Cover: Crop to fill
        if (imgRatio > targetRatio) {
           // Image is wider than target
           const scaleHeight = config.height;
           const scaleWidth = scaleHeight * imgRatio;
           dx = (config.width - scaleWidth) / 2;
           dWidth = scaleWidth;
           dHeight = scaleHeight;
        } else {
           // Image is taller than target
           const scaleWidth = config.width;
           const scaleHeight = scaleWidth / imgRatio;
           dy = (config.height - scaleHeight) / 2;
           dWidth = scaleWidth;
           dHeight = scaleHeight;
        }
      } else if (config.resizeMode === 'contain') {
        // Contain: Fit entire image, pad with white
        if (imgRatio > targetRatio) {
           // Image is wider
           const scaleWidth = config.width;
           const scaleHeight = scaleWidth / imgRatio;
           dy = (config.height - scaleHeight) / 2;
           dWidth = scaleWidth;
           dHeight = scaleHeight;
        } else {
           // Image is taller
           const scaleHeight = config.height;
           const scaleWidth = scaleHeight * imgRatio;
           dx = (config.width - scaleWidth) / 2;
           dWidth = scaleWidth;
           dHeight = scaleHeight;
        }
      } else {
        // Fill: Stretch
        dWidth = config.width;
        dHeight = config.height;
      }

      // 4. Draw Image
      ctx.drawImage(sourceImage, dx, dy, dWidth, dHeight);

      // 5. Text Overlay for Name and Date
      if (config.textOverlay) {
        const { name, date } = config.textOverlay;
        if (name || date) {
          const stripHeight = config.height * 0.20; // Bottom 20%
          const fontSize = Math.max(12, config.height * 0.05); // Dynamic font size
          
          // Draw white strip at bottom (slightly transparent or solid)
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, config.height - stripHeight, config.width, stripHeight);
          
          ctx.fillStyle = '#000000';
          ctx.font = `bold ${fontSize}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          const centerX = config.width / 2;
          const stripCenterY = config.height - (stripHeight / 2);

          if (name && date) {
             ctx.fillText(name, centerX, stripCenterY - (fontSize * 0.65));
             ctx.fillText(date, centerX, stripCenterY + (fontSize * 0.65));
          } else if (name) {
             ctx.fillText(name, centerX, stripCenterY);
          } else if (date) {
             ctx.fillText(date, centerX, stripCenterY);
          }
        }
      }

      // 6. Grayscale (if enabled)
      if (config.grayscale) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;     // Red
          data[i + 1] = avg; // Green
          data[i + 2] = avg; // Blue
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // 7. Compress to target KB
      let quality = 1.0;
      let dataUrl = canvas.toDataURL('image/jpeg', quality);
      
      const maxBytes = config.maxKB * 1024;
      const calculateBytes = (dUrl: string) => Math.round((dUrl.length * 3) / 4);
      
      let attempts = 0;
      
      while (calculateBytes(dataUrl) > maxBytes && quality > 0.1 && attempts < 30) {
         quality -= 0.05;
         dataUrl = canvas.toDataURL('image/jpeg', quality);
         attempts++;
      }

      resolve({
        url: dataUrl,
        sizeKB: calculateBytes(dataUrl) / 1024
      });
    };
    img.onerror = (err) => reject(err);
    img.src = sourceUrl;
  });
};

export const formatFileSize = (kb: number) => {
  if (kb < 1000) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
};