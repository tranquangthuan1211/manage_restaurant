import React, { createContext, useEffect, useContext, useState } from 'react';

// Create a Context for loading state
const LoadingContext = createContext({
  isLoading: true,
  setLoading: (loading: boolean) => {},
});

// Provider component
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use loading state
export const useLoading = () => useContext(LoadingContext);
