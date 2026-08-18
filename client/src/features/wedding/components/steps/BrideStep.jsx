function BrideStep({ formData, handleChange }) {
  return (
    <div className="space-y-5">

      <h2 className="text-2xl font-bold mb-5">
        Bride Information
      </h2>

      <input
        type="text"
        name="bride.fullName"
        placeholder="Bride Full Name"
        value={formData.bride.fullName}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        name="bride.phone"
        placeholder="Phone Number"
        value={formData.bride.phone}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="email"
        name="bride.email"
        placeholder="Email"
        value={formData.bride.email}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

    </div>
  );
}

export default BrideStep;