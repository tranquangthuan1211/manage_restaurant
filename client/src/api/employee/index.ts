import { apiGet,apiPut,apiPatch,apiDelete,apiPost } from "../api-requests";
import {Employee} from "src/types/employee";


class EmployeeApi {
    async getEmployee():Promise<{data:Employee[]}> {
        return await apiGet("/staffs");
    }
    async createEmployee(request:Partial<Employee>):Promise<{
        error: number;
        message: string;
        data: null;
    }> {
        try {
            return await apiPost("/staffs", request);
        } catch (error) {
            // console.log(error)
            throw new Error(error.message);
        }
    }
    async updateEmployee(request:Partial<Employee>):Promise<{
        error: number;
        message: string;
        data: null;
    }> {
        try {
            return await apiPut(`/staffs/${request._id}`, request);
        } catch (error) {
            return {
                error: 1,
                message: error.message,
                data: null
            };
        }
    }
}

export default new EmployeeApi();