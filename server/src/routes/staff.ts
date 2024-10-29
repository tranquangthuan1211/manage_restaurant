import express from 'express';
import StaffController from '../controllers/staff.controller';
const router = express.Router();

const useRouteStaff = () => {
    router.get("/", StaffController.getStaffs);
    router.get("/:id", StaffController.getStaff);
    router.post("/", StaffController.createStaff);
    router.put("/:id", StaffController.updateStaff);
    router.delete("/:id", StaffController.deleteStaff);
    return router;
}

export default useRouteStaff;