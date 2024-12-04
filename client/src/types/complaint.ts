export interface Complaint {
    _id:string;
    id:string;
    title: string;
    description: string;
    status: string;
    user_name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export const initialComplaint:Complaint = {
    _id:"",
    id:"",
    title:"",
    description:"",
    status:"",
    user_name:""
}