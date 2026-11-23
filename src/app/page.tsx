"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Link from "next/link";

interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: string;
  date: string;
}

export default function Home() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("job-applications");
    if (saved) {
      setApplications(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  const total = applications.length;
  const interviews = applications.filter((app) => app.status === "Interview").length;
  const offers = applications.filter((app) => app.status === "Offer").length;
  const pending = applications.filter(
    (app) => app.status === "Applied" || app.status === "Interview"
  ).length;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, Kuldeep
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Track your applications and prepare for interviews
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Total */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Total Applications
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLoaded ? total : "–"}
            </p>
          </div>

          {/* Interviews */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Interviews
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {isLoaded ? interviews : "–"}
            </p>
          </div>

          {/* Offers */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Offers
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {isLoaded ? offers : "–"}
            </p>
          </div>

          {/* Pending */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Pending
            </p>
            <p className="text-3xl font-bold text-orange-500 dark:text-orange-400">
              {isLoaded ? pending : "–"}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/applications"
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition">
              Applications
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              View and manage all your job applications
            </p>
          </Link>

          <Link
            href="/practice"
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition">
              Interview Practice
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Practice common interview questions
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}