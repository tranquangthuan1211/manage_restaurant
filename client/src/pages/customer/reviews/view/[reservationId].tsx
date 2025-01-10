import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RootLayout from "src/layouts/customer/layout";
import { useUser } from "src/contexts/users/user-context";
import StarRating from "src/components/star-rating";
import PageHeader from "src/components/page-header";
import { apiGet } from "src/api/api-requests";
import { Review } from "src/types/review";
import { ReservationDetails } from "src/types/reservation";

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


const CustomerViewReview: React.FC = () => {
  const { user, isAuthenticated } = useUser() || { user: null, isAuthenticated: false };
  const { reservationId } = useParams<{ reservationId: string }>();
  const [reservation, setReservation] = useState<ReservationDetails | null>(null);
  const [review, setReview] = useState<Review | null>(null);

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
          console.log(`Response data: ${JSON.stringify(response.data, null, 2)}`);
          setReservation(response.data);
        } catch (error) {
          console.error("Failed to fetch reservation:", error);
        }
      };
      fetchReservation();
    }
  }, [reservationId]);

  useEffect(() => {
    if (reservationId) {
      const fetchReview = async () => {
        try {
          const response = await apiGet(`/reviews/by-reservation/${reservationId}`);
          if (response.error == 1) {
            console.error("Failed to fetch review: ", response.message);
            return;
          }
          setReview(response.data);
        } catch (error) {
          console.error("Failed to fetch review: ", error.message || "Unknow error");
        }
      };
      fetchReview();
    }
  }, [reservationId]);

  if (!reservation || !review) {
    return (
      <RootLayout>
        <div className="bg-gray-teal-800">
          <div className="grid grid-cols-12 pt-8 pb-16 px-2 md:px-16">
            <div className="col-span-full text-center">Loading reservation and review details...</div>
          </div>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="bg-gray-teal-800">
        <div className="grid grid-cols-12 pt-8 pb-16 px-2 md:px-32 gap-y-2">
          <div className="col-span-full mb-4">
            <PageHeader title="Review" subtitle="Thoughts on our restaurant" />
          </div>

          {/* Rerservation Details Start */}
          {reservation && (
            <div className="col-span-full bg-slate-200 rounded-lg shadow-lg pb-8">
              <div className="w-full bg-olive-green-200 p-4 rounded-t-lg text-center uppercase italic text-white">
                Reservation Details
              </div>
              <div className="mx-8 mt-4 text-sm">
                <p>
                  <strong>Number of People:</strong> {reservation.num_of_people}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(reservation.date_time).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {new Date(reservation.date_time).toLocaleTimeString()}
                </p>
                <p>
                  <strong>Status:</strong> {reservation.status}
                </p>
                <p>
                  <strong>Special Request:</strong> {reservation.special_request ? reservation.special_request : <em>None</em>}
                </p>
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
          )}
          {/* Rerservation Details End */}


          <div className="col-span-full bg-slate-200 rounded-lg shadow-lg pb-8">
            <div className="w-full bg-olive-green-200 p-4 rounded-t-lg text-center uppercase italic text-white">
              Review Card (Read-Only)
            </div>
            <div className="flex flex-col space-y-8 px-8">
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
                        <StarRating label={key} value={(review as any)[key]} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionHeader title="Feedback" />
                <textarea
                  id="feedback"
                  name="feedback"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-4 shadow-inner"
                  placeholder="No feedback provided."
                  value={review.feedback}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default CustomerViewReview;