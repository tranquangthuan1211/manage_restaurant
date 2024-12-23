//import Video from "@/component/videos/Video";
// import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
              <button type='button' className='button-icon'>
                <a href="/"> {/* Thay đổi từ thành href="/customer" to href="/" to go to the home page */}
                  <img width={32} height={32} src="/images/home_icon.png"></img>
                </a>
              </button>
              <button type='button' className='button-icon'>
                <a href="/customer/cart">
                  <img width={32} height={32} src="/images/cart_icon.png"></img>
                </a>
              </button>
              <button type='button' className='button-icon'>
                <a href="/customer/personal">
                  <img width={32} height={32} src="/images/male_avatar.png"></img>
                </a>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Navbar End */}

      <main>
        <div>
          {children}
        </div>
      </main>

      {/* Footer Start */}
      <footer>
        <div className="bg-gray-teal-900 bg-opacity-80 text-gray-200 grid grid-cols-12 py-4" >
          <div className="col-span-4 flex flex-col justify-center items-center ">
            <Image src="/images/logo.png" alt="logo" width={64} height={64} />
            <span className="uppercase pl-2 text-2xl font-bold">Baby Hippo Restaurant</span>
          </div>

          <div className="col-span-2">
            <p>1234, Ho Chi Minh City</p>
            <p>Phone: 0900111222</p>
            <p>Email: babyhippo@gmail.com</p>
          </div>

          <div className="col-span-3">
            <p>Open Hours</p>
            <p>Mon - Fri: 8:00 AM - 9:00 PM</p>
            <p>Sat - Sun: 8:00 AM - 10:00 PM</p>
          </div>

          <div className="col-span-3">

            Social Media Links
            <div className="flex items-center">
              <Image src="/images/fb.png" alt="Ins" width={32} height={32} />
              <Link className="pl-1" href="https://www.facebook.com/">
                Facebook </Link>
            </div>

            <div className=" flex items-center">
              <Image src="/images/Instagram.png" alt="Ins" width={32} height={32} />
              <Link className="pl-1" href="https://www.instagram.com/"> Instagram </Link>
            </div>

            <div className="flex items-center">
              <Image src="/images/youtube.png" alt="YT" width={32} height={32} />
              <Link className="pl-1" href="https://www.youtube.com/">YouTube </Link>
            </div>

          </div>

        </div>
      </footer>
      {/* Footer End */}
    </div>
  );
}
