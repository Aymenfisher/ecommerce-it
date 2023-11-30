import { configureStore } from "@reduxjs/toolkit";
import routes from '../features/routes/routesSlice'
import storeInfos from "../features/storeinfos/storeInfosSlice";
import categories from "../features/categories/categoriesSlice";
import products from "../features/products/productsSlice"
import orders from "../features/orders/ordersSlice"
import cart from "../features/cart/cartSlice";
import inbox from "../features/inbox/inboxSlice"


export const store = configureStore({
    reducer:{
        routes:routes,
        storeInfos:storeInfos,
        categories:categories,
        products:products,
        cart:cart,
        orders:orders,
        inbox:inbox
    }
})