import { Link } from "react-router-dom";

function WeddingCard({ wedding }) {
  const totalBudget = Number(
    wedding.estimatedBudget || 0
  );

  const totalExpenses = Number(
    wedding.totalExpenses || 0
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-semibold">
          {wedding.status}
        </span>

        <span className="text-sm font-semibold text-gray-600">
          ₹{totalBudget.toLocaleString()}
        </span>

      </div>


      {/* Couple */}
      <h2 className="text-xl font-bold text-pink-600">
        {wedding.bride?.fullName} ❤️{" "}
        {wedding.groom?.fullName}
      </h2>


      {/* Wedding Details */}
      <div className="mt-4 space-y-1">

        <p className="text-gray-600">
          📍{" "}
          {wedding.weddingDetails?.venue ||
            "Venue not available"}
        </p>

        <p className="text-gray-600">
          🏙️{" "}
          {wedding.weddingDetails?.city ||
            "City not available"}
        </p>

        <p className="text-gray-600">
          📅{" "}
          {wedding.weddingDetails?.weddingDate
            ? new Date(
                wedding.weddingDetails.weddingDate
              ).toLocaleDateString()
            : "Date not available"}
        </p>

      </div>


      {/* Wedding Statistics */}
      <div className="grid grid-cols-3 gap-3 mt-6">

        {/* Guests */}
        <div className="bg-blue-50 rounded-xl p-3 text-center">

          <p className="text-xs text-gray-500">
            Guests
          </p>

          <p className="text-xl font-bold text-blue-600 mt-1">
            {wedding.totalGuests || 0}
          </p>

        </div>


        {/* Vendors */}
        <div className="bg-purple-50 rounded-xl p-3 text-center">

          <p className="text-xs text-gray-500">
            Vendors
          </p>

          <p className="text-xl font-bold text-purple-600 mt-1">
            {wedding.totalVendors || 0}
          </p>

        </div>


        {/* Spent */}
        <div className="bg-red-50 rounded-xl p-3 text-center">

          <p className="text-xs text-gray-500">
            Spent
          </p>

          <p className="text-xl font-bold text-red-500 mt-1">
            ₹{totalExpenses.toLocaleString()}
          </p>

        </div>

      </div>


      {/* Actions */}
      <div className="flex gap-3 mt-6">

        <Link
          to={`/weddings/${wedding._id}`}
          className="flex-1 bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition"
        >
          View
        </Link>

        <Link
          to={`/weddings/${wedding._id}/edit`}
          className="flex-1 bg-yellow-500 text-white text-center py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Edit
        </Link>

      </div>

    </div>
  );
}

export default WeddingCard;