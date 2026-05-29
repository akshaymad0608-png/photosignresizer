import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ALL_TOOLS = [
  { id: "jpg-to-png", name: "JPG to PNG Converter" },
  { id: "png-to-jpg", name: "PNG to JPG Converter" },
  { id: "webp-converter", name: "WEBP Converter" },
  { id: "heic-to-jpg", name: "HEIC to JPG Converter" },
  { id: "image-compressor", name: "Image Compressor" },
  { id: "crop-image", name: "Crop Image" },
  { id: "pdf-to-word", name: "PDF to Word Converter" },
  { id: "word-to-pdf", name: "Word to PDF Converter" },
  { id: "merge-pdf", name: "Merge PDF" },
  { id: "split-pdf", name: "Split PDF" },
  { id: "compress-pdf", name: "Compress PDF" },
  { id: "mp4-to-mp3", name: "MP4 to MP3 Audio" },
  { id: "video-compressor", name: "Video Compressor" },
  { id: "ai-bg-remover", name: "AI Background Remover" },
  { id: "ai-upscaler", name: "AI Image Upscaler" },
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const filteredTools = query.length > 0
    ? ALL_TOOLS.filter(t => t.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="relative w-full max-w-2xl mx-auto z-50">
      <div className={`relative flex items-center bg-white dark:bg-gray-900 rounded-full border-2 transition-all duration-300 shadow-xl shadow-brand/5 dark:shadow-cyan-500/5 ${isFocused ? 'border-brand dark:border-cyan-500 ring-4 ring-brand/10 dark:ring-cyan-500/10' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
        <div className="pl-6 pr-3 text-gray-400">
          <Search size={22} className={isFocused ? "text-brand dark:text-cyan-400" : ""} />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search for a tool (e.g. PDF to Word, Image Compressor)..."
          className="w-full py-4 sm:py-5 bg-transparent border-none outline-none text-gray-900 dark:text-white font-medium text-lg placeholder:text-gray-400"
        />
        <button className="mr-2 p-3 sm:mr-3 rounded-full bg-brand text-white hover:bg-brand/90 hover:scale-105 active:scale-95 transition-all">
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Dropdown Results */}
      {isFocused && filteredTools.length > 0 && (
        <div className="absolute top-[110%] left-0 right-0 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-fade-in divide-y divide-gray-100 dark:divide-gray-800">
          {filteredTools.slice(0, 6).map(tool => (
            <button
              key={tool.id}
              onClick={() => navigate(`/tools/${tool.id}`)}
              className="w-full text-left px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-between group"
            >
              <span className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-brand dark:group-hover:text-cyan-400 transition-colors">{tool.name}</span>
              <ArrowRight size={18} className="text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
