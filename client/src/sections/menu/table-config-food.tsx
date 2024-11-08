import {CustomTableConfig } from 'src/components/custom-table';
import { Food } from 'src/types/food';

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
    },
    {
        key: "image",
        headerLabel: "Image",
        type: "string",
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