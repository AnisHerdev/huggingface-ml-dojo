import React from 'react';

export default function TopNav({ activeMainTab, setActiveMainTab }) {
  return (
    <header className="h-[48px] bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 shrink-0 z-20">
      <div className="font-bold text-white tracking-wide flex items-center">
        <span role="img" aria-label="hugs" className="mr-2 text-xl">🤗</span>ML Dojo
      </div>
      <div className="flex h-full">
        <button 
          onClick={() => setActiveMainTab("learn")}
          className={`px-4 h-full flex items-center transition-colors text-sm font-medium ${activeMainTab === "learn" ? "text-white border-b-2 border-teal-400" : "text-gray-400 hover:text-white"}`}
        >
          📚 Learn
        </button>
        <button 
          onClick={() => setActiveMainTab("explore")}
          className={`px-4 h-full flex items-center transition-colors text-sm font-medium ${activeMainTab === "explore" ? "text-white border-b-2 border-teal-400" : "text-gray-400 hover:text-white"}`}
        >
          🔬 Explore Notebooks
        </button>
      </div>
    </header>
  );
}
