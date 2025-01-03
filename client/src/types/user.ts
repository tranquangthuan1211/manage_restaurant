export interface User {
    _id: string;
    username?: string;
    email?: string;
    name: string;
    phone: string;
    address: string;
    role: "admin" | "staff" | "user";
  }