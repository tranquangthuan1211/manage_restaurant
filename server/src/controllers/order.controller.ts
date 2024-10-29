import { Request, Response } from 'express'
import OrderDataBase from '../models/order-model'
import { Order, OrderDetail } from '../models/schemas/order'
import { ObjectId } from 'mongodb'

async function getOrderDetails() {
    try {
        let pipeline: any[] = []
        pipeline = pipeline.concat([
            {
                $lookup: {
                    from: "menu",
                    let: { productId: { $toObjectId: "$product_id" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$productId"] } } },
                        { $project: { name: 1, price: 1, _id: 1 } }
                    ],
                    as: "product"
                }
            },
            {
                $lookup: {
                    from: "users",
                    let: { userId: { $toObjectId: "$user_id" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                        { $project: { name: 1, _id: 1 } }
                    ],
                    as: "user"
                }
            }
        ])
        pipeline.push({
            $project: {
                _id: 1,
                name_product: { $arrayElemAt: ["$product.name", 0] },
                price_product: { $arrayElemAt: ["$product.price", 0] },
                name_user: { $arrayElemAt: ["$user.name", 0] },
                quantity: 1,
                status: 1,
                created_at: 1,
                updated_at: 1
            }
        })
        const data = await OrderDataBase.orders.aggregate(pipeline).toArray()
        return data
    }
    catch (error: any) {
        throw new Error(error.message)
    }
}
async function getOderUser(id: String){
    try {
        let pipeline: any[] = []
        pipeline = pipeline.concat([
            {
                $match: {
                    user_id: id
                }
            },
            {
                $lookup: {
                    from: "menu",
                    let: { productId: { $toObjectId: "$product_id" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$productId"] } } },
                        { $project: { name: 1, price: 1, _id: 1 } }
                    ],
                    as: "product"
                }
            },
            {
                $lookup: {
                    from: "users",
                    let: { userId: { $toObjectId: "$user_id" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                        { $project: { name: 1, _id: 1 } }
                    ],
                    as: "user"
                }
            }
        ])
        pipeline.push({
            $project: {
                _id: 1,
                name_product: { $arrayElemAt: ["$product.name", 0] },
                price_product: { $arrayElemAt: ["$product.price", 0] },
                name_user: { $arrayElemAt: ["$user.name", 0] },
                quantity: 1,
                status: 1,
                created_at: 1,
                updated_at: 1
            }
        })
        const data = await OrderDataBase.orders.aggregate(pipeline).toArray()
        return data
    }
    catch (error: any) {
        throw new Error(error.message)
    }
}
class OrderController {
    async getOrders(req: Request, res: Response) {
        try {
            const orders = await getOrderDetails()
            res.status(200).json(orders)
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
