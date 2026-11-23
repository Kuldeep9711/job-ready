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
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const handleClearAll = () => {
    setApplications([]);
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.position.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "Interview":
        return "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Offer":
        return "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "Rejected":
        return "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Applications
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage and track all your job applications
          </p>
        </div>

        {/* Add Application Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add New Application
          </h2>

          <form
            onSubmit={handleAddApplication}
            className="grid grid-cols-1 md:grid-cols-4 gap-3"
          >
            <input
              type="text"
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition"
            >
              Add Application
            </button>
          </form>
        </div>

        {/* Search + Clear */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-between items-start sm:items-center">
          <input
            type="text"
            placeholder="Search company or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleClearAll}
            className="text-sm text-red-500 hover:text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            Clear All
          </button>
        </div>

        {/* Applications List */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
          {!isLoaded ? (
            <div className="p-10 text-center text-gray-500">Loading...</div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-10 text-center text-gray-500 dark:text-gray-400">
              No applications found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 px-6 py-4">
                      Company
                    </th>
                    <th className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 px-6 py-4">
                      Position
                    </th>
                    <th className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 px-6 py-4">
                      Status
                    </th>
                    <th className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 px-6 py-4">
                      Date
                    </th>
                    <th className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {app.company}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {app.position}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value)
                          }
                          className={`text-sm font-medium px-3 py-1 rounded-full border-0 cursor-pointer ${getStatusColor(
                            app.status
                          )}`}
                        >
                          <option value="Applied">Applied</option>
                          <option value="Interview">Interview</option>
                          <option value="Offer">Offer</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {app.date}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="text-sm text-red-500 hover:text-red-600 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}