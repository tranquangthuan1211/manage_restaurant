// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import RootLayout from "src/layouts/customer/layout";
// import { useUser } from "src/contexts/users/user-context";
// import StarRating from "src/components/star-rating";
// import PageHeader from "src/components/page-header";
// import { apiGet, apiPost } from "src/api/api-requests";
// import { Review } from "src/types/review";
// import { ReservationDetails } from "src/types/reservation";

// const ScoreFields = {
//   overall: "Overall",
//   atmosphere: "Atmosphere",
//   cleanliness: "Cleanliness",
//   serviceQuality: "Service Quality",
//   serviceSpeed: "Service Speed",
//   staffAppearance: "Staff Appearance",
//   staffAttitude: "Staff Attitude",
//   valueOfMoney: "Value of Money",
// };

// const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
//   <div className="flex items-center w-full col-span-full my-4">
//     <div className="flex-grow border-t border-slate-400"></div>
//     <h2 className="flex-shrink mx-2 text-slate-400 text-center italic">{title}</h2>
//     <div className="flex-grow border-t border-slate-400"></div>
//   </div>
// );

// const CustomerWriteReview: React.FC = () => {
//   const { user, isAuthenticated } = useUser() || { user: null, isAuthenticated: false };
//   const { reservationId } = useParams<{ reservationId: string }>();
//   const [reservation, setReservation] = useState<ReservationDetails | null>(null); // TODO: Change to null
//   const [formData, setFormData] = useState<Review>(() => {
//     // Initialize form data
//     const initialScores: { [key: string]: number } = {};
//     for (const key in ScoreFields) {
//       initialScores[key] = 0;
//     }
//     return { ...initialScores, feedback: "" } as Review;
//   });

//   // Redirect if the user is not authenticated
//   useEffect(() => {
//     if (!isAuthenticated || !user) {
//       window.location.href = "/auth";
//     }
//   }, [isAuthenticated, user]);

//   // Fetch reservation data
//   useEffect(() => {
//     if (reservationId) {
//       const fetchReservation = async () => {
//         try {
//           const response = await apiGet(`/reservations/${reservationId}`);

//           if (response.error == 1) {
//             console.error("Failed to fetch reservation:", response.message);
//             return;
//           }
//           console.log("Reservation data fetched:", JSON.stringify(response.data, null, 2));

//           setReservation(response.data);
//         } catch (error) {
//           console.error("Failed to fetch reservation:", error);
//         }
//       };
//       fetchReservation();
//     }
//   }, [reservationId]);

//   const handleScoreChange = (label: string, newScore: number) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [label]: newScore,
//     }));
//   };

//   const handleFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       feedback: event.target.value,
//     }));
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!user || !reservation) return;

//     const reviewData: Review = {
//       ...formData,
//       userId: user._id,
//       reservationId: reservation.id || reservationId, // MPhuong changed from reservation._id to reservation.id as declared in ReservationDetails
//     };
//     try {
//       const response = await apiPost("/reviews", reviewData);
//       alert("Review submitted successfully!");
//       console.log("Review response:", response);
//     } catch (error) {
//       console.error("Failed to submit the review:", error);
//     }
//   };

//   if (!reservation) {
//     return (
//       <RootLayout>
//         <div className="bg-gray-teal-800">
//           <div className="grid grid-cols-12 pt-8 pb-16 px-2 md:px-16">
//             <div className="col-span-full text-center">Loading reservation details...</div>
//           </div>
//         </div>
//       </RootLayout>
//     );
//   }

//   return (
//     <RootLayout>
//       <div className="bg-gray-teal-800">
//         <div className="grid grid-cols-12 pt-8 pb-16 px-2 md:px-32 gap-y-2">
//           <div className="col-span-full mb-4">
//             <PageHeader title="Review" subtitle="Thoughts on our restaurant" />
//           </div>

//           {/* Reservation Details Start */}
//           {reservation && (
//             <div className="col-span-full bg-slate-200 rounded-lg shadow-lg pb-8">
//               <div className="w-full bg-olive-green-200 p-4 rounded-t-lg text-center uppercase italic text-white">
//                 Reservation Details
//               </div>
//               <div className="mx-8 mt-4 text-sm">
//                 <p>
//                   <strong>Number of People:</strong> {reservation.num_of_people}
//                 </p>
//                 <p>
//                   <strong>Date:</strong> {new Date(reservation.date_time).toLocaleDateString()}
//                 </p>
//                 <p>
//                   <strong>Time:</strong> {new Date(reservation.date_time).toLocaleTimeString()}
//                 </p>
//                 <p>
//                   <strong>Status:</strong> {reservation.status}
//                 </p>
//                 <p>
//                   <strong>Special Request:</strong> {reservation.special_request ? reservation.special_request : <em>None</em>}
//                 </p>
//                 {reservation.preorders.length > 0 ? (
//                   <p>
//                     <strong>Preordered Items:</strong>{" "}
//                     {reservation.preorders.map((preorder, index) => (
//                       <span key={index}>
//                         {preorder.name} (x{preorder.quantity})
//                         {index < reservation.preorders.length - 1 ? ", " : ""}
//                       </span>
//                     ))}
//                   </p>
//                 ) : (
//                   <p className="italic text-slate-600">(No preorder)</p>
//                 )}
//               </div>
//             </div>
//           )}
//           {/* Reservation Details End */}


