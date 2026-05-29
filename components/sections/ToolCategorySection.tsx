import React from 'react';
import { Link } from 'react-router-dom';
import { FileImage, FileText, Video, Music, FileArchive, Sparkles } from 'lucide-react';

const CATEGORIES = [
  {
    title: "Image Tools",
    icon: <FileImage className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-400",
    tools: [
      { id: "jpg-to-png", name: "JPG to PNG" },
      { id: "png-to-jpg", name: "PNG to JPG" },
      { id: "webp-converter", name: "WEBP Converter" },
      { id: "heic-to-jpg", name: "HEIC to JPG" },
      { id: "image-compressor", name: "Image Compressor" },
      { id: "crop-image", name: "Crop Image" }
    ]
  },
  {
    title: "PDF Tools",
    icon: <FileText className="w-6 h-6" />,
    color: "from-red-500 to-orange-400",
    tools: [
      { id: "pdf-to-word", name: "PDF to Word" },
      { id: "word-to-pdf", name: "Word to PDF" },
      { id: "merge-pdf", name: "Merge PDF" },
      { id: "split-pdf", name: "Split PDF" },
      { id: "compress-pdf", name: "Compress PDF" },
      { id: "unlock-pdf", name: "Unlock PDF" }
    ]
  },
  {
    title: "Video Tools",
    icon: <Video className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    tools: [
      { id: "mp4-to-mp3", name: "MP4 to MP3" },
      { id: "video-compressor", name: "Video Compressor" },
      { id: "video-to-gif", name: "Video to GIF" },
      { id: "mov-to-mp4", name: "MOV to MP4" },
      { id: "trim-video", name: "Trim Video" }
    ]
  },
  {
    title: "AI Power Tools",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-emerald-400 to-teal-500",
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
    color: "from-yellow-400 to-orange-500",
    tools: [
      { id: "mp3-converter", name: "MP3 Converter" },
      { id: "wav-to-mp3", name: "WAV to MP3" },
      { id: "audio-cutter", name: "Audio Cutter" },
      { id: "audio-compressor", name: "Audio Compressor" }
    ]
  },
  {
    title: "Archive Tools",
    icon: <FileArchive className="w-6 h-6" />,
    color: "from-gray-600 to-gray-400",
    tools: [
      { id: "zip-extractor", name: "ZIP Extractor" },
      { id: "rar-to-zip", name: "RAR to ZIP" },
      { id: "7z-converter", name: "7Z Converter" }
    ]
  }
];

export default function ToolCategorySection() {
  return (
    <section className="py-16 md:py-24 bg-white/50 dark:bg-gray-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Ultimate Conversion Suite
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upgrade your workflow with dozens of powerful new tools. Convert, compress, merge, and edit files right in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-lg`}>
                  {cat.icon}
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{cat.title}</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {cat.tools.map(tool => (
                  <Link 
                    key={tool.id} 
                    to={`/tools/${tool.id}`}
                    className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-sm font-bold text-gray-700 dark:text-gray-300 rounded-xl hover:bg-brand/10 dark:hover:bg-cyan-500/10 hover:text-brand dark:hover:text-cyan-400 transition-colors truncate"
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
