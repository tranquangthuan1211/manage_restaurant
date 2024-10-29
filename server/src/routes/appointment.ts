import express from "express"
import AppointmentController from "../controllers/appointment.controller"

const router = express.Router() 

const useRouteAppointment = () => {
    router.get('/', AppointmentController.getAppointments)
    router.post('/', AppointmentController.createAppointment)

    router.get('/:id', AppointmentController.getAppointmentUser)
    router.put('/:id', AppointmentController.updateAppointment)
    router.delete('/:id', AppointmentController.deleteAppointment)

    return router
}

export default useRouteAppointment