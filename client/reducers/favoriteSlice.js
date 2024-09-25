import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//   favPlants: {},
// };

// export const favoritesSlice = createSlice({
//   name: 'favorites',
//   initialState,
//   reducers: {
//     toggleFavorite: (state, action) => {
//       const currId = action.payload.id;
//       state.currentResults[currId].isFavorite ? state.currentResults[currId].isFavorite = false : state.currentResults[currId].isFavorite = true;

//     },
//     getFavorites: () => {

//     },
//     setNote: (state, action) => {
//       const currId = action.payload.id;
//       state.currentResults[currId].userNote = action.payload.userNote;
//     },
//   },
// });

export const fetchFavorites = createAsyncThunk(
  'fetchingfavs',
  async (username) => {
    const favorites = await fetch(`/api/plants/${username}`, {
      headers: { 'content-Type': 'application/json' },
    });

    if (!favorites.ok) {
      throw new Error('cannot fetch favorites');
    }
    const favoritePage = await favorites.json();
    console.log('fav', favoritePage);
    return favoritePage;
  }
);

// export const {
//   toggleFavorite,
//   setNote
// } = favoritesSlice.actions;

// export default fetchFavorites.reducer;
