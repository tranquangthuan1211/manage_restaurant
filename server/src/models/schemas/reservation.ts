export interface Reservation {
  userId: string;
  num_of_people: number;
  date_time: string; // ISO 8601 date-time string
  status: string;
  special_request?: string;
  preorders: {
    menuItemId: string;
    quantity: number;
  }[];
  createAt: string; // ISO 8601 date-time string
}
