"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";

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
  const pending = applications.filter(
    (app) => app.status === "Applied" || app.status === "Interview"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Welcome Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, Kuldeep
          </h2>
          <p className="text-gray-600">
            Track your job applications and practice for interviews.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Applications</h3>
            <p className="text-3xl font-bold text-gray-800">
              {isLoaded ? total : "-"}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Interviews</h3>
            <p className="text-3xl font-bold text-gray-800">
              {isLoaded ? interviews : "-"}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Pending</h3>
            <p className="text-3xl font-bold text-gray-800">
              {isLoaded ? pending : "-"}
            </p>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Keep Going!
          </h3>
          <p className="text-gray-600">
            You have applied to <span className="font-semibold">{total}</span> jobs so far.
          </p>
        </div>
      </main>
    </div>
  );
}