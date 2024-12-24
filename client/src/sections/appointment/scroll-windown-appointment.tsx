import { Stack } from "@mui/material";
import { margin } from "@mui/system";
import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import AppointmentCard from "src/components/appointment-card";
import { Appointment } from 'src/types/appointment';
import { useDialog } from "src/hooks/use-dialog";
import { ConfirmDialog } from "src/components/confirm-dialog";
import AppointmentApi from "src/api/appointment";
import useFunction from "src/hooks/use-function";
const VirtualizedAppointmentList = ({
    appointments,
    onConfirm

}:{
    appointments:Appointment[],
    onConfirm:(appointment:Appointment) => void
}) => {
    const confirmDialog = useDialog<Appointment>()
    const Row = ({ index, style }: ListChildComponentProps) => {
    const appointment = appointments[index];
    return (
      <div style={{margin: "20px" }}>
        <AppointmentCard
          appointment={appointment}
          color="error"
          onConfirm={onConfirm}
        />
      </div>
    );
  };
    const appointmentApi = useFunction(AppointmentApi.getAppointments);
  return (
    <Stack>
        <List
        height={600} 
        itemCount={appointments.length} 
        itemSize={100}
        width="100%"
        >
            {Row}
        </List>
    </Stack>
    
  );
};

export default VirtualizedAppointmentList;
