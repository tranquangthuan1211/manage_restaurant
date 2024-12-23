// import React from 'react';
// import RootLayout from '../../layouts/customer/layout';
// 
// const menuItems = [
//   {
//     id: 1,
//     name: 'Burger King',
//     description: 'Lorem, ipsum, flavor, cheese, tomato',
//     price: 5,
//     image: '/images/burger.png',
//   },
//   {
//     id: 2,
//     name: 'Spaghetti',
//     description: 'Lorem, ipsum, flavor, tomato, pasta',
//     price: 5,
//     image: '/images/spaghetti.png',
//   },
//   {
//     id: 3,
//     name: 'Greek Salad',
//     description: 'Lorem, ipsum, flavor, cucumber, feta',
//     price: 5,
//     image: '/images/greek-salad.png',
//   },
//   {
//     id: 4,
//     name: 'Pho Bo',
//     description: 'Lorem, ipsum, flavor, beef, herbs',
//     price: 5,
//     image: '/images/Pho bo.png',
//   },
//   {
//     id: 5,
//     name: 'Papaya Salad',
//     description: 'Lorem, ipsum, flavor, papaya, peanuts',
//     price: 5,
//     image: '/images/papaya.png',
//   },
//   {
//     id: 6,
//     name: 'Com Tam',
//     description: 'Lorem, ipsum, flavor, papaya, peanuts',
//     price: 5,
//     image: '/images/com-tam.png',
//   },
//   {
//     id: 7,
//     name: 'Pancake',
//     description: 'Lorem, ipsum, flavor, coffee, cream',
//     price: 5,
//     image: '/images/pancake.png',
//   },
//   {
//     id:8,
//     name: 'Banh da lon',
//     description: 'Lorem, ipsum, flavor',
//     price: 5,
//     image: '/images/banhdalon.png',
//   },
//   {
//     id:9,
//     name: "Wine",
//     description: 'Lorem, ipsum, flavor',
//     price: 5,
//     image: '/images/wine.png',
//   },
//   {
//     id:10,
//     name:"Juice",
//     description: 'Lorem, ipsum, flavor',
//     price: 5,
//     image: '/images/juice.png',
//   }

// ];
// const MenuTabAll: React.FC = () => {
//     return (
//     <RootLayout>
//     <div className="p-6">
//   {/* Header */}
//   <div className="mb-6">
//     <h2 className="text-2xl font-bold mb-2">Menu </h2>
//     <h3 className="text-xl font-semibold text-green-600">Check Our Tasty Menu</h3>
//     {/* Tabs */}
//     <div className="flex space-x-6 mt-4">
//       {/* Link to the "All" tab */}
//       <a href="/menu" className="text-yellow-600 font-bold flex items-center">
//         <img src="/images/All-icon.png" className="w-6 h-6 mr-2" /> All
//       </a>

//       {/* Link to the "Western" tab */}
//       <a href="/menu/western" className="text-black font-bold flex items-center">
//         <img src="/images/western-icon.png" alt="Western" className="w-6 h-6 mr-2" /> Western
//       </a>

//       {/* Link to the "Vietnam" tab */}
//       <a href="/menu/vietnam" className="text-black font-bold flex items-center">
//         <img src="/images/vietnam-icon.png" alt="Vietnam" className="w-6 h-6 mr-2" /> Viet Nam
//       </a>

//       {/* Link to the "Dessert" tab */}
//       <a href="/menu/dessert" className="text-black font-bold flex items-center">
//         <img src="/images/dessert-icon.png" alt="Dessert" className="w-6 h-6 mr-2" /> Dessert
//       </a>

//       {/* Link to the "Drinks" tab */}
//       <a href="/menu/drinks" className="text-black font-bold flex items-center">
//         <img src="/images/drinks-icon.png" alt="Drinks" className="w-6 h-6 mr-2" /> Drinks
//       </a>
//     </div>
//   </div>


