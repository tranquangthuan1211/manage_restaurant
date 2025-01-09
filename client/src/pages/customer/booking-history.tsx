import React, { useState, useEffect } from 'react';
import RootLayout from 'src/layouts/customer/layout';
import CustomerSideBar from '../../components/customer/sidebar';
import { useUser } from 'src/contexts/users/user-context';
import { ReservationDetails } from 'src/types/reservation';
import { apiGet } from 'src/api/api-requests';

const CustomerBookingHistory = () => {
    const { user, isAuthenticated } = useUser() || { user: null, isAuthenticated: false };
    if (user === null || !isAuthenticated) {
        window.location.href = '/auth';
        return <div></div>;
    }

    const [reservationData, setReservationData] = useState<ReservationDetails[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 5;

    const fetchreservationData = async (page: number) => {
        setLoading(true);
        try {
            const response = await apiGet(`/reservations/by-user/${user._id}?page=${page}&limit=${itemsPerPage}`);
            if (response.error) {
                console.error("Failed to fetch reservation:", response.message);
                return;
            }
            console.log(JSON.stringify(response.data, null, 2));

            setReservationData(response.data.items);
            setTotalPages(response.data.pagination.totalPages);
        } catch (error) {
            console.error("An error occurred while fetching reservation data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchreservationData(currentPage);
    }, [currentPage]);

    const renderRow = (index: number, reservationDetails: ReservationDetails) => (
        <tr key={index} className="hover:bg-gray-100">
            <td className="p-4 text-center">{index}</td>
            <td className="p-4">{new Date(reservationDetails.date_time).toLocaleDateString()}</td>
            <td className="p-4">{new Date(reservationDetails.date_time).toLocaleTimeString()}</td>
            <td className="p-4">
                {reservationDetails.num_of_people}
            </td>
            <td className="p-4">
                <ul className="list-disc pl-4">
                    {reservationDetails.preorders.map((item, idx) => (
                        <li className='flex' key={idx}>
                            <span className='text-slate-700 font-bold text-right'>{`${item.quantity} x`}</span>
                            <span className='ml-1'>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </td>
            <td className="p-4 text-center">{
                // Even though we have a reviewId, the page finds the reivew by reservationId
                // the reviewId is just used to check if the review exists
                (reservationDetails.reviewId !== "") ? (
                    <a className="link-secondary" href={`/customer/reviews/view/${reservationDetails.id}`}>View</a>
                ) : (
                    <a className="link-primary" href={`/customer/reviews/write/${reservationDetails.id}`}>Write</a>
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
                    {reservationData && reservationData.map((booking, index) =>
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
                        {loading && <div>Loading...</div>}
                        {!loading && reservationData && (<div>
                            {renderTable()}
                            {renderPagination()}
                        </div>)}
                        {!loading && !reservationData && (<div>Loading...</div>)}
                        {!loading && reservationData && reservationData.length === 0 && (
                            <div>You didn't have any reservation yet...</div>
                        )}
                    </div>
                </CustomerSideBar>
            </div>
        </RootLayout>
    );
};

export default CustomerBookingHistory;
