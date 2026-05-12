import React, { useState } from 'react';
import { notebookDescriptions, formatReadableTitle, generateTags } from '../../data/notebooks';

export default function NotebookPreview({ fetchStatus, selectedNotebook }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (fetchStatus !== "success" || !selectedNotebook) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">← Select a notebook to preview</p>
      </div>
    );
  }

  const colabUrl = `https://colab.research.google.com/github/huggingface/notebooks/blob/main/${selectedNotebook.path}`;
  const desc = notebookDescriptions[selectedNotebook.name] || `This notebook is from the '${selectedNotebook.label}' section. Open it in Colab to explore what it covers.`;
  const tags = generateTags(selectedNotebook.name);
  const readableTitle = formatReadableTitle(selectedNotebook.name);

  return (
    <div className="flex-1 overflow-y-auto p-4 flex justify-center items-start h-full">
      <div className="bg-gray-900 rounded-xl p-6 m-4 max-w-2xl w-full border border-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">{readableTitle}</h2>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-teal-900 text-teal-300 text-xs rounded-full px-2 py-0.5">{selectedNotebook.label}</span>
          {selectedNotebook.folderKey && <span className="bg-gray-700 text-gray-300 text-xs rounded-full px-2 py-0.5">{selectedNotebook.folderKey}</span>}
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">What this covers</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map(t => (
              <span key={t} className="bg-gray-700 text-gray-300 text-xs rounded-full px-2 py-0.5">{t}</span>
            ))}
          </div>
        )}

        <a 
          href={colabUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-teal-600 hover:bg-teal-500 text-white rounded-lg py-2 mt-4 font-medium text-center transition-colors"
        >
          Open in Colab
        </a>
        
        <button 
          onClick={() => handleCopyLink(colabUrl)}
          className="w-full block bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg py-2 mt-2 text-sm text-center transition-colors"
        >
          {copiedLink ? "✓ Copied!" : "Copy Link"}
        </button>
        
        <p className="text-xs text-gray-500 mt-2 break-all text-center">{colabUrl}</p>
      </div>
    </div>
  );
}
