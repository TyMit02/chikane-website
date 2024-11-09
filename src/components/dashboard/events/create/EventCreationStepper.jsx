import React from 'react';
import { Check } from 'lucide-react';
import { eventCreationSteps } from './eventCreationSteps';

// Utility function for combining classnames
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const EventCreationStepper = ({ currentStep, completedSteps, onStepClick }) => {
  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="min-w-full px-4">
        <nav aria-label="Progress" className="relative">
          <ol className="flex items-center">
            {eventCreationSteps.map((step, index) => {
              const isComplete = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              
              return (
                <li key={step.id} className="relative flex items-center">
                  <button
                    onClick={() => onStepClick(step.id)}
                    disabled={!isComplete && !isCurrent}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                      "transition-colors duration-200",
                      isCurrent && "text-blue-600",
                      isComplete && "text-green-600",
                      (!isComplete && !isCurrent) && "text-gray-500",
                      (!isComplete && !isCurrent) && "cursor-not-allowed opacity-60"
                    )}
                  >
                    <span className="flex items-center">
                      <span
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full",
                          "transition-colors duration-200",
                          isComplete && "bg-green-100",
                          isCurrent && "bg-blue-100",
                          (!isComplete && !isCurrent) && "bg-gray-100"
                        )}
                      >
                        {isComplete ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <span
                            className={cn(
                              "text-sm font-medium",
                              isCurrent && "text-blue-600",
                              (!isComplete && !isCurrent) && "text-gray-500"
                            )}
                          >
                            {index + 1}
                          </span>
                        )}
                      </span>
                      <span className="ml-3 whitespace-nowrap">{step.title}</span>
                    </span>
                  </button>

                  {index !== eventCreationSteps.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 left-full mx-4">
                      <div
                        className={cn(
                          "h-0.5 w-8",
                          isComplete ? "bg-green-600" : "bg-gray-200"
                        )}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default EventCreationStepper;