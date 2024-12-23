import RootLayout from 'src/layouts/customer/layout';
import { useUser } from 'src/contexts/users/user-context';
import StarRating from 'src/components/star-rating';
import { useState } from 'react';
import { Restaurant } from '@mui/icons-material';


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
  <div className="flex items-center col-span-full my-4">
    <div className="flex-grow border-t border-olive-green-600"></div>
    <span className="flex-shrink mx-2 text-olive-green-600 text-center italic">{title}</span>
    <div className="flex-grow border-t border-olive-green-600"></div>
  </div>
);

const CustomerWriteReview: React.FC = () => {
  const { user, isAuthenticated } = useUser() || { user: null, isAuthenticated: false };
  const [formData, setFormData] = useState(
    Object.keys(ScoreFields).reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
  );

  const handleScoreChange = (label: string, newScore: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [label]: newScore,
    }));
    console.log(formData);
  };

  if (!isAuthenticated) {
    window.location.href = "/auth";
    return null;
  }

  return (
    <RootLayout>
      <div className="bg-gray-teal-800">
        <div className="grid grid-cols-12 pt-8 pb-16 px-16">
          <div className="col-span-full flex flex-col items-center mb-4">
            <SectionHeader title="Review" />
            <p className="text-primary text-center">Thoughts on your reservations</p>
          </div>

          <div className="col-span-full bg-slate-200 rounded-lg shadow-lg pb-8">
            <div className="w-full bg-olive-green-200 p-4 rounded-t-lg text-center uppercase italic text-white">
              Review Card
            </div>
            <div className="mx-8 mt-4 text-sm text-center mb-8">
              <p className="text-olive-green-600 italic">
                Thanks for choosing Baby Hippo Restaurant for having your meal!
              </p>
              <p>Please take 5 minutes to fill this review card. It helps us improve and serve better as per your taste.</p>
            </div>

            <form className="flex flex-col space-y-8 px-8">
              <div>
                <SectionHeader title="Rating" />
                <div className="space-y-6">
                  {Object.entries(ScoreFields).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between hover:bg-slate-100 px-4 py-2 rounded-md">
                      <label htmlFor={key} className="font-medium text-gray-700">
                        {label}
                      </label>
                      <StarRating label={key} onChange={handleScoreChange} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionHeader title="Detail Feedback" />
                <textarea
                  id="feedback"
                  name="feedback"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-4 shadow-inner"
                  placeholder="Write your detailed feedback here..."
                />
              </div>

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