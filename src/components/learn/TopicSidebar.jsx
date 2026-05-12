import React from 'react';
import { TOPICS } from '../../data/topics';

export default function TopicSidebar({ activeTopicIndex, visitedTopics, completedTopics, onTopicClick }) {
  return (
    <aside className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-teal-400">HuggingFace ML Dojo</h1>
        <p className="text-sm text-gray-400 mt-2">Zero to Hero in the HF Ecosystem</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {TOPICS.map((topic, index) => {
          const isActive = index === activeTopicIndex;
          const isCompleted = completedTopics.has(index);
          const isVisited = visitedTopics.has(index);
          
          return (
            <button
              key={index}
              onClick={() => onTopicClick(index)}
              className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                isActive ? 'bg-teal-900/30 border border-teal-500/50 text-teal-300' : 
                isVisited ? 'bg-gray-800/50 hover:bg-gray-800 text-gray-300' : 
                'hover:bg-gray-800 text-gray-400'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                isCompleted ? 'bg-teal-500 border-teal-500 text-gray-900' :
                'border-gray-600'
              }`}>
                {isCompleted && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium leading-snug">{topic.title}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
