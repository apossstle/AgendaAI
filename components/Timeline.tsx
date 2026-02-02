
import React from 'react';
import { AgendaTopic } from '../types';

interface TimelineProps {
  topics: AgendaTopic[];
}

const Timeline: React.FC<TimelineProps> = ({ topics }) => {
  let currentTime = 0;

  return (
    <div className="space-y-4 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
      {topics.map((topic, index) => {
        const start = currentTime;
        currentTime += topic.durationMinutes;
        
        return (
          <div key={topic.id} className="relative pl-10 group">
            <div className="absolute left-0 top-1.5 w-9 h-9 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-4 border-white bg-indigo-600 shadow-sm z-10"></div>
            </div>
            
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-200 hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-base font-semibold text-slate-900">{topic.title}</h4>
                  <p className="text-xs font-medium text-indigo-600 uppercase tracking-tight">
                    {start}m — {start + topic.durationMinutes}m ({topic.durationMinutes} mins)
                  </p>
                </div>
                {topic.presenter && (
                  <span className="px-2 py-1 bg-slate-100 text-[10px] font-bold text-slate-500 rounded uppercase">
                    Lead: {topic.presenter}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {topic.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
