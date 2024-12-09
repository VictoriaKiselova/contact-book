import { createAsyncThunk } from "@reduxjs/toolkit";
import { database, auth } from "../../../firebase";
import { ref, get, set, remove } from "firebase/database";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return thunkAPI.rejectWithValue("User is not authorized");
    }

    const userId = currentUser.uid;
    const contactsRef = ref(database, `contacts/${userId}`);
    try {
      const snapshot = await get(contactsRef);
      if (snapshot.exists()) {
        const contactsArray = Object.entries(snapshot.val()).map(
          ([id, contact]) => ({
            id,
            ...contact,
          })
        );
        return contactsArray;
      } else {
        return [];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number, id }, thunkAPI) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return thunkAPI.rejectWithValue("User is not authorized");
    }

    const userId = currentUser.uid;
    try {
      await set(ref(database, `contacts/${userId}/${id}`), {
        name: name,
        number: number,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return thunkAPI.rejectWithValue("User is not authorized");
    }

    const userId = currentUser.uid;
    try {
      await remove(ref(database, `contacts/${userId}/${id}`));
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, name, number }, thunkAPI) => {
    try {
      await set(ref(database, `contacts/${id}`), {
        name: name,
        number: number,
      });
      return { id, name, number };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
