export interface Appointment {
    id_customer: string;
    table_number: number;
    status: string;
    date: string;
    hours: string;
    created_at: string;
    updated_at: string;
}

export interface AppointmentDetails{
    id: string;
    table_number: number;
    customer_name: string;
    status: string;
    date: string;
    hours: string;
    created_at: string;
    updated_at: string;
}