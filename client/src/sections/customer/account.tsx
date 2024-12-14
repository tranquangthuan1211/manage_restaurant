import React from 'react';
import RootLayout from 'src/layouts/customer/layout';
import { useUser } from 'src/contexts/users/user-context';

const Account = () => {
  const user = useUser();
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <RootLayout>
      {/* Account Information */}
      <div className="bg-slate-300 shadow-lg p-8 grid grid-cols-2 gap-4 animate-fadeIn border border-solid">
        {/* Full Name, Phone number, Email & Address */}
        <div>
          <span>Full Name</span>
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
        {/* Username, Email & Reset Password Button*/}
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
    </RootLayout>
  );
}

export default Account;