//           {/* Review Form Start */}
//           <div className="col-span-full bg-slate-200 rounded-lg shadow-lg pb-8">
//             <div className="w-full bg-olive-green-200 p-4 rounded-t-lg text-center uppercase italic text-white">
//               Review Card
//             </div>
//             <form className="flex flex-col space-y-8 px-8" onSubmit={handleSubmit}>
//               {/* Rating */}
//               <div>
//                 <SectionHeader title="Rating" />
//                 <div className="grid grid-cols-12">
//                   {Object.entries(ScoreFields).map(([key, label]) => (
//                     <div
//                       key={key}
//                       className="col-span-full grid grid-cols-12 hover:bg-slate-100 px-4 py-4 md:py-2 rounded-md"
//                     >
//                       <label htmlFor={key} className="col-span-6 md:col-span-8">
//                         {label}
//                       </label>
//                       <div className="col-span-6 md:col-span-4">
//                         <StarRating label={key} onChange={handleScoreChange} />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Feedback */}
//               <div>
//                 <SectionHeader title="Feedback" />
//                 <textarea
//                   id="feedback"
//                   name="feedback"
//                   rows={4}
//                   className="w-full border border-gray-300 rounded-md p-4 shadow-inner"
//                   placeholder="Write your detailed feedback here..."
//                   value={formData.feedback}
//                   onChange={handleFeedbackChange}
//                 />
//               </div>

//               {/* Submit */}
//               <div className="flex justify-center">
//                 <button type="submit" className="button-red">
//                   Submit hihihi
//                 </button>
//               </div>
//             </form>
//             {/* Review Form End */}

//           </div>
//         </div>
//       </div>
//     </RootLayout>
//   );
// };


// export default CustomerWriteReview;

// Mphuong's version to add constraints to the review sending: all ratings must be filled
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RootLayout from "src/layouts/customer/layout";
import { useUser } from "src/contexts/users/user-context";
import StarRating from "src/components/star-rating";
import PageHeader from "src/components/page-header";
import { apiGet, apiPost } from "src/api/api-requests";

// Alert Component to ensure all ratings are filled before submission
const CustomAlert: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <span className="block sm:inline">{message}</span>
  </div>
);

export interface Reservation {
  id?: string;
  userId: string;
  num_of_people: number;
  date_time: string;
  status: string;
  special_request?: string;
  preorders: {
    menuItemId: string;
    name: string;
    quantity: number;
  }[];
  createAt?: string;
}

// Define the structure of the review scores
export interface ReviewScores {
  overall: number;
  atmosphere: number;
  cleanliness: number;
  serviceQuality: number;
  serviceSipeed: number;
  staffAppearance: number;
  staffAttitude: number;
  valueOfMoney: number;
}

// Extend the Review interface to include all required fields
export interface Review extends ReviewScores {
  userId?: string;
  reservationId?: string;
  feedback: string;
}

const ScoreFields: Record<keyof ReviewScores, string> = {
  overall: "Overall",
  atmosphere: "Atmosphere",
  cleanliness: "Cleanliness",
  serviceQuality: "Service Quality",
  serviceSipeed: "Service Speed",
  staffAppearance: "Staff Appearance",
  staffAttitude: "Staff Atttude",
  valueOfMoney: "Value of Money",
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center w-full col-span-full my-4">
    <div className="flex-grow border-t border-slate-400"></div>
    <h2 className="flex-shrink mx-2 text-slate-400 text-center italic">{title}</h2>
    <div className="flex-grow border-t border-slate-400"></div>
  </div>
);

