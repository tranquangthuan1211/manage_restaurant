import ReviewController from '../controllers/reviews.controller';
import express from 'express';

const router = express.Router();

function useRouteReviews() {
    router.post('/', ReviewController.createReview);
    return router
}

export default useRouteReviews