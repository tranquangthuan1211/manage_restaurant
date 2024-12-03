import express from "express"
import ComplaintController from "../controllers/complaint.controller"
const router = express.Router()

function useRouteComplaint() {
    router.get("/", ComplaintController.getComplaints)
    return router
}

export default useRouteComplaint