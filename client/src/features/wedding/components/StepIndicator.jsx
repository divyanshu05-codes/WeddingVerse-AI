import { Check, Heart, User, Calendar, FileText } from "lucide-react";

function StepIndicator({ currentStep }) {
  const steps = [
    { title: "Bride Details", icon: Heart },
    { title: "Groom Details", icon: User },
    { title: "Event & Venue", icon: Calendar },
    { title: "Review & Create", icon: FileText },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-10 px-4">
      <div className="flex items-center justify-between relative">
        {/* Background connector line */}
        <div className="absolute left-6 right-6 top-5 h-0.5 bg-slate-200 -z-0" />
        
        {/* Active progress connector line */}
        <div
          className="absolute left-6 top-5 h-0.5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 -z-0 transition-all duration-500"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > index;
          const isCurrent = currentStep === index;

          return (
            <div key={step.title} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md ${
                  isCompleted
                    ? "bg-emerald-500 text-white shadow-emerald-500/20 scale-100"
                    : isCurrent
                    ? "bg-gradient-to-tr from-rose-600 to-purple-600 text-white shadow-rose-500/30 scale-110 ring-4 ring-rose-100"
                    : "bg-white border-2 border-slate-200 text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <Check size={18} strokeWidth={3} />
                ) : (
                  <Icon size={18} />
                )}
              </div>

              <span
                className={`mt-2 text-xs font-bold transition-colors text-center hidden sm:block ${
                  isCurrent
                    ? "text-rose-600"
                    : isCompleted
                    ? "text-slate-700"
                    : "text-slate-400"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StepIndicator;