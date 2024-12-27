import { apiGet,apiPost,apiPut,apiDelete,apiPatch } from "../api-requests";
import {Category} from "src/types/category";
class CategoryApi {
    async getCategory():Promise<{data:Category[]}> {
        return await apiGet("/categories");
    }
}

export default new CategoryApi();