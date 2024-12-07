import React from 'react';
// import RootLayout from '../../layouts/customer/layout';
// const Customer = () => {
//     return (
//         <RootLayout>
//         <div>
//             {/* Navbar Start */}
//             <nav>
//                 <div className="grid grid-cols-12">
//                     <div className="col-span-full bg-gray-teal-900 bg-opacity-80 grid grid-cols-12 shadow-xl">
//                         {/* Logo & Restaurant Name */}
//                         <a href="#" className="m-2 col-span-3 flex justify-start items-center">
//                             <img src="/images/logo.png" alt="logo" width={52} height={52} />
//                             <span className="uppercase pl-2 text-2xl font-bold text-white font-sansita-one">Baby Hippo</span>
//                         </a>
//                         {/* Search bar */}
//                         <div className="col-span-6 pl-2 flex items-center justify-center hover:scale-105 transfrom transition-transform">
//                             <input type="text" placeholder="Search..." size={40} className="bg-gray-200 pl-2 rounded-l-md h-8" />
//                             <button className="bg-gray-300 p-1 rounded-r-md h-8 hover:bg-gray-500 transition-colors">
//                                 <img className='px-4 h-6' src="/images/search_icon.png"></img>
//                             </button>
//                         </div>
//                         {/* Home, Cart & Account */}
//                         <div className="col-span-3 flex justify-end items-center">
//                             <a href="/" className='icon-button'>
//                                 <img width={32} height={32} src="/images/home_icon.png"></img>
//                             </a>
//                             <a href="/customer/cart" className='icon-button'>
//                                 <img width={32} height={32} src="/images/cart_icon.png"></img>
//                             </a>
//                             <a href="/customer/account" className='icon-button'>
//                                 <img width={32} height={32} src="/images/male_avatar.png"></img>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//             {/* Navbar End */}
//             {/* Hero Start */}
//             <div className="col-span-full bg-[url('/images/customer_bg1.jpg')] bg-cover bg-center h-[36rem] grid grid-cols-2">
//                 {/* Gretting */}
//                 <div className='col-span-1 pl-10 flex flex-col justify-center items-start'>
//                     <p className='font-[Satisfy] text-6xl mb-4'>Baby Hippo</p>
//                     <p className='text-xl mb-10'>The best place to enjoy your meal</p>
//                     <div className='flex flex-row gap-4'>
//                         <button className='button-green'>Book a table</button>
//                         <button className='button-orange'>Write a review</button>
//                     </div>
//                 </div>
//                 {/* Yummy dishes */}
//                 <div className='col-span-1 flex justify-start pl-1 items-center drop-shadow-lg'>
//                     <div className='relative w-[24rem] h-[24rem]'>
//                         {/* Main dish */}
//                         <div className='absolute top-0 left-0 w-full h-full rounded-full border-2 border-dashed border-gray-400 bg-white'></div>
//                         <div className='absolute top-4 left-4 w-[22rem] h-[22rem] rounded-full bg-gray-300'></div>
//                         <img className='absolute top-0 left-0 w-full h-full rounded-full p-10' src='/images/dish_1.jpg'></img>
//                         {/* Smaller dishes */}
//                         <img className='absolute top-0 left-[-0.5rem] w-16 h-16 rounded-full object-cover object-center' src='/images/dish_2.jpg'></img>
//                         <img className='absolute top-[10rem] left-[-4.25rem] w-16 h-16 rounded-full object-cover object-center' src='/images/dish_3.jpg' ></img>
//                         <img className='absolute bottom-0 left-[-0.5rem] w-16 h-16 rounded-full object-cover object-center' src='/images/dish_4.jpg' ></img>
//                     </div>
//                 </div>
//             </div>
//             {/* Hero End */}
//         </div>
//     </RootLayout>
//     )

// }

// export default Customer;

const menuItems = [
  {
    id: 1,
    name: 'Burger King',
    description: 'Lorem, ipsum, flavor, cheese, tomato',
    price: 5,
    image: '/images/logo.png',
  },
  {
    id: 2,
    name: 'Spaghetti',
    description: 'Lorem, ipsum, flavor, tomato, pasta',
    price: 5,
    image: '/images/logo.png',
  },
  {
    id: 3,
    name: 'Greek Salad',
    description: 'Lorem, ipsum, flavor, cucumber, feta',
    price: 5,
    image: '/images/logo.png',
  },
  {
    id: 4,
    name: 'Pho Bo',
    description: 'Lorem, ipsum, flavor, beef, herbs',
    price: 5,
    image: '/images/logo.png',
  },
//   {
//     id: 5,
//     name: 'Papaya Salad',
//     description: 'Lorem, ipsum, flavor, papaya, peanuts',
//     price: 5,
//     image: '/images/logo.png',
//   },
];
const MenuTabAll: React.FC = () => {
    return (
        <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Menu </h2>
          <h3 className="text-xl font-semibold text-green-600">Check Our Tasty Menu</h3>
          {/* Tabs */}
          <div className="flex space-x-6 mt-4">
            {/* Link to the "All" tab */}
            <a href="/menu" className="text-yellow-600 font-bold flex items-center">
              <img src="/images/Menu-all.png" className="w-6 h-6 mr-2" /> All
            </a>
      
            {/* Link to the "Western" tab */}
            <a href="/menu/western" className="text-black font-bold flex items-center">
              <img src="/images/western-icon.png" alt="Western" className="w-6 h-6 mr-2" /> Western
            </a>
      
            {/* Link to the "Vietnam" tab */}
            <a href="/menu/vietnam" className="text-black font-bold flex items-center">
              <img src="/images/vietnam-icon.png" alt="Vietnam" className="w-6 h-6 mr-2" /> Viet Nam
            </a>
      
            {/* Link to the "Dessert" tab */}
            <a href="/menu/dessert" className="text-black font-bold flex items-center">
              <img src="/images/dessert-icon.png" alt="Dessert" className="w-6 h-6 mr-2" /> Dessert
            </a>
      
            {/* Link to the "Drinks" tab */}
            <a href="/menu/drinks" className="text-black font-bold flex items-center">
              <img src="/images/drinks-icon.png" alt="Drinks" className="w-6 h-6 mr-2" /> Drinks
            </a>
          </div>
        </div>
  
        {/* Menu Items */}
        <div className="grid grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b pb-4 last:border-none"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
              <span className="text-lg font-bold text-green-600">${item.price}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MenuTabAll;