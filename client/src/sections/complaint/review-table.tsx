import { CustomTable } from "src/components/custom-table";
import { getReviewDetailsConfig } from "./review-table-config";
import usePagination from 'src/hooks/use-pagination';
import { TablePagination } from "@mui/material";
import { ReviewDetails } from "src/types/review";
import { useDialog } from "src/hooks/use-dialog";
import { useEffect, useState } from "react";
import { apiGet } from "src/api/api-requests";
import ReviewDetailsDialog from './review-details-dialog';

export const ReviewsTable = () => {
    const [reviews, setReviews] = useState<ReviewDetails[]>([]);
    const [loading, setLoading] = useState(false);
    const reviewDialog = useDialog<ReviewDetails>();

    useEffect(() => {
        // For testing purposes, we will only fetch reviews if there are none
        if (reviews.length > 0) return;

        const fetchReviews = async () => {
            setLoading(true);
            try {
                const response = await apiGet("/reviews");
                console.log("Getting reviews...");
                if (response.error === 0) {
                    console.log("Reviews: \n", JSON.stringify(response.data, null, 2));
                    setReviews(response.data.items);
                } else {
                    console.error("Failed to fetch reviews:", response.message);
                }
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setLoading(false);
            }
        };

        console.log("Getting reviews...");
        fetchReviews();
    }, []);

    const configs = getReviewDetailsConfig({
        onView: (review: ReviewDetails) => { reviewDialog.handleOpen(review) },
    });

    const pagination = usePagination({ count: reviews.length, base1Index: true });

    return (
        <>
            {loading ? (
                <div className="flex text-center w-full justify-center">
                    <h1>Loading...</h1>
                </div>
            ) : (
                reviews && reviews.length > 0 ? (
                    <>
                        <CustomTable
                            configs={configs}
                            rows={reviews}
                            pagination={pagination}
                        />
                        <ReviewDetailsDialog
                            open={reviewDialog.open}
                            onClose={reviewDialog.handleClose}
                            review={reviewDialog.data as ReviewDetails | null}
                        />
                    </>
                ) : (
                    <div className="flex text-center w-full justify-center">
                        <h1>No reviews found</h1>
                    </div>
                )
            )}
        </>
    );
};