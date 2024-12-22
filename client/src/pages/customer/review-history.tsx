import React, { useState, useEffect } from 'react';
import { useUser } from 'src/contexts/users/user-context';
import RootLayout from 'src/layouts/customer/layout';
import CustomerSideBar from './sidebar';

interface StarScoreProps {
  filled: boolean;
}

const StarScore: React.FC<StarScoreProps> = ({ filled }) => {
  const FILLED_COLOR = "#fff68f";
  const UNFILLED_COLOR = '#a9bbe5';
  return (
    <svg className='w-4 h-4' viewBox="0 0 24 24" fill={filled ? FILLED_COLOR : UNFILLED_COLOR} xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke={UNFILLED_COLOR} stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
      </g>
    </svg>
  )
};

interface Review {
  reviewId: number;
  date: string;
  time: string;
  overall: number;
  service: number;
  foodQuality: number;
  feedback: string;
}

const placeholderData: Review[] = [
  {
    reviewId: 1122,
    date: '2023-10-01',
    time: '18:30',
    overall: 1,
    service: 1,
    foodQuality: 1,
    feedback: 'Terrible experience. The service was slow, and the food was cold and tasteless. I would not recommend this place to anyone.'
  },
  {
    reviewId: 2233,
    date: '2023-10-02',
    time: '19:00',
    overall: 2,
    service: 2,
    foodQuality: 2,
    feedback: 'Not great. The service was below average, and the food quality was disappointing. I expected more from this restaurant.'
  },
  {
    reviewId: 3344,
    date: '2023-10-03',
    time: '20:00',
    overall: 1,
    service: 1,
    foodQuality: 1,
    feedback: 'Worst dining experience ever. The staff was rude, and the food was inedible. I will never come back to this place again.'
  },
  {
    reviewId: 4455,
    date: '2023-10-04',
    time: '21:00',
    overall: 3,
    service: 3,
    foodQuality: 3,
    feedback: 'Average. The service was okay, and the food was decent. Nothing special about this place.'
  },
  {
    reviewId: 5566,
    date: '2023-10-05',
    time: '22:00',
    overall: 4,
    service: 4,
    foodQuality: 4,
    feedback: 'Good experience. The service was prompt, and the food was delicious. I would recommend this place to others.'
  },
  {
    reviewId: 6677,
    date: '2023-10-06',
    time: '23:00',
    overall: 5,
    service: 5,
    foodQuality: 5,
    feedback: 'Excellent. The service was outstanding, and the food was exceptional. I will definitely be coming back here again.'
  }
]

const CustomerReviewHistory = () => {
  const [reviews, setReviews] = useState<Review[]>(placeholderData); // TODO: Replace with []
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4); // TODO: Replace with 0
  const itemsPerPage = 3;

  const userContext = useUser();
  const user = userContext ? userContext.user : null;
  const isAuthenticated = userContext ? userContext.isAuthenticated : false;

  if (!isAuthenticated) {
    window.location.href = '/auth';
    return <div></div>;
  }

  const fetchReviews = async (page: number) => {
    const response = await fetch(`/api/reviews?page=${page}&limit=${itemsPerPage}`);
    const data = await response.json();
    setReviews(data.reviews);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  const MAX_SCORE = 5;
  const MAX_FEEDBACK_LENGTH = 100;
  const renderRow = (index: number, review : Review) => (
    <tr key={index} className="hover:bg-gray-100">
      <td className="p-4 text-center">{index}</td>
      <td className="p-4 text-center">{review.date}</td>
      <td className="p-4 text-center">{review.time}</td>
      <td className="p-4 text-left">
        <ul className="list-none p-0 m-0">
          <li className='flex flex-col'>
            <span>Overall</span>
            <div className="flex">
              {[...Array(MAX_SCORE)].map((_, i) => (
                <StarScore key={i} filled={i < review.overall} />
              ))}
            </div>
          </li>
          <li className='flex flex-col'>
            <span>Service</span>
            <div className="flex">
              {[...Array(MAX_SCORE)].map((_, i) => (
                <StarScore key={i} filled={i < review.service} />
              ))}
            </div>
          </li>
          <li className='flex flex-col'>
            <span>Food Quality</span>
            <div className="flex">
              {[...Array(MAX_SCORE)].map((_, i) => (
                <StarScore key={i} filled={i < review.foodQuality} />
              ))}
            </div>
          </li>
        </ul>
      </td>
      <td className="p-4 w-4/12 text-left">
        {review.feedback.length > MAX_FEEDBACK_LENGTH ? `${review.feedback.substring(0, MAX_FEEDBACK_LENGTH)}...` : review.feedback}
        {review.feedback.length > MAX_FEEDBACK_LENGTH && (
          <button className="text-blue-500 ml-2 link-primary" onClick={() => alert(review.feedback)}>More</button>
        )}
      </td>
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
            <th className="p-4 border-b">Score</th>
            <th className="p-4 border-b">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review : Review, index : number) =>
            renderRow(
              (currentPage - 1) * itemsPerPage + index + 1,
              review
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
            {renderTable()}
            {renderPagination()}
          </div>
        </CustomerSideBar>
      </RootLayout>
    </div>
  );
}

export default CustomerReviewHistory;
