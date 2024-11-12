import { CustomTable } from "src/components/custom-table";
import { getFoodConfig } from "src/sections/menu/table-config-food";
import usePagination from 'src/hooks/use-pagination';
import {Stack, styled, TableCell, TablePagination, TableRow, TextField, TextFieldProps} from "@mui/material"
import {Food} from "src/types/food";

const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
export const FoodTabel = ({
    // filter,
    // onChangeFilter,
    foods
  }: {
    // filter: FoodFilter;
    // onChangeFilter: (filter: FoodFilter) => void;
    foods: Food[];
}) => {
    const configs = getFoodConfig();
    const pagination = usePagination({ count: foods.length });
    console.log(foods);
    return (
        <Stack>
            <CustomTable
                configs={configs}
                rows={foods}
                pagination={pagination}
                additionalTopRow = {
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
                            //   value={filter.name}
                            //   onChange={(e) =>
                            //     onChangeFilter({ ...filter, name: e.target.value })
                            //   }
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
                        <TableCell align="center">
                            <NoLabelTextField
                            fullWidth
                            ></NoLabelTextField>
                        </TableCell>
                    </TableRow>
                }
            />
            <TablePagination
                component="div"
                count={0} 
                page={pagination.totalPages} 
                onPageChange={pagination.onPageChange} 
                rowsPerPage={pagination.rowsPerPage} 
                onRowsPerPageChange={pagination.onRowsPerPageChange} 
                rowsPerPageOptions={[2, 10, 25, 100]}
                sx={{
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    left: 0,
                    marginTop:"100px",
                    bgcolor: "secondary.lightest",
                    borderTop: "1px solid",
                    borderColor: "divider",
                    zIndex: 0,
                }}
            />
        </Stack>
    )
}