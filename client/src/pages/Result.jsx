import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import LoadingAnimation from '../components/LoadingAnimation';
import RecommendationCard from '../components/RecommendationCard';
import ConfidenceMeter from '../components/ConfidenceMeter';
import ProsConsAnalysis from '../components/ProsConsAnalysis';
import GrowthRiskAnalysis from '../components/GrowthRiskAnalysis';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!query) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/api/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ company: query }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch research data. Please try again.');
        }

        const resultData = await response.json();
        setData(resultData.data);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, navigate]);

  if (!query) return null;

  return (
    <div className="w-full max-w-5xl mx-auto pb-16 animate-in fade-in duration-500">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center text-white mb-2">Researching {query}</h2>
          <p className="text-center text-slate-400 mb-8">Our AI is deploying tools to gather financials and market sentiment...</p>
          <LoadingAnimation />
        </div>
      ) : error ? (
        <div className="glass-panel p-8 text-center border-t-4 border-t-danger-500">
          <AlertCircle className="w-12 h-12 text-danger-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Analysis Failed</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary inline-flex"
          >
            Try Another Company
          </button>
        </div>
      ) : data ? (
        <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <div className="w-full md:w-2/3 flex">
              <RecommendationCard 
                company={query} 
                industry={data.industry}
                decision={data.finalRecommendation} 
                overview={data.companyOverview} 
              />
            </div>
            <div className="w-full md:w-1/3 flex">
              <ConfidenceMeter score={data.confidenceScore} />
            </div>
          </div>

          <ProsConsAnalysis strengths={data.strengths} weaknesses={data.weaknesses} />
          <GrowthRiskAnalysis drivers={data.growthPotential} risks={data.risks} />
        </div>
      ) : null}
    </div>
  );
};

export default Result;
