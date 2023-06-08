import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  email: "",
  photoURL: "",
  role:"",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { displayName, email, photoURL,role } = action.payload;
      state.displayName = displayName;
      state.email = email;
      state.photoURL = photoURL;
      state.role = role;
    },
    deleteUser: (state, action) => {
      state.displayName = '';
      state.email = '';
      state.photoURL = '';
      state.role = '';
    },
  },
});

export const userACtions = userSlice.actions;

export default userSlice.reducer;
