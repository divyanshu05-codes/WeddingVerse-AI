import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import useVendor from "../hooks/useVendor";
import { deleteVendor } from "../services/vendor.api";

function VendorDetails() {
  const { weddingId, vendorId } = useParams();

  const navigate = useNavigate();

  const {
    vendor,
    loading,
  } = useVendor(weddingId, vendorId);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vendor?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteVendor(vendorId);

      toast.success("Vendor deleted successfully.");

      navigate(`/weddings/${weddingId}/vendors`);
    } catch (error) {
      console.error("Failed to delete vendor:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete vendor."
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            Loading vendor...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!vendor) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">

          <h2 className="text-2xl font-semibold text-gray-800">
            Vendor Not Found
          </h2>

          <p className="text-gray-500 mt-2">
            The vendor you are looking for does not exist.
          </p>

          <Link
            to={`/weddings/${weddingId}/vendors`}
            className="inline-block mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Vendors
          </Link>

        </div>
      </DashboardLayout>
    );
  }

  const totalCost = Number(vendor.totalCost || 0);

  const advancePaid = Number(
    vendor.advancePaid || 0
  );

  const remaining = totalCost - advancePaid;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {vendor.vendorName}
            </h1>

            {vendor.companyName && (
              <p className="text-gray-500 mt-2 text-lg">
                {vendor.companyName}
              </p>
            )}
          </div>

          <div className="flex gap-3">

            <Link
              to={`/weddings/${weddingId}/vendors/${vendorId}/edit`}
              className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded-lg"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg"
            >
              Delete
            </button>

          </div>

        </div>

        {/* Vendor Information */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Vendor Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Category
              </p>

              <p className="text-lg font-semibold mt-1">
                {vendor.category}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Payment Status
              </p>

              <p className="text-lg font-semibold mt-1">
                {vendor.paymentStatus}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Phone
              </p>

              <p className="text-lg font-semibold mt-1">
                {vendor.phone || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="text-lg font-semibold mt-1">
                {vendor.email || "Not provided"}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">
                Address
              </p>

              <p className="text-lg font-semibold mt-1">
                {vendor.address || "Not provided"}
              </p>
            </div>

          </div>

        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Payment Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-blue-50 rounded-xl p-6 text-center">

              <p className="text-gray-500">
                Total Cost
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                ₹{totalCost.toLocaleString()}
              </p>

            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center">

              <p className="text-gray-500">
                Advance Paid
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                ₹{advancePaid.toLocaleString()}
              </p>

            </div>

            <div className="bg-red-50 rounded-xl p-6 text-center">

              <p className="text-gray-500">
                Remaining
              </p>

              <p className="text-3xl font-bold text-red-500 mt-2">
                ₹{remaining.toLocaleString()}
              </p>

            </div>

          </div>

        </div>

        {/* Rating */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <h2 className="text-2xl font-semibold text-gray-800">
            Rating
          </h2>

          <p className="text-2xl font-bold text-yellow-600 mt-3">
            ⭐ {vendor.rating || 0}/5
          </p>

        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <h2 className="text-2xl font-semibold text-gray-800">
            Notes
          </h2>

          <p className="text-gray-600 mt-3 whitespace-pre-wrap">
            {vendor.notes || "No notes added."}
          </p>

        </div>

        {/* Back */}
        <Link
          to={`/weddings/${weddingId}/vendors`}
          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg"
        >
          ← Back to Vendors
        </Link>

      </div>
    </DashboardLayout>
  );
}

export default VendorDetails;