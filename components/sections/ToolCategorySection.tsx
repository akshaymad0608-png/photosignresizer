import React from 'react';
import { Link } from 'react-router-dom';
import { FileImage, FileText, Video, Music, FileArchive, Sparkles } from 'lucide-react';

const CATEGORIES = [
  {
    title: "Image Tools",
    icon: <FileImage className="w-6 h-6" />,
    color: " ",
    tools: [
      { id: "jpg-", name: "JPG to PNG" },
      { id: "png-", name: "PNG to JPG" },
      { id: "webp-converter", name: "WEBP Converter" },
      { id: "heic-", name: "HEIC to JPG" },
      { id: "image-compressor", name: "Image Compressor" },
      { id: "crop-image", name: "Crop Image" },
      { id: "grayscale-converter", name: "Convert to Grayscale" },
      { id: "remove-background", name: "Remove Background" }
    ]
  },
  {
    title: "PDF Tools",
    icon: <FileText className="w-6 h-6" />,
    color: " ",
    tools: [
      { id: "pdf-", name: "PDF to Word" },
      { id: "word-", name: "Word to PDF" },
      { id: "merge-pdf", name: "Merge PDF" },
      { id: "split-pdf", name: "Split PDF" },
      { id: "compress-pdf", name: "Compress PDF" },
      { id: "unlock-pdf", name: "Unlock PDF" }
    ]
  },
  {
    title: "Video Tools",
    icon: <Video className="w-6 h-6" />,
    color: " ",
    tools: [
      { id: "mp4-", name: "MP4 to MP3" },
      { id: "video-compressor", name: "Video Compressor" },
      { id: "video-", name: "Video to GIF" },
      { id: "mov-", name: "MOV to MP4" },
      { id: "trim-video", name: "Trim Video" }
    ]
  },
  {
    title: "Govt Exam Tools",
    icon: <FileText className="w-6 h-6" />,
    color: " ",
    tools: [
      { id: "age-calculator", name: "Age Calculator" },
      { id: "percentage-calculator", name: "Percentage Calculator" },
      { id: "typing-test", name: "Typing Speed Test" },
      { id: "pdf-compressor-exam", name: "Exam PDF Compressor" },
      { id: "photo-date-editor", name: "Photo Date Overlay" }
    ]
  },
  {
    title: "AI Power Tools",
    icon: <Sparkles className="w-6 h-6" />,
    color: " ",
    tools: [
      { id: "ai-bg-remover", name: "AI Background Remover" },
      { id: "ai-upscaler", name: "AI Image Upscaler" },
      { id: "ocr-extractor", name: "OCR Text Extractor" },
      { id: "ai-enhancer", name: "AI Image Enhancer" },
      { id: "ai-pdf-summarizer", name: "AI PDF Summarizer" }
    ]
  },
  {
    title: "Audio Tools",
    icon: <Music className="w-6 h-6" />,
    color: " ",
    tools: [
      { id: "mp3-converter", name: "MP3 Converter" },
      { id: "wav-", name: "WAV to MP3" },
      { id: "audio-cutter", name: "Audio Cutter" },
      { id: "audio-compressor", name: "Audio Compressor" }
    ]
  },
  {
    title: "Archive Tools",
    icon: <FileArchive className="w-6 h-6" />,
    color: " ",
    tools: [
      { id: "zip-extractor", name: "ZIP Extractor" },
      { id: "rar-", name: "RAR to ZIP" },
      { id: "7z-converter", name: "7Z Converter" }
    ]
  }
];

export default function ToolCategorySection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Ultimate Conversion Suite
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upgrade your workflow with dozens of powerful new tools. Convert, compress, merge, and edit files right in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-brand/50 dark:hover:border-accent/50 transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg bg-gradient- ${cat.color} text-white shadow-sm`}>
                  {React.cloneElement(cat.icon as React.ReactElement, { className: "w-5 h-5" })}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{cat.title}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {cat.tools.map(tool => (
                  <Link 
                    key={tool.id} 
                    to={`/tools/${tool.id}`}
                    className="px-4 py-2 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-brand dark:hover:text-accent transition-colors truncate text-center sm:text-left border border-gray-100 dark:border-gray-800"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
