import {CustomTableConfig } from 'src/components/custom-table';
import {Complaint} from "src/types/complaint"
import { format } from "date-fns";
import { Typography } from '@mui/material/styles/createTypography';
import { Appointment } from 'src/types/appointment';
import { IconButton, Stack } from '@mui/material';
import { Edit } from 'iconsax-react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import appointment from 'src/api/appointment';

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
        type:"string"
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