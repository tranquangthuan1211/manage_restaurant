import { CustomTable } from "src/components/custom-table";
import { getFoodConfig } from "src/sections/menu/table-config-food";
import usePagination from 'src/hooks/use-pagination';
import {Stack, styled, TableCell, TablePagination, TableRow, TextField, TextFieldProps} from "@mui/material"
import {Food} from "src/types/food";
import { useDrawer } from "src/hooks/use-drawer";
import { useDialog } from "src/hooks/use-dialog";
import {FoodEditDrawer} from "src/sections/menu/food-edit-drawer";
import { ConfirmDialog } from "src/components/confirm-dialog";
import { del } from "idb-keyval";
import { useMenu } from "src/contexts/menu/menu-context";
import { useState } from "react";
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
export const FoodTabel = ({
    // filter,
    // onChangeFilter,
    foods,
    loading
  }: {
    // filter: FoodFilter;
    // onChangeFilter: (filter: FoodFilter) => void;
    foods: Food[];
    loading: boolean;
}) => {
    const editDrawer = useDrawer<Food>();
    const deleteDialog = useDialog<Food>();
    const {deleteFood} = useMenu();
    const configs = getFoodConfig(
        {
            editFood: (food:Food) => editDrawer.handleOpen(food),
            deleteFood: (food:Food) => deleteDialog.handleOpen(food),
        }
    );
    const pagination = usePagination({ count: foods.length });
    const [filter, setFilter] = useState<Partial<Omit<Food, "id">>>({});
    return (
        <>
            <CustomTable
                configs = {configs}
                loading = {loading}
                rows={foods.slice(
                    pagination.page * pagination.rowsPerPage,
                    pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
                )}
                additionalTopRow={
                    <TableRow
                        sx={{
                            ".MuiTableCell-root": {
                            background: (theme) => theme.palette.neutral[100],
                            },
                        }}
                        >
                        <TableCell align="center">
                            <NoLabelTextField
                            fullWidth
                            ></NoLabelTextField>
                        </TableCell>
                        <TableCell align="center">
                            <NoLabelTextField
                                fullWidth
                                  value={filter.name}
                                  onChange={(e) =>
                                    setFilter({ ...filter, name: e.target.value })
                                  }
                            ></NoLabelTextField>
                        </TableCell>
            
                        <TableCell align="center">
                            <NoLabelTextField
                            fullWidth
                            ></NoLabelTextField>
                        </TableCell>
            
                        <TableCell align="center">
                            <NoLabelTextField
                            fullWidth
                            ></NoLabelTextField>
                        </TableCell>
                        <TableCell align="center"/>
                        <TableCell align="center"/>
                        <TableCell align="center"/>
                        <TableCell align="center"/>
                    </TableRow>
                }
                    
            />
            <TablePagination
                component="div"
                {...pagination}
                rowsPerPageOptions={[2, 10, 25, 100]}
                sx={{
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    left: 0,
                    bgcolor: "secondary.lightest",
                    borderTop: "1px solid",
                    borderColor: "divider",
                }}
            />
            <FoodEditDrawer
                open={editDrawer.open}
                onClose={editDrawer.handleClose}
                food={editDrawer.data as Food}
            />
            <ConfirmDialog
                onCancel={deleteDialog.handleClose}
                open={deleteDialog.open}
                title="Xóa món ăn"
                content="Bạn có chắc chắn muốn xóa món ăn này?"
                color="error"
                onConfirm={async () => {
                    if (deleteDialog.data) {
                        await deleteFood(deleteDialog.data._id);
                    }
                    deleteDialog.handleClose();
                }}
            />
        </>
    )
}