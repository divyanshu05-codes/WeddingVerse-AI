import { Link, useParams } from "react-router-dom";

function ExpenseCard({ expense }) {
  const { weddingId } = useParams();

  const amount = Number(expense.amount || 0);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Header */}

      <div className="flex justify-between items-start gap-4">

        <h2 className="text-xl font-bold text-pink-600">
          {expense.title}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            expense.paymentStatus === "Paid"
              ? "bg-green-100 text-green-600"
              : expense.paymentStatus === "Partial"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {expense.paymentStatus}
        </span>

      </div>


      {/* Expense Information */}

      <div className="mt-5 space-y-2 text-gray-600">

        <p>
          <span className="font-semibold text-gray-700">
            Category:
          </span>{" "}
          {expense.category || "Not specified"}
        </p>

        <p>
          <span className="font-semibold text-gray-700">
            Amount:
          </span>{" "}
          ₹{amount.toLocaleString()}
        </p>

        <p>
          <span className="font-semibold text-gray-700">
            Date:
          </span>{" "}
          {expense.expenseDate
            ? new Date(
                expense.expenseDate
              ).toLocaleDateString()
            : "Not specified"}
        </p>

      </div>


      {/* Notes */}

      {expense.notes && (
        <div className="mt-4 bg-gray-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">
            Notes
          </p>

          <p className="text-gray-700 mt-1">
            {expense.notes}
          </p>

        </div>
      )}


      {/* Actions */}

      <div className="flex gap-3 mt-6">

        <Link
          to={`/weddings/${weddingId}/budget/${expense._id}`}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg transition"
        >
          View
        </Link>

        <Link
          to={`/weddings/${weddingId}/budget/${expense._id}/edit`}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-center py-2 rounded-lg transition"
        >
          Edit
        </Link>

      </div>

    </div>
  );
}

export default ExpenseCard;