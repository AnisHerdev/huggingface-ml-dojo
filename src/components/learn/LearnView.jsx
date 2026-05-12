import React, { useState } from 'react';
import { TOPICS } from '../../data/topics';
import TopicSidebar from './TopicSidebar';
import TopicContent from './TopicContent';

export default function LearnView() {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [visitedTopics, setVisitedTopics] = useState(new Set([0]));
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [activeTab, setActiveTab] = useState('concept'); // concept | quiz | colab

  const currentTopic = TOPICS[activeTopicIndex];

  const handleTopicClick = (index) => {
    setActiveTopicIndex(index);
    setVisitedTopics(prev => new Set(prev).add(index));
    setActiveTab('concept');
  };

  const handlePassQuiz = () => {
    setCompletedTopics(prev => new Set(prev).add(activeTopicIndex));
  };

  return (
    <div className="flex h-full w-full">
      <TopicSidebar 
        activeTopicIndex={activeTopicIndex}
        visitedTopics={visitedTopics}
        completedTopics={completedTopics}
        onTopicClick={handleTopicClick}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Sticky Top Bar */}
        <header className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-10 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">{currentTopic.title}</h2>
            {completedTopics.has(activeTopicIndex) && (
              <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-sm font-bold rounded-full flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                Topic Complete
              </span>
            )}
          </div>
          
          <div className="flex gap-1 bg-gray-950 p-1 rounded-lg w-max border border-gray-800">
            <button 
              onClick={() => setActiveTab('concept')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'concept' ? 'bg-gray-800 text-teal-400 shadow' : 'text-gray-400 hover:text-gray-200'}`}
            >
              Concept
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'quiz' ? 'bg-gray-800 text-teal-400 shadow' : 'text-gray-400 hover:text-gray-200'}`}
            >
              Quiz
            </button>
            <button 
              onClick={() => setActiveTab('colab')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'colab' ? 'bg-gray-800 text-teal-400 shadow' : 'text-gray-400 hover:text-gray-200'}`}
            >
              Colab Task
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto pb-20">
            <TopicContent 
              currentTopic={currentTopic}
              activeTab={activeTab}
              onPassQuiz={handlePassQuiz}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
