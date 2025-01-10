import ReviewController from '../controllers/reviews.controller';
import express from 'express';

const router = express.Router();

function useRouteReviews() {
    router.post('/', ReviewController.createReview);
    router.get('/by-reservation/:id', ReviewController.getReviewByReservation);
    router.get('/by-user/:id', ReviewController.getReviewsByUser);
    return router
}

export default useRouteReviews