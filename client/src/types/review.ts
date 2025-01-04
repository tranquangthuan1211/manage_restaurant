export interface Review {
  _id?: string; // Optional if pushing data
  userId: string;
  reservationId: string;
  overall: number;
  atmosphere: number;
  cleanliness: number;
  serviceQuality: number;
  serviceSpeed: number;
  staffAppearance: number;
  staffAttitude: number;
  valueOfMoney: number;
  feedback: string;
  createdAt?: string; // ISO 8601 date-time string
}