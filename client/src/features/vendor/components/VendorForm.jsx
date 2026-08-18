import { useState } from "react";

function VendorForm({ onSubmit, loading, initialData = null }) {
  const [formData, setFormData] = useState({
    vendorName: initialData?.vendorName || "",
    companyName: initialData?.companyName || "",
    category: initialData?.category || "Photographer",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
    totalCost: initialData?.totalCost || "",
    advancePaid: initialData?.advancePaid || "",
    paymentStatus: initialData?.paymentStatus || "Pending",
    rating: initialData?.rating || 5,
    notes: initialData?.notes || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "totalCost" ||
        name === "advancePaid" ||
        name === "rating"
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
      totalCost: Number(formData.totalCost),
      advancePaid: Number(formData.advancePaid || 0),
      rating: Number(formData.rating),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-8 space-y-6"
    >
      {/* Vendor Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Vendor Name *
        </label>

        <input
          type="text"
          name="vendorName"
          value={formData.vendorName}
          onChange={handleChange}
          placeholder="Enter vendor name"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
      </div>

      {/* Company Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Company Name
        </label>

        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter company name"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Category *
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        >
          <option value="Photographer">Photographer</option>
          <option value="Videographer">Videographer</option>
          <option value="Decorator">Decorator</option>
          <option value="Caterer">Caterer</option>
          <option value="Makeup">Makeup</option>
          <option value="DJ">DJ</option>
          <option value="Band">Band</option>
          <option value="Transport">Transport</option>
          <option value="Hotel">Hotel</option>
          <option value="Cake">Cake</option>
          <option value="Jewellery">Jewellery</option>
          <option value="Clothing">Clothing</option>
          <option value="Invitation">Invitation</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Phone + Email */}
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="vendor@example.com"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

      </div>

      {/* Address */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Address
        </label>

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Vendor address"
          rows="3"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Cost */}
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Total Cost *
          </label>

          <input
            type="number"
            name="totalCost"
            value={formData.totalCost}
            onChange={handleChange}
            placeholder="45000"
            min="0"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Advance Paid
          </label>

          <input
            type="number"
            name="advancePaid"
            value={formData.advancePaid}
            onChange={handleChange}
            placeholder="15000"
            min="0"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

      </div>

      {/* Payment Status + Rating */}
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Payment Status
          </label>

          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="Pending">Pending</option>
            <option value="Partial">Partial</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Rating
          </label>

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value={1}>1 / 5</option>
            <option value={2}>2 / 5</option>
            <option value={3}>3 / 5</option>
            <option value={4}>4 / 5</option>
            <option value={5}>5 / 5</option>
          </select>
        </div>

      </div>

      {/* Notes */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Notes
        </label>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes about this vendor"
          rows="4"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white py-3 rounded-lg font-medium transition"
      >
        {loading ? "Saving..." : "Save Vendor"}
      </button>
    </form>
  );
}

export default VendorForm;