import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteStart: (state) => {
      state.loading = true;
    },
    deleteSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
    deleteFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutStart: (state) => {
      state.loading = true;
    },
    signoutSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
    signoutFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailed,
  deleteStart,  
  deleteSuccess,
  deleteFailed,
  signoutStart,
  signoutSuccess,
  signoutFailed,
} = userSlice.actions;

export default userSlice.reducer;
