export interface Users {
    name: string;
    address: string;
    phone:string;
    gender: string;
    birthdate: string;
    schedule_id: string;
    password: string;
    email: string;
    role: string;
}
export const initialUser: Users = {
    name: "",
    address: "",
    phone:"",
    gender: "",
    birthdate: "",
    schedule_id: "",
    password: "",
    email: "",
    role: ""
}

