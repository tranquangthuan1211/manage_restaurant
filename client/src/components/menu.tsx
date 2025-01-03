import MenuItem from "src/types/menu-item";
import { useState, useEffect } from "react";
import { apiGet } from "src/api/api-requests";
import PageHeader from "./page-header";

export interface MenuItemProps {
  item: MenuItem;
  additionalParams?: Record<string, any>;
}

interface MenuProps {
  itemComponent: React.FC<MenuItemProps>;
  itemAdditionalParams?: Record<string, any>;
}

interface QueryParams {
  page: number;
  limit: number;
  category: string;
  nameFilter: string;
}

const Menu: React.FC<MenuProps> = ({ itemComponent: ItemComponent, itemAdditionalParams }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCuisine, setActiveCuisine] = useState<string>('all'); // Default cuisine
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 8;

  const fetchMenuItems = async (cuisine: string, queryParams: QueryParams) => {
    try {
      setIsLoading(true);
      const urlParams = new URLSearchParams(Object.entries(queryParams).map(([key, value]) => [key, value.toString()])).toString();
      const apiUrl = `/menus?${urlParams}`;
      console.log(`fetching menu items from ${apiUrl}`);
      const result = await apiGet(apiUrl);

      if (result.error == 0) {
        const { items, pagination } = result.data;
        console.log(`fetched ${items.length} items`);

        setMenuItems(items);
        setTotalPages(pagination.totalPages);
        console.log(`total pages: ${pagination.totalPages}`);
      } else {
        console.log(`Failed to fetch menu items: ${JSON.stringify(result)}`);
      }

    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nameFilter = urlParams.get('nameFilter') || "";
    const queryParams: QueryParams = {
      page: currentPage,
      limit: itemsPerPage,
      category: activeCuisine,
      nameFilter: nameFilter,
    };
    fetchMenuItems(activeCuisine, queryParams);
  }, [activeCuisine, currentPage]);

  const handleCuisineChange = (cuisine: string) => {
    setActiveCuisine(cuisine);
    setCurrentPage(1);
  };

  const renderPagination = () => (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
        Previous
      </button>
      <span className="font-bold">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
        Next
      </button>
    </div>
  );

  return (
    <div className="p-6 min-h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <PageHeader title="Menu" subtitle="Check out our tasty menu"/>

        {/* Tabs */}
        <div className="grid grid-cols-2 md:flex md:justify-around mt-4">
          <button
            onClick={() => handleCuisineChange('all')}
            className={`md:justify-center font-bold flex items-center px-8 md:px-0 md:py-2 py-4 ${activeCuisine === 'all' ? 'text-yellow-600' : 'text-black'
              }`}
          >
            <img src="/images/All-icon.png" className="w-6 h-6 mr-2" /> All
          </button>

          <button
            onClick={() => handleCuisineChange('western')}
            className={`md:justify-center font-bold flex items-center px-8 md:px-0 md:py-2 py-4 ${activeCuisine === 'western' ? 'text-yellow-600' : 'text-black'
              }`}
          >
            <img
              src="/images/western-icon.png"
              alt="Western"
              className="w-6 h-6 mr-2"
            />{' '}
            Western
          </button>

          <button
            onClick={() => handleCuisineChange('vietnam')}
            className={`md:justify-center font-bold flex items-center px-8 md:px-0 md:py-2 py-4 ${activeCuisine === 'vietnam' ? 'text-yellow-600' : 'text-black'
              }`}
          >
            <img
              src="/images/vietnam-icon.png"
              alt="Vietnam"
              className="w-6 h-6 mr-2"
            />{' '}
            Viet Nam
          </button>

          <button
            onClick={() => handleCuisineChange('dessert')}
            className={`md:justify-center font-bold flex items-center px-8 md:px-0 md:py-2 py-4 ${activeCuisine === 'dessert' ? 'text-yellow-600' : 'text-black'
              }`}
          >
            <img
              src="/images/dessert-icon.png"
              alt="Dessert"
              className="w-6 h-6 mr-2"
            />{' '}
            Dessert
          </button>

          <button
            onClick={() => handleCuisineChange('drinks')}
            className={`md:justify-center font-bold flex items-center px-8 md:px-0 ${activeCuisine === 'drinks' ? 'text-yellow-600' : 'text-black'
              }`}
          >
            <img
              src="/images/drinks-icon.png"
              alt="Drinks"
              className="w-6 h-6 mr-2"
            />{' '}
            Drinks
          </button>
        </div>
      </div>

      {/* Menu Start */}
      <div className="flex-grow">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Menu Item Start*/}
            {totalPages > 0 && menuItems.map((item) => (
              <div
                key={item._id}
              >
                <ItemComponent item={item} additionalParams={itemAdditionalParams}/>
              </div>
            ))}
            {totalPages === 0 && (
              <div className="col-span-full text-center text-gray-500">No items found</div>
            )}
            {/* Menu Item End*/}
          </div>
        )}
      </div>
      {/* Menu End */}

      {/* Pagination Start*/}
      {totalPages > 0 && renderPagination()}
      {/* Pagination End*/}
    </div>
  );
};

export default Menu;