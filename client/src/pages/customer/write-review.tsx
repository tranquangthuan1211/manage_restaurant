import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RootLayout from "src/layouts/customer/layout";
import { useUser } from "src/contexts/users/user-context";
import StarRating from "src/components/star-rating";
import PageHeader from "src/components/page-header";
import { apiGet, apiPost } from "src/api/api-requests";
import { Review } from "src/types/review";

// Reservation type
export interface Reservation {
  id?: string; // Optional if pushing data
  userId: string;
  num_of_people: number;
  date_time: string; // ISO 8601 date-time string
  status: string;
  special_request?: string;
  preorders: {
    menuItemId: string;
    quantity: number;
  }[];
  createAt?: string; // filled in by the server, ISO 8601 date-time string
}

const ScoreFields = {
  overall: "Overall",
  atmosphere: "Atmosphere",
  cleanliness: "Cleanliness",
  serviceQuality: "Service Quality",
  serviceSpeed: "Service Speed",
  staffAppearance: "Staff Appearance",
  staffAttitude: "Staff Attitude",
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
  const [formData, setFormData] = useState<Review>(() => {
    const initialScores: { [key: string]: number } = {};
    for (const key in ScoreFields) {
      initialScores[key] = 0;
    }
    return { ...initialScores, feedback: "" } as Review;
  });

  // Redirect if the user is not authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) {
      window.location.href = "/auth";
    }
  }, [isAuthenticated, user]);

  // Fetch reservation data
  useEffect(() => {
    if (reservationId) {
      const fetchReservation = async () => {
        try {
          const data = await apiGet(`/reservations/${reservationId}`);
          setReservation(data);
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

    const reviewData: Review = {
      ...formData,
      userId: user._id,
      reservationId: reservation.id || reservationId,
    };
    try {
      const response = await apiPost("/reviews", reviewData);
      alert("Review submitted successfully!");
      console.log("Review response:", response);
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
              {reservation.preorders.length > 0 && (
                <p>
                  <strong>Preordered Items:</strong>{" "}
                  {reservation.preorders.map(
                    (preorder, index) => `${preorder.menuItemId} (x${preorder.quantity})${index < reservation.preorders.length - 1 ? ", " : ""}`
                  )}
                </p>
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
                        <StarRating label={key} onChange={handleScoreChange} />
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
