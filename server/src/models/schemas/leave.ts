export interface Leave {
    user_id: string;
    from: Date;
    to: Date;
    reason: string;
    status: string;
}

export interface LeaveDetails {
    user_name: string;
    from: Date;
    to: Date;
    reason: string;
    status: string;

}

export const initialLeave: Leave = {
    user_id: "",
    from: new Date(),
    to: new Date(),
    reason: "",
    status: "",
}