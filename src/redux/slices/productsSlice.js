import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: [],
  categorys: [],
  tableList: [],
  sofaList: [],
  chairList: [],
  cabinetList: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productsList = action.payload;
    },
    setCategory: (state, action) => {
      state.categorys = action.payload;
    },
  },
});

export const productsACtions = productsSlice.actions;

export default productsSlice.reducer;
