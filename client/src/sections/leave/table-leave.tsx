import { CustomTable } from "src/components/custom-table";
import {getLeaveConfig} from "src/sections/leave/table-config-leave";
import usePagination from 'src/hooks/use-pagination';
import {styled, TableCell, TablePagination, TableRow, TextField, TextFieldProps} from "@mui/material"
import { useEmployee } from "src/contexts/employee/employee-context";
import { Employee } from "src/types/employee";
import { useDrawer } from "src/hooks/use-drawer";
import { ConfirmDialog } from "src/components/confirm-dialog";
import EmployeeDrawerAdd from "src/sections/employee/drawer-add-employee";
import { Leave } from "src/types/leave";
import { useLeave } from "src/contexts/leave/leave-context";
import { useDialog } from "src/hooks/use-dialog";
import ApplicationDrawer from "./drawer-application-permision";
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
export const LeaveTable = ({
    // filter,
    // onChangeFilter
    leaves
}: {
    // filter: Filter;
    // onChangeFilter: (filter: Filter) => void;
    leaves: Leave[];
}) => {

    const confirmLeave = useDialog<Leave>();
    const deleteLeaveDialog = useDialog<Leave>();
    const drawerApplication = useDrawer<Leave>();
    const {updateLeave, deleteLeave} = useLeave();

    const configs = getLeaveConfig({
        editLeave: (leave: Leave) => confirmLeave.handleOpen(leave),
        deleteLeave: (leave: Leave) => deleteLeaveDialog.handleOpen(leave),
        displayLeave: (leave: Leave) => drawerApplication.handleOpen(leave),
    });
    const pagination = usePagination({ count: leaves.length });
    return (
        <>
            <CustomTable
                configs={configs}
                rows={leaves}
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
            <ConfirmDialog
                open={confirmLeave.open}
                title={`Ban có chắc chắn xác nhận cho nhân viên ${confirmLeave.data?.user_name} nghỉ phép không?`}
                content={`Ban có chắc chắn xác nhận cho nhân viên ${confirmLeave.data?.user_name} nghỉ phép không?`}
                onConfirm={async() => {
                    if(confirmLeave.data) {
                        confirmLeave.data.status = "approved";
                        await updateLeave(confirmLeave.data);
                    }
                    confirmLeave.handleClose();
                }}
                color="primary"
                onCancel={confirmLeave.handleClose}
            />
            <ConfirmDialog
                open={deleteLeaveDialog.open}
                title={`Ban có chắc chắn xoá không?`}
                content={`Ban có chắc chắn xoá không?`}
                onConfirm={async() => {
                    if(confirmLeave.data) {
                        await deleteLeave(confirmLeave.data._id);
                    }
                    confirmLeave.handleClose();
                }}
                onCancel={deleteLeaveDialog.handleClose}
            />
            <ApplicationDrawer
                open={drawerApplication.open}
                onClose={drawerApplication.handleClose}
                leave={drawerApplication.data}
            />
        </>
    )
}