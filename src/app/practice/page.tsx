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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Interview Practice
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Practice questions and save your answers
        </p>

        {/* Question */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
          <p className="text-xs font-medium text-blue-600 mb-1">Current Question</p>
          <p className="text-lg font-semibold text-gray-800">{currentQuestion}</p>
        </div>

        {/* Answer Box */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Write your answer
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            placeholder="Type your answer here..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={handleSaveAnswer}
            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
          >
            Save Answer
          </button>
          <button
            onClick={getRandomQuestion}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Next Question
          </button>
        </div>

        {/* Saved Answers */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Saved Answers ({savedAnswers.length})
          </h2>

          {savedAnswers.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500 text-sm">
              No answers saved yet
            </div>
          ) : (
            <div className="space-y-3">
              {savedAnswers.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl p-4"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-gray-800 text-sm">{item.question}</p>
                    <button
                      onClick={() => handleDeleteAnswer(item.id)}
                      className="text-red-500 text-xs hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{item.answer}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}