//         {/* Menu Items */}
//         <div className="grid grid-cols-2 gap-6">
//           {menuItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center border-b pb-4 last:border-none"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-16 h-16 object-cover rounded-full mr-4"
//               />
//               <div className="flex-1">
//                 <h4 className="text-lg font-semibold">{item.name}</h4>
//                 <p className="text-gray-500 text-sm">{item.description}</p>
//               </div>
//               <span className="text-lg font-bold text-green-600">${item.price}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//       </RootLayout>
//     );

//   };

//   export default MenuTabAll;

//get menu from server-OKAY
// import React, { useEffect, useState } from 'react';
// import { apiGet } from 'src/api/api-requests';
// import RootLayout from 'src/layouts/customer/layout';
// interface MenuItem {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
// }
// const MenuTabAll: React.FC = () => {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const data = await apiGet('/menus');
//         setMenuItems(data.data || []);
//       } catch (err: any) {
//         console.log(err);
//       }
//     };
//     fetchMenuItems();
//   }, []);
// return (
//   <RootLayout>
//     <div className="p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold mb-2">Menu</h2>
//         <h3 className="text-xl font-semibold text-green-600">Check Our Tasty Menu</h3>
//         {/* Tabs */}
//         <div className="flex space-x-6 mt-4">
//           {/* Link to the "All" tab */}
//           <a href="/menu" className="text-yellow-600 font-bold flex items-center">
//             <img src="/images/All-icon.png" className="w-6 h-6 mr-2" /> All
//           </a>

//           {/* Link to the "Western" tab */}
//           <a href="/menu/western" className="text-black font-bold flex items-center">
//             <img src="/images/western-icon.png" alt="Western" className="w-6 h-6 mr-2" /> Western
//           </a>

//           {/* Link to the "Vietnam" tab */}
//           <a href="/menu/vietnam" className="text-black font-bold flex items-center">
//             <img src="/images/vietnam-icon.png" alt="Vietnam" className="w-6 h-6 mr-2" /> Viet Nam
//           </a>

//           {/* Link to the "Dessert" tab */}
//           <a href="/menu/dessert" className="text-black font-bold flex items-center">
//             <img src="/images/dessert-icon.png" alt="Dessert" className="w-6 h-6 mr-2" /> Dessert
//           </a>

//           {/* Link to the "Drinks" tab */}
//           <a href="/menu/drinks" className="text-black font-bold flex items-center">
//             <img src="/images/drinks-icon.png" alt="Drinks" className="w-6 h-6 mr-2" /> Drinks
//           </a>
//         </div>
//       </div>

//       {/* Menu Items */}
//       <div className="grid grid-cols-2 gap-6">
//         {menuItems.map((item) => (
//           <div key={item.id} className="flex items-center border-b pb-4 last:border-none">
//             <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-full mr-4" />
//             <div className="flex-1">
//               <h4 className="text-lg font-semibold">{item.name}</h4>
//               <p className="text-gray-500 text-sm">{item.description}</p>
//             </div>
//             <span className="text-lg font-bold text-green-600">${item.price}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   </RootLayout>
// );
// };

// export default MenuTabAll;


//Edit to a proper format with footer

import React, { useState, useEffect } from 'react';
import RootLayout from '../../layouts/customer/layout';
import { useUser } from 'src/contexts/users/user-context';

const cuisines = [
    {
        title: 'Western cuisine',
        description: 'Our restaurant is a perfect place for you to enjoy a delicious western-style meal with your family and friends.',
        mainDish: '/images/dish_1.jpg',
        smallerDishes: ['/images/dish_2.jpg', '/images/dish_3.jpg', '/images/dish_4.jpg'],
    },
    {
        title: 'Vietnam cuisine',
        description: 'Experience the authentic flavors of Vietnam with our expertly crafted dishes, combining tradition and creativity for a delightful culinary journey.',
        mainDish: '/images/dish_2.jpg',
        smallerDishes: ['/images/dish_1.jpg', '/images/dish_3.jpg', '/images/dish_4.jpg'],
    },
    {
        title: 'Desserts',
        description: 'Indulge in our exquisite selection of desserts, where every bite is a celebration of sweetness and artistry.',
        mainDish: '/images/dish_3.jpg',
        smallerDishes: ['/images/dish_1.jpg', '/images/dish_2.jpg', '/images/dish_4.jpg'],
    },
    {
        title: 'Refreshing drinks',
        description: 'Quench your thirst with our refreshing drinks, perfectly crafted to complement your dining experience.',
        mainDish: '/images/dish_4.jpg',
        smallerDishes: ['/images/dish_1.jpg', '/images/dish_2.jpg', '/images/dish_3.jpg'],
    },
];

