import React, { useState } from 'react';
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
const PreorderDishesTabVietNam: React.FC = () => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    Object.fromEntries(menuItems.map((item) => [item.id, 0]))
  );

  const handleIncrement = (id: number) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrement = (id: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(prev[id] - 1, 0) }));
  };

  return (
    <RootLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Pre-order dishes</h2>
          <h3 className="text-3xl font-semibold text-yellow-500">
            Pre-order dishes for the meal
          </h3>

          {/* Tabs */}
          <div className="flex space-x-6 m-5 justify-center gap-5">
            <a href="/preorder-dishes" className="text-black font-bold flex items-center">
              <img src="/images/All-icon.png" className="w-9 h-9 mr-2" />
              <span className='text-2xl'>All</span>
            </a>
            <a href="/preorder-dishes/western" className="text-black font-bold flex items-center">
              <img src="/images/western-icon.png" alt="Western" className="w-9 h-9 mr-2" />
              <span className='text-2xl'>Western</span>
            </a>
            <a href="/preorder-dishes/vietnam" className="text-yellow-600 font-bold flex items-center">
              <img src="/images/vietnam-icon.png" alt="Vietnam" className="w-9 h-9 mr-2" />
              <span className='text-2xl'>Viet Nam</span>
            </a>
            <a href="/preorder-dishes/dessert" className="text-black font-bold flex items-center">
              <img src="/images/dessert-icon.png" alt="Dessert" className="w-9 h-9 mr-2" />
              <span className='text-2xl'>Dessert</span>
            </a>
            <a href="/preorder-dishes/drinks" className="text-black font-bold flex items-center">
              <img src="/images/drinks-icon.png" alt="Drinks" className="w-6 h-6 mr-2" />
              <span className='text-2xl'>Drinks</span>
            </a>
          </div>
        </div>

        {/* Menu Items */}
        <div className='grid grid-cols-1'>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className="flex align-middle p-4 gap-2">
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                </div>

                <div className='flex flex-col justify-center'>
                  <div className="flex flex-col">
                    <h4 className="text-2xl">
                      {item.name}.............
                      <span className="text-2xl">
                        {item.price}$
                      </span>
                    </h4>
                  </div>

                  <div className="flex items-center justify-start space-x-4 mt-2">
                    <button
                      className="bg-white text-black font-extrabold w-8 h-8 flex justify-center items-center rounded-full border-4 border-black"
                      onClick={() => handleDecrement(item.id)}
                    >
                      <span className='text-3xl mb-2'>-</span>
                    </button>
                    <span className="text-lg font-bold bg-gray-300 px-6 italic">
                      {quantities[item.id]}
                    </span>
                    <button
                      className="bg-white text-black font-extrabold w-8 h-8 flex justify-center items-center rounded-full border-4 border-black"
                      onClick={() => handleIncrement(item.id)}
                    >
                      <span className="text-3xl mb-2">+</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-span-1 flex justify-center lg:col-start-3 h-fit mt-10 px-4">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-3xl shadow-md">
                <span className='text-3xl'>Confirm</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </RootLayout>
  );
};

export default PreorderDishesTabVietNam;
