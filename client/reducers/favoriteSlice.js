import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  favPlants: [],
  status: 'idle'
  // error: null,
};


export const fetchFavorites = createAsyncThunk(
  'favorites/fetchingfavs',
  async (username) => {
    console.log(`in async thunk`, username)
    const favorites = await fetch(`/api/plants/${username}`, {
      headers: { "content-Type": "application/json" },
    });
    console.log('favorites', favorites)
    if (!favorites.ok) {
      throw new Error("cannot fetch favorites");
    }
    const favoritePage = await favorites.json();
    console.log("fav", favoritePage);
    return favoritePage;
  }
);

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const currId = action.payload.id;
      state.currentResults[currId].isFavorite ? state.currentResults[currId].isFavorite = false : state.currentResults[currId].isFavorite = true;

    },

    setNote: (state, action) => {
      const currId = action.payload.id;
      state.currentResults[currId].userNote = action.payload.userNote;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchFavorites.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchFavorites.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.favPlants = action.payload
    })
    .addCase(fetchFavorites.rejected, (state, action)=>{
      state.status = 'failed'
      // state.error = action.error.message;
    })

  }
});

export const deleteFavorites = createAsyncThunk(
  `database/deletefavorite`,
  async (plantInfo) => {
    const details = await fetch(`/api/plants`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({
        userId: plantInfo.username,
        id: plantInfo.plantId,
      }),
    });
    if (!details.ok) {
      throw new Error('Cannot add plant to favorites');
    }
    // const favorite = await details.json();
    console.log('success')
  }
);






export const {
  toggleFavorite,
  setNote,
  getFavorites
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
