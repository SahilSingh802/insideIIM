import React, { useState, useEffect } from 'react';
import { Loader2, Search, Brain, FileText, Activity } from 'lucide-react';

const LoadingAnimation = () => {
  const steps = [
    { icon: Search, text: "Scanning live market data..." },
    { icon: FileText, text: "Extracting financial fundamentals..." },
    { icon: Activity, text: "Analyzing risk factors..." },
    { icon: Brain, text: "Synthesizing final thesis..." }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center p-12 dashboard-card w-full max-w-2xl mx-auto mt-12">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-textMain/20 rounded-full blur-2xl animate-pulse-slow"></div>
        <Loader2 className="w-12 h-12 text-textMain animate-spin relative z-10" />
      </div>
      
      <div className="h-6 flex items-center justify-center overflow-hidden">
        <div 
          className="flex flex-col items-center transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(-${currentStep * 24}px)` }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="h-6 flex items-center gap-3 text-textMuted">
                <Icon className="w-4 h-4" />
                <span className="font-medium text-sm tracking-tight">{step.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
