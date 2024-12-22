import React, { useState, useEffect } from 'react';
import RootLayout from 'src/layouts/customer/layout';
import CustomerSideBar from './sidebar';
import { useUser } from 'src/contexts/users/user-context';
import Spinner from 'src/components/spinner';

interface Booking {
    date: string;
    time: string;
    numberOfPeople: number;
    preOrder: PreOrder[];
    reviewId: number;
}

interface PreOrder {
    foodId: string;
    foodName: string;
    quantity: number;
}

const CustomerBookingHistory = () => {
    const { user, isAuthenticated } = useUser() || { user: null, isAuthenticated: false };

    if (!isAuthenticated) {
        window.location.href = '/auth';
        return <div></div>;
    }

    // Placeholder data for current pages
    const placeholderData : Booking[] = [
        {
            date: '2021-09-01',
            time: '12:00',
            numberOfPeople: 5,
            preOrder: [
                { foodId: '1', foodName: 'Spaghetti Carbonara', quantity: 2 },
                { foodId: '2', foodName: 'Caesar Salad', quantity: 1 },
                { foodId: '3', foodName: 'Pizza', quantity: 2 }
            ],
            reviewId: 1122
        },
        {
            date: '2021-09-02',
            time: '18:00',
            numberOfPeople: 2,
            preOrder: [
            { foodId: '4', foodName: 'Lasagna', quantity: 1 },
            { foodId: '5', foodName: 'Garlic Bread', quantity: 33 }
            ],
            reviewId: -1
        },
        {
            date: '2021-09-03',
            time: '20:00',
            numberOfPeople: 1,
            preOrder: [
            { foodId: '6', foodName: 'Tiramisu', quantity: 2 },
            { foodId: '7', foodName: 'Bruschetta', quantity: 1 }
            ],
            reviewId: 2233
        }

    ];

    const [bookingData, setBookingData] = useState<Booking[]>(placeholderData); // TODO: Replace with []
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(4); // TODO: Replace with 0
    const itemsPerPage = 3;

    const fetchBookingData = async (page: number) => {
        const response = await fetch(`/api/bookings?page=${page}&limit=${itemsPerPage}`);
        const data = await response.json();
        setBookingData(data.bookings);
        setTotalPages(data.totalPages);
    };

    useEffect(() => {
        fetchBookingData(currentPage);
    }, [currentPage]);

    const renderRow = (index: number, booking : Booking) => (
        <tr key={index} className="hover:bg-gray-100">
            <td className="p-4 text-center">{index}</td>
            <td className="p-4">{booking.date}</td>
            <td className="p-4">{booking.time}</td>
            <td className="p-4">
                {booking.numberOfPeople}
            </td>
            <td className="p-4">
                <ul className="list-disc pl-4">
                    {booking.preOrder.map((item, idx) => (
                        <li className='flex' key={idx}>
                            <span className='text-slate-700 font-bold text-right'>{`${item.quantity} x`}</span>
                            <span className='ml-1'>{item.foodName}</span>
                        </li>
                    ))}
                </ul>
            </td>
            <td className="p-4 text-center">{
                booking.reviewId == -1 ? (
                    <a className="link-secondary" href={`/customer/reviews/${booking.reviewId}`}>View</a>
                ) : (
                    <a className="link-primary" href={`/customer/reviews/${booking.reviewId}`}>Write</a>
                )
            }</td>
        </tr>
    );

    const renderTable = () => (
        <div>
            <table className="table-auto w-full border-collapse">
                <thead className="bg-gray-200 text-left sticky top-0">
                    <tr>
                        <th className="p-4 border-b">No.</th>
                        <th className="p-4 border-b">Date</th>
                        <th className="p-4 border-b">Time</th>
                        <th className="p-4 border-b">People</th>
                        <th className="p-4 border-b">Pre-order</th>
                        <th className="p-4 border-b">Review</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingData.map((booking, index) =>
                        renderRow(
                            (currentPage - 1) * itemsPerPage + index + 1,
                            booking
                        )
                    )}
                </tbody>
            </table>
        </div>
    );

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
        <RootLayout>
            <div>
                <CustomerSideBar user={user}>
                    <div className="grid grid-cols-1 gap-4">
                        <h2 className="text-xl font-bold">Booking History</h2>
                        {renderTable()}
                        {renderPagination()}
                    </div>
                </CustomerSideBar>
            </div>
        </RootLayout>
    );
};

export default CustomerBookingHistory;

