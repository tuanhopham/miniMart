import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";
import productsSlice from "./slices/productsSlice";
import  userSlice from "./slices/userSlice";
import  BillsSlice from "./slices/billsSlice";

const store = configureStore({
    reducer:{
        cart: cartSlice,
        products:productsSlice,
        user:userSlice,
        bills:BillsSlice,
    }
})

export default store