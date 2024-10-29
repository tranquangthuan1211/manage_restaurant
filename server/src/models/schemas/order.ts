export interface Order {
    user_id: string;
    product_id: string;
    status: string;
    total: number;
    created_at: Date;
    updated_at: Date;
}
export interface OrderDetail {
    name_customer: string;
    name_product: string;
    quantity: number;
    price: number;
    created_at: Date;
    updated_at: Date;
}