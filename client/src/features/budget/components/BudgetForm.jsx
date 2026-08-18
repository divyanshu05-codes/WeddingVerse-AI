import { useEffect, useState } from "react";

function BudgetForm({
  onSubmit,
  loading,
  initialData = null,
  buttonText = "Save Expense",
}) {
  const [formData, setFormData] = useState({
    category: "Venue",
    title: "",
    amount: "",
    expenseDate: "",
    paymentStatus: "Pending",
    notes: "",
  });

  // -----------------------------
  // Load Existing Expense
  // -----------------------------

  useEffect(() => {
    if (initialData) {
      setFormData({
        category:
          initialData.category || "Venue",

        title:
          initialData.title || "",

        amount:
          initialData.amount ?? "",

        expenseDate:
          initialData.expenseDate
            ? initialData.expenseDate.slice(0, 10)
            : "",

        paymentStatus:
          initialData.paymentStatus || "Pending",

        notes:
          initialData.notes || "",
      });
    }
  }, [initialData]);

  // -----------------------------
  // Handle Change
  // -----------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  // -----------------------------
  // Submit
  // -----------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-8 space-y-6"
    >

      {/* Category */}

      <div>

        <label className="block font-semibold mb-2">
          Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="Venue">
            Venue
          </option>

          <option value="Decoration">
            Decoration
          </option>

          <option value="Photography">
            Photography
          </option>

          <option value="Catering">
            Catering
          </option>

          <option value="Entertainment">
            Entertainment
          </option>

          <option value="Transport">
            Transport
          </option>

          <option value="Makeup">
            Makeup
          </option>

          <option value="Invitation">
            Invitation
          </option>

          <option value="Clothing">
            Clothing
          </option>

          <option value="Jewellery">
            Jewellery
          </option>

          <option value="Miscellaneous">
            Miscellaneous
          </option>
        </select>

      </div>


      {/* Expense Title */}

      <div>

        <label className="block font-semibold mb-2">
          Expense Title
        </label>

        <input
          type="text"
          name="title"
          placeholder="Enter expense title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

      </div>


      {/* Amount */}

      <div>

        <label className="block font-semibold mb-2">
          Amount
        </label>

        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={handleChange}
          min="0"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

      </div>


      {/* Expense Date */}

      <div>

        <label className="block font-semibold mb-2">
          Expense Date
        </label>

        <input
          type="date"
          name="expenseDate"
          value={formData.expenseDate}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

      </div>


      {/* Payment Status */}

      <div>

        <label className="block font-semibold mb-2">
          Payment Status
        </label>

        <select
          name="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="Pending">
            Pending
          </option>

          <option value="Partial">
            Partial
          </option>

          <option value="Paid">
            Paid
          </option>
        </select>

      </div>


      {/* Notes */}

      <div>

        <label className="block font-semibold mb-2">
          Notes
        </label>

        <textarea
          name="notes"
          placeholder="Add notes about this expense"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

      </div>


      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? "Saving..."
          : buttonText}
      </button>

    </form>
  );
}

export default BudgetForm;