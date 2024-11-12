import React from 'react';

const CustomerAccountPersonalInfo = () => {
    return (
        <div>
            {/* Navbar Start */}
            <nav>
                <div className="grid grid-cols-12">
                    <div className="col-span-full bg-gray-teal-900 bg-opacity-80 grid grid-cols-12 shadow-xl">
                        {/* Logo & Restaurant Name */}
                        <a href="#" className="m-2 col-span-3 flex justify-start items-center">
                            <img src="/images/logo.png" alt="logo" width={52} height={52} />
                            <span className="uppercase pl-2 text-2xl font-bold text-white font-sansita-one">Baby Hippo</span>
                        </a>
                        {/* Search bar */}
                        <div className="col-span-6 pl-2 flex items-center justify-center hover:scale-105 transfrom transition-transform">
                            <input type="text" placeholder="Search..." size={40} className="bg-gray-200 pl-2 rounded-l-md h-8" />
                            <button className="bg-gray-300 p-1 rounded-r-md h-8 hover:bg-gray-500 transition-colors">
                                <img className='px-4 h-6' src="/images/search_icon.png"></img>
                            </button>
                        </div>
                        {/* Home, Cart & Account */}
                        <div className="col-span-3 flex justify-end items-center">
                            <button type='button' className='icon-button'>
                                <img width={32} height={32} src="/images/home_icon.png"></img>
                            </button>
                            <button type='button' className='icon-button'>
                                <img width={32} height={32} src="/images/cart_icon.png"></img>
                            </button>
                            <button type='button' className='icon-button'>
                                <img width={32} height={32} src="/images/male_avatar.png"></img>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Navbar End */}
            {/* Customer Start */}
            <div className='bg-gray-teal-800 grid grid-cols-12 p-8'>
                <div className="relative flex pt-4 items-center col-span-3">
                    <span className="flex-shrink mr-2 text-gray-400 text-secondary">Account</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <div className="col-span-full flex justify-start text-primary mb-10">Manage your account</div>
                {/* Customer avatar & Options Menu */}
                <div className="col-span-3 flex flex-col items-center bg-slate-400 p-8 shadow-md">
                    <img className="object-cover object-center rounded-full w-32 h-32 mb-2 drop-shadow-lg" src="/images/profiles/keanu.jpg" alt="avatar" />
                    <span className="text-lg font-bold mb-8">John Wick</span>
                    {/* Options */}
                    <div className='flex flex-col justify-start items-start'>
                        <div className="flex flex-col items-center text-slate-800 hover:scale-105 transition-all hover:text-slate-700 hover:underline mb-4">
                            <a className="flex flex-row items-center" href="#">
                                <img className='w-8 h-8 mr-2' src="/images/male_avatar.png"></img>
                                Personal Information
                            </a>
                        </div>
                        <div className="flex flex-col items-center text-slate-800 hover:scale-105 transition-all hover:text-slate-700 hover:underline mb-4">
                            <a className="flex flex-row items-center" href="#">
                                <img className='w-8 h-8 mr-2' src="/images/key_icon.png"></img>
                                Login and Password
                            </a>
                        </div>
                        <div className="flex flex-col items-center text-slate-800 hover:scale-105 transition-all hover:text-slate-700 hover:underline mb-4">
                            <a className="flex flex-row items-center" href="#">
                                <img className='w-8 h-8 mr-2' src="/images/calendar_icon.png"></img>
                                Booking History
                            </a>
                        </div>
                    </div>
                </div>
                {/* Personal Information */}
                <div className="col-span-9 bg-slate-400 p-8 shadow-md ml-8 grid grid-cols-2 gap-4">
                    {/* First Name, Last Name, Phone number, Email & Address */}
                    <div>
                        <span>Full Name</span>
                        <input type="text" className="w-full bg-gray-200 p-2 rounded-md mb-4" placeholder="Your First Name"  defaultValue={"Jardani"} />
                    </div>
                    <div>
                        <span>Last Name</span>
                        <input type="text" className="w-full bg-gray-200 p-2 rounded-md mb-4" placeholder="Your Last Name" defaultValue={"Jovonovich"} />
                    </div>
                    <div>
                        <span>Phone Number</span>
                        <input type="text" className="w-full bg-gray-200 p-2 rounded-md mb-4" placeholder="Your Phone Number" defaultValue={"123-456-7890"} />
                    </div>
                    <div>
                        <span>Email</span>
                        <input type="email" className="w-full bg-gray-200 p-2 rounded-md mb-4" placeholder="Your Email" defaultValue={"babayaga@hightable.org"} />
                    </div>
                    <div>
                        <span>Address</span>
                        <input type="text" className="w-full bg-gray-200 p-2 rounded-md mb-4" placeholder="Your Address" defaultValue={"The Continental, New York"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerAccountPersonalInfo;