import React from 'react';
import { Building2, Package, LayoutGrid } from 'lucide-react';

const CompanyOverview = ({ name, industry, overview, products }) => {
  return (
    <div className="glass-panel p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="w-6 h-6 text-primary-500" />
        <h2 className="text-2xl font-bold text-white">Company Overview</h2>
      </div>
      
      <div className="mb-6">
        <h3 className="text-3xl font-black text-white tracking-tight mb-2 uppercase">{name}</h3>
        <p className="text-slate-400 leading-relaxed">
          {overview}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 bg-dark-900/50 p-4 rounded-xl border border-dark-700">
          <LayoutGrid className="w-5 h-5 text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Industry</p>
            <p className="text-slate-200 font-medium">{industry}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 bg-dark-900/50 p-4 rounded-xl border border-dark-700">
          <Package className="w-5 h-5 text-slate-400 mt-1" />
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Core Products</p>
            <ul className="text-slate-200 font-medium list-disc list-inside text-sm">
              {products && products.length > 0 ? (
                products.map((p, i) => <li key={i}>{p}</li>)
              ) : (
                <li>Data not available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
