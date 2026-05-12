import React, { useState } from 'react';
import TopNav from './components/layout/TopNav';
import LearnView from './components/learn/LearnView';
import ExploreView from './components/explore/ExploreView';

function App() {
  const [activeMainTab, setActiveMainTab] = useState("learn"); // "learn" | "explore"

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-gray-950 text-gray-100 font-sans">
      <TopNav activeMainTab={activeMainTab} setActiveMainTab={setActiveMainTab} />

      <div className="flex-1 overflow-hidden relative">
        {activeMainTab === "learn" ? (
          <LearnView />
        ) : (
          <ExploreView />
        )}
      </div>
    </div>
  );
}

export default App;
