import { CustomTableConfig } from 'src/components/custom-table';
import { format } from "date-fns";
import { ReservationDetails } from 'src/types/reservation';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { Edit, Js, More } from 'iconsax-react';
import { Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type StatusUIItem = {
  name: string;
  variant: string;
};

export const CustomStatusUI = ({ status, data }: { status: string, data: any }) => {
  console.log("Data: ", JSON.stringify(data, null, 2));
  const listStatusUI: StatusUIItem[] = [
    { name: "completed", variant: "success" },
    { name: "confirmed", variant: "info" },
    { name: "inactive", variant: "error" },
    { name: "pending", variant: "warning" },
  ];
  const statusItem = listStatusUI.find((item) => item.name === status) || {
    name: "unknown",
    variant: "grey",
  };
  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: `${statusItem.variant}.lightest`,
        borderRadius: "10px",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: `${statusItem.variant}.main`,
        padding: "2px 0px",
      }}
    >
      <Typography variant="body2" fontWeight={600} color={`${statusItem.variant}.main`}>
        {statusItem.name}
      </Typography>
    </Box>
  );
};

export const getReservationDetailsConfig = (
  {
    onView,
  }:
    {
      onView: (ReservationDetails: ReservationDetails) => void
    }
): CustomTableConfig<ReservationDetails["id"], ReservationDetails>[] => [

    {
      key: "userName",
      headerLabel: "Customer",
      type: "string",
    },
    {
      key: "num_of_people",
      headerLabel: "People",
      type: "number",
    },
    {
      key: "date_time",
      headerLabel: "Date & Time",
      type: "string",
      renderCell: (data) => (
        <Typography>
          {format(new Date(data.date_time), "dd/MM/yyyy - h:mm a")}
        </Typography>
      )
    },
    {
      key: "special_request",
      headerLabel: "Special Request",
      type: "string",
      renderCell: (data) => (
        <Typography> 
          <div className="min-w-40 whitespace-pre-wrap">
            {data.special_request.length > 60 ? (
              <>
                {data.special_request.slice(0, 60) + "..."}
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
              data.special_request
            )}
          </div>
        </Typography>
      )
    },
    {
      key: "preorders",
      headerLabel: "Preorders",
      type: "string",
      renderCell: (data) => (
        <Stack spacing={1}>
          {data.preorders.map((preorder, index) => (
            <Typography key={index}>
              {`${preorder.name} x ${preorder.quantity}`}
            </Typography>
          ))}
        </Stack>
      )
    },
    {
      key: "status",
      headerLabel: "Status",
      type: "string",
      renderCell: (data) => (
        <CustomStatusUI
          status={data.status} data={data}
        />
      )
    },
    {
      key: "edit",
      headerLabel: "Actions",
      type: "string",
      renderCell: (data) => (
        // See details in pop up
        <Button
          color='primary'
          onClick={() => onView(data)}
          size="small"
        >
          View/Edit
        </Button>
      )
    }
  ];