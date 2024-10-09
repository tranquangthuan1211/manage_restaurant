import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <div className="font-sans grid grid-cols-12">
      <div className="col-span-full
      bg-[url('/images/homepage_bg.jpg')] bg-cover bg-center h-4
      grid grid-cols-12 divide-x-2 divide-y-2">
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

    </div>
  );
};

export default Home;
