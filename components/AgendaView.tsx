
import React from 'react';
import { MeetingAgenda } from '../types';
import Timeline from './Timeline';

interface AgendaViewProps {
  agenda: MeetingAgenda | null;
  isLoading: boolean;
}

const AgendaView: React.FC<AgendaViewProps> = ({ agenda, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-semibold text-slate-900">Crafting your agenda...</h2>
        <p className="text-slate-500 mt-2">Gemini is analyzing stakeholders and timing.</p>
      </div>
    );
  }

  if (!agenda) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Ready to build</h2>
        <p className="text-slate-500 mt-2 max-w-sm">
          Upload a project document, meeting notes, or raw text to generate a professional agenda.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">Meeting Proposal</span>
            <span className="text-slate-400 text-sm">•</span>
            <span className="text-slate-500 text-sm font-medium">{agenda.totalDuration} Minutes</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            {agenda.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            {agenda.objective}
          </p>
        </header>

        <section className="mb-12">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Stakeholders</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agenda.stakeholders.map((person, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                  {person.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-900 truncate">{person.name}</p>
                  <p className="text-xs text-slate-500 truncate">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Agenda Timeline</h3>
          <Timeline topics={agenda.topics} />
        </section>
      </div>
    </div>
  );
};

export default AgendaView;
