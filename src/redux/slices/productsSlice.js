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
    addProducts: (state, action) => {
      state.productsList.push(action.payload);
    },
    setProduct: (state, action) => {
     const newData = state.productsList.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item
      });
      state.productsList = newData
    },
    deleteProduct: (state, action) => {
      const newData = state.productsList.filter((item) => item.id !== action.payload.id);
      state.productsList = newData
     },
    
  },
});

export const productsACtions = productsSlice.actions;

export default productsSlice.reducer;
