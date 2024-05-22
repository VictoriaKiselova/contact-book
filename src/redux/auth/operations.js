import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", newUser);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    console.log(userInfo);
    try {
      const response = await axios.post("/users/login", userInfo);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.post("/users/logout");
    axios.defaults.headers.common["Authorization"] = "";
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    const savedToken = reduxState.auth.token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;

    const response = await axios.get("/users/current");
    console.log(response.data);
    return response.data;
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.token;
      return savedToken !== null;
    },
  }
);
