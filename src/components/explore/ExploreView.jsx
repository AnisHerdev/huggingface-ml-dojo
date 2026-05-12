import React, { useState } from 'react';
import ExplorerSidebar from './ExplorerSidebar';
import NotebookPreview from './NotebookPreview';

export default function ExploreView({ notebookData }) {
  const { notebookPaths, tree, fetchStatus, fetchError, lastFetched, fetchNotebookTree } = notebookData;
  const [selectedNotebook, setSelectedNotebook] = useState(null);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Explorer Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-white font-semibold">HuggingFace Notebooks</h1>
          <p className="text-xs text-gray-400">
            {fetchStatus === "success" && lastFetched 
              ? `${notebookPaths.length} notebooks · fetched at ${lastFetched.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` 
              : fetchStatus === "loading" ? "Fetching..." : fetchStatus === "error" ? "Fetch failed" : ""}
          </p>
        </div>
        <button 
          onClick={fetchNotebookTree}
          disabled={fetchStatus === "loading"}
          className="bg-gray-800 hover:bg-gray-700 text-teal-400 rounded-lg px-3 py-1 text-sm border border-gray-700 flex items-center justify-center min-w-[36px]"
          aria-label="Refresh notebooks"
        >
          {fetchStatus === "loading" ? (
            <div className="w-3 h-3 border border-teal-400 border-t-transparent rounded-full animate-spin"></div>
          ) : "↻"}
        </button>
      </div>
      
      {/* Two-panel area */}
      <div className="flex flex-1 overflow-hidden">
        <ExplorerSidebar 
          fetchStatus={fetchStatus}
          fetchError={fetchError}
          fetchNotebookTree={fetchNotebookTree}
          tree={tree}
          notebookPaths={notebookPaths}
          selectedNotebook={selectedNotebook}
          setSelectedNotebook={setSelectedNotebook}
        />
        <NotebookPreview 
          fetchStatus={fetchStatus}
          selectedNotebook={selectedNotebook}
        />
      </div>
    </div>
  );
}
