import { useRouter } from 'next/router';
import RootLayout from "src/layouts/customer/layout";
import { useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import CustomerSideBar from 'src/components/customer/sidebar';
import Link from "next/link";
import { User } from 'src/types/user';
import { useUser } from "src/contexts/users/user-context";

const Account = ({ user }: { user: User }) => {
  return (
    <div>
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
        <div className="col-span-full">
          <span>Address</span>
          <input type="text" className="w-full bg-gray-200 p-2 rounded-md mb-4" placeholder="Your Address" defaultValue={user.address} />
        </div>
        {/* Username, Email & Reset Password Button*/}
        <div className="col-span-full">
          <span>Username</span>
          <input type="text" className="input-field" placeholder="Your username" defaultValue={user.username} />
        </div>
        <div>
          <span>Email</span>
          <input type="email" className="input-field" placeholder="Your Email" defaultValue={user.email} />
        </div>
        <button className='col-span-full button-outline-light'>
          Reset password
        </button>
      </div>
    </div>
  );
}

const BookingHistory = ({ user }: { user: User }) => {
  return (
    <div>
      <h1>Booking History</h1>
    </div>
  );
};

const CustomerSection = () => {
  const user = useUser();
  const router = useRouter();
  const [selectedContent, setSelectedContent] = useState<string>('account');
  const params = useParams();

  if (!user || !params || !params.section) {
    return <div>Loading...</div>;
  }

 
  const renderContent = () => {
    switch (selectedContent) {
      case "account":
        return <Account user={user} />;
      case "history":
        return <BookingHistory user={user} />;
      default:
        return <h1>Page Not Found</h1>;
    }
  };

  return (
    <RootLayout>
      {/* Title */}
      <div className="grid grid-cols-12  px-8 pt-4 pb-16">
        <div className="col-span-3 flex items-center">
          <span className="flex-shrink mr-2 text-gray-400 text-secondary">  Account</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div className="col-span-full flex justify-start text-primary mb-4">Manage your account</div>
        {/* Customer Navigation */}
        <div className="col-span-3">
          <div className='container'>
            {/* Customer avatar & Options Menu */}
            <div className="flex flex-col items-center py-4 bg-slate-300 shadow-lg text-olive-green-400 h-min">
              <img className="object-cover object-center rounded-full w-32 h-32 mb-2 drop-shadow-lg" src="/images/profiles/keanu.jpg" alt="avatar" />
              <span className="text-lg font-bold mb-4">John Wick</span>
              {/* Tabs */}
              <div className='w-full'>
                {/* Account Tab */}
                <div className='tab-item'>
                  <Link scroll={false} className="tab-link"
                    href="#"
                    onClick={() => setSelectedContent("account")}>
                    <img className="tab-icon" src="/images/male_avatar.png" alt="Avatar" />
                    Account
                  </Link>
                </div>
                {/* Booking History Tab */}
                <div className='tab-item'>
                  <Link scroll={false} className="tab-link"
                    href="#"
                    onClick={() => setSelectedContent("history")}>
                    <img className="tab-icon" src="/images/calendar_icon.png" alt="Calendar Icon" />
                    Booking History
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className='col-span-9 ml-8'>
          {renderContent()}
        </main>
      </div>
    </RootLayout>
  );
}

export default CustomerSection;
