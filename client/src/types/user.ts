export interface User {
    _id: string;
    id: string;
    username?: string;
    email?: string;
    name: string;
    role: "admin" | "staff" | "user";
    student_id: string;
    officer_id: string;
    num_certificates: number;
    num_complains: number;
    schedule?: string[];
    grant_role?: string[];
  }
export type SignInRequest = {
  email: string;
  password: string;
};