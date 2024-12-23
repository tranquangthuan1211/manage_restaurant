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

      </div>
    </RootLayout>
  );
};

export default MenuTabAll;