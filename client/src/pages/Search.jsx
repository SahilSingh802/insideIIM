import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // The Search page functionality is handled by the Home page's SearchBox.
    // If user navigates directly to /search, redirect to Home.
    navigate('/');
  }, [navigate]);

  return null;
};

export default Search;
