import { CustomTableConfig } from 'src/components/custom-table';
import { format } from "date-fns";
import { ReviewDetails } from 'src/types/review';
import { Button, Typography, Stack } from '@mui/material';

export const getReviewDetailsConfig = (
  {
    onView,
  }:
    {
      onView: (ReviewDetails: ReviewDetails) => void
    }
): CustomTableConfig<ReviewDetails["id"], ReviewDetails>[] => [
    {
      key: "userName",
      headerLabel: "Customer",
      type: "string",
    },
    {
      key: "reservationDateTime",
      headerLabel: "Reservation Date & Time",
      type: "string",
      renderCell: (data) => (
        <Typography>
          {format(new Date(data.reservationDateTime), "dd/MM/yyyy - h:mm a")}
        </Typography>
      )
    },
    {
      key: "overall",
      headerLabel: "Overall Rating",
      type: "number",
    },
    {
      key: "feedback",
      headerLabel: "Feedback",
      type: "string",
      renderCell: (data) => (
        <Typography>
          <div className="min-w-40 whitespace-pre-wrap">
            {data.feedback.length > 60 ? (
              <>
                {data.feedback.slice(0, 60) + "..."}
                <Button
                  variant="text"
                  size="small"
                  color="primary"
                  sx={{ textTransform: "none" }}
                  onClick={() => onView(data)}
                >
                  Read more
                </Button>
              </>
            ) : (
              data.feedback
            )}
          </div>
        </Typography>
      )
    },
    {
      key: "createdAt",
      headerLabel: "Created At",
      type: "string",
      renderCell: (data) => (
        <Typography>
          {format(new Date(data.createdAt), "dd/MM/yyyy - h:mm a")}
        </Typography>
      )
    },
    {
      key: "edit",
      headerLabel: "Actions",
      type: "string",
      renderCell: (data) => (
        <Button
          color='primary'
          onClick={() => onView(data)}
          size="small"
        >
          View
        </Button>
      )
    }
  ];