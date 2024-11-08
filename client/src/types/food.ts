export interface Food {
    id: string;
    name: string;
    price: number;
    category: string;
    status: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export const initialFood: Food = {
    id: "",
    name: "",
    price: 0,
    category: "",
    status: "",
    description: "",
    image: "",
    createdAt: "",
    updatedAt: "",
}