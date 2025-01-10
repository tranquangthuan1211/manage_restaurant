import MenuDataBase from '../models/menu-model'
export async function handleGetFood() {
    try {
        let pipeline: any[] = [];

        pipeline = pipeline.concat([
            {
                $lookup: {
                    from: "category",
                    let: { categoryId: { $toObjectId: "$category" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$categoryId"] } } }, 
                        { $project: { name: 1, _id: 1 } }
                    ],
                    as: "category"
                }
            }
        ]);

        pipeline.push({
            $project: {
                _id: 1,
                name: 1,
                price: 1,
                image: 1,
                description: 1,
                category: { $arrayElemAt: ["$category.name", 0] }
            }
        });

        const data = await MenuDataBase.menu.aggregate(pipeline).toArray();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

