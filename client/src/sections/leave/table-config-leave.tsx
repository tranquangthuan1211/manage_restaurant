import { Clear, Edit } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { CustomTableConfig } from "src/components/custom-table";
import { Leave } from "src/types/leave";
import CheckIcon from '@mui/icons-material/Check';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { format } from "date-fns";
export const getLeaveConfig = (
    {
        editLeave,
        deleteLeave,
        displayLeave
    }: {
        editLeave: (leave:Leave) => void;
        deleteLeave: (leave:Leave) => void;
        displayLeave: (leave:Leave) => void;
    }
): CustomTableConfig<Leave["id"], Leave>[] => [
    {
        key: "user_name",
        headerLabel: "Name",
        type: "string",
    },
    {
        key: "from",
        headerLabel: "Start Date",
        type: "string",
        renderCell: (data) => (
            <Typography>{format(new Date(data.from), "dd/MM/yyyy")}</Typography>
        )
    },
    {
        key: "to",
        headerLabel: "End Date",
        type: "string",
        renderCell: (data) => (
            <Typography>{format(new Date(data.to), "dd/MM/yyyy")}</Typography>
        )
    },
    {
        key: "status",
        headerLabel: "status",
        type: "string",
    },
    {
        key:"edit",
        headerLabel: "Edit",
        type: "string",
        renderCell:(data) => (
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing="auto"
                paddingLeft="25px"
                paddingRight="25px"
            >
                <CheckIcon
                    color="success"
                    onClick={() => editLeave(data)}
                >
                    <Edit />
                </CheckIcon>
                <IconButton color="error">
                    <Clear  
                        sx={{ height: "20px", width: "20px" }} 
                        onClick={() => deleteLeave(data)}
                    />
                </IconButton>
                <IconButton color="success">
                    <ArrowRightAltIcon
                        sx={{ height: "20px", width: "20px" }}
                        onClick={() => displayLeave(data)}
                    />
                </IconButton>
            </Stack>
        )
    }
]