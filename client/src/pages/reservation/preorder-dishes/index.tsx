import React, { useState, useEffect } from 'react';
import RootLayout from '../../../layouts/customer/layout';
import { apiGet, apiPost } from "../../../api/api-requests";
import { AuthGuard } from "../../../guards/auth-guard";
import { useUser } from 'src/contexts/users/user-context';
import PageHeader from 'src/components/page-header';

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
            user_id: user?.id,
            product_id: menuItems
                .filter((item) => quantities[item._id] > 0)
                .map((item) => item._id),
            status: "Pending",
            total: total,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const appointment = {
            id_customer: user?.id,
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
                <PageHeader title="Preorder Dishes" subtitle="Prepare your dishes before hand" />

                {/* Menu Items */}
                <div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-y-2">
                        {menuItems.map((item) => (
                            <div key={item._id} className="grid grid-cols-12">
                                <div className="col-span-3 flex justify-center items-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover object-center rounded-full border border-solid border-slate-200"
                                    />
                                </div>

                                <div className="col-span-9 flex flex-col justify-center">
                                    <div className="flex justify-between">
                                        <h4 className="">
                                            {item.name}
                                        </h4>
                                        <span className="">
                                            {item.price}$
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-start space-x-4 mt-2">
                                        <button
                                            className="bg-white w-8 h-8 flex justify-center items-center"
                                            onClick={() => handleDecrement(item._id)}
                                        >
                                            <img src="/images/minus_icon.png" className="increase-icon" alt="plus" />
                                        </button>
                                        <span className="text-lg font-bold bg-slate-300 px-6 italic rounded-sm">
                                            {quantities[item._id]}
                                        </span>
                                        <button
                                            className="bg-white w-8 h-8 flex justify-center items-center"
                                            onClick={() => handleIncrement(item._id)}
                                        >
                                            <img src="/images/plus_icon.png" className="increase-icon" alt="plus" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
        </RootLayout >
    );
};

export default PreorderDishesTabAll;
