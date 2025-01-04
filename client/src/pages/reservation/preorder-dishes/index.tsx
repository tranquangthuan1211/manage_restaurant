import Menu from 'src/components/menu';
import { MenuItemProps } from 'src/components/menu';
import PageHeader from 'src/components/page-header';
import RootLayout from 'src/layouts/customer/layout';
import React, { useState, useEffect } from 'react';
import { useUser } from 'src/contexts/users/user-context';
import { apiGet, apiPost } from 'src/api/api-requests';
import MenuItem from 'src/types/menu-item';
import ReservationForm from '../index';
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
    };

    return (
        <div className="col-span-1 grid grid-cols-12 auto-rows-max border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow">
            <div className="col-span-3 flex justify-center items-center">
                <img
                    src={preorderItem.image}
                    alt={preorderItem.name}
                    className="w-20 h-20 object-cover object-center rounded-full"
                />
            </div>
            <div className="col-span-8 grid grid-cols-8">
                <h4 className="col-span-6 text-lg font-semibold">{preorderItem.name}</h4>
                <span className="col-span-2 text-lg font-bold text-green-600 text-end">
                    ${preorderItem.price}
                </span>
                <p className="col-span-8 text-slate-500 text-sm line-clamp-2">
                    {preorderItem.description.length > maxDescriptionLength
                        ? preorderItem.description.substring(0, maxDescriptionLength) + '...'
                        : preorderItem.description}
                </p>
                {showAddToCart && (
                    <div className="col-span-8 flex justify-end items-center mt-2">
                        <button
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
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
    const [reservationData, setReservationData] = useState<any>(null);
    const { user, isAuthenticated } = useUser() || { user: null, isAuthenticated: false };
    if (user === null || !isAuthenticated) {
        window.location.href = '/auth';
        return <div></div>;
    }
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
                );
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
                    ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
                    : item
            )
        );
    };

    const handleDecreaseQuantity = (menuItemId: string) => {
        setPreorderedItems((prevItems) =>
            prevItems.map((item) =>
                item.menuItemId === menuItemId
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            )
        );
    };

    const handleDeletePreorder = (menuItemId: string) => {
        setPreorderedItems((prevItems) =>
            prevItems.filter((item) => item.menuItemId !== menuItemId)
        );
    };

    const handleConfirm = async () => {
        const storedReservation = localStorage.getItem('reservationData');

        // Parse the reservation data
        const reservationData = storedReservation ? JSON.parse(storedReservation) : {};
        if (!reservationData || preorderedItems.length === 0) {
            alert('Reservation data or preordered items are missing.');
            return;
        }

        const total = preorderedItems.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
        );

        const order = {
            user_id: user?._id,
            product_id: preorderedItems.map((item) => item.menuItemId),
            status: 'Pending',
            total,
            created_at: new Date(),
            updated_at: new Date(),
        };

        // const appointment = {
        //     id_customer: user?._id,
        //     table_number: reservationData?.diners,
        //     status: 'Pending',
        //     date: reservationData?.date,
        //     hours: reservationData?.time,
        //     created_at: new Date(),
        //     updated_at: new Date(),
        // };


        // // Construct the reservation object
        // const reservation = {
        //     userId: user?._id, // Match 'userId' in the schema
        //     num_of_people: reservationData.diners || 0, // Default to 0 if not found
        //     date_time: new Date().toISOString(), // Ensure ISO 8601 format for the date-time
        //     status: 'Pending', // Match 'status' in the schema
        //     special_request: reservationData.specialRequests || undefined, // Optional, only include if exists
        //     preorders: preorderedItems.map((item) => ({
        //         menuItemId: item.menuItemId,
        //         quantity: item.quantity,
        //     })),
        //     createAt: new Date().toISOString(), // Match 'createAt' in the schema
        // };



        // Extract date and time
        const { date, time } = reservationData;

        // Combine date and time into ISO 8601 format
        const dateTime = new Date(`${date}T${time}`).toISOString();

        // Construct the reservation object
        const reservation = {
            userId: user?._id, // Match 'userId' in the schema
            num_of_people: reservationData.diners || 0, // Default to 0 if not found
            date_time: dateTime, // Use combined date and time in ISO 8601 format
            status: "Pending", // Match 'status' in the schema
            special_request: reservationData.specialRequests || undefined, // Optional, only include if exists
            preorders: preorderedItems.map((item) => ({
                menuItemId: item.menuItemId,
                quantity: item.quantity,
            })),
            createAt: new Date().toISOString(), // Match 'createAt' in the schema
        };

        console.log("Constructed reservation object:", reservation);


        // Send the reservation object to the backend
        console.log('Sending reservation:', reservation);

        try {
            await Promise.all([
                apiPost('/reservations', reservation),
                // apiPost('/appointments', appointment),
            ]);
            alert('Successfully booked!');
            window.location.href = '/';
        } catch (error: any) {
            alert(error.message || 'An error occurred. Please try again.');
            console.error(error);
        }
    };


    return (
        <RootLayout>
            <div>
                <PageHeader title="Preorder Dishes" subtitle="Choose your dishes in advance" />
                <div className="grid grid-cols-2 gap-4 mt-4 p-2">
                    {preorderedItems.map((item: PreorderItem) => (
                        <div
                            key={item.menuItemId}
                            className="col-span-1 grid grid-cols-12 auto-rows-max border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow"
                        >
                            <div className="col-span-3 flex justify-center items-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover object-center rounded-full"
                                />
                            </div>
                            <div className="col-span-9 grid grid-cols-9 gap-y-2">
                                <h4 className="col-span-6 text-lg font-semibold">{item.name}</h4>
                                <span className="col-span-3 text-lg font-bold text-green-600 text-end">
                                    ${item.price}
                                </span>
                                <div className="col-span-9 flex items-center gap-2">
                                    <button
                                        onClick={() => handleDecreaseQuantity(item.menuItemId)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center text-lg font-bold">{item.quantity}</span>
                                    <button
                                        onClick={() => handleIncreaseQuantity(item.menuItemId)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => handleDeletePreorder(item.menuItemId)}
                                        className="ml-auto text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        className={`w-full sm:w-48 h-14 px-2 py-2 rounded-md text-white font-bold transition ${preorderedItems.length > 0
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-300 cursor-not-allowed"
                            }`}
                        onClick={handleConfirm}
                        disabled={preorderedItems.length === 0}
                    >
                        Confirm
                    </button>

                </div>
            </div>
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
