// // import { Request, Response } from 'express'

// // async function getReservationDetails() {
// //   try {
// //     // Add your code here
// //   } catch (error: any) {
// //     throw new Error(error.message);
// //   }
// // }

// // class ReservationController {
// //   async getReservations(req: Request, res: Response) {
// //     try{
// //       const reservations = await getReservationDetails();
// //       res.status(200).json(reservations);
// //     } catch (error: any) {
// //       res.status(500).json({ message: error.message });
// //     }
// //   }
// // }

// // module.exports = ReservationController;

// //MP edited
// import express, { Request, Response } from "express";
// import { ReservationModel } from "../models/reservation-model";

// const router = express.Router();

// // POST: Add a new reservation
// router.post("/reservation", async (req: Request, res: Response) => {
//   try {
//     const { userId, num_of_people, date_time, status, special_request, preorders } = req.body;

//     // Validate required fields
//     if (!userId || !num_of_people || !date_time || !status || !preorders) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Create a new reservation
//     const newReservation = new ReservationModel({
//       userId,
//       num_of_people,
//       date_time: new Date(date_time), // Convert ISO string to Date
//       status,
//       special_request,
//       preorders,
//       createAt: new Date(), // Automatically set current date-time
//     });

//     // Save to database
//     const savedReservation = await newReservation.save();

//     // Respond with the saved reservation
//     res.status(201).json(savedReservation);
//   } catch (error) {
//     console.error("Error creating reservation:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;

//Jan 4
import { Request, Response } from "express";
import { Reservation } from "../models/schemas/reservation";
import ReservationDatabase from "../models/reservation-model";

class ReservationController {
  async createReservation(req: Request, res: Response): Promise<void> {
    try {
      const reservation: Reservation = req.body;
      reservation.createAt = new Date().toISOString(); // Add timestamp
      await ReservationDatabase.reservations.insertOne(reservation);
      res.status(200).json({
        error: 0,
        message: "Reservation created successfully!",
      });
    } catch (error: any) {
      res.status(500).json({
        error: 1,
        message: "An unknown error occurred",
      });
    }
  }

  // Add other functions like getReservations, updateReservation, deleteReservation as needed
}

export default new ReservationController();
