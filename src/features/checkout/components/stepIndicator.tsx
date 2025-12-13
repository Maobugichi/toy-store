import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

export const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number
                  ? 'bg-black border-black text-white'
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
            </div>
            <div className="ml-3 hidden sm:block">
              <div
                className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.title}
              </div>
              <div className="text-xs text-gray-500">{step.description}</div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <ChevronRight className="w-5 h-5 text-gray-400 mx-4" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};