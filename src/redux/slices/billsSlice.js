import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  billsId: [],
  billsData: [],
};
const userBillsSlice = createSlice({
  name: "userBills",
  initialState,
  reducers: {
   
  },
});

export const userBillsACtions = userBillsSlice.actions;

export default userBillsSlice.reducer;
