import cartReducer from "@/redux/features/cartSlice"
import filtersReducer from "@/redux/features/filtersSlice"
import { combineReducers } from "@reduxjs/toolkit"

export const rootReducer = combineReducers({
  filters: filtersReducer,
  cart: cartReducer,
})

export type RootState = ReturnType<typeof rootReducer>
