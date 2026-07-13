import React from 'react';
import { DollarSign } from 'lucide-react';

const FinancialHighlights = ({ revenueGrowth }) => {
  return (
    <div className="glass-panel p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-6 h-6 text-success-500" />
        <h2 className="text-2xl font-bold text-white">Financial Highlights</h2>
      </div>
      
      <div className="bg-dark-900/50 p-5 rounded-xl border border-dark-700 flex flex-col justify-between">
        <p className="text-sm text-slate-400 mb-2 uppercase tracking-wider font-semibold">Revenue Growth</p>
        <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-white">{revenueGrowth}</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialHighlights;
