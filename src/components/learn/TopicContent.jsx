import React from 'react';
import Quiz from './Quiz';

export default function TopicContent({ currentTopic, activeTab, onPassQuiz }) {
  return (
    <>
      {/* CONCEPT TAB */}
      {activeTab === 'concept' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <section>
            <p className="text-lg leading-relaxed text-gray-300">
              {currentTopic.concept.explanation}
            </p>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              How it works under the hood
            </h3>
            <ul className="space-y-3">
              {currentTopic.concept.underTheHood.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="text-teal-500 mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {currentTopic.concept.hasDiagram && (
            <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 font-mono text-sm">
              <div className="text-teal-400 mb-6 font-bold">{'// Self-Attention Mechanism'}</div>
              <div className="flex flex-col gap-4 text-center items-center">
                <div className="flex gap-4">
                  <div className="bg-blue-900/50 border border-blue-500 px-6 py-3 rounded-lg">
                    <div className="font-bold text-blue-300 text-lg">Query (Q)</div>
                    <div className="text-xs text-blue-200 mt-1">"What am I looking for?"</div>
                  </div>
                  <div className="bg-purple-900/50 border border-purple-500 px-6 py-3 rounded-lg">
                    <div className="font-bold text-purple-300 text-lg">Key (K)</div>
                    <div className="text-xs text-purple-200 mt-1">"What do I contain?"</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center text-gray-400">
                  <span>↓ Matrix Multiply & Softmax ↓</span>
                </div>
                
                <div className="bg-teal-900/30 px-6 py-3 rounded-lg w-72 border border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                  <div className="font-bold text-teal-400 text-lg">Attention Weights</div>
                  <div className="text-xs text-teal-200 mt-1">Score of relevance between tokens</div>
                </div>
                
                <div className="flex flex-col items-center text-gray-400">
                  <span>↓ Multiply by ↓</span>
                </div>
                
                <div className="bg-pink-900/50 border border-pink-500 px-6 py-3 rounded-lg w-72">
                  <div className="font-bold text-pink-300 text-lg">Value (V)</div>
                  <div className="text-xs text-pink-200 mt-1">"The actual token content"</div>
                </div>
                
                <div className="flex flex-col items-center text-gray-400">
                  <span>↓ Output ↓</span>
                </div>
                
                <div className="bg-green-900/50 border border-green-500 text-green-300 px-6 py-3 rounded-lg font-bold w-72">
                  Contextualized Embedding
                </div>
              </div>
            </section>
          )}

          <section>
            <h3 className="text-lg font-bold text-gray-200 mb-3">Code Example</h3>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono">
                <code>{currentTopic.concept.codeSnippet}</code>
              </pre>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-bold text-gray-200 mb-4">Key Terms</h3>
              <dl className="space-y-4">
                {currentTopic.concept.glossary.map((item, i) => (
                  <div key={i}>
                    <dt className="font-bold text-teal-400">{item.term}</dt>
                    <dd className="text-sm text-gray-400 mt-1">{item.definition}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="bg-red-950/20 p-6 rounded-xl border border-red-900/50">
              <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Common Mistakes
              </h3>
              <ul className="space-y-3">
                {currentTopic.concept.mistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-3 text-red-200/80 text-sm">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}

      {/* QUIZ TAB */}
      {activeTab === 'quiz' && (
        <Quiz currentTopic={currentTopic} onPass={onPassQuiz} />
      )}

      {/* COLAB TAB */}
      {activeTab === 'colab' && (
        <div className="animate-in fade-in duration-300 max-w-2xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white">{currentTopic.colab.title}</h3>
                <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {currentTopic.colab.time}
                </span>
              </div>

              <div className="mb-8">
                <h4 className="text-teal-400 font-bold mb-3 uppercase tracking-wider text-xs">Objective</h4>
                <ul className="space-y-2">
                  {currentTopic.colab.objective.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <svg className="w-5 h-5 text-teal-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  What to look for
                </h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm pl-2">
                  {currentTopic.colab.lookFor.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <a 
                href={currentTopic.colab.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 bg-[#F9AB00] hover:bg-[#F9AB00]/90 text-gray-900 font-bold text-center rounded-lg transition-colors flex justify-center items-center gap-2 shadow-lg"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.8 11.23a4.23 4.23 0 0 0-4.05-3.05 4.3 4.3 0 0 0-4.3 4.3 4.3 4.3 0 0 0 4.3 4.3 4.23 4.23 0 0 0 4.05-3.05h3A7.26 7.26 0 0 1 8.75 19.82a7.3 7.3 0 0 1-7.3-7.3 7.3 7.3 0 0 1 7.3-7.3 7.26 7.26 0 0 1 7.05 6.09h-3zM22.55 12.48a7.26 7.26 0 0 1-7.05 6.09h3a4.23 4.23 0 0 0 4.05-3.05 4.3 4.3 0 0 0-4.3-4.3 4.3 4.3 0 0 0-4.3 4.3 4.23 4.23 0 0 0-4.05-3.05h-3a7.26 7.26 0 0 1 7.05-6.09 7.3 7.3 0 0 1 7.3 7.3 7.3 7.3 0 0 1-7.3 7.3z"/>
                </svg>
                Open in Google Colab
              </a>
            </div>
            
            <div className="bg-teal-900/20 p-6 border-t border-gray-800">
              <h4 className="text-teal-400 font-bold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Done? Test yourself
              </h4>
              <p className="text-gray-300 italic text-sm">
                {currentTopic.colab.testPrompt}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
