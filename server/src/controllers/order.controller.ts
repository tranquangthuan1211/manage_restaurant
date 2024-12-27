import { Request, Response } from 'express'
import OrderDataBase from '../models/order-model'
import { Order, OrderDetail } from '../models/schemas/order'
import { ObjectId } from 'mongodb'
import {getOrderDetails,getOderUser} from "../services/order"
import { error } from 'console'
class OrderController {
    async getOrders(req: Request, res: Response) {
        try {
            const orders = await getOrderDetails()
            res.status(200).json({
                error: 0,
                message: 'success',
                data: orders
            })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    async createOrder(req: Request, res: Response) {
        try {
            const order: Order = req.body
            order.created_at = new Date()
            order.updated_at = new Date()
            await OrderDataBase.orders.insertOne(order)
            res.status(201).json(order)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    async getOrder(req: Request, res: Response) {
        try {
            const order = await getOderUser(req.params.id)
            if (!order) {
                res.status(404).json({ message: 'Order not found' })
            } else {
                res.status(200).json(order)
            }
        } catch (error:any) {
            res.status(500).json({ message: error.message })
        }
    }

    async updateOrder(req: Request, res: Response) {
        try {
            const order: Order = req.body
            order.updated_at = new Date()
            await OrderDataBase.orders.updateOne({ _id: new ObjectId(req.params.id) }, { $set: order })
            res.status(200).json(order)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
    async finishingOrder(req:Request,res:Response){
        try {
            const id = req.query.id;
            if(!id) {
                throw new Error("order id is required")
            }
            const result = await OrderDataBase.orders.updateOne({ _id: new ObjectId(id as string)}, {$set: {status: "finish"}})
            return res.status(200).json({
                error:0,
                message: "finishing order",
            })
        }catch(err:any){
            return res.status(500).json({
                error:1,
                message: err.message
            })
        }
        
    }
    async deleteOrder(req: Request, res: Response) {
        try {
            await OrderDataBase.orders.deleteOne({ _id: new ObjectId(req.params.id) })
            res.status(204).json()
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new OrderController()
