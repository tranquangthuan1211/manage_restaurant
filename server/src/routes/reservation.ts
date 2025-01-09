// import OrderController from '../controllers/order.controller'
// import express from 'express'
// const router = express.Router()

// function useRouteReservation() {
//     router.get('/', OrderController.getOrders)
//     router.post('/', OrderController.createOrder)
//     router.get('/:id', OrderController.getOrder)
//     router.patch('/:id', OrderController.updateOrder)
//     router.delete('/:id', OrderController.deleteOrder)
//     return router
// }

// export default useRouteReservation

//MPhuong edited
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

// Jan 4
import express from "express";
import ReservationController from "../controllers/reservations.controller";

const router = express.Router();

function useRouteReservations() {
  router.post("/", ReservationController.createReservation);
  return router;
}

export default useRouteReservations;
