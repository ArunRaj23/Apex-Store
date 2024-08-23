import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  searchTerm: "",
  category: "",
  other: "",
}

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setOther: (state, action) => {
      state.other = action.payload
    },
  },
})

export const { setSearchTerm, setCategory, setOther } = filtersSlice.actions

export default filtersSlice.reducer
