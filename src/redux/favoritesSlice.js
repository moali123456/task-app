import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritesData: null,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavoritesData: (state, action) => {
      state.favoritesData = action.payload;
    },
  },
});

export const { setFavoritesData } = favoritesSlice.actions;

export default favoritesSlice.reducer;
