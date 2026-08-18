import { useEffect, useState } from "react";

function GuestForm({
  onSubmit,
  loading,
  initialData = null,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    side: "Bride",
    rsvpStatus: "Pending",
    mealPreference: "Veg",
    numberOfGuests: 1,
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        side: initialData.side || "Bride",
        rsvpStatus:
          initialData.rsvpStatus || "Pending",
        mealPreference:
          initialData.mealPreference || "Veg",
        numberOfGuests:
          initialData.numberOfGuests || 1,
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "numberOfGuests"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      numberOfGuests: Number(
        formData.numberOfGuests || 1
      ),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-8 space-y-6"
    >

      {/* Full Name */}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Full Name *
        </label>

        <input
          type="text"
          name="fullName"
          placeholder="Guest Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
      </div>


      {/* Phone */}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Phone Number *
        </label>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
      </div>


      {/* Email */}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Email
        </label>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>


      {/* Side */}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Side
        </label>

        <select
          name="side"
          value={formData.side}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="Bride">
            Bride Side
          </option>

          <option value="Groom">
            Groom Side
          </option>
        </select>
      </div>


      {/* RSVP Status */}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          RSVP Status
        </label>

        <select
          name="rsvpStatus"
          value={formData.rsvpStatus}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="Pending">
            Pending
          </option>

          <option value="Accepted">
            Accepted
          </option>

          <option value="Declined">
            Declined
          </option>
        </select>
      </div>


      {/* Meal Preference */}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Meal Preference
        </label>

        <select
          name="mealPreference"
          value={formData.mealPreference}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="Veg">
            Veg
          </option>

          <option value="Non-Veg">
            Non-Veg
          </option>

          <option value="Jain">
            Jain
          </option>

          <option value="Vegan">
            Vegan
          </option>
        </select>
      </div>


      {/* Number of Guests */}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Number of Guests
        </label>

        <input
          type="number"
          name="numberOfGuests"
          min="1"
          value={formData.numberOfGuests}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>


      {/* Notes */}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Notes
        </label>

        <textarea
          name="notes"
          rows="4"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>


      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white py-3 rounded-lg font-semibold transition"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Guest"
          : "Save Guest"}
      </button>

    </form>
  );
}

export default GuestForm;