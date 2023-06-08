import { createSlice } from "@reduxjs/toolkit";
import { addCartUserApi } from "../../userApi/cart/cartApi";
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantily: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantily++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          image: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      addCartUserApi(state.cartItems, state.totalAmount, state.totalQuantily);
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantily = state.totalQuantily - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      addCartUserApi(state.cartItems, state.totalAmount, state.totalQuantily);
    },
    changeQuantityItem: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item) {
        const quantityDiff = quantity - item.quantity;
        item.quantity = quantity;
        item.totalPrice =
          Number(item.totalPrice) + Number(item.price) * quantityDiff;

        state.totalQuantily += quantityDiff;
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
      }
      addCartUserApi(state.cartItems, state.totalAmount, state.totalQuantily);
    },
    setItem: (state, action) => {
      const { cartItems, totalAmount, totalQuantily } = action.payload;
      state.cartItems = cartItems;
      state.totalAmount = totalAmount;
      state.totalQuantily = totalQuantily;
    },
  },
});

export const cartACtions = cartSlice.actions;

export default cartSlice.reducer;
