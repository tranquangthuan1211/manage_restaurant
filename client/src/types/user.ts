export interface User {
  _id: string;
  username?: string;
  email?: string;
  name: string;
  phone: string;
  address: string;
  role: "admin" | "staff" | "user";

  id: string;
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