import Header from "@/components/Header";

export default function ApplicationsPage() {
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

        <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
          <p className="text-gray-500">
            No applications added yet. We will add the form soon.
          </p>
        </div>
      </main>
    </div>
  );
}