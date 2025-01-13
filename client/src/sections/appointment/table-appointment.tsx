import { CustomTable } from "src/components/custom-table";
import { getReservationDetailsConfig } from "./reservation-table-config";
import usePagination from 'src/hooks/use-pagination';
import { TablePagination } from "@mui/material";
import { Reservation, ReservationDetails } from "src/types/reservation";
import { useDialog } from "src/hooks/use-dialog";
import { useEffect, useState } from "react";
import { apiGet } from "src/api/api-requests";
import ReservationDetailsDialog from './reservation-details-dialog';

export const ReservationTable = () => {
  const [reservations, setReservations] = useState<ReservationDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const reservationDialog = useDialog<ReservationDetails>();

  const handleStatusSave = async (reservationId : string, status: string) => {
    // Update reservations
    const updatedReservations = reservations.map((reservation) => {
      if (reservation.id === reservationId) {
        return {
          ...reservation,
          status,
        };
      }
      return reservation;
    });
    setReservations(updatedReservations);
  };
  
  useEffect(() => {
    // For testing purposes, we will only fetch reservations if there are none
    if (reservations.length > 0) return;

    const fetchReservations = async () => {
      setLoading(true);
      try {
        const response = await apiGet("/reservations");
        console.log("Getting reservations...");
        if (response.error === 0) {
          console.log("Reservations: \n", JSON.stringify(response.data, null, 2));
          setReservations(response.data.items);
        } else {
          console.error("Failed to fetch reservations:", response.message);
        }
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    console.log("Getting reservations...");
    fetchReservations();
  }, []);

  const configs = getReservationDetailsConfig({
    onView: (reservation: Reservation) =>{ reservationDialog.handleOpen(reservation as ReservationDetails)},
  });

  const pagination = usePagination({ count: reservations.length, base1Index: true });

  return (
    <>
      {loading ? (
        <div className="flex text-center w-full justify-center">
          <h1>Loading...</h1>
        </div>
      ) : (
        reservations && reservations.length > 0 ? (
          <>
            <CustomTable
              configs={configs}
              rows={reservations}
              pagination={pagination}
            />
            {/* <TablePagination
              component="div"
              count={pagination.count}
              page={pagination.page}
              onPageChange={pagination.onPageChange}
              rowsPerPage={pagination.rowsPerPage}
              onRowsPerPageChange={pagination.onRowsPerPageChange}
              rowsPerPageOptions={[2, 10, 25, 100]}
              sx={{
                position: "fixed",
                bottom: 0,
                right: 0,
                left: 0,
              }}
            /> */}
            <ReservationDetailsDialog
              open={reservationDialog.open}
              onClose={reservationDialog.handleClose}
              reservation={reservationDialog.data as ReservationDetails | null}
              onStatusChange={handleStatusSave}
            />
          </>
        ) : (
          <div className="flex text-center w-full justify-center">
            <h1>No reservations found</h1>
          </div>
        )
      )}
    </>
  );
};