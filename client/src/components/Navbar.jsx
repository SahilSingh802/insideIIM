import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Search, Github } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center gap-2 group">
            <BrainCircuit className="w-5 h-5 text-textMain group-hover:text-primary-400 transition-colors" />
            <span className="font-semibold text-lg tracking-tight text-textMain">
              InvestAI
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/search" className="text-textMuted hover:text-textMain transition-colors hidden sm:flex items-center gap-2 text-sm font-medium">
              <Search className="w-4 h-4" />
              <span>Research</span>
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-textMain transition-colors flex items-center gap-2 text-sm font-medium">
              <Github className="w-4 h-4" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
