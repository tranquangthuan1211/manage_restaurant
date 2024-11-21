import React from 'react';
import RootLayout from '../../layouts/customer/layout';
import CustomerSideBar from './sidebar';

const CustomerPersonalInfo = () => {
    return (
        <RootLayout>
        <div>
            <CustomerSideBar>
                {/* Personal Information */}
                <div className="bg-slate-300 shadow-lg p-8 grid grid-cols-2 gap-4 animate-fadeIn border border-solid">
                    {/* First Name, Last Name, Phone number, Email & Address */}
                    <div>
                        <span>Full Name</span>
                        <input type="text" className="input-field" placeholder="Your First Name"  defaultValue={"Jardani"} />
                    </div>
                    <div>
                        <span>Last Name</span>
                        <input type="text" className="input-field" placeholder="Your Last Name" defaultValue={"Jovonovich"} />
                    </div>
                    <div>
                        <span>Phone Number</span>
                        <input type="text" className="input-field" placeholder="Your Phone Number" defaultValue={"123-456-7890"} />
                    </div>
                    <div>
                        <span>Address</span>
                        <input type="text" className="w-full bg-gray-200 p-2 rounded-md mb-4" placeholder="Your Address" defaultValue={"The Continental, New York"} />
                    </div>
                </div>
            </CustomerSideBar>
        </div>
        </RootLayout>
    )
}

export default CustomerPersonalInfo;