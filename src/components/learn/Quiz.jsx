import React, { useState } from 'react';

export default function Quiz({ currentTopic, isCompleted, onPass }) {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const isQuizComplete = Object.keys(quizAnswers).length === currentTopic.quiz.length;

  const handleQuizSubmit = () => {
    let score = 0;
    currentTopic.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) score++;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    if (score >= 3) {
      onPass();
    }
  };

  const handleRetry = () => {
    setQuizSubmitted(false);
    setQuizAnswers({});
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {quizSubmitted ? (
        <div className={`p-6 rounded-xl border ${quizScore >= 3 ? 'bg-teal-900/20 border-teal-500/50' : 'bg-red-900/20 border-red-500/50'} text-center`}>
          <h3 className="text-2xl font-bold mb-2">
            {quizScore >= 3 ? 'Topic Complete! ✅' : 'Keep Trying!'}
          </h3>
          <p className="text-gray-300 mb-6">
            You scored {quizScore} out of {currentTopic.quiz.length}
          </p>
          {quizScore < 3 && (
            <button 
              onClick={handleRetry}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold text-white transition-colors"
            >
              Review and Retry
            </button>
          )}
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 mb-6">Pass with 3/4 correct to complete this topic.</p>
          <div className="space-y-10">
            {currentTopic.quiz.map((q, qIdx) => (
              <div key={qIdx} className="space-y-4">
                <h4 className="font-bold text-lg text-gray-200">
                  <span className="text-teal-500 mr-2">{qIdx + 1}.</span> 
                  {q.question}
                </h4>
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => (
                    <label key={oIdx} className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${quizAnswers[qIdx] === oIdx ? 'bg-teal-900/20 border-teal-500' : 'bg-gray-950 border-gray-800 hover:border-gray-600'}`}>
                      <input 
                        type="radio" 
                        name={`q-${qIdx}`}
                        value={oIdx}
                        checked={quizAnswers[qIdx] === oIdx}
                        onChange={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                        className="mt-1 shrink-0 accent-teal-500 w-4 h-4"
                      />
                      <span className="ml-3 text-gray-300">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
            <button 
              disabled={!isQuizComplete}
              onClick={handleQuizSubmit}
              className={`px-8 py-3 rounded-lg font-bold transition-all ${isQuizComplete ? 'bg-teal-600 hover:bg-teal-500 text-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
            >
              Submit Answers
            </button>
          </div>
        </div>
      )}

      {/* Show explanations after submission */}
      {quizSubmitted && (
        <div className="space-y-6 mt-8">
          <h3 className="text-xl font-bold text-gray-200 border-b border-gray-800 pb-2">Review Your Answers</h3>
          {currentTopic.quiz.map((q, qIdx) => {
            const isCorrect = quizAnswers[qIdx] === q.correct;
            return (
              <div key={qIdx} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-900/10 border-green-900/50' : 'bg-red-900/10 border-red-900/50'}`}>
                <div className="flex gap-3">
                  <div className="mt-1">
                    {isCorrect ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-300 mb-1">{q.question}</h4>
                    <p className="text-sm text-gray-400 mb-2">
                      <span className="font-semibold text-gray-300">Your answer:</span> {q.options[quizAnswers[qIdx]]}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-400 mb-2">
                        <span className="font-semibold text-green-400">Correct answer:</span> {q.options[q.correct]}
                      </p>
                    )}
                    <p className={`text-sm ${isCorrect ? 'text-green-300/80' : 'text-red-300/80'} mt-2 p-2 bg-gray-950/50 rounded`}>
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}
