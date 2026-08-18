import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import VendorForm from "../components/VendorForm";

import useVendor from "../hooks/useVendor";
import { updateVendor } from "../services/vendor.api";

function EditVendor() {
  const { weddingId, vendorId } = useParams();

  const navigate = useNavigate();

  const {
    vendor,
    loading: vendorLoading,
  } = useVendor(weddingId, vendorId);

  const [saving, setSaving] = useState(false);

  const handleUpdate = async (data) => {
    try {
      setSaving(true);

      await updateVendor(vendorId, data);

      toast.success("Vendor updated successfully.");

      navigate(`/weddings/${weddingId}/vendors`);
    } catch (error) {
      console.error("Failed to update vendor:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update vendor."
      );
    } finally {
      setSaving(false);
    }
  };

  if (vendorLoading) {
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
            The vendor you are trying to edit could not be found.
          </p>

        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-pink-600">
            Edit Vendor
          </h1>

          <p className="text-gray-500 mt-2">
            Update vendor information and payment details.
          </p>

        </div>

        {/* Form */}
        <VendorForm
          initialData={vendor}
          onSubmit={handleUpdate}
          loading={saving}
        />

      </div>
    </DashboardLayout>
  );
}

export default EditVendor;