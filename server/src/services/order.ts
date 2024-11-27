import OrderDataBase  from "../models/order-model"
export async function getOrderDetails() {
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
export async function getOderUser(id: String){
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