import React from 'react';
import RootLayout from '../../../layouts/customer/layout';
const menuItems = [
  {
    id: 1,
    name: 'Com tam',
    description: 'Lorem, ipsum, flavor, cheese, tomato',
    price: 5,
    image: '/images/com-tam.png',
  },
  {
    id: 2,
    name: 'Pho Bo',
    description: 'Lorem, ipsum, flavor, beef, herbs',
    price: 5,
    image: '/images/Pho bo.png',
  },
  {
    id: 3,
    name: 'Papaya Salad',
    description: 'Lorem, ipsum, flavor, papaya, peanuts',
    price: 5,
    image: '/images/papaya.png',
  },
];
const MenuTabDrinks: React.FC = () => {
    return (
    <RootLayout>
        <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Menu </h2>
          <h3 className="text-xl font-semibold text-green-600">Check Our Tasty Menu</h3>
          {/* Tabs */}
          <div className="flex space-x-6 mt-4">
            {/* Link to the "All" tab */}
            <a href="/menu" className="text-yellow-600 font-bold flex items-center">
              <img src="/images/All-icon.png" className="w-6 h-6 mr-2" /> All
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
      </RootLayout>
    );
  };
  
  export default MenuTabDrinks;