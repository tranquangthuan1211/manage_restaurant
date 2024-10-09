import React from 'react';
export default function AuthLayout({ children }: {
    readonly children: React.ReactNode;
  }) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900
      bg-[url('/images/login_bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative">
          {children}
        </div>
      </div>
    );
  }