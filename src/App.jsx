import React, { useState, useEffect } from 'react';
import TopNav from './components/layout/TopNav';
import LearnView from './components/learn/LearnView';
import ExploreView from './components/explore/ExploreView';
import { useNotebookTree } from './hooks/useNotebookTree';

function App() {
  const [activeMainTab, setActiveMainTab] = useState("learn"); // "learn" | "explore"
  const notebookData = useNotebookTree();

  // Lazy load notebooks only when Explore tab is first visited
  useEffect(() => {
    if (activeMainTab === "explore" && notebookData.fetchStatus === "idle") {
      notebookData.fetchNotebookTree();
    }
  }, [activeMainTab, notebookData]);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-gray-950 text-gray-100 font-sans">
      <TopNav activeMainTab={activeMainTab} setActiveMainTab={setActiveMainTab} />

      <div className="flex-1 overflow-hidden relative">
        {activeMainTab === "learn" ? (
          <LearnView />
        ) : (
          <ExploreView notebookData={notebookData} />
        )}
      </div>
    </div>
  );
}

export default App;
