import { IconButton, Stack, Typography } from '@mui/material';
import {CustomTableConfig } from 'src/components/custom-table';
import { Food } from 'src/types/food';
import { Edit, Clear, Restore } from '@mui/icons-material';
export const getFoodConfig = (): CustomTableConfig<Food["id"], Food>[] => [
    {
        key: "id",
        headerLabel: "ID",
        type: "string",
    },
    {
        key: "name",
        headerLabel: "Name",
        type: "string",
    },
    {
        key: "price",
        headerLabel: "Price",
        type: "number",
    },
    {
        key: "category",
        headerLabel: "Category",
        type: "string",
    },
    {
        key: "status",
        headerLabel: "Status",
        type: "string",
    },
    {
        key: "description",
        headerLabel: "Description",
        type: "string",
        renderCell: (data) => (
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing="auto"
                paddingLeft="25px"
                paddingRight="25px"
            >
                <Typography>
                    {data.description.length > 50 
                        ? `${data.description.slice(0, 50)}...` 
                        : data.description}
                </Typography>
            </Stack>
        )
    },
    {
        key: "image",
        headerLabel: "Image",
        type: "string",
        renderCell: (data) => (
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing="auto"
                paddingLeft="25px"
                paddingRight="25px"
            >
                <img src={data.image} alt="food" style={{width: "90px", height: "90px"}}/>
            </Stack>
        )
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
                <IconButton color="success">
                    <Edit />
                </IconButton>
                <IconButton color="error">
               <Clear  
                  sx={{ height: "20px", width: "20px" }} 
                //   onClick={() => deletePatient(data)}
               />
            </IconButton>
            </Stack>
        )
        
    }
]