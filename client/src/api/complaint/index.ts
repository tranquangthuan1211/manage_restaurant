import { apiGet,apiPost,apiDelete,apiPatch,apiPut } from "../api-requests";
import { Complaint } from "src/types/complaint";

class ComplaintApi {
    async getComplaints():Promise<{data:Complaint[]}> {
        return await apiGet("/complaints");
    }
    async createComplaint(request:Partial<Complaint>):Promise<{
        error: number;
        message: string;
        data: null;
    }> {
        return await apiPost("/complaints",request);
    }
    async updateComplaint(request:Partial<Complaint>):Promise<{
        error: number;
        message: string;
        data: null;
    }> {
        return await apiPut(`/complaints/${request._id}`,request);
    }
    async deleteComplaint(id:string):Promise<void> {
        return await apiDelete(`/complaints/${id}`,{});
    }
}


export default new ComplaintApi();