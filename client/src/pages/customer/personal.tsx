import React from 'react';
import RootLayout from '../../layouts/customer/layout';
import CustomerSideBar from './sidebar';
import { useState, useEffect } from 'react';
import { apiGet } from 'src/api/api-requests';
import { User } from 'src/types/user';
import { useUser } from 'src/contexts/users/user-context';


const CustomerPersonalInfo = () => {
    const user = useUser();
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <RootLayout>
            <div>
                <CustomerSideBar>
                    {/* Personal Information */}
                    <div className="bg-slate-300 shadow-lg p-8 grid grid-cols-2 gap-4 animate-fadeIn border border-solid">
                        {/* First Name, Last Name, Phone number, Email & Address */}
                        <div>
                            <span>Your Name</span>
                            <input type="text" className="input-field" placeholder="Your Name" defaultValue={user.username} />
                        </div>
                        <div>
                            <span>Phone Number</span>
                            <input type="text" className="input-field" placeholder="Your Phone Number" defaultValue={user.phone} />
                        </div>
                        <div>
                            <span>Address</span>
                            <input type="text" className="w-full bg-gray-200 p-2 rounded-md mb-4" placeholder="Your Address" defaultValue={user.address} />
                        </div>
                    </div>
                </CustomerSideBar>
            </div>
        </RootLayout>
    )
}

export default CustomerPersonalInfo;