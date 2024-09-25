import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favPlants: {},
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const currId = action.payload.id;
      state.currentResults[currId].isFavorite ? state.currentResults[currId].isFavorite = false : state.currentResults[currId].isFavorite = true;

    },
    getFavorites: () => {

    },
    setNote: (state, action) => {
      const currId = action.payload.id;
      state.currentResults[currId].userNote = action.payload.userNote;
    },
  },
});

export const {
  toggleFavorite,
  setNote
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
