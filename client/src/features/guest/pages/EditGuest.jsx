import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import GuestForm from "../components/GuestForm";

import {
  getGuestById,
  updateGuest,
} from "../services/guest.api";

function EditGuest() {
  const { weddingId, guestId } = useParams();
  const navigate = useNavigate();

  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchGuest();
  }, [guestId]);

  const fetchGuest = async () => {
    try {
      const res = await getGuestById(guestId);

      setGuest(res.data.data);
    } catch (error) {
      console.error("Failed to load guest:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load guest."
      );

      navigate(
        `/weddings/${weddingId}/guests`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      setSaving(true);

      await updateGuest(
        guestId,
        formData
      );

      toast.success(
        "Guest updated successfully."
      );

      navigate(
        `/weddings/${weddingId}/guests/${guestId}`
      );
    } catch (error) {
      console.error(
        "Failed to update guest:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update guest."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            Loading Guest...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!guest) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            Guest not found.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-pink-600 mb-8">
          Edit Guest
        </h1>

        <GuestForm
          initialData={guest}
          onSubmit={handleUpdate}
          loading={saving}
        />

      </div>
    </DashboardLayout>
  );
}

export default EditGuest;