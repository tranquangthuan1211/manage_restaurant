export interface Users {
    name: string;
    address: string;
    phone:string;

    gender: string;
    birthdate: string;
    schedule_id?: string;
    email: string;
    password: string;
    role: string;
    schedule?: string[];
    salary?: number;
}
export const initialUser: Users = {
    name: "string",
    address: "string",
    phone:"string",
    gender: "string",
    birthdate: "string",
    email: "string",
    role: "string",
    password: "string"
}

