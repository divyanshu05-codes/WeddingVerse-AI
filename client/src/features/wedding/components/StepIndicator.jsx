function StepIndicator({ currentStep }) {
  const steps = [
    "Bride",
    "Groom",
    "Wedding",
    "Review",
  ];

  return (
    <div className="flex justify-center mb-10">
      {steps.map((step, index) => (
        <div
          key={step}
          className="flex items-center"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
            ${
              currentStep >= index
                ? "bg-pink-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {index + 1}
          </div>

          <span className="mx-3 font-medium">
            {step}
          </span>

          {index !== steps.length - 1 && (
            <div className="w-16 h-1 bg-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default StepIndicator;