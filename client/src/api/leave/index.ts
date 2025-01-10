import { apiGet,apiPost,apiDelete,apiPatch,apiPut } from "../api-requests";
import {Leave} from "src/types/leave";


class LeaveApi {
    async getLeave():Promise<{data:Leave[]}> {
        return await apiGet("/leaves");
    }
    async createEmployee(request:Partial<Leave>):Promise<{
        error: number;
        message: string;
        data: null;
    }> {
        try {
            return await apiPost("/leaves", request);
        } catch (error) {
            // console.log(error)
            throw new Error(error.message);
        }
    }
    async updateEmployee(request:Partial<Leave>):Promise<{
        error: number;
        message: string;
        data: null;
    }> {
        try {
            return await apiPut(`/leaves/${request._id}`, request);
        } catch (error) {
            return {
                error: 1,
                message: error.message,
                data: null
            };
        }
    }
    async deleteEmployee(id:string):Promise<{
        error: number;
        message: string;
        data: null;
    }> {
        try {
            return await apiDelete(`/leaves/${id}`,{});
        } catch (error) {
            return {
                error: 1,
                message: error.message,
                data: null
            };
        }
    }
}

export default new LeaveApi();