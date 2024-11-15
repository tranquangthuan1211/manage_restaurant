export interface Food {
    _id: string;
    id: string;
    name: string;
    price: string;
    category: string;
    status: string;
    description: string;
    image: string;
    evaluate: string;
    createdAt: string;
    updatedAt: string;
}

export const initialFood: Food = {
    _id: "",
    id: "",
    name: "",
    price: "",
    category: "Món chính",
    status: "",
    description: "",
    image: "",
    evaluate:"",
    createdAt: "",
    updatedAt: "",
}
export const foodFilterFunction = (
    food: Food,
    filter: Partial<Omit<Food, "ID">>
  ) => {
    return (
      (!filter.name ||
        filter.name == "Tất cả" ||
        food.name
          .toLowerCase()
          .includes(filter.name.toLowerCase())) &&
      (!filter.price ||
        filter.price == "Tất cả" ||
        food.price
          .toLowerCase()
          .includes(filter.price.toLowerCase())) &&
      (!filter.evaluate ||
        filter.evaluate == "Tất cả" ||
        food.evaluate
          .toLowerCase()
          .includes(filter.evaluate.toLowerCase())) &&
        (!filter.category ||
        filter.category == "Tất cả" ||
        food.category
            .toLowerCase()
            .includes(filter.category.toLowerCase()))
    );
  };