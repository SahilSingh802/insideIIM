import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import { Sparkles, BarChart2, Shield } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate('/result', { state: { query } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="badge badge-neutral mb-8">
        <Sparkles className="w-3 h-3 text-primary-400" />
        Powered by Gemini 1.5 Pro
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-6 tracking-tighter">
        Institutional-Grade <br /> Research, Instantly.
      </h1>
      
      <p className="text-lg text-textMuted mb-12 max-w-2xl leading-relaxed">
        Input any public company to run a deep, un-biased analysis. We scan live financials, news, and market sentiment to deliver a definitive INVEST or PASS recommendation.
      </p>

      <div className="w-full relative z-10 mb-20">
        <SearchBox onSearch={handleSearch} isLoading={false} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full mt-8">
        <div className="dashboard-card p-6">
          <div className="bg-surfaceHover w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-border">
            <BarChart2 className="w-5 h-5 text-textMain" />
          </div>
          <h3 className="font-semibold text-textMain mb-2 tracking-tight">Quantitative Moat</h3>
          <p className="text-textMuted text-sm leading-relaxed">Extracts hard revenue data and competitive advantages without the fluff.</p>
        </div>
        <div className="dashboard-card p-6">
          <div className="bg-surfaceHover w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-border">
            <Shield className="w-5 h-5 text-textMain" />
          </div>
          <h3 className="font-semibold text-textMain mb-2 tracking-tight">Risk Mitigation</h3>
          <p className="text-textMuted text-sm leading-relaxed">Identifies macroeconomic threats and regulatory hurdles instantly.</p>
        </div>
        <div className="dashboard-card p-6">
          <div className="bg-surfaceHover w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-border">
            <Sparkles className="w-5 h-5 text-textMain" />
          </div>
          <h3 className="font-semibold text-textMain mb-2 tracking-tight">Binary Decisions</h3>
          <p className="text-textMuted text-sm leading-relaxed">No generic "it depends" answers. Get a strict INVEST or PASS verdict.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
