export interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    position: string;
    salary: number;
    createdAt: string;
    updatedAt: string;
}
export const initialEmployee: Employee = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    salary: 0,
    createdAt: "",
    updatedAt: "",
};