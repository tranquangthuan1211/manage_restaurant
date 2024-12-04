import express from "express"
import ComplaintController from "../controllers/complaint.controller"
const router = express.Router()

function useRouteComplaint() {
    router.get("/", ComplaintController.getComplaints)
    router.post("/", ComplaintController.createComplaint)
    router.get("/:id", ComplaintController.getComplaint)
    router.put("/:id", ComplaintController.updateComplaint)
    router.delete("/:id", ComplaintController.deleteComplaint)
    return router
}

export default useRouteComplaint