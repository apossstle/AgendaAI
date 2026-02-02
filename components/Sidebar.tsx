
import React from 'react';

interface SidebarProps {
  onFileUpload: (content: string, name: string) => void;
  isProcessing: boolean;
  activeFileName: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onFileUpload, isProcessing, activeFileName }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onFileUpload(content, file.name);
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-80 bg-white border-r border-slate-200 h-screen flex flex-col shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">AgendaAI</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
              Source Document
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".txt,.md,.json,.csv"
                className="hidden"
                id="file-upload"
                disabled={isProcessing}
              />
              <label
                htmlFor="file-upload"
                className={`flex flex-col items-center justify-center w-full h-32 px-4 transition bg-slate-50 border-2 border-slate-200 border-dashed rounded-xl appearance-none cursor-pointer hover:border-indigo-400 focus:outline-none ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="font-medium text-slate-600">
                    {isProcessing ? 'Processing...' : 'Upload Doc'}
                  </span>
                </span>
                <span className="mt-1 text-xs text-slate-400">TXT, MD, JSON</span>
              </label>
            </div>
          </div>

          {activeFileName && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
                Active File
              </label>
              <div className="flex items-center gap-3 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium text-indigo-900 truncate">{activeFileName}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 leading-relaxed">
            Upload any document and AgendaAI will extract key topics, assign stakeholders, and build a meeting timeline automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
