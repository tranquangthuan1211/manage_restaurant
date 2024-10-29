export interface Assess {
    id_customer: string;
    content: string;
    rating: number;
    created_at: string;
    updated_at: string;
}

export interface AssessDetails extends Assess {
    customer_name: string;
}