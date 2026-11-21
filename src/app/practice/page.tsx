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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Soft background shapes */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-50"></div>

      <Header />

      <main className="relative z-10 max-w-xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Practice</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Interview questions</p>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showHistory ? "Back to Practice" : `History (${savedAnswers.length})`}
          </button>
        </div>

        {!showHistory ? (
          <>
            {/* Question */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Question</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
                {currentQuestion}
              </p>
            </div>

            {/* Answer */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Your Answer</p>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={5}
                placeholder="Write your answer..."
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSaveAnswer}
                className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition"
              >
                Save Answer
              </button>
              <button
                onClick={getRandomQuestion}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
              >
                Next Question
              </button>
            </div>
          </>
        ) : (
          /* History View */
          <div className="space-y-4">
            {savedAnswers.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                No saved answers yet
              </div>
            ) : (
              savedAnswers.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.question}
                    </p>
                    <button
                      onClick={() => handleDeleteAnswer(item.id)}
                      className="text-red-500 dark:text-red-400 text-sm hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    {item.answer}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{item.date}</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}