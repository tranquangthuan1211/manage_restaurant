import React from 'react';
import RootLayout from '../../layouts/customer/layout';
import CustomerSideBar from './sidebar';

const CustomerSecurity = () => {
    return (
        <RootLayout>
        <div>
            <CustomerSideBar>
                {/* Personal Information */}
                <div className="bg-slate-300  p-8 shadow-lg  grid gap-4 animate-fadeIn">
                    {/* First Name, Last Name, Phone number, Email & Address */}
                    <div>
                        <span>Username</span>
                        <input type="text" className="input-field" placeholder="Your username"  defaultValue={"John Wick"} />
                    </div>
                    <div>
                        <span>Email</span>
                        <input type="email" className="input-field" placeholder="Your Email" defaultValue={"babayaga@hightable.org"} />
                    </div>
                    <button className='button-outline-light'>
                        Reset password
                    </button>
                </div>
            </CustomerSideBar>
        </div>
        </RootLayout>
    )
}

export default CustomerSecurity;