const MenuOverview = () => {
    const userContext = useUser();
    // const user = userContext ? userContext.user : null;
    // const isAuthenticated = userContext ? userContext.isAuthenticated : false;

    const [currentCuisineIndex, setCurrentCuisineIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCuisineIndex((prevIndex) => (prevIndex + 1) % cuisines.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // if (!isAuthenticated) {
    //     window.location.href = '/auth';
    //     return <div></div>;
    // }

    const currentCuisine = cuisines[currentCuisineIndex];

    return (
        <RootLayout>
            <div>
                {/* Hero Start */}
                <div className="col-span-full bg-[url('/images/customer_bg1.jpg')] bg-cover bg-center h-[36rem] grid grid-cols-2">
                    {/* Greeting */}
                    <div className="col-span-1 pl-10 flex flex-col justify-center items-start">
                        <p
                            className="font-[Satisfy] text-6xl mb-4 transition-all duration-1000 ease-in-out"
                            key={currentCuisine.title}
                        >
                            {currentCuisine.title}
                        </p>
                        <p className="text-xl mb-10 transition-opacity duration-1000 ease-in-out" key={currentCuisine.description}>
                            {currentCuisine.description}
                        </p>
                        <div className="flex flex-row gap-4">
                            <button
                                className="button-green"
                                onClick={() => (window.location.href = '/reservation')}
                            >
                                Book a table
                            </button>
                            <button
                                className="button-orange"
                                onClick={() => (window.location.href = '/menu/all')}
                            >
                                Explore our menu
                            </button>
                        </div>
                    </div>
                    {/* Yummy dishes */}
                    <div className="col-span-1 flex justify-start pl-1 items-center drop-shadow-lg">
                        <div className="relative w-[24rem] h-[24rem]">
                            {/* Main dish */}
                            <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-dashed border-gray-400 bg-white"></div>
                            <div className="absolute top-4 left-4 w-[22rem] h-[22rem] rounded-full bg-gray-300"></div>
                            <img
                                className="absolute top-0 left-0 w-full h-full rounded-full p-10 transition-transform duration-1000 ease-in-out"
                                src={currentCuisine.mainDish}
                                key={currentCuisine.mainDish}
                            ></img>

                            {/* Smaller dishes */}
                            <img
                                className="absolute top-2 left-[-0.5rem] w-16 h-16 rounded-full object-cover object-center transition-transform duration-1000 ease-in-out"
                                src={currentCuisine.smallerDishes[0]}
                                key={currentCuisine.smallerDishes[0]}
                            ></img>
                            <img
                                className="absolute top-[12rem] left-[-4.25rem] w-16 h-16 rounded-full object-cover object-center transition-transform duration-1000 ease-in-out"
                                src={currentCuisine.smallerDishes[1]}
                                key={currentCuisine.smallerDishes[1]}
                            ></img>
                            <img
                                className="absolute top-200 bottom-0 left-[-0.5rem] w-16 h-16 rounded-full object-cover object-center transition-transform duration-1000 ease-in-out"
                                src={currentCuisine.smallerDishes[2]}
                                key={currentCuisine.smallerDishes[2]}
                            ></img>
                        </div>
                    </div>
                </div>
                {/* Hero End */}
            </div>
        </RootLayout>
    );
};

export default MenuOverview;
