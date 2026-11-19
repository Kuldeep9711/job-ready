import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          JobReady
        </Link>

        <nav className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Dashboard
          </Link>
          <Link href="/applications" className="text-gray-700 hover:text-blue-600 font-medium">
            Applications
          </Link>
          <Link href="/practice" className="text-gray-700 hover:text-blue-600 font-medium">
  Practice
</Link>
        </nav>
      </div>
    </header>
  );
}