import { Review } from "../models/schemas/review";
import { Request, Response } from "express";
import ReviewDataBase from "../models/review-model";

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

}

export default new ReviewController();