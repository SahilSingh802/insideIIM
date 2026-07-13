import React from 'react';

const ConfidenceMeter = ({ score }) => {
  return (
    <div className="dashboard-card p-6 h-full flex flex-col justify-center">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-sm font-semibold text-textMuted tracking-tight">AI Confidence</h3>
        <span className="text-2xl font-bold text-textMain tracking-tighter">{score}%</span>
      </div>
      <div className="w-full bg-border rounded-full h-2 overflow-hidden mb-4">
        <div 
          className="h-2 rounded-full bg-textMain transition-all duration-1000 ease-out"
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-xs text-textMuted leading-relaxed">
        Based on data availability, source consensus, and metric extraction.
      </p>
    </div>
  );
};

export default ConfidenceMeter;
