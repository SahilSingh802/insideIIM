import React from 'react';
import { Rocket, Shield } from 'lucide-react';

const GrowthAnalysis = ({ competitiveAdvantage, futureGrowth }) => {
  return (
    <div className="glass-panel p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Rocket className="w-6 h-6 text-primary-500" />
        <h2 className="text-2xl font-bold text-white">Growth & Moat</h2>
      </div>
      
      <div className="space-y-6">
        <div className="bg-dark-900/50 p-5 rounded-xl border border-dark-700">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-primary-400" />
            <h4 className="text-white font-bold uppercase tracking-wide text-sm">Competitive Advantage</h4>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{competitiveAdvantage}</p>
        </div>

        <div className="bg-dark-900/50 p-5 rounded-xl border border-dark-700">
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="w-5 h-5 text-primary-400" />
            <h4 className="text-white font-bold uppercase tracking-wide text-sm">Future Growth Catalysts</h4>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{futureGrowth}</p>
        </div>
      </div>
    </div>
  );
};

export default GrowthAnalysis;
