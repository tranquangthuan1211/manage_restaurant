import {CustomTableConfig } from 'src/components/custom-table';
import {Complaint} from "src/types/complaint"
import { format } from "date-fns";
import { Appointment } from 'src/types/appointment';
import { IconButton, Stack, Typography } from '@mui/material';
import { Edit } from 'iconsax-react';
import { Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// {data.createdAt ? format(new Date(data.createdAt), "dd/MM/yyyy") : ""}
import appointment from 'src/api/appointment';
type StatusUIItem = {
    name: string;
    variant: string;
  };
export const CustomStatusUI = ({ status }: { status: string }) => {
    const listStatusUI: StatusUIItem[] = [
        { name: "completed", variant: "success" },
        { name: "Inactive", variant: "error" },
        { name: "Pending", variant: "warning" },
      ];
      const statusItem = listStatusUI.find((item) => item.name === status) || {
        name: "Unknown",
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
export const getAppointmentConfig = (
    {
        onEdit,
    }:
    {
        onEdit: (appointment: Appointment) => void
    }
): CustomTableConfig<Appointment["id"], Appointment>[] => [
    {
        key: "table_number",
        headerLabel: "số bàn",
        type: "string",
    },
    {
        key: "customer_name",
        headerLabel: "Tên khách hàng",
        type: "string",
    },
    {
        key: "phone",
        headerLabel: "Số điện thoại",
        type: "string",
    },
    {
        key: "date",
        headerLabel: "Ngày",
        type: "string",
    },
    {
        key: "hours",
        headerLabel: "Giờ",
        type: "string",
    },
    {
        key:"status",
        headerLabel:"Trạng thái",
        type:"string",
        renderCell: (data) => (
            <CustomStatusUI
                status={data.status}
            />
        )
    },
    {
        key:"edit",
        headerLabel:"Chỉnh sửa",
        type:"string",
        renderCell:(data) => (
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing="auto"
                paddingLeft="25px"
                paddingRight="25px"
            >
                <IconButton 
                    color="success"
                    onClick={() => onEdit(data)}
                >
                    <CheckCircleOutlineIcon/>
                </IconButton>
            </Stack>
        )
    }
]