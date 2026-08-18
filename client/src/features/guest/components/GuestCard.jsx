import { Link, useParams } from "react-router-dom";

function GuestCard({ guest }) {
  const { weddingId } = useParams();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-center">

        <h2 className="text-xl font-bold text-pink-600">
          {guest.fullName}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            guest.rsvpStatus === "Accepted"
              ? "bg-green-100 text-green-600"
              : guest.rsvpStatus === "Declined"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {guest.rsvpStatus}
        </span>

      </div>

      <div className="mt-4 space-y-2 text-gray-600">

        <p>📞 {guest.phone}</p>

        <p>📧 {guest.email || "No Email"}</p>

        <p>👨‍👩‍👧 Side : {guest.side}</p>

        <p>🍽 Meal : {guest.mealPreference}</p>

        <p>👥 Guests : {guest.numberOfGuests}</p>

      </div>

      <div className="flex gap-3 mt-6">

        <Link
          to={`/weddings/${weddingId}/guests/${guest._id}`}
          className="flex-1 bg-blue-500 text-white text-center py-2 rounded-lg"
        >
          View
        </Link>

        <Link
          to={`/weddings/${weddingId}/guests/${guest._id}/edit`}
          className="flex-1 bg-yellow-500 text-white text-center py-2 rounded-lg"
        >
          Edit
        </Link>

      </div>

    </div>
  );
}

export default GuestCard;