import { Collection } from "mongoose";
import mongoose from "mongoose";
import { MenuItemSchema } from "./schemas/menu-item";

class MenuDataBase {
    get menu(): Collection<MenuItemSchema> {
        return mongoose.connection.collection('menu-items');
    }
}

export default MenuDataBase;