import OrderController from '../controllers/order.controller'
import express from 'express'
const router = express.Router()

function useRouteReservation() {
    router.get('/', OrderController.getOrders)
    router.post('/', OrderController.createOrder)
    router.get('/:id', OrderController.getOrder)
    router.patch('/:id', OrderController.updateOrder)
    router.delete('/:id', OrderController.deleteOrder)
    return router
}

export default useRouteReservation