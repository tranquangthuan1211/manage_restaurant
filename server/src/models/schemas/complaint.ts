export interface Complaint {
    title: string;
    description: string;
    status: string;
    user_id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export interface DetailComplaint {
    title: string;
    description: string;
    status: string;
    name_user: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}