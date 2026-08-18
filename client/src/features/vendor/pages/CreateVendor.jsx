import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import VendorForm from "../components/VendorForm";
import { createVendor } from "../services/vendor.api";

function CreateVendor() {
  const { weddingId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreate = async (data) => {
    try {
      setLoading(true);

      await createVendor({
        ...data,
        wedding: weddingId,
      });

      toast.success("Vendor added successfully.");

      navigate(`/weddings/${weddingId}/vendors`);
    } catch (error) {
      console.error("Failed to create vendor:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create vendor."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-pink-600">
            Add Vendor
          </h1>

          <p className="text-gray-500 mt-2">
            Add a vendor and manage their payment details.
          </p>

        </div>

        {/* Form */}
        <VendorForm
          onSubmit={handleCreate}
          loading={loading}
        />

      </div>
    </DashboardLayout>
  );
}

export default CreateVendor;