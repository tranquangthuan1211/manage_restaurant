import { Clear, Edit } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import {CustomTableConfig } from 'src/components/custom-table';
import {Complaint} from "src/types/complaint"
import { format } from "date-fns";

export const getComplaintConfig = (
    
): CustomTableConfig<Complaint["id"], Complaint>[] => [
    {
        key: "user_name",
        headerLabel: "Name Customer",
        type: "string",
    },
    {
        key: "title",
        headerLabel: "Title",
        type: "string",
    },
    {
        key: "description",
        headerLabel: "Description",
        type: "string",
    },
    {
        key:"status",
        headerLabel:"Status",
        type:"string"
    },
    {
        key: "createdAt",
        headerLabel: "Created At",
        type: "date",
        renderCell:(data) => (
            <Stack>
                <Typography>
                    {data.createdAt ? format(new Date(data.createdAt), "dd/MM/yyyy") : ""}
                </Typography>
            </Stack>
        )
    },
    {
        key: "updatedAt",
        headerLabel: "Updated At",
        type: "date",
    },
    {
        key: "deletedAt",
        headerLabel: "Deleted At",
        type: "date",
    },
    {
        key: "edit",
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
                <IconButton 
                    color="success"
                >
                    <Edit />
                </IconButton>
                <IconButton color="error">
               <Clear  
                  sx={{ height: "20px", width: "20px" }} 
               />
            </IconButton>
            </Stack>
        )
        
    }
]