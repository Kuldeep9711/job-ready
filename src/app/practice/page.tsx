"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";

const questions = [
  "Tell me about yourself.",
  "Why do you want to work as a Frontend Developer?",
  "What is the difference between React and Next.js?",
  "Explain the concept of components in React.",
  "What is Tailwind CSS and why do you use it?",
  "How do you handle state in React?",
  "What is the difference between props and state?",
  "Tell me about a project you built using Next.js.",
  "How do you make a website responsive?",
  "What are your strengths and weaknesses?",
];

interface SavedAnswer {
  id: number;
  question: string;
  answer: string;
  date: string;
}

export default function PracticePage() {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [answer, setAnswer] = useState("");
  const [savedAnswers, setSavedAnswers] = useState<SavedAnswer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("practice-answers");
    if (saved) {
      setSavedAnswers(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("practice-answers", JSON.stringify(savedAnswers));
    }
  }, [savedAnswers, isLoaded]);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setAnswer("");
  };

  const handleSaveAnswer = () => {
    if (!answer.trim()) {
      alert("Please write an answer first");
      return;
    }

    const newAnswer: SavedAnswer = {
      id: Date.now(),
      question: currentQuestion,
      answer: answer,
      date: new Date().toLocaleString(),
    };

    setSavedAnswers([newAnswer, ...savedAnswers]);
    setAnswer("");
  };

  const handleDeleteAnswer = (id: number) => {
    setSavedAnswers(savedAnswers.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950">
      <Header />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Practice
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Improve your interview skills
            </p>
          </div>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showHistory ? "Back to Practice" : `History (${savedAnswers.length})`}
          </button>
        </div>

        {!showHistory ? (
          <div className="space-y-5">
            {/* Question Card */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Current Question
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white leading-relaxed">
                {currentQuestion}
              </p>
            </div>

            {/* Answer Card */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Your Answer
              </p>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={5}
                placeholder="Write your answer here as if you're in a real interview..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSaveAnswer}
                className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition"
              >
                Save Answer
              </button>
              <button
                onClick={getRandomQuestion}
                className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Next Question
              </button>
            </div>
          </div>
        ) : (
          /* History */
          <div className="space-y-4">
            {savedAnswers.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-10 text-center text-gray-500 dark:text-gray-400">
                No answers saved yet
              </div>
            ) : (
              savedAnswers.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.question}
                    </p>
                    <button
                      onClick={() => handleDeleteAnswer(item.id)}
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 leading-relaxed">
                    {item.answer}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {item.date}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}