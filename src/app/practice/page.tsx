"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Link from "next/link";

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

  // AI states
  const [feedback, setFeedback] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState("");

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
    setFeedback("");
    setAiError("");
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
    setFeedback("");
  };

  const handleGetAIFeedback = async () => {
    if (!answer.trim()) {
      alert("Please write an answer first");
      return;
    }

    setIsLoadingAI(true);
    setFeedback("");
    setAiError("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion,
          answer: answer,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get feedback");
      }

      setFeedback(data.feedback);
    } catch (error: any) {
      setAiError(error.message || "Something went wrong");
    } finally {
      setIsLoadingAI(false);
    }
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
              Improve your interview skills with AI feedback
            </p>
          </div>

          <Link
            href="/practice/history"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            History ({savedAnswers.length})
          </Link>
        </div>

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

          {/* AI Feedback */}
          {aiError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-2xl p-4 text-sm">
              {aiError}
            </div>
          )}

          {feedback && (
            <div className="bg-white dark:bg-gray-900 border border-purple-300 dark:border-purple-700 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  AI Feedback
                </p>
                <button
                  onClick={() => setFeedback("")}
                  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Close
                </button>
              </div>
              <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                {feedback}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleGetAIFeedback}
              disabled={isLoadingAI}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-3 rounded-xl transition"
            >
              {isLoadingAI ? "Getting AI Feedback..." : "Get AI Feedback"}
            </button>

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
      </main>
    </div>
  );
}


