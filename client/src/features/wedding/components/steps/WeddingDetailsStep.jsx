function WeddingDetailsStep({ formData, handleChange }) {
  return (
    <div className="space-y-5">

      <h2 className="text-2xl font-bold text-pink-600">
        Wedding Details
      </h2>

      <input
        type="date"
        name="weddingDetails.weddingDate"
        value={formData.weddingDetails.weddingDate}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="time"
        name="weddingDetails.weddingTime"
        value={formData.weddingDetails.weddingTime}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        name="weddingDetails.venue"
        placeholder="Venue"
        value={formData.weddingDetails.venue}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        name="weddingDetails.city"
        placeholder="City"
        value={formData.weddingDetails.city}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <textarea
        rows="4"
        name="weddingDetails.address"
        placeholder="Full Address"
        value={formData.weddingDetails.address}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
  type="number"
  name="estimatedBudget"
  placeholder="Estimated Budget"
  value={formData.estimatedBudget}
  onChange={handleChange}
  className="w-full border rounded-lg p-3"
/>
</div>
  );
}

export default WeddingDetailsStep;