import OrderController from '../controllers/order.controller'
import express from 'express'
import {checkOrderMiddleware} from "../middlewares/order-check.middleware"
const router = express.Router()

function useRouteOrder() {
    router.post('/', OrderController.createOrder)
    router.get('/:id', OrderController.getOrder)
    router.patch('/:id', OrderController.updateOrder)
    router.delete('/:id', OrderController.deleteOrder)
    router.use(checkOrderMiddleware)
    router.get('/', OrderController.getOrders)
    router.patch('/',OrderController.finishingOrder)
    return router
}

export default useRouteOrder