import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Kantan Help
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Your one-stop solution for all helpdesk needs. Get support, manage
          tickets, and access resources easily.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>

          <Link href="/help-center" className="text-blue-600 hover:underline">
            Visit Help Center
          </Link>
        </div>
      </div>
    </div>
  );
}
