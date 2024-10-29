import OrderController from '../controllers/order.controller'
import express from 'express'
import { managerMiddleware } from '../middlewares/manger.middileware'
const router = express.Router()

function useRouteOrder() {
    router.get('/', OrderController.getOrders)
    router.post('/', OrderController.createOrder)
    router.get('/:id', OrderController.getOrder)
    router.patch('/:id', OrderController.updateOrder)
    router.delete('/:id', OrderController.deleteOrder)
    return router
}

export default useRouteOrder