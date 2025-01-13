import { IconButton, Stack, Typography, Button } from '@mui/material';
import { CustomTableConfig } from 'src/components/custom-table';
import { Food } from 'src/types/food';
import { Edit, Clear, Restore } from '@mui/icons-material';
export const getFoodConfig = (
    {
        editFood,
        deleteFood,
        onView
    }: {
        editFood: (food: Food) => void;
        deleteFood: (food: Food) => void;
        onView: (food: Food) => void;
    }
): CustomTableConfig<Food["id"], Food>[] => [
        // {
        //     key: "id",
        //     headerLabel: "ID",
        //     type: "string",
        // },
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
        // {
        //     key: "status",
        //     headerLabel: "Status",
        //     type: "string",
        // },
        {
            key: "description",
            headerLabel: "Description",
            type: "string",
            renderCell: (data) => (
                <Typography>
                    <div className="min-w-52 whitespace-pre-wrap">
                        {data.description.length > 60 ? (
                            <>
                                {data.description.slice(0, 60) + "..."}
                                <Button
                                    variant="text"
                                    size="small"
                                    color="primary"
                                    sx={{ textTransform: "none" }}
                                    onClick={() => onView ? onView(data) : {}}
                                >
                                    Read more
                                </Button>
                            </>
                        ) : (
                            data.description
                        )}
                    </div>
                </Typography>
            )
        },
        {

            key: "image",
            headerLabel: "Image",
            type: "string",
            renderCell: (data) => (
                <div>
                    {data.image && <img className="w-16 h-16 object-cover object-center" src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="food" />}
                </div>
            )
        },
        {
            key: "edit",
            headerLabel: "Edit",
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
                    <IconButton
                        color="success"
                        onClick={() => editFood(data)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton color="error">
                        <Clear
                            sx={{ height: "20px", width: "20px" }}
                            onClick={() => deleteFood(data)}
                        />
                    </IconButton>
                </Stack>
            )

        }
    ]