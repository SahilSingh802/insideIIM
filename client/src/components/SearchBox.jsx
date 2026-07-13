import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, ArrowRight, Clock } from 'lucide-react';

const SearchBox = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  // Load search history on mount
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('recent_searches') || '[]');
    setRecentSearches(history);
  }, []);

  const saveSearch = (searchTerm) => {
    const history = JSON.parse(localStorage.getItem('recent_searches') || '[]');
    // Remove if it exists to bring it to the front
    const filtered = history.filter(item => item.toLowerCase() !== searchTerm.toLowerCase());
    const newHistory = [searchTerm, ...filtered].slice(0, 5); // Keep top 5
    
    localStorage.setItem('recent_searches', JSON.stringify(newHistory));
    setRecentSearches(newHistory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed && !isLoading) {
      saveSearch(trimmed);
      onSearch(trimmed);
    }
  };

  const handleRecentClick = (searchTerm) => {
    if (!isLoading) {
      setQuery(searchTerm);
      saveSearch(searchTerm);
      onSearch(searchTerm);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group flex items-center gap-2 w-full mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-textMuted group-focus-within:text-textMain transition-colors" />
          </div>
          <input
            type="text"
            className="input-field pl-10 pr-4 shadow-sm"
            placeholder="Enter ticker or company name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="btn-primary"
        >
          <span>Analyze</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </form>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="flex items-center gap-3 text-sm animate-in fade-in duration-500">
          <span className="text-textMuted flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4" /> Recent:
          </span>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleRecentClick(search)}
                disabled={isLoading}
                className="badge badge-neutral hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
