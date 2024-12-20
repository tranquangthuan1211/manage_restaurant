export interface Leave {
    _id: string;
    id:string;
    employeeId: string;
    user_name: string;
    leaveType: string;
    from: string;
    to: string;
    reason: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export const initialLeave: Leave = {
    _id: "",
    id:"",
    employeeId: "",
    user_name: "",
    leaveType: "",
    from: "",
    to: "",
    reason: "",
    status: "",
    createdAt: "",
    updatedAt: "",
}