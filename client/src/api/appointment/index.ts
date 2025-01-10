import { apiGet,apiPost,apiPut,apiDelete,apiPatch } from "../api-requests";
import {Appointment} from "src/types/appointment";
class AppointmentApi {
    async getAppointments():Promise<{data:Appointment[]}> {
        return await apiGet("/appointments");
    }
    async updateEmployee(request:Partial<Appointment>):Promise<{
            error: number;
            message: string;
            data: null;
        }> {
            try {
                return await apiPatch(`/appointments/${request._id}`, request);
            } catch (error) {
                return {
                    error: 1,
                    message: error.message,
                    data: null
                };
            }
        }
}

export default new AppointmentApi();