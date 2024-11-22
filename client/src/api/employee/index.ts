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
}

export default new EmployeeApi();