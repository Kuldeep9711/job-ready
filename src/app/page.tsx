import Header from "@/components/Header";

export default function Home() {
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
  <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
    <h3 className="text-gray-500 text-sm font-medium mb-1">Total Applications</h3>
    <p className="text-3xl font-bold text-gray-800">0</p>
  </div>

  {/* Card 2 */}
  <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
    <h3 className="text-gray-500 text-sm font-medium mb-1">Interviews Practiced</h3>
    <p className="text-3xl font-bold text-gray-800">0</p>
  </div>

  {/* Card 3 */}
  <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
    <h3 className="text-gray-500 text-sm font-medium mb-1">Pending Applications</h3>
    <p className="text-3xl font-bold text-gray-800">0</p>
  </div>

</div>

        {/* Coming Soon Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Next Features Coming
          </h3>
          <p className="text-gray-600">
            Job Application Tracker and Interview Practice will be added soon.
          </p>
        </div>
      </main>
    </div>
  );
}