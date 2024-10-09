import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <div className="font-sans grid grid-cols-12">
            <div className="col-span-full bg-gray-950 bg-opacity-80 grid grid-cols-12 text-gray-200">
              <div className="m-2 col-span-9 flex justify-start items-center">
                <Image src="/images/logo.png" alt="logo" width={64} height={64} />

                <span className="uppercase pl-2 text-2xl font-bold">Baby Hippo Restaurant</span>
              </div>
              <Link className="uppercase col-span-1 flex justify-center items-center" href="/">Home</Link>
              <Link className="uppercase col-span-1 flex justify-center items-center" href="/about">About</Link>
              <Link className="uppercase col-span-1 flex justify-center items-center" href="/login">Login</Link>
            </div>

          </div>
        </nav>

        <main>
          <div>
            {children}
          </div>
        </main>

        <footer>
          <div className="bg-gray-950 bg-opacity-80 text-gray-200 grid grid-cols-12  " >
            <div className="col-span-4 flex flex-col justify-center items-center ">
              <Image src="/images/logo.png" alt="logo" width={64} height={64} />
              <span className="uppercase pl-2 text-2xl font-bold">Baby Hippo Restaurant</span>
            </div>

            <div className="col-span-4 ">
              <p>1234, Ho Chi Minh City</p>
              <p>Phone: 0900111222</p>
              <p>Email: babyhippo@gmail.com</p>
            </div>

            <div className="col-span-4">
              <p>
                Social Media Links
                <p><Link href="https://www.facebook.com/"> Facebook </Link> </p>
                <p><Link href="https://www.instagram.com/"> Instagram </Link> </p>
                <p><Link href="https://www.youtube.com/">YouTube </Link> </p>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
