import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  getWeddingById,
  updateWedding,
} from "../services/wedding.api";

import StepIndicator from "../components/StepIndicator";
import BrideStep from "../components/steps/BrideStep";
import GroomStep from "../components/steps/GroomStep";
import WeddingDetailsStep from "../components/steps/WeddingDetailsStep";
import ReviewStep from "../components/steps/ReviewStep";

function EditWedding() {
  const { weddingId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

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

  useEffect(() => {
    fetchWedding();
  }, []);

  const fetchWedding = async () => {
    try {
      const res = await getWeddingById(weddingId);
      setFormData(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load wedding."
      );

      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

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

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleUpdate = async () => {
  try {
    console.log(
      "UPDATING WEDDING:",
      JSON.stringify(formData, null, 2)
    );

    await updateWedding(weddingId, formData);
      toast.success("Wedding Updated Successfully");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update wedding."
      );
    }
  };

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
        return <ReviewStep formData={formData} />;

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center py-20">
          Loading...
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
          Edit Wedding
        </h1>

        <StepIndicator currentStep={currentStep} />

        <div className="mt-10">
          {renderStep()}
        </div>

        <div className="flex justify-between mt-10">

          <button
            onClick={previousStep}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-gray-300 rounded-lg"
          >
            Previous
          </button>

          {currentStep === 3 ? (
            <button
              onClick={handleUpdate}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg"
            >
              Update Wedding
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg"
            >
              Next
            </button>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default EditWedding;