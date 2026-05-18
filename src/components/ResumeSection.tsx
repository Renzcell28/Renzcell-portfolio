// components/ResumeSection.tsx
"use client";

import { useState, useEffect } from 'react';
import { Eye, Download, FileText, Maximize2, Minimize2 } from 'lucide-react';

// Permanent resume data - replace with your actual resume
const PERMANENT_RESUME = {
  url: "/resume/Resume LORESCO RENZCELL RICK V. (1).pdf",
  name: "Resume_Loresco_Renzcell_Rick_V.pdf",
  date: "May 2026"
};

export default function ResumeSection() {
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [resumeData] = useState(PERMANENT_RESUME);

  const handleViewResume = () => {
    setShowPdfViewer(true);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeData.url;
    link.download = resumeData.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    const viewerElement = document.getElementById('pdf-viewer-container');
    if (!isFullscreen) {
      if (viewerElement?.requestFullscreen) {
        viewerElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-red-500/20 p-6 md:p-8 lg:p-10 shadow-xl">
            
            {/* Decorative accent */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-3">
              <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full"></div>
            </div>
            
            {/* Header */}
            <div className="text-center space-y-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mx-auto">
                <FileText className="w-4 h-4" />
                My Resume
              </div>
              <h2 className="font-headline font-bold text-2xl md:text-3xl text-white">
                Professional Resume
              </h2>
              <p className="text-gray-400 text-sm">
                View or download my complete professional resume
              </p>
            </div>
            
            {/* Resume Info Bar */}
            <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-gray-700 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-medium">{resumeData.name}</h3>
                    <p className="text-xs text-gray-500">Last updated: {resumeData.date}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleViewResume}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all duration-300 hover:scale-105"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Full Screen View</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white transition-all duration-300 hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Real PDF Preview - Large Size */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
              <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Resume Preview
                </p>
              </div>
              <div className="relative" style={{ height: '600px' }}>
                <iframe
                  src={`${resumeData.url}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                  className="w-full h-full"
                  title="Resume Preview"
                  style={{ border: 'none', backgroundColor: '#f5f5f5' }}
                />
                {/* Click overlay to open full view */}
                <div 
                  onClick={handleViewResume}
                  className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/60"
                >
                  <div className="text-center">
                    <Eye className="w-12 h-12 text-white mx-auto mb-2" />
                    <p className="text-white font-medium">Click to view full resume</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Fullscreen PDF Viewer Modal */}
      {showPdfViewer && resumeData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          <div id="pdf-viewer-container" className={`relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden ${isFullscreen ? 'fixed inset-0 rounded-none' : 'w-full max-w-6xl h-[90vh]'}`}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/95">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-red-500" />
                <div>
                  <h3 className="text-white font-medium">{resumeData.name}</h3>
                  <p className="text-xs text-gray-500">Uploaded: {resumeData.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5 text-gray-400" /> : <Maximize2 className="w-5 h-5 text-gray-400" />}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  title="Download"
                >
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  onClick={() => setShowPdfViewer(false)}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            {/* PDF Viewer - Full size */}
            <div className="w-full h-[calc(100%-70px)] bg-gray-800">
              <iframe
                src={`${resumeData.url}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full"
                title="Resume Viewer"
                style={{ border: 'none', backgroundColor: '#f5f5f5' }}
              />
            </div>
            
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}