import { apiGet,apiPost,apiDelete,apiPatch,apiPut } from "../api-requests";
import { SignInRequest, User } from "src/types/user";
class UserApi {
    async me():Promise<{data:User}> {
        return await apiGet("/users");
    }
    async signIn(request: SignInRequest):Promise<{
        error: number;
        message: string;
        access_token:string;
        refresh_token:string;
        data:User;
    }> {
        return await apiPost("/users/login",request);
    }
    async getUsers():Promise<{data:User[]}> {
        return await apiGet("/users");
    }
    async createUser(request:Partial<User>):Promise<{
        error: number;
        message: string;
        data: null;
    }> {
        return await apiPost("/users",request);
    }
    async updateUser(request:Partial<User>):Promise<{
        error: number;
        message: string;
        data: null;
    }> {
        return await apiPut(`/users/${request._id}`,request);
    }
    async deleteUser(id:string):Promise<void> {
        return await apiDelete(`/users/${id}`,{});
    }
}
export default new UserApi();