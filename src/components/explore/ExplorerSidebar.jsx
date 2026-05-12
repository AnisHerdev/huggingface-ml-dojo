import React, { useState } from 'react';

export default function ExplorerSidebar({ 
  fetchStatus, 
  fetchError, 
  fetchNotebookTree, 
  tree, 
  notebookPaths, 
  selectedNotebook, 
  setSelectedNotebook 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedNodes, setExpandedNodes] = useState({});

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const renderTreeFolder = (folderObj, parentId) => {
    return Object.entries(folderObj).map(([folderName, folderData]) => {
      const nodeId = parentId + "::" + folderData.folderKey;
      const isOpen = expandedNodes[nodeId] !== false; 
      return (
        <div key={folderName} className="ml-3 mt-1 border-l border-gray-800 pl-2">
          <div 
            className="flex items-center gap-1 text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-200 py-1"
            onClick={() => toggleNode(nodeId)}
          >
            <svg className={`w-3 h-3 transition-transform ${isOpen ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            {folderName}
          </div>
          {isOpen && (
            <div className="mt-1">
              {renderTreeFolder(folderData.folders, parentId)}
              {folderData.notebooks.map(nb => (
                <div 
                  key={nb.path}
                  onClick={() => setSelectedNotebook(nb)}
                  className={`ml-3 text-sm rounded px-2 py-1 cursor-pointer truncate ${selectedNotebook?.path === nb.path ? "bg-gray-800 text-teal-400" : "text-gray-300 hover:text-white hover:bg-gray-800"}`}
                >
                  {nb.name}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  if (fetchStatus === "error") {
    return (
      <div className="w-[300px] flex flex-col border-r border-gray-800 bg-gray-900/50 shrink-0">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-4xl mb-4">⚠️</span>
          <p className="text-red-400 mb-4">{fetchError}</p>
          <button onClick={fetchNotebookTree} className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-medium transition-colors">
            Try Again
          </button>
          <p className="text-xs text-gray-500 mt-4">Tip: GitHub allows 60 unauthenticated requests/hour.</p>
        </div>
      </div>
    );
  }

  const sectionOrder = [
    "HF Course (English)", "Video Tutorials", "HF Course (Other Languages)",
    "Diffusers Docs", "Diffusers Notebooks", "Transformers Docs", "PEFT",
    "Datasets", "SageMaker", "SmolAgents", "SetFit", "Examples", "Other"
  ];

  let contentToRender;

  if (fetchStatus === "loading") {
    contentToRender = (
      <div className="p-4 space-y-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="space-y-3">
            <div className="w-28 h-3 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-40 h-2 bg-gray-800 rounded animate-pulse ml-4"></div>
            <div className="w-32 h-2 bg-gray-800 rounded animate-pulse ml-4"></div>
            <div className="w-48 h-2 bg-gray-800 rounded animate-pulse ml-4"></div>
          </div>
        ))}
      </div>
    );
  } else {
    let activeSections = sectionOrder.filter(s => tree[s]);
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const resultsBySection = {};
      notebookPaths.forEach(path => {
        if (path.toLowerCase().includes(query)) {
          const { label } = [
            { prefix: "course/en/", label: "HF Course (English)" },
            { prefix: "course/videos/", label: "Video Tutorials" },
            { prefix: "course/", label: "HF Course (Other Languages)" },
            { prefix: "diffusers_doc/", label: "Diffusers Docs" },
            { prefix: "diffusers/", label: "Diffusers Notebooks" },
            { prefix: "transformers_doc/en/", label: "Transformers Docs" },
            { prefix: "peft_docs/", label: "PEFT" },
            { prefix: "peft/", label: "PEFT" },
            { prefix: "datasets-server_doc/", label: "Datasets" },
            { prefix: "datasets_doc/", label: "Datasets" },
            { prefix: "sagemaker/", label: "SageMaker" },
            { prefix: "smolagents_doc/", label: "SmolAgents" },
            { prefix: "setfit_doc/", label: "SetFit" },
            { prefix: "examples/", label: "Examples" }
          ].find(m => path.startsWith(m.prefix)) || { label: "Other" };

          if (!resultsBySection[label]) resultsBySection[label] = [];
          const filename = path.split("/").pop();
          resultsBySection[label].push({ name: filename.replace(/\.ipynb$/, ""), path, label });
        }
      });

      const totalMatches = Object.values(resultsBySection).flat().length;

      contentToRender = (
        <div className="p-2">
          <div className="text-xs text-gray-400 mb-2 px-2">{totalMatches} matches</div>
          {sectionOrder.filter(s => resultsBySection[s]).map(section => (
            <div key={section} className="mb-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 py-1">{section}</div>
              <div className="mt-1">
                {resultsBySection[section].map(nb => (
                  <div 
                    key={nb.path}
                    onClick={() => setSelectedNotebook(nb)}
                    className={`ml-2 text-sm rounded px-2 py-1 cursor-pointer truncate ${selectedNotebook?.path === nb.path ? "bg-gray-800 text-teal-400" : "text-gray-300 hover:text-white hover:bg-gray-800"}`}
                  >
                    {nb.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      contentToRender = (
        <div className="p-2">
          {activeSections.map(section => {
            const nodeId = "section::" + section;
            const isOpen = expandedNodes[nodeId] !== false;
            return (
              <div key={section} className="mb-2">
                <div 
                  className="flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 py-1 cursor-pointer hover:text-gray-200"
                  onClick={() => toggleNode(nodeId)}
                >
                  <svg className={`w-3 h-3 transition-transform ${isOpen ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  {section}
                </div>
                {isOpen && (
                  <div>
                    {renderTreeFolder(tree[section].folders, section)}
                    {tree[section].notebooks.map(nb => (
                      <div 
                        key={nb.path}
                        onClick={() => setSelectedNotebook(nb)}
                        className={`ml-6 mt-1 text-sm rounded px-2 py-1 cursor-pointer truncate ${selectedNotebook?.path === nb.path ? "bg-gray-800 text-teal-400" : "text-gray-300 hover:text-white hover:bg-gray-800"}`}
                      >
                        {nb.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }
  }

  return (
    <div className="w-[300px] flex flex-col border-r border-gray-800 bg-gray-900/50 shrink-0 h-full">
      <div className="p-4 border-b border-gray-800 shrink-0">
        <input 
          type="text" 
          placeholder="Search notebooks..." 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={e => e.key === 'Escape' && setSearchQuery("")}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {contentToRender}
      </div>
    </div>
  );
}
