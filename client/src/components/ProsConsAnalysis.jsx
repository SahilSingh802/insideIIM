import React from 'react';
import { Plus, Minus } from 'lucide-react';

const ProsConsAnalysis = ({ strengths, weaknesses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Strengths Section */}
      <div className="dashboard-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-success-500/10 p-2 rounded-lg border border-success-500/20">
            <Plus className="w-4 h-4 text-success-400" />
          </div>
          <h2 className="text-sm font-semibold text-textMain tracking-tight">Strengths</h2>
        </div>
        <ul className="space-y-3">
          {strengths && strengths.length > 0 ? strengths.map((strength, idx) => (
            <li key={idx} className="flex gap-3 text-textMuted items-start text-sm bg-surfaceHover p-3 rounded-lg border border-border">
              <span className="leading-relaxed">{strength}</span>
            </li>
          )) : (
            <p className="text-textMuted text-sm italic p-3">No significant strengths found.</p>
          )}
        </ul>
      </div>

      {/* Weaknesses Section */}
      <div className="dashboard-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-danger-500/10 p-2 rounded-lg border border-danger-500/20">
            <Minus className="w-4 h-4 text-danger-400" />
          </div>
          <h2 className="text-sm font-semibold text-textMain tracking-tight">Weaknesses</h2>
        </div>
        <ul className="space-y-3">
          {weaknesses && weaknesses.length > 0 ? weaknesses.map((weakness, idx) => (
            <li key={idx} className="flex gap-3 text-textMuted items-start text-sm bg-surfaceHover p-3 rounded-lg border border-border">
              <span className="leading-relaxed">{weakness}</span>
            </li>
          )) : (
            <p className="text-textMuted text-sm italic p-3">No significant weaknesses found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProsConsAnalysis;
