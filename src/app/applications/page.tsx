"use client";

import { useState } from "react";
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

    // Clear form
    setCompany("");
    setPosition("");
    setStatus("Applied");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Job Applications
        </h1>
        <p className="text-gray-600 mb-8">
          Track all the jobs you have applied for.
        </p>

        {/* Add Application Form */}
       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Application</h2>

          <form
            onSubmit={handleAddApplication}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <input
              type="text"
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Position (e.g. Frontend Developer)"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          {applications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No applications added yet.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Company
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Position
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
  {applications.map((app) => (
    <tr key={app.id} className="border-b hover:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-800">{app.company}</td>
      <td className="px-6 py-4 text-gray-800">{app.position}</td>
      <td className="px-6 py-4">
        <span
  className={`px-3 py-1 rounded-full text-sm font-medium
    ${
      app.status === "Applied"
        ? "bg-blue-100 text-blue-700"
        : app.status === "Interview"
        ? "bg-yellow-100 text-yellow-700"
        : app.status === "Offer"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }
  `}
>
  {app.status}
</span>
      </td>
      <td className="px-6 py-4 text-gray-500">{app.date}</td>
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