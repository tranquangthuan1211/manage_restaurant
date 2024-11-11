import { CustomTableConfig } from "src/components/custom-table";
import { Employee } from "src/types/employee";

export const getEmployeeConfig = (): CustomTableConfig<Employee["id"], Employee>[] => [
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
        key: "createdAt",
        headerLabel: "Created At",
        type: "date",
    },
    {
        key: "updatedAt",
        headerLabel: "Updated At",
        type: "date",
    },
]