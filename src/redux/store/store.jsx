import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { materialesReducer } from "../slices/materialesSlice";
import { constantesReducer } from "../slices/constantesSlice";
import { productosReducer } from "../slices/productosSlice";

export const store = configureStore({
    reducer: combineReducers({
        materiales: materialesReducer.reducer,
        constantes: constantesReducer.reducer,
        productos: productosReducer.reducer
    }),

    devTools: process.env.NODE_ENV === 'development',
});