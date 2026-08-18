import { Link, useParams } from "react-router-dom";

function VendorCard({ vendor }) {
  const { weddingId } = useParams();

  const totalCost = Number(vendor.totalCost || 0);
  const advancePaid = Number(vendor.advancePaid || 0);
  const remaining = totalCost - advancePaid;

  const getStatusStyle = () => {
    if (vendor.paymentStatus === "Paid") {
      return "bg-green-100 text-green-700";
    }

    if (vendor.paymentStatus === "Partial") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">

      {/* Header */}
      <div className="flex justify-between items-start gap-4">

        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {vendor.vendorName}
          </h3>

          {vendor.companyName && (
            <p className="text-gray-500 mt-1">
              {vendor.companyName}
            </p>
          )}
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle()}`}
        >
          {vendor.paymentStatus}
        </span>

      </div>

      {/* Category */}
      <div className="mt-5">

        <p className="text-sm text-gray-500">
          Category
        </p>

        <p className="font-semibold text-gray-800 mt-1">
          {vendor.category}
        </p>

      </div>

      {/* Contact */}
      {vendor.phone && (
        <div className="mt-4">

          <p className="text-sm text-gray-500">
            Phone
          </p>

          <p className="font-medium text-gray-800 mt-1">
            {vendor.phone}
          </p>

        </div>
      )}

      {/* Cost */}
      <div className="grid grid-cols-2 gap-4 mt-5">

        <div className="bg-blue-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">
            Total Cost
          </p>

          <p className="text-lg font-bold text-blue-600 mt-1">
            ₹{totalCost.toLocaleString()}
          </p>

        </div>

        <div className="bg-green-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">
            Advance
          </p>

          <p className="text-lg font-bold text-green-600 mt-1">
            ₹{advancePaid.toLocaleString()}
          </p>

        </div>

      </div>

      {/* Remaining */}
      <div className="mt-4 bg-gray-50 rounded-xl p-4">

        <div className="flex justify-between items-center">

          <span className="text-gray-500">
            Remaining
          </span>

          <span className="font-bold text-red-500">
            ₹{remaining.toLocaleString()}
          </span>

        </div>

      </div>

      {/* Rating */}
      {vendor.rating && (
        <div className="mt-4 flex items-center gap-2">

          <span className="text-gray-500">
            Rating:
          </span>

          <span className="font-semibold text-yellow-600">
            ⭐ {vendor.rating}/5
          </span>

        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-6">

        <Link
          to={`/weddings/${weddingId}/vendors/${vendor._id}`}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg transition"
        >
          View
        </Link>

        <Link
          to={`/weddings/${weddingId}/vendors/${vendor._id}/edit`}
          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-center py-2 rounded-lg transition"
        >
          Edit
        </Link>

      </div>

    </div>
  );
}

export default VendorCard;