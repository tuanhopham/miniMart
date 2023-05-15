import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  email: "",
  photoURL: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { displayName, email, photoURL } = action.payload;
      state.displayName = displayName;
      state.email = email;
      state.photoURL = photoURL;
    },
    deleteUser: (state, action) => {
      state.displayName = '';
      state.email = '';
      state.photoURL = '';
    },
  },
});

export const userACtions = userSlice.actions;

export default userSlice.reducer;
