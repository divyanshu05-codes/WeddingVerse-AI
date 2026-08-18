import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import GuestForm from "../components/GuestForm";
import { createGuest } from "../services/guest.api";

function CreateGuest() {
  const { weddingId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreateGuest = async (guestData) => {
    try {
      setLoading(true);

      await createGuest({
        ...guestData,
        wedding: weddingId,
      });

      toast.success("Guest added successfully!");

      navigate(`/weddings/${weddingId}/guests`);
    } catch (error) {
      console.error("Failed to create guest:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create guest."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-pink-600 mb-8">
          Add Guest
        </h1>

        <GuestForm
          onSubmit={handleCreateGuest}
          loading={loading}
        />

      </div>
    </DashboardLayout>
  );
}

export default CreateGuest;