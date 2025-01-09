import { WithId } from "mongodb";

export interface Reservation {
  id: string;
  userId: string;
  num_of_people: number;
  date_time: string; // ISO 8601 date-time string
  status: string;
  special_request?: string;
  preorders: {
    menuItemId: string;
    quantity: number;
  }[];
  createAt?: string; // filled in by the server, ISO 8601 date-time string
}