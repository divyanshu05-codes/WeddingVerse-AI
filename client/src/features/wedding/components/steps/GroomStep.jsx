function GroomStep({ formData, handleChange }) {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold mb-5">
        Groom Information
      </h2>

      <input
        type="text"
        name="groom.fullName"
        placeholder="Groom Full Name"
        value={formData.groom.fullName}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        name="groom.phone"
        placeholder="Phone Number"
        value={formData.groom.phone}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="email"
        name="groom.email"
        placeholder="Email"
        value={formData.groom.email}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />
    </div>
  );
}

export default GroomStep;