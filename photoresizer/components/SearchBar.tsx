import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ALL_TOOLS = [
  { id: "jpg-", name: "JPG to PNG Converter" },
  { id: "png-", name: "PNG to JPG Converter" },
  { id: "webp-converter", name: "WEBP Converter" },
  { id: "heic-", name: "HEIC to JPG Converter" },
  { id: "image-compressor", name: "Image Compressor" },
  { id: "crop-image", name: "Crop Image" },
  { id: "pdf-", name: "PDF to Word Converter" },
  { id: "word-", name: "Word to PDF Converter" },
  { id: "merge-pdf", name: "Merge PDF" },
  { id: "split-pdf", name: "Split PDF" },
  { id: "compress-pdf", name: "Compress PDF" },
  { id: "mp4-", name: "MP4 to MP3 Audio" },
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
      <div className={`relative flex items-center bg-card rounded-full border-2 transition-all duration-300 shadow-sm ${isFocused ? 'border-signal ring-4 ring-brand/10 dark:ring-accent/10' : 'border-rule hover:border-rule dark:hover:border-rule'}`}>
        <div className="pl-6 pr-3 text-muted">
          <Search size={22} className={isFocused ? "text-signal text-signal" : ""} />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search for a tool (e.g. PDF to Word, Image Compressor)..."
          className="w-full py-4 sm:py-5 bg-transparent border-none outline-none text-ink font-medium text-lg placeholder:text-muted"
        />
        <button className="mr-2 p-3 sm:mr-3 rounded-full bg-signal text-white hover:bg-signal/90 hover:scale-105 active:scale-95 transition-all">
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Dropdown Results */}
      {isFocused && filteredTools.length > 0 && (
        <div className="absolute top-[110%] left-0 right-0 bg-card rounded-2xl shadow-sm border border-rule overflow-hidden animate-fade-in divide-y divide-rule">
          {filteredTools.slice(0, 6).map(tool => (
            <button
              key={tool.id}
              onClick={() => navigate(`/tools/${tool.id}`)}
              className="w-full text-left px-6 py-4 hover:bg-card-sunk dark:hover:bg-card-sunk transition-colors flex items-center justify-between group"
            >
              <span className="font-bold text-ink-soft group-hover:text-signal transition-colors">{tool.name}</span>
              <ArrowRight size={18} className="text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
