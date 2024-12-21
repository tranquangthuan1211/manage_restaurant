import React from 'react';
import RootLayout from '../../layouts/customer/layout';
import CustomerSideBar from './sidebar';
import { useUser } from 'src/contexts/users/user-context';

const CustomerBookingHistory = () => {
    const user = useUser();
    const bookingData = [
        { date: '2021-09-01', time: '12:00', preOrder: ['1 x Beef Steak', '1 x Chicken Salad'], review: 'No' },
        { date: '2021-09-05', time: '18:30', preOrder: ['2 x Spaghetti Carbonara', '1 x Caesar Salad', '2 x Pizza'], review: 'Yes' },
        { date: '2021-09-10', time: '20:00', preOrder: ['1 x Margherita Pizza', '2 x Garlic Bread', '1 x Tiramisu'], review: 'No' },
        { date: '2021-09-15', time: '19:00', preOrder: ['1 x Grilled Salmon', '1 x Greek Salad'], review: 'Yes' },
        { date: '2021-09-20', time: '13:00', preOrder: ['1 x BBQ Ribs', '1 x Coleslaw'], review: 'No' },
        { date: '2021-09-25', time: '17:00', preOrder: ['1 x Lobster Bisque', '1 x House Salad'], review: 'Yes' },
    ];

    const renderRow = (index: number, date: string, time: string, preOrder: string[], review: string) => (
        <tr key={index} className="hover:bg-gray-100">
            <td className="p-4 text-center">{index}</td>
            <td className="p-4">{date}</td>
            <td className="p-4">{time}</td>
            <td className="p-4">
                <ul className="list-disc pl-4">
                    {preOrder.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </td>
            <td className="p-4 text-center">{review}</td>
        </tr>
    );

    const renderTable = () => (
        <div>
            <table className="table-auto w-full border-collapse">
                <thead className="bg-gray-200  text-left sticky top-0">
                    <tr>
                        <th className="p-4 border-b">No.</th>
                        <th className="p-4 border-b">Date</th>
                        <th className="p-4 border-b">Time</th>
                        <th className="p-4 border-b">Pre-order</th>
                        <th className="p-4 border-b">Review</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingData.map((booking, index) =>
                        renderRow(index + 1, booking.date, booking.time, booking.preOrder, booking.review)
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <RootLayout>
            <div>
                <CustomerSideBar user={user}>
                    <div className="grid grid-cols-1 gap-4">
                        <h2 className="text-xl font-bold">Booking History</h2>
                        {renderTable()}
                    </div>
                </CustomerSideBar>
            </div>
        </RootLayout>
    );
};

export default CustomerBookingHistory;
