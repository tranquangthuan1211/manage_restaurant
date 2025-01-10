import React,{ReactNode} from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Appointment } from 'src/types/appointment';
import { format } from "date-fns";
type StatusUIItem = {
    name: string;
    variant: string;
  };
export const CustomStatusUI = ({ status }: { status: string }) => {
    const listStatusUI: StatusUIItem[] = [
        { name: "completed", variant: "success" },
        { name: "Inactive", variant: "error" },
        { name: "Pending", variant: "warning" },
      ];
      const statusItem = listStatusUI.find((item) => item.name === status) || {
        name: "Unknown",
        variant: "grey",
      };
    return (
      <Box
        
      >
        <Typography variant="body2" fontWeight={600} color={`${statusItem.variant}.main`}>
          {statusItem.name}
        </Typography>
      </Box>
    );
  };
const AppointmentCard = ({
    appointment,
    color,
    children,
    onConfirm
}:{
    appointment:Appointment
    color:string;
    children?: ReactNode;
    onConfirm:(appointment:Appointment) => void
}) => {
  return (
    <Stack
        sx={{
            padding: "12px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
        }}
    >
        <Box
        sx={{
            display: "flex",
            alignItems: "center",
            
        }}
        >
        <Box
            sx={{
            height:"50px",
            background: "linear-gradient(135deg, #FF7E67, #FF5A8A)",
            borderRadius: "8px",
            color: "#fff",
            textAlign: "center",
            padding: "8px 12px",
            width: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center"
            }}
        >
            <Typography>
                {appointment.time ? format(new Date(appointment.time), "dd/MM/yyyy") : ""}
            </Typography>
        </Box>

        <Box sx={{ marginLeft: "12px", flex: 1 }}>
            <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ color: "#333", marginBottom: "4px" }}
            >
            {appointment.customer_name}
            </Typography>
            <Typography
            variant="body2"
            sx={{ color: "#666", marginBottom: "4px", fontSize: "12px" }}
            >
            Phone: {appointment.phone}
            </Typography>

            {/* Status */}
            <CustomStatusUI
                status={appointment.status}
            />
        </Box>
        </Box>
        <Button 
          color="primary" 
          variant="contained"
          onClick={() => onConfirm(appointment)}
        >
            xác nhận phục vụ  
        </Button>
    </Stack>
  );
};

export default AppointmentCard;
