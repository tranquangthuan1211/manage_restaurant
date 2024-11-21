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
        <main>
          <div>
            {children}
          </div>
        </main>

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
  </div>
  );
}
