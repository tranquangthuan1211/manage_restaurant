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

// This is a more detailed version of Reservation
export interface ReservationDetails{
  id: string;
  userId: string;
  num_of_people: number;
  date_time: string;
  status: string;
  special_request: string;
  preorders: {
    menuItemId: string;
    quantity: number;
    name: string; // We have this field too
  }[];
  createAt: string;
  reviewId: string; // And this
}