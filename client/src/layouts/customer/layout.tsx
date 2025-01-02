import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (searchQuery.trim()) {
      const url = `/menu?nameFilter=${encodeURIComponent(searchQuery)}`;
      router.push(url).then(() => {
        router.replace(url); // Ensure the URL is updated even if on the same page
        window.location.reload(); // Force a full page reload
      });
    }
  };
  useEffect(() => {
    const { nameFilter } = router.query;
    if (typeof nameFilter === "string") {
      setSearchQuery(nameFilter);
    }
  }, [router.query]);
  
  return (
    <div>
      <nav className="bg-gray-teal-900 bg-opacity-80 shadow-xl">
        <div className="max-w-screen-xl mx-auto grid grid-cols-12 items-center gap-4 p-2">
          {/* Logo & Restaurant Name */}
          <a
            href="/customer"
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
            <form
              className="col-span-12 md:col-span-6 flex items-center order-last md:order-none"
              onSubmit={handleSearch}
            >
              <input
              type="text"
              placeholder="Search..."
              className="bg-gray-200 pl-2 rounded-l-md h-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
              type="submit"
              className="bg-gray-300 h-8 w-8 flex items-center justify-center rounded-r-md hover:bg-gray-500 transition-colors"
              >
              <img
                className="h-4 w-4"
                src="/images/search_icon.png"
                alt="search"
              />
              </button>
            </form>

            {/* Navbar Links */}
            <div className="col-span-full md:col-span-6 grid grid-cols-12 md:grid-cols-6 text-center md:text-right">
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

      <footer>
        {/* Footer Content */}
      </footer>
    </div>
  );
}
