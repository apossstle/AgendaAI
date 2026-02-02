
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import AgendaView from './components/AgendaView';
import { MeetingAgenda } from './types';
import { generateAgendaFromContent } from './services/geminiService';

const App: React.FC = () => {
  const [docContent, setDocContent] = useState<string>('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [agenda, setAgenda] = useState<MeetingAgenda | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = useCallback(async (content: string, name: string) => {
    setDocContent(content);
    setFileName(name);
    setIsProcessing(true);
    setAgenda(null);

    try {
      const generatedAgenda = await generateAgendaFromContent(content);
      setAgenda(generatedAgenda);
    } catch (error) {
      console.error("Failed to generate agenda:", error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Navigation / Upload Sidebar */}
      <Sidebar 
        onFileUpload={handleFileUpload} 
        isProcessing={isProcessing} 
        activeFileName={fileName}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#fafafa]">
        {/* Top Header Placeholder (Subtle) */}
        <div className="h-14 border-b border-slate-200 bg-white/50 backdrop-blur-sm px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workspace</span>
             <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
             <span className="text-xs font-bold text-slate-600 truncate max-w-[200px]">{fileName || 'Untitled'}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wider">
              Share
            </button>
            <button className="px-3 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-md hover:bg-slate-800 transition-all uppercase tracking-wider">
              Export PDF
            </button>
          </div>
        </div>

        {/* Dynamic Agenda View */}
        <AgendaView agenda={agenda} isLoading={isProcessing} />
      </main>
    </div>
  );
};

export default App;
