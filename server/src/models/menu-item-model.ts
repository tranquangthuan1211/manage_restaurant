import { Collection } from "mongoose";
import mongoose from "mongoose";
import { MenuItemSchema } from "./schemas/menu-item";

class MenuItemsDataBase {
    get menuItems(): Collection<MenuItemSchema> {
        return mongoose.connection.collection('menu-items');
    }
}

export default new MenuItemsDataBase();