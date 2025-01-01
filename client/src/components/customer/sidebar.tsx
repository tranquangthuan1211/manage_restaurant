import React from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { User } from 'src/types/user';
import { apiGet } from 'src/api/api-requests';
import PageHeader from 'src/components/page-header';

interface CustomerSideBarProps {
  user: User | null;
  children?: React.ReactNode;
}

const CustomerSideBar: React.FC<CustomerSideBarProps> = ({ user, children }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const renderSidebarContent = (user: User | null) => (
    <div className='bg-gray-teal-800'>
      <div className='grid grid-cols-12 px-4 pt-4 pb-16'>
        <div className="col-span-full">
          <PageHeader title="Customer Dashboard" subtitle="Welcome to your customer dashboard" alignment="start" />
        </div>
        {/* Side Bar */}
        <div className="col-span-3 flex flex-col items-center pt-8 pb-10 bg-slate-300 shadow-lg text-olive-green-400 max-h-max rounded-lg">

          {/* Avatar */}
          <div
            className={`w-32 h-32 mb-2 rounded-full ${user ? 'bg-transparent' : 'bg-slate-400' // Gray background for unloaded user
              } flex items-center justify-center`}>
            {user ? (
              <img className="object-cover object-center rounded-full w-32 h-32" src="/images/profiles/keanu.jpg" alt="avatar" />
            ) : (
              null// Placeholder icon or text for when the user isn't loaded
            )}
          </div>

          {/* Username */}
          <span className={`text-lg font-bold mb-4 ${user ? '' : 'bg-slate-400 rounded-xl w-32'}`}>
            {user ? user.username : '\u00A0'} {/* Use a non-breaking space for when there's no user */}
          </span>

          {/* Navigation Links */}
          <div className="w-full">
            <div className={`tab-item ${currentPath === '/customer/personal' ? 'tab-item-active' : ''}`}>
              <Link scroll={false} className="tab-link" href="/customer/personal">
                <img className="tab-icon" src="/images/male_avatar.png" alt="Avatar" />
                Personal Information
              </Link>
            </div>
            <div className={`tab-item ${currentPath === '/customer/security' ? 'tab-item-active' : ''}`}>
              <Link scroll={false} className="tab-link" href="/customer/security">
                <img className="tab-icon" src="/images/key_icon.png" alt="Key Icon" />
                Login and Security
              </Link>
            </div>
            <div className={`tab-item ${currentPath === '/customer/booking-history' ? 'tab-item-active' : ''}`}>
              <Link scroll={false} className="tab-link" href="/customer/booking-history">
                <img className="tab-icon" src="/images/calendar_icon.png" alt="Calendar Icon" />
                Booking History
              </Link>
            </div>
            <div className={`tab-item ${currentPath === '/customer/review-history'  ? 'tab-item-active' : ''}`}>
              <Link scroll={false} className="tab-link" href="/customer/review-history">
                <img className="tab-icon" src="/images/review_icon.png" alt="Review Icon" />
                Review History
              </Link>
            </div>
          </div>
        </div>
        {/* Content */}
        <main className='col-span-9 ml-4 bg-slate-300 p-8 shadow-lg animate-fadeIn rounded-lg'>
          <div>
            {user ? children : <div>Loading...</div>}
          </div>
        </main>
      </div>
    </div>
  );

  return renderSidebarContent(user);
}

export default CustomerSideBar;