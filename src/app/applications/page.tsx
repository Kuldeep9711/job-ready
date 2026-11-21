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

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("job-applications");
    if (saved) {
      setApplications(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("job-applications", JSON.stringify(applications));
    }
  }, [applications, isLoaded]);

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !position) {
      alert("Please fill Company and Position");
      return;
    }

    const newApplication: JobApplication = {
      id: Date.now(),
      company,
      position,
      status,
      date: new Date().toLocaleDateString(),
    };

    setApplications([newApplication, ...applications]);
    setCompany("");
    setPosition("");
    setStatus("Applied");
  };

  const handleDelete = (id: number) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
  };

  const handleClearAll = () => {
    setApplications([]);
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Job Applications
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Track all the jobs you have applied for.
        </p>

        {/* Add Application Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Add New Application
          </h2>

          <form
            onSubmit={handleAddApplication}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <input
              type="text"
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Position (e.g. Frontend Developer)"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
            >
              Add Application
            </button>
          </form>
        </div>

        {/* Search + Clear All */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-between">
          <input
            type="text"
            placeholder="Search by company or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleClearAll}
            className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition"
          >
            Clear All
          </button>
        </div>

        {/* Applications List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          {!isLoaded ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              Loading...
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No applications found.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                    Company
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                    Position
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                    Date
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                      {app.company}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {app.position}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(app.id, e.target.value)
                        }
                        className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer
                          ${
                            app.status === "Applied"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              : app.status === "Interview"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                              : app.status === "Offer"
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                          }
                        `}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {app.date}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}