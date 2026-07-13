import React from 'react';
import { TrendingUp, TrendingDown, Building2 } from 'lucide-react';

const RecommendationCard = ({ company, industry, decision, overview }) => {
  const isInvest = decision === 'INVEST';
  
  return (
    <div className="dashboard-card overflow-hidden w-full flex flex-col">
      <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-border bg-surfaceHover/50">
        <div className="flex-shrink-0">
          <div className={`inline-flex items-center justify-center p-4 rounded-xl border ${isInvest ? 'bg-success-500/10 text-success-400 border-success-500/20' : 'bg-danger-500/10 text-danger-400 border-danger-500/20'}`}>
            {isInvest ? <TrendingUp className="w-8 h-8" /> : <TrendingDown className="w-8 h-8" />}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h2 className="text-xs font-bold tracking-widest text-textMuted uppercase">{company}</h2>
            <span className={`badge ${isInvest ? 'badge-success' : 'badge-danger'}`}>Final Recommendation</span>
            {industry && (
              <span className="badge badge-neutral flex items-center gap-1">
                <Building2 className="w-3 h-3" /> {industry}
              </span>
            )}
          </div>
          <div className={`text-4xl font-bold tracking-tighter ${isInvest ? 'text-success-400' : 'text-danger-400'}`}>
            {decision}
          </div>
        </div>
      </div>
      <div className="p-8 bg-surface flex-grow">
        <h3 className="text-xs font-bold text-textMuted uppercase tracking-widest mb-3">Company Overview</h3>
        <p className="text-textMain leading-relaxed font-medium text-lg">
          {overview}
        </p>
      </div>
    </div>
  );
};

export default RecommendationCard;
