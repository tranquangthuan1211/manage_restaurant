import { Clear, Edit } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { CustomTableConfig } from "src/components/custom-table";
import { Employee } from "src/types/employee";

export const getEmployeeConfig = (
    {
        editEmployee,
        deleteEmployee,
    }: {
        editEmployee: (employee:Employee) => void;
        deleteEmployee?: (employee:Employee) => void;
    }
): CustomTableConfig<Employee["id"], Employee>[] => [
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
        key: "email",
        headerLabel: "Email",
        type: "string",
    },
    {
        key: "phone",
        headerLabel: "Phone",
        type: "string",
    },
    {
        key: "address",
        headerLabel: "Address",
        type: "string",
    },
    {
        key: "position",
        headerLabel: "Position",
        type: "string",
    },
    {
        key: "salary",
        headerLabel: "Salary",
        type: "number",
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
                <IconButton 
                    color="success"
                    onClick={() => editEmployee(data)}
                >
                    <Edit />
                </IconButton>
                <IconButton color="error">
               <Clear  
                  sx={{ height: "20px", width: "20px" }} 
                //   onClick={() => deleteEmployee(data)}
               />
            </IconButton>
            </Stack>
        )
    }
]