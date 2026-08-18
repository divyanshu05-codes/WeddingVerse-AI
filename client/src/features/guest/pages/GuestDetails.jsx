import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  getGuestById,
  deleteGuest,
} from "../services/guest.api";

function GuestDetails() {
  const { weddingId, guestId } = useParams();
  const navigate = useNavigate();

  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

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

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this guest?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(true);

      await deleteGuest(guestId);

      toast.success(
        "Guest deleted successfully."
      );

      navigate(
        `/weddings/${weddingId}/guests`
      );
    } catch (error) {
      console.error(
        "Failed to delete guest:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete guest."
      );
    } finally {
      setDeleting(false);
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

          <h2 className="text-2xl font-semibold">
            Guest Not Found
          </h2>

          <Link
            to={`/weddings/${weddingId}/guests`}
            className="inline-block mt-5 bg-pink-600 text-white px-5 py-3 rounded-lg"
          >
            Back to Guests
          </Link>

        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link
          to={`/weddings/${weddingId}/guests`}
          className="text-pink-600 font-semibold"
        >
          ← Back to Guests
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-5">

          <div className="flex flex-col md:flex-row justify-between gap-5">

            <div>
              <h1 className="text-3xl font-bold text-pink-600">
                {guest.fullName}
              </h1>

              <p className="text-gray-500 mt-2">
                {guest.side} Side
              </p>
            </div>

            <div className="flex gap-3">

              {/* Edit */}
              <Link
                to={`/weddings/${weddingId}/guests/${guestId}/edit`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
              >
                Edit
              </Link>

              {/* Delete */}
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-5 py-2 rounded-lg"
              >
                {deleting
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>

        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow p-6 mt-6">

          <h2 className="text-xl font-bold mb-5">
            Contact Information
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Full Name:</strong>{" "}
              {guest.fullName}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {guest.phone}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {guest.email || "No Email"}
            </p>

          </div>

        </div>

        {/* Guest Information */}
        <div className="bg-white rounded-xl shadow p-6 mt-6">

          <h2 className="text-xl font-bold mb-5">
            Guest Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <p className="text-gray-500">
                Side
              </p>

              <p className="font-semibold mt-1">
                {guest.side}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Number of Guests
              </p>

              <p className="font-semibold mt-1">
                {guest.numberOfGuests}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                RSVP Status
              </p>

              <p
                className={`font-semibold mt-1 ${
                  guest.rsvpStatus === "Accepted"
                    ? "text-green-600"
                    : guest.rsvpStatus === "Declined"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {guest.rsvpStatus}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Meal Preference
              </p>

              <p className="font-semibold mt-1">
                {guest.mealPreference}
              </p>
            </div>

          </div>

        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl shadow p-6 mt-6 mb-10">

          <h2 className="text-xl font-bold mb-4">
            Notes
          </h2>

          <p className="text-gray-600 whitespace-pre-wrap">
            {guest.notes || "No notes available."}
          </p>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default GuestDetails;