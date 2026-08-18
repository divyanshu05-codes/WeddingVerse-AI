import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import StepIndicator from "../components/StepIndicator";

import BrideStep from "../components/steps/BrideStep";
import GroomStep from "../components/steps/GroomStep";
import WeddingDetailsStep from "../components/steps/WeddingDetailsStep";
import ReviewStep from "../components/steps/ReviewStep";

import { createWedding } from "../services/wedding.api";

function CreateWedding() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bride: {
      fullName: "",
      phone: "",
      email: "",
    },

    groom: {
      fullName: "",
      phone: "",
      email: "",
    },

    weddingDetails: {
      weddingDate: "",
      weddingTime: "",
      venue: "",
      city: "",
      address: "",
    },

    estimatedBudget: 0,
    status: "Planning",
    notes: "",
    coverImage: "",
  });

const handleChange = (e) => {
  const { name, value } = e.target;

  // Handle Number Fields
  if (name === "estimatedBudget") {
    setFormData((prev) => ({
      ...prev,
      estimatedBudget: Number(value),
    }));
    return;
  }

  const keys = name.split(".");

  if (keys.length === 2) {
    setFormData((prev) => ({
      ...prev,
      [keys[0]]: {
        ...prev[keys[0]],
        [keys[1]]: value,
      },
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const validateStep = () => {
  switch (currentStep) {
    case 0:
      if (!formData.bride.fullName.trim()) {
        toast.error("Bride name is required.");
        return false;
      }

      if (!formData.bride.phone.trim()) {
        toast.error("Bride phone is required.");
        return false;
      }

      return true;

    case 1:
      if (!formData.groom.fullName.trim()) {
        toast.error("Groom name is required.");
        return false;
      }

      if (!formData.groom.phone.trim()) {
        toast.error("Groom phone is required.");
        return false;
      }

      return true;

    case 2:
      if (!formData.weddingDetails.weddingDate) {
        toast.error("Wedding date is required.");
        return false;
      }

      if (!formData.weddingDetails.weddingTime) {
        toast.error("Wedding time is required.");
        return false;
      }

      if (!formData.weddingDetails.venue.trim()) {
        toast.error("Venue is required.");
        return false;
      }

      if (!formData.weddingDetails.city.trim()) {
        toast.error("City is required.");
        return false;
      }

      if (!formData.weddingDetails.address.trim()) {
        toast.error("Address is required.");
        return false;
      }

      return true;

    default:
      return true;
  }
};

const nextStep = () => {
  if (!validateStep()) return;

  if (currentStep < 3) {
    setCurrentStep((prev) => prev + 1);
  }
};

  // Previous Step
  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Submit Wedding
const handleSubmit = async () => {
  try {
    setLoading(true);

    console.log("Sending Data:", formData);

    await createWedding(formData);

    toast.success("Wedding Created Successfully 🎉");

    navigate("/dashboard");
  } catch (error) {
    console.log(error.response?.data);

    toast.error(
      error.response?.data?.message ||
      "Failed to create wedding."
    );
  } finally {
    setLoading(false);
  }
};

  // Render Current Step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BrideStep
            formData={formData}
            handleChange={handleChange}
          />
        );

      case 1:
        return (
          <GroomStep
            formData={formData}
            handleChange={handleChange}
          />
        );

      case 2:
        return (
          <WeddingDetailsStep
            formData={formData}
            handleChange={handleChange}
          />
        );

      case 3:
        return (
          <ReviewStep
            formData={formData}
          />
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
          Create Wedding
        </h1>

        <StepIndicator currentStep={currentStep} />

        <div className="mt-10">
          {renderStep()}
        </div>

        <div className="flex justify-between mt-10">

          <button
            onClick={previousStep}
            disabled={currentStep === 0 || loading}
            className="px-6 py-3 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={
              currentStep === 3
                ? handleSubmit
                : nextStep
            }
            disabled={loading}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : currentStep === 3
              ? "Create Wedding"
              : "Next"}
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default CreateWedding;