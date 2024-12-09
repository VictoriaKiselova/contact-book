import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const register = createAsyncThunk(
  "auth/register",
  async ({ displayName, email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName });
      const idToken = await user.getIdToken();
      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        token: idToken,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        code: error.code,
      });
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        token: idToken,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        code: error.code,
      });
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async user => {
          if (user) {
            const token = await user.getIdToken(true);
            resolve({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              token,
            });
          } else {
            reject("No user found");
          }
        });
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
