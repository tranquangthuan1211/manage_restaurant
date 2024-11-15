import { apiGet,apiPut,apiPost, apiDelete } from "../api-requests";
import { Food } from "src/types/food";

class MenuApi {
    async getMenu(requests:FormData): Promise<{data:Food[]}> {
        return await apiGet("/menus");
    }
    async createFood(request:Partial<Food>): Promise<{
        error: number;
        message: string;
        data: null;
    }> {
        try {
            return await apiPost("/menus", request);
        } catch (error) {
            // console.log(error)
            throw new Error(error.message);
        }
    }
    async updateFood(request:Partial<Food>): Promise<{
        error: number;
        message: string;
        data: null;
    }> {
        try {
            return await apiPut(`/menus/${request._id}`, request);
        } catch (error) {
            return {
                error: 1,
                message: error.message,
                data: null
            };
        }
    }
    async deleteFood(id:string): Promise<{
        error: number;
        message: string;
        data: null;
    }> {
        try {
            return await apiDelete(`/menus/${id}`,{});
        } catch (error) {
            return {
                error: 1,
                message: error.message,
                data: null
            };
        }
    }
}

export default new MenuApi();