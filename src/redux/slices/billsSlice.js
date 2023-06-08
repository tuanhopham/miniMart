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
    addBills:(state,action)=>{
      state.billsData.push(action.payload);
    },
    setAllBills:(state,action)=>{
      state.allBills = action.payload;
    }
  },
});

export const BillsACtions = BillsSlice.actions;

export default BillsSlice.reducer;
