function ReviewStep({ formData }) {
  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        Review Wedding Details
      </h2>

      <div className="border rounded-lg p-5">

        <h3 className="font-semibold text-pink-600 mb-2">
          Bride
        </h3>

        <p>Name: {formData.bride.fullName}</p>
        <p>Phone: {formData.bride.phone}</p>
        <p>Email: {formData.bride.email}</p>

      </div>

      <div className="border rounded-lg p-5">

        <h3 className="font-semibold text-pink-600 mb-2">
          Groom
        </h3>

        <p>Name: {formData.groom.fullName}</p>
        <p>Phone: {formData.groom.phone}</p>
        <p>Email: {formData.groom.email}</p>

      </div>

      <div className="border rounded-lg p-5">

        <h3 className="font-semibold text-pink-600 mb-2">
          Wedding
        </h3>

        <p>Date: {formData.weddingDetails.weddingDate}</p>
        <p>Time: {formData.weddingDetails.weddingTime}</p>
        <p>Venue: {formData.weddingDetails.venue}</p>
        <p>City: {formData.weddingDetails.city}</p>
        <p>Address: {formData.weddingDetails.address}</p>

      </div>

    </div>
  );
}

export default ReviewStep;