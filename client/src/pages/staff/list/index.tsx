import React, { useState, useMemo, use, useEffect } from "react"
import {Page as PageType} from "src/types/page"
import { Layout } from "src/layouts/index"
import ContentHeader from 'src/sections/dashboard/content-header';
import { Stack, Box, Button, Tabs, Tab, useMediaQuery, Theme } from '@mui/material';
import {AppointmentTable} from "src/sections/appointment/table-appointment"
import AppointmentApi from "src/api/appointment";
import useFunction from "src/hooks/use-function";
import VirtualizedAppointmentList from "src/sections/appointment/scroll-windown-appointment"
import { ConfirmDialog } from "src/components/confirm-dialog";
import { useDialog } from "src/hooks/use-dialog";
import { Appointment } from "src/types/appointment";
const Page:PageType = () => {
     const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
    const appointmentApi = useFunction(AppointmentApi.getAppointments);
    useEffect(() => {
        appointmentApi.call({})
    },[])
    const appointments = useMemo(() => {
        return appointmentApi.data?.data || []
    },[appointmentApi.data])
    const confirmDialog = useDialog<Appointment>()
    return (
        <Stack spacing={2}>
            <ContentHeader 
                title="Danh sách phục vụ" 
                rightSection={
                    <Box
                        sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        height: "40px",
                        padding: "0 16px",
                        }}
                    >

                    </Box>
                  }
            />
            {lgUp ?
                (
                    <AppointmentTable/>
               ): 
               (
                   <VirtualizedAppointmentList
                       appointments={appointments}
                       onConfirm={(appointment:Appointment) => confirmDialog.handleOpen(appointment)}
                    />
               )
               
            }
            <ConfirmDialog
                title={`Xác nhận phục vụ khách hàng ${confirmDialog.data?.customer_name}`}
                open={confirmDialog.open}
                onCancel={confirmDialog.handleClose}
                onConfirm={async () => {
                    await AppointmentApi.updateEmployee({
                        ...confirmDialog.data,
                        status: "completed"
                    })
                const appointmentUpdate = {...confirmDialog.data, status: "completed"}
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
        </Stack>
    )
}

Page.getLayout = (page) => 
<Layout>
    {page}
</Layout>

export default Page;