import { apiGet,apiPut,apiPost } from "../api-requests";
import { Food } from "src/types/food";

class MenuApi {
    async getMenu(requests:FormData): Promise<{data:Food[]}> {
        return await apiGet("/menus");
    }
}

export default new MenuApi();