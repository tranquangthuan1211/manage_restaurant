import React from 'react';
import Menu from 'src/components/menu';
import PageHeader from 'src/components/page-header';
import RootLayout from 'src/layouts/customer/layout';
import MenuItem from 'src/types/menu-item';


const PreorderMenuItem: React.FC<MenuItem> = (item) => {
  const maxDescriptionLength = 50;
  const showAddToCart = true;
  return (
    <div className="col-span-1 grid grid-cols-12 auto-rows-max border-solid border-r-2 border-slate-100 py-4 px-2">
      {/* Image */}
      <div className="col-span-3 flex justify-center items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover object-center rounded-full"
        />
      </div>
      {/* Details */}
      <div className="col-span-8 grid grid-cols-8">
        {/* Name */}
        <h4 className="col-span-6 text-lg font-semibold">{item.name}</h4>
        {/* Price */}
        <span className="col-span-2 text-lg font-bold text-green-600 text-end">${item.price}</span>
        {/* Description */}
        <p className={`text-slate-500 text-sm ${showAddToCart ? "col-span-6" : "col-span-full"} h-12 overflow-hidden`}>{
          item.description.length > maxDescriptionLength ? item.description.substring(0, maxDescriptionLength) + '...' : item.description
        }</p>
        {/* Add to Cart */}
        {showAddToCart && (
          <div className="col-span-2 flex justify-end items-start">
            <button className="button-outline-primary text-xs">
              Preorder
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const placeholdeOrderedItems = [
  {
    _id: '1',
    name: 'Pho',
    description: 'A bowl of delicious Pho',
    price: 10,
    category: 'Vietnamese',
    image: 'https://via.placeholder.com/150'
  },
  {
    _id: '2',
    name: 'Banh Mi',
    description: 'A delicious Banh Mi',
    price: 5,
    category: 'Vietnamese',
    image: 'https://via.placeholder.com/150'
  },
  {
    _id: '3',
    name: 'Burger',
    description: 'A delicious Burger',
    price: 15,
    category: 'Western',
    image: 'https://via.placeholder.com/150'
  },
  {
    _id: '4',
    name: 'Pizza',
    description: 'A delicious Pizza',
    price: 20,
    category: 'Western',
    image: 'https://via.placeholder.com/150'
  }
]

const PreorderSection: React.FC = () => {
  return (
    <div className="">
      <PageHeader title="Preorder Dishes" subtitle="Choose your dishes in advance" />
      <div className="grid grid-cols-2">

      </div>
    </div>
  );
}

const Preorder: React.FC = () => {
  return (
    <RootLayout>
      <PreorderSection />
      <Menu itemComponent={PreorderMenuItem} />
    </RootLayout>
  );
}

export default Preorder;