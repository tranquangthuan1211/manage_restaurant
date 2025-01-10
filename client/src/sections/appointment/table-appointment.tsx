import { CustomTable } from "src/components/custom-table";
import { getEmployeeConfig } from "src/sections/employee/table-config-employee";
import usePagination from 'src/hooks/use-pagination';
import {styled, TableCell, TablePagination, TableRow, TextField, TextFieldProps} from "@mui/material"
import { Appointment } from "src/types/appointment";
import { getAppointmentConfig } from "./table-config-appointment";
import { useDialog } from "src/hooks/use-dialog";
import { ConfirmDialog } from "src/components/confirm-dialog";
import AppointmentApi from "src/api/appointment";
import useFunction from "src/hooks/use-function";
import { useEffect, useMemo } from "react";
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
export const AppointmentTable = () => {
    const appointmentApi = useFunction(AppointmentApi.getAppointments);
    useEffect(() => {
        appointmentApi.call({})
    },[])
    const appointments = useMemo(() => {
        return appointmentApi.data?.data || []
    },[appointmentApi.data])
    useEffect(() => {
        console.log(appointments)
    },[appointments])
    const confirmDialog = useDialog<Appointment>()
    const configs = getAppointmentConfig(
        {
            onEdit: (appointment) => confirmDialog.handleOpen(appointment)
        }
    )
    const pagination = usePagination({ count: appointments.length });
    return (
        <>
            <CustomTable
                configs={configs}
                rows={appointments}
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
                    
                }}
            />
            <ConfirmDialog
                title={`Xác nhận phục vụ khách hàng ${confirmDialog.data?.customer_name}`}
                open={confirmDialog.open}
                onCancel={confirmDialog.handleClose}
                onConfirm={async () => {
                    await AppointmentApi.updateEmployee({
                        ...confirmDialog.data,
                        status: "confirmed"
                    })
                    const appointmentUpdate = {...confirmDialog.data, status: "confirmed"}
                    appointmentApi.setData({
                        data: (appointmentApi.data?.data || []).map((appointment: Appointment) => {
                            if(appointment._id === confirmDialog.data?._id) {
                                return {...appointment, ...appointmentUpdate};
                            }
                            return appointment;
                        })                 
                                               
                    });   
                    confirmDialog.handleClose()
                }}
                color="success"
            />
        </>
    )
}