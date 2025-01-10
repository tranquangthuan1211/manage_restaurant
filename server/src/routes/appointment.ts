import express from "express"
import AppointmentController from "../controllers/appointment.controller"
import { userMiddleware } from "../middlewares/user.middleware"

const router = express.Router() 

const useRouteAppointment = () => {
    router.get('/', AppointmentController.getAppointments)
    router.use(userMiddleware)
    router.post('/', AppointmentController.createAppointment)

    router.get('/:id', AppointmentController.getAppointmentUser)
    router.patch('/:id', AppointmentController.updateAppointment)
    router.delete('/:id', AppointmentController.deleteAppointment)

    return router
}

export default useRouteAppointment