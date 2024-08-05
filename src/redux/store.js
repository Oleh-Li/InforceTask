import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/products.js";

const store = configureStore({
    reducer: {
        products: productsReducer,
    },
})

export default store