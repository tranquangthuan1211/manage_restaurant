export interface Cart {
    id_customer:string;
    id_food: string;
    status: string;
    created_at: string
}

export const initialCart:Cart = {
    id_customer: "",
    id_food: "",
    status: "",
    created_at:""
}