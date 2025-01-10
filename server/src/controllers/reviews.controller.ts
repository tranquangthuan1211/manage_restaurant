import { Review } from "../models/schemas/review";
import { Request, Response } from "express";
import ReviewDataBase from "../models/review-model";
import { ObjectId } from "mongodb";
import { Reservation } from "../models/schemas/reservation";
import { extractId } from "../schema_util/schema_util";

import ReservationDatabase from "../models/reservation-model";

interface ReviewDetails {
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

const extractDetails = async (review: Review): Promise<ReviewDetails> => {
  const reviewDetails: ReviewDetails = {
    id: review.id || "",
    userId: review.userId,
    reservationId: review.reservationId,
    reservationDateTime: "", // added this
    overall: review.overall,
    atmosphere: review.atmosphere,
    cleanliness: review.cleanliness,
    serviceQuality: review.serviceQuality,
    serviceSpeed: review.serviceSpeed,
    staffAppearance: review.staffAppearance,
    staffAttitude: review.staffAttitude,
    valueOfMoney: review.valueOfMoney,
    feedback: review.feedback,
    createdAt: review.createdAt || "",
  };

  console.log("Review ID: ", review.id);
  console.log("Reservation ID: ", review.reservationId);
  // Join to find the reservation date-time
  const reservation = await ReservationDatabase.reservations.findOne({
    _id: new ObjectId(review.reservationId),
  });
  if (reservation) {
    reviewDetails.reservationDateTime = reservation.date_time;
  }

  return reviewDetails;
}

class ReviewController {
  // async getReviews(req: Request, res: Response): Promise<void> {
  //   try {
  //     res.status(200).json({ message: "Get Reviews" });
  //   } catch (error : any) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }

  // async getReview(req: Request, res: Response): Promise<void> {
  //   try {
  //     res.status(200).json({ message: "Get Review" });
  //   } catch (error : any) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }

  async createReview(req: Request, res: Response): Promise<void> {
    try {
      const review: Review = req.body;
      review.createdAt = new Date().toISOString(); // add current date time
      await ReviewDataBase.reviews.insertOne(review);
      res.status(200).json({
        error: 0,
        message: "OK",
      });
    } catch (error: any) {
      res.status(500).json({
        error: 1,
        message: "An unknown error occurred",
      });
    }
  }

  // async updateReview(req: Request, res: Response): Promise<void> {
  //   try {
  //     res.status(200).json({ message: "Update Review" });
  //   } catch (error : any) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }

  // async deleteReview(req: Request, res: Response): Promise<void> {
  //   try {
  //     res.status(200).json({ message: "Delete Review" });
  //   } catch (error : any) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }

  async getReviewByReservation(req: Request, res: Response) {
    try {
      console.log("Get review by reservation");
      const reservationId = req.params.id as string;
      const review = await ReviewDataBase.reviews.findOne({ reservationId: reservationId });
      if (!review) {
        res.status(500).json({
          error: 1,
          message: `Review with reservation ID ${reservationId} not found`,
        });
        return;
      }
      res.status(200).json({
        error: 0,
        data: review,
      });
    } catch (error: any) {
      res.status(500).json({ error: 1, message: "Unknow error"});
    }
  }

  async getReviewsByUser(req: Request, res: Response) {
    try {
      const userId = req.params.id as string;
      // Pagination
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const reviews = await ReviewDataBase.reviews.find(
        {
          userId: userId
        }, {
        limit: limit,
        skip: (page - 1) * limit,
      });

      if (!reviews) {
        res.status(404).json({
          error: 1,
          message: `Reviews for user ID ${userId} not found`,
        });
        return;
      }

      const totalItemsCount = await ReviewDataBase.reviews.countDocuments({ userId: userId });
      const totalPages = Math.ceil(totalItemsCount / limit);

      const reviewDetailsList: ReviewDetails[] = [];
      for await (const reviewWithId of reviews) {
        console.log(JSON.stringify(reviewWithId, null, 2));
        const review = extractId(reviewWithId) as Review;
        console.log(JSON.stringify(review, null, 2));
        const reviewDetails = await extractDetails(review);
        reviewDetailsList.push(reviewDetails);
      }

      res.status(200).json({
        error: 0,
        data: {
          items: reviewDetailsList,
          pagination: {
            totalItems: totalItemsCount,
            totalPages: totalPages,
            page: page,
          },
        },
      });
    } catch (error: any) {
      res.status(500).json({
        error: 1,
        message: error.message,
      });
    }
  }

}

export default new ReviewController();