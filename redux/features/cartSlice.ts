import { RootState } from "@/redux/rootReducer"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type initialStateProps = {
  products: ProductProps[]
}

const initialState: initialStateProps = {
  products: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductProps>) => {
      const existingProduct = state.products.findIndex(
        (product) => product.id === action.payload.id
      )

      if (existingProduct !== -1) {
        state.products = state.products.map((product, index) =>
          index === existingProduct
            ? {
                ...product,
                quantity: product.quantity + action.payload.quantity,
                totalPrice: product.totalPrice + action.payload.totalPrice,
              }
            : product
        )
      } else {
        state.products.push(action.payload)
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      )
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id
          ? {
              ...product,
              quantity: action.payload.quantity,
              totalPrice: product.price * action.payload.quantity,
            }
          : product
      )
    },
  },
})

export const selectTotalItems = (state: RootState) =>
  state.cart.products.reduce(
    (accu: number, item: ProductProps) => accu + item.quantity,
    0
  )

export const { addProduct, removeProduct, updateProduct } = cartSlice.actions

export default cartSlice.reducer
