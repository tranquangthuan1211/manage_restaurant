import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ReviewDetails } from 'src/types/review';
import format from 'date-fns/format';

interface ReviewDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  review: ReviewDetails | null;
}

const ReviewDetailsDialog: React.FC<ReviewDetailsDialogProps> = ({ open, onClose, review }) => {
  if (!review) return null;

  const ratings = [
    { label: 'Overall Rating', value: review.overall },
    { label: 'Atmosphere', value: review.atmosphere },
    { label: 'Cleanliness', value: review.cleanliness },
    { label: 'Service Quality', value: review.serviceQuality },
    { label: 'Service Speed', value: review.serviceSpeed },
    { label: 'Staff Appearance', value: review.staffAppearance },
    { label: 'Staff Attitude', value: review.staffAttitude },
    { label: 'Value of Money', value: review.valueOfMoney },
  ];
  const ratingColors = (rating: number) => {
    if (!rating) return 'gray-600';
    if (rating >= 4) return 'green-600';
    if (rating >= 3) return 'yellow-600';
    if (rating >= 2) return 'orange-600';
    return 'red-600';
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Review ID: {review.id}</DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-2 gap-4">
          <p className="font-bold text-teal-600">User Name</p>
          <p>{review.userName}</p>
          <p className="font-bold text-teal-600">Reservation ID</p>
          <p>{review.reservationId}</p>
          <p className="font-bold text-teal-600">Reservation Date and Time</p>
          <p>{format(new Date(review.reservationDateTime), "dd/MM/yyyy - h:mm a")}</p>
          <p className="font-bold text-teal-600 col-span-2">Ratings</p>
          {ratings.map((rating, index) => (
            <React.Fragment key={index}>
              <p className="font-bold text-teal-600">{rating.label}</p>
              <p className={`font-bold text-${ratingColors(rating.value)}`}>{rating.value ? rating.value : "-" }/5</p>
            </React.Fragment>
          ))}
          <div className="col-span-2">
            <p className="font-bold text-teal-600">Feedback</p>
            {review.feedback && review.feedback.length > 0 ? (
              <p>{review.feedback}</p>)
              : <em className='text-gray-600'>(No feedback provided)</em>}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDetailsDialog;