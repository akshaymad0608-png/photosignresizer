import React from 'react';
import { useParams } from 'react-router-dom';
import { Lock, ShieldCheck, ZapIcon } from 'lucide-react';
import PlatformNavbar from '../components/PlatformNavbar';
import Footer from '../components/Footer';
import GenericUploader from '../components/GenericUploader';

export default function ToolPage() {
  const { toolId } = useParams();

  // Simple formatting of the URL param (e.g. jpg- -> JPG to PNG)
  const formattedName = toolId?.split('-').map(word => 
    word.length <= 3 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || 'Converter Tool';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand/10 dark:bg-brand/5 120px] mix-blend-multiply dark:mix-blend-screen"></div>
      </div>
      
      <PlatformNavbar />

      <main className="flex-grow flex flex-col items-center pt-8 md:pt-16 px-4">
        <div className="max-w-4xl w-full text-center mb-12">
           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-6 relative">
              {formattedName}
           </h1>
           <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
             Quickly convert and process your files securely in seconds.
           </p>
        </div>

        {/* Uploader Section */}
        <GenericUploader toolId={toolId} toolName={formattedName} />

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 mb-24 opacity-60">
           <div className="flex items-center gap-2 font-bold text-gray-600 dark:text-gray-400"><Lock size={20} /> End- Encrypted</div>
           <div className="flex items-center gap-2 font-bold text-gray-600 dark:text-gray-400"><ShieldCheck size={20} /> Files auto-deleted after 1h</div>
           <div className="flex items-center gap-2 font-bold text-gray-600 dark:text-gray-400"><ZapIcon size={20} /> Enterprise Speed CDN</div>
        </div>

        {/* SEO Text Content */}
        <div className="max-w-4xl w-full pb-24">
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop- rounded-[2rem] p-8 md:p-12 mb-8 border border-gray-200/50 dark:border-gray-800/50">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How to use the {formattedName} tool</h2>
             <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Our advanced {formattedName} tool allows you to easily process your files with high quality and speed.
                  With our cloud-based engine, you don't need to install any software on your device.
                </p>
                <ol className="list-decimal pl-5 space-y-2 font-medium">
                  <li>Click on the "Browse Device" button or drag and drop your files into the upload area above.</li>
                  <li>Adjust any necessary settings if required (e.g. quality, resolution).</li>
                  <li>Wait for our high-speed server to process the conversion.</li>
                  <li>Click "Download" to save the processed file securely to your device.</li>
                </ol>
             </div>
          </div>
          
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop- rounded-[2rem] p-8 md:p-12 border border-gray-200/50 dark:border-gray-800/50">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
             <div className="space-y-6">
                <div>
                   <h4 className="font-bold text-gray-900 dark:text-gray-200 text-lg mb-2">Is it safe to upload my files here?</h4>
                   <p className="text-gray-600 dark:text-gray-400">Yes, absolute privacy is guaranteed. All files are transferred via end- encrypted SSL connection and are automatically permanently deleted from our servers after 1 hour.</p>
                </div>
                <div>
                   <h4 className="font-bold text-gray-900 dark:text-gray-200 text-lg mb-2">Does this work on mobile?</h4>
                   <p className="text-gray-600 dark:text-gray-400">Our platform is 100% mobile-friendly and optimized for fast processing on any iOS or Android device.</p>
                </div>
             </div>
          </div>
        </div>
      </main>
      
      <div className="w-full">
         <Footer lang="en" />
      </div>
    </div>
  );
}