const CustomerWriteReview: React.FC = () => {
  const { user, isAuthenticated } = useUser() || { user: null, isAuthenticated: false };
  const { reservationId } = useParams<{ reservationId: string }>();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [formData, setFormData] = useState<Review>(() => {
    const initialScores: ReviewScores = {
      overall: 0,
      atmosphere: 0,
      cleanliness: 0,
      serviceQuality: 0,
      serviceSipeed: 0,
      staffAppearance: 0,
      staffAttitude: 0,
      valueOfMoney: 0,
    };
    return { ...initialScores, feedback: "" };
  });

  useEffect(() => {
    if (!isAuthenticated || !user) {
      window.location.href = "/auth";
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (reservationId) {
      const fetchReservation = async () => {
        try {
          const response = await apiGet(`/reservations/${reservationId}`);

          if (response.error == 1) {
            console.error("Failed to fetch reservation:", response.message);
            return;
          }
          console.log("Reservation data fetched:", JSON.stringify(response.data, null, 2));

          setReservation(response.data);
        } catch (error) {
          console.error("Failed to fetch reservation:", error);
        }
    };
      fetchReservation();
    }
  }, [reservationId]);
  const handleScoreChange = (label: string, newScore: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [label]: newScore,
    }));
    setShowValidationAlert(false);
  };
  // Type guard to check if a string is a valid ReviewScores key
  const isReviewScoreKey = (key: string): key is keyof ReviewScores => {
    return key in ScoreFields;
  };

  const validateRatings = () => {
    return (Object.keys(ScoreFields) as Array<keyof ReviewScores>)
      .every((key) => formData[key] > 0);
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      feedback: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !reservation) return;

    if (!validateRatings()) {
      setShowValidationAlert(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const reviewData: Review = {
      ...formData,
      userId: user._id,
      reservationId: reservation.id || reservationId,
    };

    try {
      const response = await apiPost("/reviews", reviewData);
      alert("Review submitted successfully!");
      console.log("Review response:", response);
      window.location.href = '/customer/personal'; // auto redirect to personal page
    } catch (error) {
      console.error("Failed to submit the review:", error);
    }
  };

  if (!reservation) {
    return (
      <RootLayout>
        <div className="bg-gray-teal-800">
          <div className="grid grid-cols-12 pt-8 pb-16 px-2 md:px-16">
            <div className="col-span-full text-center">Loading reservation details...</div>
          </div>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="bg-gray-teal-800">
        <div className="grid grid-cols-12 pt-8 pb-16 px-2 md:px-16">
          <div className="col-span-full mb-4">
            <PageHeader title="Review" subtitle="Thoughts on our restaurant" />
          </div>

          {showValidationAlert && (
            <div className="col-span-full mb-4">
              <CustomAlert
                message="You need to rate all listed criteria before sending your ratings to us! We have always appreciated your time. Your ratings are precious as we wish to upgrade your next experience with us ultimately."
              />
            </div>
          )}

          {/* Reservation Details */}
          <div className="col-span-full bg-slate-200 rounded-lg shadow-lg pb-8">
            <div className="w-full bg-olive-green-200 p-4 rounded-t-lg text-center uppercase italic text-white">
              Reservation Details
            </div>
            <div className="mx-8 mt-4 text-sm">
              <p>
                <strong>Date & Time:</strong> {new Date(reservation.date_time).toLocaleString()}
              </p>
              <p>
                <strong>Number of People:</strong> {reservation.num_of_people}
              </p>
              <p>
                <strong>Status:</strong> {reservation.status}
              </p>
              {reservation.special_request && (
                <p>
                  <strong>Special Request:</strong> {reservation.special_request}
                </p>
              )}
              {reservation.preorders.length > 0 ? (
                  <p>
                    <strong>Preordered Items:</strong>{" "}
                    {reservation.preorders.map((preorder, index) => (
                      <span key={index}>
                        {preorder.name} (x{preorder.quantity})
                        {index < reservation.preorders.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                ) : (
                  <p className="italic text-slate-600">(No preorder)</p>
                )}
              </div>
            </div>

          {/* Review Form */}
          <div className="col-span-full bg-slate-200 rounded-lg shadow-lg pb-8">
            <div className="w-full bg-olive-green-200 p-4 rounded-t-lg text-center uppercase italic text-white">
              Review Card
            </div>
            <form className="flex flex-col space-y-8 px-8" onSubmit={handleSubmit}>
              {/* Rating */}
              <div>
                <SectionHeader title="Rating" />
                <div className="grid grid-cols-12">
                  {Object.entries(ScoreFields).map(([key, label]) => (
                    <div
                      key={key}
                      className="col-span-full grid grid-cols-12 hover:bg-slate-100 px-4 py-4 md:py-2 rounded-md"
                    >
                      <label htmlFor={key} className="col-span-6 md:col-span-8">
                        {label}
                      </label>
                      <div className="col-span-6 md:col-span-4">
                        <StarRating
                          label={key}
                          onChange={handleScoreChange}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div>
                <SectionHeader title="Feedback" />
                <textarea
                  id="feedback"
                  name="feedback"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-4 shadow-inner"
                  placeholder="Write your detailed feedback here..."
                  value={formData.feedback}
                  onChange={handleFeedbackChange}
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <button type="submit" className="button-red">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default CustomerWriteReview;

