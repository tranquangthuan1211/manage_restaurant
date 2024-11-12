import { CustomTable } from "src/components/custom-table";
import { getEmployeeConfig } from "src/sections/employee/table-config-employee";
import usePagination from 'src/hooks/use-pagination';
import {styled, TableCell, TablePagination, TableRow, TextField, TextFieldProps} from "@mui/material"

const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
export const EmployeeTable = () => {
    const configs = getEmployeeConfig();
    const pagination = usePagination({ count: 0 });
    
    return (
        <>
            <CustomTable
                configs={configs}
                rows={[]}
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
                rowsPerPageOptions={[5, 10, 25, 100]}
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
        </>
    )
}