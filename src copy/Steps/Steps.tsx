import React from "react";

export type Step = {
  label: string;
};

export type T_Steps = {
  steps: Step[];
  currentStepIndex: number;
};

const Steps: React.FC<T_Steps> = ({ steps, currentStepIndex }) => {
  return (
    <div className="w-full px-4 mb-8">
      {/* Row 1: Circles and connectors */}
<div className="flex items-center justify-center w-full">
  {steps.map((_, index) => {
    const isCurrent = index === currentStepIndex;
    const isCompleted = index < currentStepIndex;
    const isActive = isCompleted || isCurrent;
    const isLast = index === steps.length - 1;

    return (
      <React.Fragment key={index}>
        {/* Step circle only */}
        <div className="flex-1 flex justify-center relative min-w-[48px]">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all
              ${isActive
                ? "bg-indigo-500 text-white border-indigo-500"
                : "bg-gray-800 text-white border-gray-700"
              }`}
          >
            {isCompleted ? "✓" : index + 1}
          </div>
        </div>

        {/* Connector to next step */}
        {!isLast && (
          <div className="flex-1 h-1 mx-2 relative top-1/2 -translate-y-1/2">
            <div
              className={`h-1 w-full rounded-full transition-all duration-300 ${
                currentStepIndex > index
                  ? "bg-indigo-500"
                  : "bg-gray-300"
              }`}
            />
          </div>
        )}
      </React.Fragment>
    );
  })}
</div>


      {/* Row 2: Labels only */}
      <div className="flex justify-center w-full mt-2">
        {steps.map((step, index) => {
          const isCurrent = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          const isActive = isCompleted || isCurrent;

          return (
            <div
              key={index}
              className="flex-1 text-center min-w-[48px] text-sm"
            >
              <span
                className={`${
                  isActive ? "text-black" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Steps;
