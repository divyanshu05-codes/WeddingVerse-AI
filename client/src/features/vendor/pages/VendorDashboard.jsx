import { Link, useParams } from "react-router-dom";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import useVendor from "../hooks/useVendor";
import VendorCard from "../components/VendorCard";

function VendorDashboard() {
  const { weddingId } = useParams();

  const { vendors, loading } = useVendor(weddingId);

  const totalVendors = vendors.length;

  const totalCost = vendors.reduce(
    (sum, vendor) => sum + Number(vendor.totalCost || 0),
    0
  );

  const totalAdvance = vendors.reduce(
    (sum, vendor) => sum + Number(vendor.advancePaid || 0),
    0
  );

  const totalRemaining = totalCost - totalAdvance;

  const paidVendors = vendors.filter(
    (vendor) => vendor.paymentStatus === "Paid"
  ).length;

  const pendingVendors = vendors.filter(
    (vendor) =>
      vendor.paymentStatus === "Pending" ||
      vendor.paymentStatus === "Partial"
  ).length;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Vendor Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all vendors for your wedding
            </p>
          </div>


          {/* Actions */}

          <div className="flex flex-col sm:flex-row gap-3">

            {/* AI Vendor Assistant */}

            <Link
              to={`/weddings/${weddingId}/vendor-assistant`}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition shadow-sm"
            >
              🤝 AI Vendor Assistant
            </Link>


            {/* Add Vendor */}

            <Link
              to={`/weddings/${weddingId}/vendors/new`}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium text-center transition"
            >
              + Add Vendor
            </Link>

          </div>

        </div>


        {/* ==================================================
            SUMMARY CARDS
        ================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          {/* Total Vendors */}

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-gray-500">
              Total Vendors
            </h2>

            <p className="text-4xl font-bold text-pink-600 mt-3">
              {totalVendors}
            </p>

          </div>


          {/* Total Cost */}

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-gray-500">
              Total Cost
            </h2>

            <p className="text-3xl font-bold text-blue-600 mt-3">
              ₹{totalCost.toLocaleString()}
            </p>

          </div>


          {/* Advance Paid */}

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-gray-500">
              Advance Paid
            </h2>

            <p className="text-3xl font-bold text-green-600 mt-3">
              ₹{totalAdvance.toLocaleString()}
            </p>

          </div>


          {/* Remaining */}

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-gray-500">
              Remaining
            </h2>

            <p className="text-3xl font-bold text-red-500 mt-3">
              ₹{totalRemaining.toLocaleString()}
            </p>

          </div>

        </div>


        {/* ==================================================
            PAYMENT STATISTICS
        ================================================== */}

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Payment Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Paid */}

            <div className="bg-green-50 rounded-xl p-6 text-center">

              <h3 className="text-gray-600">
                Paid Vendors
              </h3>

              <p className="text-4xl font-bold text-green-600 mt-2">
                {paidVendors}
              </p>

            </div>


            {/* Pending */}

            <div className="bg-yellow-50 rounded-xl p-6 text-center">

              <h3 className="text-gray-600">
                Pending / Partial
              </h3>

              <p className="text-4xl font-bold text-yellow-600 mt-2">
                {pendingVendors}
              </p>

            </div>

          </div>

        </div>


        {/* ==================================================
            VENDORS
        ================================================== */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold text-gray-800">
            Your Vendors
          </h2>

        </div>


        {/* ==================================================
            LOADING
        ================================================== */}

        {loading ? (

          <div className="bg-white rounded-2xl shadow-md p-10 text-center">

            <p className="text-gray-500 text-lg">
              Loading vendors...
            </p>

          </div>

        ) : vendors.length === 0 ? (

          /* ==================================================
              NO VENDORS
          ================================================== */

          <div className="bg-white rounded-2xl shadow-md p-10 text-center">

            <h2 className="text-2xl font-semibold text-gray-800">
              No Vendors Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Add your first wedding vendor to get started.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">

              {/* AI Assistant */}

              <Link
                to={`/weddings/${weddingId}/vendor-assistant`}
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                🤝 AI Vendor Assistant
              </Link>


              {/* Add Vendor */}

              <Link
                to={`/weddings/${weddingId}/vendors/new`}
                className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg transition"
              >
                + Add Vendor
              </Link>

            </div>

          </div>

        ) : (

          /* ==================================================
              VENDOR CARDS
          ================================================== */

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {vendors.map((vendor) => (
              <VendorCard
                key={vendor._id}
                vendor={vendor}
              />
            ))}

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}

export default VendorDashboard;