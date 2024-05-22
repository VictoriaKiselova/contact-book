import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
    number: "",
  },
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
      state.number = action.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;
