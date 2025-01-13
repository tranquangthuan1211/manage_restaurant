import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { ReservationDetails } from 'src/types/reservation';
import format from 'date-fns/format';
import { apiPost } from 'src/api/api-requests';

interface ReservationDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  reservation: ReservationDetails | null;
  onStatusChange?: (reservationId : string, status: string) => void;
  onStatusSave?: (reservationId : string, status: string) => void;
}

const ReservationDetailsDialog: React.FC<ReservationDetailsDialogProps> = ({ open, onClose, reservation, onStatusChange, onStatusSave}) => {
  const [status, setStatus] = useState(reservation?.status);
  const [isStatusChanged, setIsStatusChanged] = useState(false);

  if (!reservation) return null;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setIsStatusChanged(true);
    if (onStatusChange) {
      onStatusChange(reservation.id, e.target.value);
    }
  };

  const handleSave = async () => {
    try {
      const response = await apiPost(`/reservations/status/${reservation.id}`, { status });
      if (response.error === 0) {
        if (status && onStatusSave) {
          onStatusSave(reservation.id, status);
        }
        console.log("Status saved successfully");
      } else {
        console.error("Failed to save status:", response.message);
      }
    }
    catch (error) {
      console.error("Failed to save status:", error);
    }
    setIsStatusChanged(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reservation ID: {reservation.id}</DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-2 gap-4">
          <p className="font-bold text-teal-600">User Name</p>
          <p>{reservation.userName}</p>
          <p className="font-bold text-teal-600">Number of People</p>
          <p>{reservation.num_of_people}</p>
          <p className="font-bold text-teal-600">Date and Time</p>
          <p>{format(new Date(reservation.date_time), "dd/MM/yyyy - h:mm a")}</p>
          <p className="font-bold text-teal-600">Status</p>
          <div>
            <select
              value={status}
              onChange={handleStatusChange}
              className="border border-gray-300 rounded p-1"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="col-span-2">
            <p className="font-bold text-teal-600">Special Request</p>
            <p>{reservation.special_request}</p>
          </div>
          <div className="col-span-2">
            <p className="font-bold text-teal-600">Preorders</p>
            {reservation.preorders.length > 0 ? (
              <div className="list-disc list-inside grid grid-cols-2">
                {reservation.preorders.map((preorder, index) => (
                  <div key={index} className="text-base">
                    {preorder.name} <span className="font-bold text-gray-600">x {preorder.quantity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <em className="text-gray-500">(no preorders)</em>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        {isStatusChanged && (
          <Button onClick={handleSave} color="primary">Save</Button>
        )}
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReservationDetailsDialog;