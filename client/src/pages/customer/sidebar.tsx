import React from 'react';
import Link from 'next/link';

import { useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import { User } from 'src/types/user';
import { apiGet } from 'src/api/api-requests';

interface CustomerSideBarProps {
  user: User | null;
  children?: React.ReactNode;
}

const CustomerSideBar: React.FC<CustomerSideBarProps> = ({ user, children }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const renderSidebarContent = (user: User | null) => (
    <div className='min-h-[1000px] bg-gray-teal-800'>
      <div className='grid grid-cols-12 px-8 pt-4 pb-16'>
        <div className="flex items-center col-span-3">
          <span className="flex-shrink mr-2 text-gray-400 text-secondary">Account</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div className="col-span-full flex justify-start text-primary mb-4">Manage your account</div>
        <div className="col-span-3 flex flex-col items-center py-4 bg-slate-300 shadow-lg text-olive-green-400 h-min">
          <img className="object-cover object-center rounded-full w-32 h-32 mb-2 drop-shadow-lg" src={user ? "/images/profiles/keanu.jpg" : ""} alt="avatar" />
          <span className="text-lg font-bold mb-4">{user ? user.username : "Guest"}</span>
          <div className='w-full'>
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
            <div className={`tab-item ${currentPath === '/customer/booking_history' ? 'tab-item-active' : ''}`}>
              <Link scroll={false} className="tab-link" href="/customer/booking_history">
                <img className="tab-icon" src="/images/calendar_icon.png" alt="Calendar Icon" />
                Booking History
              </Link>
            </div>
          </div>
        </div>
        <main className='col-span-9 ml-8'>
          <div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );

  return renderSidebarContent(user);
}

export default CustomerSideBar;