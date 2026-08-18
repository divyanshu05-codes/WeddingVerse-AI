import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">

        <h1 className="text-7xl font-bold text-pink-600">
          404
        </h1>

        <h2 className="text-2xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          Sorry, the page you're looking for doesn't exist.
        </p>

        <Link
          to="/dashboard"
          className="inline-block mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg"
        >
          Back to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default NotFound;