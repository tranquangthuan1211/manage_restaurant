import React, { useState, useEffect } from 'react';
import { useUser } from 'src/contexts/users/user-context';
import RootLayout from 'src/layouts/customer/layout';
import CustomerSideBar from '../../components/customer/sidebar';
import { Review, ReviewDetails } from 'src/types/review';
import { apiGet } from 'src/api/api-requests';

const ScoreFields : any = {
  overall: "Overall",
  atmosphere: "Atmosphere",
  cleanliness: "Cleanliness",
  serviceQuality: "Service Quality",
  serviceSpeed: "Service Speed",
  staffAppearance: "Staff Appearance",
  staffAttitude: "Staff Attitude",
  valueOfMoney: "Value of Money",
};

const CustomerReviewHistory = () => {
  const [reviewData, setReviewData] = useState<ReviewDetails[]|null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 1;

  const { user, isAuthenticated } = useUser() || { user: null, isAuthenticated: false };
  if (user === null || !isAuthenticated) {
    window.location.href = '/auth';
    return <div></div>;
  }

  const fetchReviewData = async (page: number) => {
    setLoading(true);
    try {
      const response = await apiGet(`/reviews/by-user/${user._id}?page=${page}&limit=${itemsPerPage}`);
      console.log(JSON.stringify(response, null, 2));
      if (response.error == 1) {
        console.error("Failed to fetch review:", response.message);
        return;
      }

      setReviewData(response.data.items);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error : any) {
      console.error("An error occurred while fetching review data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewData(currentPage);
  }, [currentPage]);

  const MAX_SCORE = 5;
  const MAX_FEEDBACK_LENGTH = 100;
  const renderRow = (index: number, reviewDetails: ReviewDetails) => (
    <tr key={index} className="hover:bg-gray-100">
      <td className="p-4 text-center">{index}</td>
      <td className="p-4 text-center">{new Date(reviewDetails.reservationDateTime).toLocaleDateString()}</td>
      <td className="p-4 text-center">{new Date(reviewDetails.reservationDateTime).toLocaleTimeString()}</td>
      <td className="p-4 text-left">
        <ul className="list-none p-0 m-0 flex flex-col gap-y-1">
          {Object.entries(reviewDetails).map(([key, value]) => {
            if (key in ScoreFields) {
              return (
                <li key={key} className="flex items-center">
                  <span className="w-3/4">{ScoreFields[key]}</span>
                  <span className="w-1/4 text-end font-bold">
                    {value}
                    {`/${MAX_SCORE}`}
                  </span>
                </li>
              );
            }
          })}
        </ul>
      </td>
      <td className="p-4 w-4/12 text-left">
        {reviewDetails.feedback.length > MAX_FEEDBACK_LENGTH ? `${reviewDetails.feedback.substring(0, MAX_FEEDBACK_LENGTH)}...` : reviewDetails.feedback}
        {reviewDetails.feedback.length > MAX_FEEDBACK_LENGTH && (
          <button className="ml-2 link-primary" onClick={() => alert(reviewDetails.feedback)}>More</button>
        )}
      </td>
    </tr>
  );

  const renderTable = () => (
    <div>
      <table className="table-auto w-full border-collapse">
        <thead className="bg-gray-200 text-left sticky top-0">
          <tr className="text-xs">
            <th className="p-4 border-b">No.</th>
            <th className="p-4 border-b">Date</th>
            <th className="p-4 border-b">Time</th>
            <th className="p-4 border-b">Score</th>
            <th className="p-4 border-b">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {reviewData && reviewData.map((reviewDetails : ReviewDetails, index: number) =>
            renderRow(
              (currentPage - 1) * itemsPerPage + index + 1,
              reviewDetails
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
    <div>
      <RootLayout>
        <CustomerSideBar user={user}>
          <div className="grid grid-cols-1 gap-4">
            <h2 className="text-xl font-bold">Review History</h2>
            {loading && <div>Loading...</div>}
            {!loading && reviewData && (<div>
              {renderTable()}
              {renderPagination()}
            </div>)}
            {!loading && !reviewData && (<div>Loading...</div>)}
            {!loading && reviewData && reviewData.length === 0 && (
              <div>No review found</div>
            )}
          </div>
        </CustomerSideBar>
      </RootLayout>
    </div>
  );
}

export default CustomerReviewHistory;