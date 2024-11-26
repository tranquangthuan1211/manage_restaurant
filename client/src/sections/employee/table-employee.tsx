import { CustomTable } from "src/components/custom-table";
import { getEmployeeConfig } from "src/sections/employee/table-config-employee";
import usePagination from 'src/hooks/use-pagination';
import {styled, TableCell, TablePagination, TableRow, TextField, TextFieldProps} from "@mui/material"
import { useEmployee } from "src/contexts/employee/employee-context";
import { Employee } from "src/types/employee";
import { useDrawer } from "src/hooks/use-drawer";
import { ConfirmDialog } from "src/components/confirm-dialog";
import { useDialog } from "src/hooks/use-dialog";
import EmployeeDrawerAdd from "src/sections/employee/drawer-add-employee";

const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
export const EmployeeTable = ({
    // filter,
    // onChangeFilter
    employees
}: {
    // filter: Filter;
    // onChangeFilter: (filter: Filter) => void;
    employees: Employee[];
}) => {

    const editEmployee = useDrawer<Employee>();
    const deleteEmployee = useDialog<Employee>();
    const configs = getEmployeeConfig({
        editEmployee: (employee: Employee) => editEmployee.handleOpen(employee),
        deleteEmployee: (employee: Employee) => deleteEmployee.handleOpen(employee),
    });
    const pagination = usePagination({ count: employees.length });
    return (
        <>
            <CustomTable
                configs={configs}
                rows={employees}
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
            <EmployeeDrawerAdd
                open={editEmployee.open}
                onClose={editEmployee.handleClose}
                employee={editEmployee.data}
            />
            <ConfirmDialog
                open={deleteEmployee.open}
                onCancel={deleteEmployee.handleClose}
                title="Xác nhận xóa nhân viên"
                content="Bạn có chắc chắn muốn xóa nhân viên này?"
                onConfirm={() => {
                    // deleteEmployee(deleteEmployee.data);
                    deleteEmployee.handleClose();
                }}
            />
        </>
    )
}