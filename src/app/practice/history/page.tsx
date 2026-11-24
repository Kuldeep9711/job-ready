"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Link from "next/link";

interface SavedAnswer {
  id: number;
  question: string;
  answer: string;
  date: string;
}

export default function HistoryPage() {
  const [savedAnswers, setSavedAnswers] = useState<SavedAnswer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("practice-answers");
    if (saved) {
      setSavedAnswers(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  const handleDeleteAnswer = (id: number) => {
    const updated = savedAnswers.filter((item) => item.id !== id);
    setSavedAnswers(updated);
    localStorage.setItem("practice-answers", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950">
      <Header />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Practice History
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Your saved interview answers
            </p>
          </div>

          <Link
            href="/practice"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Practice
          </Link>
        </div>

        <div className="space-y-4">
          {!isLoaded ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : savedAnswers.length === 0 ? (
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
                    className="text-red-500 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
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
      </main>
    </div>
  );
}