import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      displayName: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder =>
    builder
      .addCase(register.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(register.rejected, state => {
        state.error = true;
        state.loading = false;
      })
      .addCase(logIn.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.user.name = action.payload.displayName;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(logIn.rejected, state => {
        state.error = true;
        state.loading = false;
      })
      .addCase(logOut.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = {
          displayName: null,
          email: null,
        };
        state.items = [];
        state.token = null;
        state.isLoggedIn = false;
        state.loading = false;
      })
      .addCase(logOut.rejected, state => {
        state.error = true;
        state.loading = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
        state.loading = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.user.name = action.payload.displayName;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.loading = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
        state.loading = false;
      }),
});

export default authSlice.reducer;
