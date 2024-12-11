import express from 'express';
import StaffController from '../controllers/staff.controller';
import {managerMiddleware} from "../middlewares/manger.middileware"
const router = express.Router();

const useRouteStaff = () => {
    router.get("/:id", StaffController.getStaff);
    router.put("/:id", StaffController.updateStaff);
    router.use(managerMiddleware);
    router.post("/", StaffController.createStaff);
    router.get("/", StaffController.getStaffs);
    router.patch("/", StaffController.updateStaffById);
    router.delete("/:id", StaffController.deleteStaff)
    return router;
}

export default useRouteStaff;