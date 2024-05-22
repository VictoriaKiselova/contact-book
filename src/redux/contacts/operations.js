import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (values, thunkAPI) => {
    try {
      const response = await axios.post("contacts/", values);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const updateContact = createAsyncThunk(
//   "contacts/updateContact",
//   async (contactId, thunkAPI) => {
//     try {
//       const response = await axios.patch(`contacts/${contactId}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );