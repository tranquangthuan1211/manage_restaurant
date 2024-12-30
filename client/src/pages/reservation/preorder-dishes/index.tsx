import React, { useState, useEffect } from 'react';
import RootLayout from '../../../layouts/customer/layout';
import { apiGet, apiPost } from "../../../api/api-requests";
import { AuthGuard } from "../../../guards/auth-guard";
import { useUser } from 'src/contexts/users/user-context';

const PreorderDishesTabAll: React.FC = () => {
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [reservationData, setReservationData] = useState<any>(null);
    const userContext = useUser();
    const user = userContext ? userContext.user : null;

    useEffect(() => {
        const savedReservationData = localStorage.getItem("reservationData");
        if (savedReservationData) {
            setReservationData(JSON.parse(savedReservationData));
        }

        const fetchMenuItems = async () => {
            try {
                const data = await apiGet('/menus');
                setMenuItems(data.data || []);
            } catch (err: any) {
                console.log(err);
            }
        };

        fetchMenuItems();
    }, []);

    useEffect(() => {
        setQuantities(Object.fromEntries(menuItems.map((item) => [item._id, 0])));
    }, [menuItems]);

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
            status: "Pendding",
            date: reservationData.date,
            hours: reservationData.time,
            created_at: new Date(),
            updated_at: new Date(),
        }
        console.log(order)
        console.log(appointment)

        await apiPost('/orders', order);
        await apiPost('/appointments', appointment);

        alert('Sucessfull');

        window.location.href = '/';
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
            </div>
        </RootLayout>
    );
};

export default PreorderDishesTabAll;
