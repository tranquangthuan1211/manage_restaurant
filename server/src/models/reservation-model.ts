// //MPhuong edited
// import mongoose, { Schema, Document } from "mongoose";

// export interface Reservation extends Document {
//   _id: string;
//   userId: string;
//   num_of_people: number;
//   date_time: Date; // Stored as a Date in MongoDB
//   status: string;
//   special_request?: string;
//   preorders: {
//     menuItemId: string;
//     quantity: number;
//   }[];
//   createAt: Date; // Stored as a Date in MongoDB
// }

// const ReservationSchema: Schema = new Schema({
//   userId: { type: String, required: true },
//   num_of_people: { type: Number, required: true },
//   date_time: { type: Date, required: true },
//   status: { type: String, required: true },
//   special_request: { type: String },
//   preorders: [
//     {
//       menuItemId: { type: String, required: true },
//       quantity: { type: Number, required: true },
//     },
//   ],
//   createAt: { type: Date, default: Date.now },
// });

// export const ReservationModel = mongoose.model<Reservation>(
//   "Reservation",
//   ReservationSchema
// );

//Jan 4
import mongoose, { Collection } from "mongoose";
import { Reservation } from "./schemas/reservation";

class ReservationDatabase {
  get reservations(): Collection<Reservation> {
    return mongoose.connection.collection("reservations");
  }
}

export default new ReservationDatabase();
