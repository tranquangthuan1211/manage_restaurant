import { apiGet, apiPut, apiPost } from "../api-requests";
import { Reservation } from "src/types/reservation";
class ReservationApi {
    // Create a new reservation
    async createReservation(data: Reservation): Promise<{ data: Reservation }> {
        return await apiPost("/reservation", data);
    }

    // Fetch a reservation by ID
    async getReservationById(id: string): Promise<{ data: Reservation }> {
        return await apiGet(`/reservation/${id}`);
    }

    // Update an existing reservation
    async updateReservation(id: string, data: Partial<Reservation>): Promise<{ data: Reservation }> {
        return await apiPut(`/reservation/${id}`, data);
    }

    // Fetch all reservations (optional, depending on your use case)
    async getAllReservations(): Promise<{ data: Reservation[] }> {
        return await apiGet("/reservation");
    }
}

export default new ReservationApi();
