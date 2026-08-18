import { useEffect, useState } from "react";

function TaskForm({
  onSubmit,
  loading,
  initialData = null,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other",
    priority: "Medium",
    dueDate: "",
    completed: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description:
          initialData.description || "",
        category:
          initialData.category || "Other",
        priority:
          initialData.priority || "Medium",
        dueDate: initialData.dueDate
          ? initialData.dueDate.slice(0, 10)
          : "",
        completed:
          initialData.completed || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      completed:
        Boolean(formData.completed),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-8 space-y-6"
    >

      {/* Title */}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Task Title *
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Example: Book wedding photographer"
          className="w-full border rounded-lg p-3"
          required
        />
      </div>

      {/* Description */}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add task details..."
          rows="4"
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Category */}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Category
        </label>

<select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="w-full border rounded-lg p-3"
>
  <option value="Venue">Venue</option>
  <option value="Decoration">Decoration</option>
  <option value="Photography">Photography</option>
  <option value="Catering">Catering</option>
  <option value="Guests">Guests</option>
  <option value="Invitation">Invitation</option>
  <option value="Clothing">Clothing</option>
  <option value="Makeup">Makeup</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Transport">Transport</option>
  <option value="Budget">Budget</option>
  <option value="Other">Other</option>
</select>

      </div>

      {/* Priority */}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Priority
        </label>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>
        </select>
      </div>

      {/* Due Date */}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Due Date
        </label>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Completed */}

      {initialData && (
        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                completed:
                  e.target.checked,
              }))
            }
            className="w-5 h-5"
          />

          <span>
            Mark task as completed
          </span>

        </label>
      )}

      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white py-3 rounded-lg font-medium"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Task"
          : "Create Task"}
      </button>

    </form>
  );
}

export default TaskForm;