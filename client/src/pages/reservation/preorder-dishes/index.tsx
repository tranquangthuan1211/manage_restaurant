import React, { useState, useEffect } from 'react';
import RootLayout from '../../../layouts/customer/layout';
import { apiGet, apiPost } from "../../../api/api-requests";
import { AuthGuard } from "../../../guards/auth-guard";
import { useUser } from 'src/contexts/users/user-context';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

interface QueryParams {
    page: number;
    limit: number;
    category: string;
    nameFilter: string;
}

const PreorderDishesTabAll: React.FC = () => {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [reservationData, setReservationData] = useState<any>(null);
    const userContext = useUser();
    const user = userContext ? userContext.user : null;

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [activeCuisine, setActiveCuisine] = useState<string>('all'); // Default cuisine
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const itemsPerPage = 8;

    const fetchMenuItems = async (cuisine: string, queryParams: QueryParams) => {
        //return; // TODO: Remove this line later
        try {
            setIsLoading(true);
            const urlParams = new URLSearchParams(Object.entries(queryParams).map(([key, value]) => [key, value.toString()])).toString();
            const apiUrl = `/menus?${urlParams}`;
            console.log(`fetching menu items from ${apiUrl}`);
            const result = await apiGet(apiUrl);

            //console.log(JSON.stringify(result)); 
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

    useEffect(() => {
        setQuantities(Object.fromEntries(menuItems.map((item) => [item._id, 0])));
    }, [menuItems]);

    useEffect(() => {
        const data = localStorage.getItem("reservationData");
        if (data) {
            try {
                setReservationData(JSON.parse(data));
            } catch (error) {
                console.error("Failed to parse reservation data:", error);
                setReservationData(null);
            }
        }
    }, []);

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
    const handleIncrement = (id: string) => {
        setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    };

    const handleDecrement = (id: string) => {
        setQuantities((prev) => ({ ...prev, [id]: Math.max(prev[id] - 1, 0) }));
    };

    const handleConfirm = async () => {
        const orderDetails = menuItems
            .filter((item) => quantities[item._id] > 0)
            .map((item) => ({
                name_customer: reservationData?.name,
                name_product: item.name,
                quantity: quantities[item._id],
                price: item.price,
                created_at: new Date(),
                updated_at: new Date(),
            }));
    
        const total = orderDetails.reduce(
            (sum, detail) => sum + detail.quantity * detail.price,
            0
        );
    
        const order = {
            user_id: user?._id,
            product_id: menuItems
                .filter((item) => quantities[item._id] > 0)
                .map((item) => item._id),
            status: "Pending",
            total: total,
            created_at: new Date(),
            updated_at: new Date(),
        };
    
        const appointment = {
            id_customer: user?._id,
            table_number: reservationData.diners,
            status: "Pending",
            date: reservationData.date,
            hours: reservationData.time,
            created_at: new Date(),
            updated_at: new Date(),
        };
    
        try {
            await apiPost('/orders', order);
            await apiPost('/appointments', appointment);
            alert('Successfully booked!');
            window.location.href = '/';
        } catch (error: any) {
            alert(error.message || 'An error occurred. Please try again.');
            console.error(error);
        }
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



                {/* Menu Items */}
                <div className="grid grid-cols-1">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {menuItems.map((item) => (
                            <div key={item._id} className="flex align-middle p-4 gap-2">
                                <div>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-full"
                                    />
                                </div>

                                <div className="flex flex-col justify-center">
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
                                            onClick={() => handleDecrement(item._id)}
                                        >
                                            <span className="text-3xl mb-2">-</span>
                                        </button>
                                        <span className="text-lg font-bold bg-gray-300 px-6 italic">
                                            {quantities[item._id]}
                                        </span>
                                        <button
                                            className="bg-white text-black font-extrabold w-8 h-8 flex justify-center items-center rounded-full border-4 border-black"
                                            onClick={() => handleIncrement(item._id)}
                                        >
                                            <span className="text-3xl mb-2">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-span-1 flex justify-center lg:col-start-3 h-fit mt-10 px-4">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-3xl shadow-md"
                                onClick={handleConfirm}
                            >
                                <span className="text-3xl">Confirm</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Menu End */}

                {/* Pagination Start*/}
                {totalPages > 0 && renderPagination()}
                {/* Pagination End*/}
            </div>
        </RootLayout>
    );
};

export default PreorderDishesTabAll;
