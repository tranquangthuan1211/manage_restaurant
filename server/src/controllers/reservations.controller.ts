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
import ReviewDatabase from "../models/review-model";
import UsersDataBase from "../models/user-model";
import ReservationDatabase from "../models/reservation-model";
import { ObjectId, WithId } from 'mongodb';
// import MenuItemsDataBase from "../models/menu-item-model";
// import { MenuItemSchema } from "../models/schemas/menu-item";
import MenuDatabase from "../models/menu-model";
import { error } from "console";
import { it } from "node:test";
import { extractId } from "../schema_util/schema_util";
import { Review } from "../models/schemas/review";

interface ReservationDetails {
  id: string;
  userId: string;
  userName: string;
  num_of_people: number;
  date_time: string;
  status: string;
  special_request: string;
  preorders: {
    menuItemId: string;
    quantity: number;
    name: string;
  }[];
  reviewId: string;
  createAt: string;
}

const extractDetails = async (reservation: Reservation): Promise<ReservationDetails | null> => {
  const reservationDetails: ReservationDetails = {
    id: reservation.id || "",
    userId: reservation.userId,
    userName: "", 
    num_of_people: reservation.num_of_people,
    date_time: reservation.date_time,
    status: reservation.status,
    special_request: reservation.special_request || "",
    preorders: [],
    createAt: reservation.createAt || "",
    reviewId: "",
  }
  // Join to find if there are any reviews on this reservation
  const reviewWithId : WithId<Review> | null= await ReviewDatabase.reviews.findOne({ reservationId: reservation.id });
  if (reviewWithId != null) {
    reservationDetails.reviewId = reviewWithId._id.toHexString();
  }

  // Get the menu item names for the preorders
  for (let i = 0; i < reservation.preorders.length; i++) {
    const preorder = reservation.preorders[i];
    // Check if the menu item id valid
    if (ObjectId.isValid(preorder.menuItemId) === false) {
      continue
    }
    const menuItem = await MenuDatabase.menu.findOne({
      _id: new ObjectId(preorder.menuItemId),
    });
    if (menuItem) {
      reservationDetails.preorders.push({
        menuItemId: preorder.menuItemId,
        name: menuItem.name,
        quantity: preorder.quantity,
      });
    }
  }

  // Get the name of the user reserved
  if (ObjectId.isValid(reservation.userId) === false) {
    return null;
  }
  const user = await UsersDataBase.users.findOne({ _id: new ObjectId(reservation.userId) });
  if (!user) {
    return null;
  }
  reservationDetails.userName = user.name;

  return reservationDetails;
}


class ReservationController {
  async updateReservationStatus(req: Request, res: Response) {
    try {
      const reservationId = req.params.id as string;
      const status = req.body.status as string;

      // Find the reservation by ID
      const reservationWithId: WithId<Reservation> | null = await ReservationDatabase.reservations.findOne({
        _id: new ObjectId(reservationId),
      });

      // If the reservation is not found
      if (!reservationWithId) {
        res.status(404).json({
          error: 1,
          message: `Reservation with ID ${reservationId} not found`,
        });
        return;
      }

      // Update the status
      await ReservationDatabase.reservations.updateOne(
        { _id: new ObjectId(reservationId) },
        { $set: { status: status } }
      );

      res.status(200).json({
        error: 0,
        message: "Reservation status updated successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        error: 1,
        message: "An unknown error occurred",
      });
    }
  }
  async createReservation(req: Request, res: Response): Promise<void> {// Why Promise<void>?, should be Promise<any>
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

  // Get the reservation including the preorder names
  // THis breaks the rule of separation of concerns. Any touches to the database should be done in the model
  async getReservation(req: Request, res: Response) {
    try {
      const reservationId = req.params.id as string;
      // Find the reservation by ID
      const reservationWithId: WithId<Reservation> | null = await ReservationDatabase.reservations.findOne({
        _id: new ObjectId(reservationId),
      });
        
      // If the reservation is not found
      if (!reservationWithId) {
        res.status(404).json({
          error: 1,
          message: `Reservation with ID ${reservationId} not found`,
        });
        return;
      }
      const reservation : Reservation = extractId(reservationWithId) as Reservation;

      const reservationDetails = await extractDetails(reservation);

      res.status(200).json({
        error: 0,
        message: "OK",
        data: reservationDetails,
      });


    } catch (error: any) {
      res.status(500).json({
        error: 1,
        message: error.message,
      });
    }
  }

  // Get all reservations
  async getReservations(req: Request, res: Response) {
    try {
      // Pagination
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const reservations = await ReservationDatabase.reservations.find(
        {},
        {
          limit: limit,
          skip: (page - 1) * limit,
        }
      );

      // Total pages
      const totalItemsCount = await ReservationDatabase.reservations.countDocuments();

      const totalPages = Math.ceil(totalItemsCount / limit);

      const pagination = {
        page: page,
        totalPages: totalPages,
        totalItems: totalItemsCount,
        limit: limit,
      }

      const reservationDetailsList: ReservationDetails[] = [];
      for await (const reservationWithId of reservations) {
        const reservation = extractId(reservationWithId) as Reservation;
        const reservationDetail = await extractDetails(reservation);
        if (reservationDetail != null) {
          reservationDetailsList.push(reservationDetail);
        }
      }

      res.status(200).json({
        error: 0,
        message: "OK",
        data: {
          items: reservationDetailsList,
          pagination: pagination,
        },
      });
    } catch (error: any) {
      console.error("Error getting reservations:", error.message || error);
      res.status(500).json({
        message: "An unknown error occurred",
      });
    }
  }

  async getReservationsByUser(req: Request, res: Response) {
    try {
      const userId = req.params.id as string;
      // Pagination
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const reservations = await ReservationDatabase.reservations.find(
        {
          userId: userId,
        },
        {
          limit: limit,
          skip: (page - 1) * limit,
        }
      );

      if (!reservations) {
        res.status(404).json({
          error: 1,
          message: `Reservations for user ID ${userId} not found`,
        });
        return;
      }

      // Total pages
      const totalItemsCount = await ReservationDatabase.reservations.countDocuments({
        userId: userId,
      });

      const totalPages = Math.ceil(totalItemsCount / limit);

      const pagination = {
        page: page,
        totalPages: totalPages,
        totalItems: totalItemsCount,
        limit: limit,
      }
      
      const reservationDetailsList: ReservationDetails[] = [];
      for await (const reservationWithId of reservations) {
        const reservation = extractId(reservationWithId) as Reservation;
        const reservationDetail = await extractDetails(reservation);
        if (reservationDetail != null) {
          reservationDetailsList.push(reservationDetail);
        }
      }

      res.status(200).json({
        error: 0,
        message: "OK",
        data: {
          items: reservationDetailsList,
          pagination: pagination,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        message: "An unknown error occurred",
      });
    }
  }

  // Add other functions like getReservations, updateReservation, deleteReservation as needed
}

export default new ReservationController();
