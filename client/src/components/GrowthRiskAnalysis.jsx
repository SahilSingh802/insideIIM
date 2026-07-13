import React from 'react';
import { TrendingUp, AlertOctagon } from 'lucide-react';

const GrowthRiskAnalysis = ({ drivers, risks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Growth Potential Section */}
      <div className="dashboard-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary-500/10 p-2 rounded-lg border border-primary-500/20">
            <TrendingUp className="w-4 h-4 text-primary-400" />
          </div>
          <h2 className="text-sm font-semibold text-textMain tracking-tight">Growth Potential</h2>
        </div>
        <ul className="space-y-3">
          {drivers && drivers.length > 0 ? drivers.map((driver, idx) => (
            <li key={idx} className="flex gap-3 text-textMuted items-start text-sm bg-surfaceHover p-3 rounded-lg border border-border">
              <span className="leading-relaxed">{driver}</span>
            </li>
          )) : (
            <p className="text-textMuted text-sm italic p-3">No clear growth potential identified.</p>
          )}
        </ul>
      </div>

      {/* Risks Section */}
      <div className="dashboard-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-500/10 p-2 rounded-lg border border-orange-500/20">
            <AlertOctagon className="w-4 h-4 text-orange-400" />
          </div>
          <h2 className="text-sm font-semibold text-textMain tracking-tight">Risks</h2>
        </div>
        <ul className="space-y-3">
          {risks && risks.length > 0 ? risks.map((risk, idx) => (
            <li key={idx} className="flex gap-3 text-textMuted items-start text-sm bg-surfaceHover p-3 rounded-lg border border-border">
              <span className="leading-relaxed">{risk}</span>
            </li>
          )) : (
            <p className="text-textMuted text-sm italic p-3">No major risks identified.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default GrowthRiskAnalysis;
