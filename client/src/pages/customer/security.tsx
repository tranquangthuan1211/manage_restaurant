import React from 'react';
import RootLayout from '../../layouts/customer/layout';
import CustomerSideBar from './sidebar';
import { useUser } from 'src/contexts/users/user-context';

const CustomerSecurity = () => {
    const user = useUser();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <RootLayout>
            <div>
                <CustomerSideBar>
                    {/* Personal Information */}
                    <div className="bg-slate-300 p-8 shadow-lg grid gap-4 animate-fadeIn">
                        {/* Username & Email */}
                        <div>
                            <span>Username</span>
                            <input type="text" className="input-field" placeholder="Your username" defaultValue={user.username} />
                        </div>
                        <div>
                            <span>Email</span>
                            <input type="email" className="input-field" placeholder="Your Email" defaultValue={user.email} />
                        </div>
                        <button className='button-outline-light'>
                            Reset password
                        </button>
                    </div>
                </CustomerSideBar>
            </div>
        </RootLayout>
    );
}

export default CustomerSecurity;