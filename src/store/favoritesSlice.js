import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  lastUpdated: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.items.find((item) => item.name === action.payload.name);
      if (!exists) {
        state.items.push(action.payload);
        state.lastUpdated = new Date().toISOString();
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
      state.lastUpdated = new Date().toISOString();
    },
    clearFavorites: (state) => {
      state.items = [];
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;