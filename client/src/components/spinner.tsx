import React from 'react';

const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-8 border-teal-700 border-t-teal-500"></div>
  </div>
);

export default Spinner;