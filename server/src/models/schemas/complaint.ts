

export interface Complaint {
    title: string;
    description: string;
    status: string;
    user_id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export interface ComplaintDetails {
    title: string;
    description: string;
    status: string;
    user_name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export const initialComplaint: Complaint = {
    title: "",
    description: "",
    status: "",
    user_id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date()
}