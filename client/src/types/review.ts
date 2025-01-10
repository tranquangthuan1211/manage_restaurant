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

// A more detailed version of the Review interface
export interface ReviewDetails {
  id: string;
  userId: string;
  reservationId: string;
  reservationDateTime: string; // added this
  overall: number;
  atmosphere: number;
  cleanliness: number;
  serviceQuality: number;
  serviceSpeed: number;
  staffAppearance: number;
  staffAttitude: number;
  valueOfMoney: number;
  feedback: string;
  createdAt: string;
}
