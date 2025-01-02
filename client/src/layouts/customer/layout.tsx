//import Video from "@/component/videos/Video";
// import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AuthGuard } from "src/guards/auth-guard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav className="bg-gray-teal-900 bg-opacity-80 shadow-xl">
        <div className="max-w-screen-xl mx-auto grid grid-cols-12 items-center gap-4 p-2">
          {/* Logo & Restaurant Name */}
          <a
            href="#"
            className="col-span-6 md:col-span-4 flex items-center text-white space-x-2 md:space-x-4"
          >
            <img src="/images/logo.png" alt="logo" className="w-9 h-9" />
            <span className="uppercase text-2xl font-bold font-sansita-one">
              Baby Hippo
            </span>
          </a>

          {/* Hamburger Icon */}
          <button
            className="col-span-6 md:hidden text-white justify-self-end button-icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img
              className="h-6"
              src="/images/menu_hamburger.png"
              alt="menu_hamburger"
            />
          </button>

          {/* Search Bar & Navbar Links */}
          <div
            className={`col-span-full md:col-span-8 grid grid-cols-12 items-center gap-4 
                  transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? "max-h-96" : "max-h-0"
              } md:max-h-none`}
          >
            {/* Search Bar */}
            <div className="col-span-12 md:col-span-6 flex items-center order-last md:order-none">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-200 pl-2 rounded-l-md h-8 w-full"
              />
              <button className="bg-gray-300 h-8 w-8 flex items-center justify-center rounded-r-md hover:bg-gray-500 transition-colors">
                <img
                  className="h-4 w-4"
                  src="/images/search_icon.png"
                  alt="search"
                />
              </button>
            </div>

            {/* Navbar Links */}
            <div className="col-span-full md:col-span-6 grid grid-cols-12 md:grid-cols-6 text-center md:text-right">
              {/* <a href="/" className="text-white py-2 px-4 hover:underline col-span-full md:col-span-2">
                Home
              </a> */}
              <a href="/menu" className="text-white py-2 px-4 hover:underline col-span-full md:col-span-2">
                Menu
              </a>
              <a
                href="/customer/personal"
                className="text-white py-2 px-4 hover:underline col-span-full md:col-span-2"
              >
                Account
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div>{children}</div>
      </main>

      {/* Footer Start */}
      <footer>
        <div className="bg-gray-teal-900 bg-opacity-80 text-gray-200 grid grid-cols-12 py-4 gap-4 md:gap-6">
          {/* Logo Section */}
          <div className="col-span-12 md:col-span-4 flex flex-col justify-center items-center">
            <Image src="/images/logo.png" alt="logo" width={64} height={64} />
            <span className="uppercase pl-2 text-2xl font-bold text-center">
              Baby Hippo Restaurant
            </span>
          </div>

          {/* Address Section */}
          <div className="col-span-12 md:col-span-2 text-center md:text-left">
            <p className="font-bold">Address</p>
            <p>1234, Ho Chi Minh City</p>
            <p>Phone: 0900111222</p>
            <p>Email: babyhippo@gmail.com</p>
          </div>

          {/* Open Hours Section */}
          <div className="col-span-12 md:col-span-3 text-center md:text-left">
            <p className="font-bold">Open Hours</p>
            <p>Mon - Fri: 8:00 AM - 9:00 PM</p>
            <p>Sat - Sun: 8:00 AM - 10:00 PM</p>
          </div>

          {/* Social Media Links */}
          <div className="col-span-12 md:col-span-3 text-center md:text-left">
            <p className="font-bold">Social Media Links</p>
            <div className="flex justify-center md:justify-start items-center space-x-2">
              <Image src="/images/fb.png" alt="Facebook" width={32} height={32} />
              <Link href="https://www.facebook.com/" className="hover:underline">
                Facebook
              </Link>
            </div>
            <div className="flex justify-center md:justify-start items-center space-x-2 mt-2">
              <Image src="/images/Instagram.png" alt="Instagram" width={32} height={32} />
              <Link href="https://www.instagram.com/" className="hover:underline">
                Instagram
              </Link>
            </div>
            <div className="flex justify-center md:justify-start items-center space-x-2 mt-2">
              <Image src="/images/youtube.png" alt="YouTube" width={32} height={32} />
              <Link href="https://www.youtube.com/" className="hover:underline">
                YouTube
              </Link>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer End */}

    </div>

  );
}
