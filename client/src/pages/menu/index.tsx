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
import React, { useEffect, useState } from 'react';
import { apiGet } from 'src/api/api-requests';
import RootLayout from 'src/layouts/customer/layout';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const MenuTabAll: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCuisine, setActiveCuisine] = useState<string>('all'); // Default cuisine
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMenuItems = async (cuisine: string) => {
    try {
      setIsLoading(true);
      const data = await apiGet(`/menus?cuisine=${cuisine}`);
      setMenuItems(data.data || []);
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems(activeCuisine);
  }, [activeCuisine]);

  return (
    <RootLayout>
      <div className="p-6 min-h-screen flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Menu</h2>
          <h3 className="text-xl font-semibold text-green-600">Check Our Tasty Menu</h3>

          {/* Tabs */}
          <div className="flex space-x-6 mt-4">
            <button
              onClick={() => setActiveCuisine('all')}
              className={`font-bold flex items-center ${activeCuisine === 'all' ? 'text-yellow-600' : 'text-black'}`}
            >
              <img src="/images/All-icon.png" className="w-6 h-6 mr-2" /> All
            </button>

            <button
              onClick={() => setActiveCuisine('western')}
              className={`font-bold flex items-center ${activeCuisine === 'western' ? 'text-yellow-600' : 'text-black'}`}
            >
              <img src="/images/western-icon.png" alt="Western" className="w-6 h-6 mr-2" /> Western
            </button>

            <button
              onClick={() => setActiveCuisine('vietnam')}
              className={`font-bold flex items-center ${activeCuisine === 'vietnam' ? 'text-yellow-600' : 'text-black'}`}
            >
              <img src="/images/vietnam-icon.png" alt="Vietnam" className="w-6 h-6 mr-2" /> Viet Nam
            </button>

            <button
              onClick={() => setActiveCuisine('dessert')}
              className={`font-bold flex items-center ${activeCuisine === 'dessert' ? 'text-yellow-600' : 'text-black'}`}
            >
              <img src="/images/dessert-icon.png" alt="Dessert" className="w-6 h-6 mr-2" /> Dessert
            </button>

            <button
              onClick={() => setActiveCuisine('drinks')}
              className={`font-bold flex items-center ${activeCuisine === 'drinks' ? 'text-yellow-600' : 'text-black'}`}
            >
              <img src="/images/drinks-icon.png" alt="Drinks" className="w-6 h-6 mr-2" /> Drinks
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-grow">
          {isLoading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {menuItems.map((item) => (
                <div key={item.id} className="flex items-center border-b pb-4 last:border-none">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-full mr-4" />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                  <span className="text-lg font-bold text-green-600">${item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer
        <footer className="mt-6 text-center">
          <div className="text-gray-500">
            <p>1234, Ho Chi Minh City</p>
            <p>Phone: 0900111222</p>
            <p>Email: babyhippo@gmail.com</p>
            <p>Open Hours: Mon - Fri: 8:00 AM - 9:00 PM, Sat - Sun: 8:00 AM - 10:00 PM</p>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-black">Facebook</a>
            <a href="#" className="text-black">Instagram</a>
            <a href="#" className="text-black">YouTube</a>
          </div>
        </footer> */}
      </div>
    </RootLayout>
  );
};

export default MenuTabAll;

