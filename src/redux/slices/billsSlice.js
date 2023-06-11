import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allBills: [],
  billsData: [],
};
const BillsSlice = createSlice({
  name: "Bills",
  initialState,
  reducers: {
    setBills: (state, action) => {
      state.billsData = action.payload;
    },
    addBills: (state, action) => {
      state.billsData.push(action.payload);
    },
    setAllBills: (state, action) => {
      state.allBills = action.payload;
    },
    updateBills: (state, action) => {
      const updatedBills = state.allBills.map((bill) =>
        bill.billId === action.payload.billId ? action.payload : bill
      );
      state.allBills = updatedBills;
    },
    deleteBills: (state, action) => {
      const updatedBills = state.allBills.filter(
        (bill) => bill.billId !== action.payload.billId
      );
      // state.allBills = updatedBills;
      console.log(updatedBills);
    },
  },
});

export const BillsACtions = BillsSlice.actions;

export default BillsSlice.reducer;
