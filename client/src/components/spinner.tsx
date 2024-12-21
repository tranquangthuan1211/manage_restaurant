import React from 'react';

const Spinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-8 border-teal-700 border-t-teal-500"></div>
  </div>
);

export default Spinner;