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
        { date: '2021-10-01', time: '14:00', preOrder: ['1 x Sushi Platter'], review: 'No' },
        { date: '2021-10-05', time: '19:30', preOrder: ['2 x Pad Thai', '1 x Spring Rolls'], review: 'Yes' },
        { date: '2021-10-10', time: '12:30', preOrder: ['1 x Cheeseburger', '1 x Fries', '1 x Milkshake'], review: 'No' },
        { date: '2021-10-15', time: '18:00', preOrder: ['1 x Chicken Alfredo', '1 x Garlic Bread'], review: 'Yes' },
        { date: '2021-10-20', time: '20:30', preOrder: ['1 x Beef Tacos', '1 x Nachos', '1 x Margarita'], review: 'No' },
        { date: '2021-10-25', time: '13:30', preOrder: ['1 x Fish and Chips'], review: 'Yes' },
        { date: '2021-11-01', time: '17:30', preOrder: ['1 x Veggie Burger', '1 x Sweet Potato Fries'], review: 'No' },
        { date: '2021-11-05', time: '19:00', preOrder: ['1 x Shrimp Scampi', '1 x Caesar Salad'], review: 'Yes' },
        { date: '2021-11-10', time: '12:00', preOrder: ['1 x BLT Sandwich', '1 x Chips'], review: 'No' },
        { date: '2021-11-15', time: '18:30', preOrder: ['1 x Chicken Curry', '1 x Naan Bread', '1 x Mango Lassi'], review: 'Yes' },
    ];

    const renderRow = (index: number, date: string, time: string, preOrder: string[], review: string) => (
        <tr key={index}>
            <td>{index}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>
                <ol>
                    {preOrder.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ol>
            </td>
            <td>{review}</td>
        </tr>
    );

    const renderTable = () => (
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Pre-order</th>
                    <th>Review</th>
                </tr>
            </thead>
            <tbody>
                {bookingData.map((booking, index) =>
                    renderRow(index + 1, booking.date, booking.time, booking.preOrder, booking.review)
                )}
            </tbody>
        </table>
    );

    return (
        <RootLayout>
            <div>
                <CustomerSideBar user={user} >
                    {/* Personal Information */}
                    <div className="bg-slate-300 p-8 shadow-lg animate-fadeIn">
                        <div className='overflow-y-scroll grid max-h-96'>
                            {renderTable()}
                        </div>
                    </div>
                </CustomerSideBar>
            </div>
        </RootLayout>
    );
}

export default CustomerBookingHistory;