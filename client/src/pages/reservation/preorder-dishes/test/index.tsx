import React from 'react';
import Menu from 'src/components/menu';
import { MenuItemProps } from 'src/components/menu';
import PageHeader from 'src/components/page-header';
import RootLayout from 'src/layouts/customer/layout';
import MenuItem from 'src/types/menu-item';


interface PreorderItem {
  _id: string;
  menuItemId: string;
  quantity: number;

  name: string;
  description: string;
  price: number;
  image: string;
}

const PreorderMenuItem: React.FC<MenuItemProps> = ({ item, additionalParams }) => {
  const maxDescriptionLength = 50;
  const showAddToCart = true;
  const onClick = additionalParams?.onClick || null;

  const preorderItem: PreorderItem = {
    _id: item._id,
    menuItemId: item._id,
    quantity: 1,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
  }

  return (
    <div className="col-span-1 grid grid-cols-12 auto-rows-max border-solid border-r-2 border-slate-100 py-4 px-2">
      {/* Image */}
      <div className="col-span-3 flex justify-center items-center">
        <img
          src={preorderItem.image}
          alt={preorderItem.name}
          className="w-20 h-20 object-cover object-center rounded-full"
        />
      </div>
      {/* Details */}
      <div className="col-span-8 grid grid-cols-8">
        {/* Name */}
        <h4 className="col-span-6 text-lg font-semibold">{preorderItem.name}</h4>
        {/* Price */}
        <span className="col-span-2 text-lg font-bold text-green-600 text-end">${preorderItem.price}</span>
        {/* Description */}
        <p className={`text-slate-500 text-sm ${showAddToCart ? "col-span-6" : "col-span-full"} h-12 overflow-hidden`}>{
          preorderItem.description.length > maxDescriptionLength ? preorderItem.description.substring(0, maxDescriptionLength) + '...' : preorderItem.description
        }</p>
        {/* Add to Cart */}
        {showAddToCart && (
          <div className="col-span-2 flex justify-end items-start">
            <button
              className="button-outline-primary text-xs"
              onClick={() => onClick && onClick(preorderItem)}
            >
              Preorder
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
const Preorder: React.FC = () => {
  const [preorderedItems, setPreorderedItems] = React.useState<PreorderItem[]>([]);

  const handleAddToPreorder = (item: PreorderItem) => {
    setPreorderedItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (preorderedItem) => preorderedItem.menuItemId === item.menuItemId
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity = Math.min(
          updatedItems[existingItemIndex].quantity + item.quantity,
          10
        ); // Clamp to max 10
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: Math.min(item.quantity, 10) }];
      }
    });
  };

  const handleIncreaseQuantity = (menuItemId: string) => {
    setPreorderedItems((prevItems) =>
      prevItems.map((item) =>
        item.menuItemId === menuItemId
          ? { ...item, quantity: Math.min(item.quantity + 1, 10) } // Clamp to max 10
          : item
      )
    );
  };

  const handleDecreaseQuantity = (menuItemId: string) => {
    setPreorderedItems((prevItems) =>
      prevItems.map((item) =>
        item.menuItemId === menuItemId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // Clamp to min 1
          : item
      )
    );
  };

  const handleDeletePreorder = (menuItemId: string) => {
    setPreorderedItems((prevItems) =>
      prevItems.filter((item) => item.menuItemId !== menuItemId)
    );
  };

  return (
    <RootLayout>
      {/* Preorder Section Start */}
      <div className="">
        <PageHeader title="Preorder Dishes" subtitle="Choose your dishes in advance" />
        <div className="grid grid-cols-2 gap-4">
          {/* Preorder Item Start */}
          {preorderedItems.map((item: PreorderItem) => (
            <div
              key={item.menuItemId}
              className="col-span-1 grid grid-cols-12 auto-rows-max border-solid border-r-2 border-slate-100 py-4 px-2"
            >
              {/* Image */}
              <div className="col-span-3 flex justify-center items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover object-center rounded-full"
                />
              </div>
              {/* Details */}
              <div className="col-span-8 grid grid-cols-8 gap-y-2">
                {/* Name */}
                <h4 className="col-span-6 text-lg font-semibold">{item.name}</h4>
                {/* Price */}
                <span className="col-span-2 text-lg font-bold text-green-600 text-end">${item.price}</span>
                {/* Quantity, Increase, Decrease */}
                <div className="col-span-8 flex items-center px-4 gap-x-2">
                  {/* Increase */}
                  <button
                    onClick={() => handleDecreaseQuantity(item.menuItemId)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200"
                  >
                    <img src="/images/minus_icon.png" alt="minus" className="decrease-icon" />
                  </button>
                  {/* Quantity */}
                  <span className="w-12 text-center text-lg font-bold text-green-600 px-2 bg-slate-200 rounded-md">
                    {item.quantity}
                  </span>
                  {/* Decrease */}
                  <button
                    onClick={() => handleIncreaseQuantity(item.menuItemId)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200"
                  >
                    <img src="/images/plus_icon.png" alt="plus" className="increase-icon" />
                  </button>
                  {/* Remove */}
                  <div className="col-span-2 flex justify-self-end">
                    <button
                      onClick={() => handleDeletePreorder(item.menuItemId)}
                      className="text-red-600 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
          {/* Preorder Item End */}
        </div>
      </div>
      {/* Preorder Section End */}
      <Menu
        itemComponent={PreorderMenuItem}
        itemAdditionalParams={{
          onClick: handleAddToPreorder,
        }}
      />
    </RootLayout>
  );
};

export default Preorder;
