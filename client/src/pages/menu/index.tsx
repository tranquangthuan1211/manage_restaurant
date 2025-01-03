import MenuItem from "src/types/menu-item";
import Menu from "src/components/menu";
import RootLayout from "src/layouts/customer/layout";

const DefaultMenuItem: React.FC<MenuItem> = (item) => {
  const maxDescriptionLength = 50;
  const showAddToCart = false;
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

const MenuUI: React.FC = () => {
  
  return (
    <RootLayout>
      <Menu itemComponent={DefaultMenuItem} />
    </RootLayout>
  );
};

export default MenuUI;