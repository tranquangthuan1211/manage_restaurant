import {CustomTableConfig } from 'src/components/custom-table';
import { NewCustomer } from 'src/types/new-customer';


const getNewCustomerConfig = (): CustomTableConfig<NewCustomer["id"], NewCustomer>[] => [
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
        key: "spending",
        headerLabel: "Spending",
        type: "number",
    },
    {
        key: "joinning_date",
        headerLabel: "Joinning Date",
        type: "date",
    },
    {
        key: "status",
        headerLabel: "Status",
        type: "string",
    },
]
export default getNewCustomerConfig