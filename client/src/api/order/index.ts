import { apiGet,apiPost,apiDelete,apiPatch,apiPut } from "../api-requests";
import {Order} from "src/types/order";

class ApiOrder {
    async getLeave():Promise<{data:Order[]}> {
        return await apiGet("/orders");
    }
}
export default new ApiOrder();