import React from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';

const RiskAnalysis = ({ risks }) => {
  return (
    <div className="glass-panel p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-white">Risk Factors</h2>
      </div>
      
      <div className="space-y-4">
        {risks && risks.length > 0 ? (
          risks.map((risk, index) => (
            <div key={index} className="flex gap-4 items-start bg-dark-900/50 p-4 rounded-xl border border-dark-700">
              <AlertCircle className="w-5 h-5 text-yellow-500/70 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-300 leading-relaxed">{risk}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-400 italic">No major risks identified in recent analysis.</p>
        )}
      </div>
    </div>
  );
};

export default RiskAnalysis;
