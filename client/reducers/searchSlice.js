import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchBarValue: '',
  currentResults: [],
  cachedSearches: {},
  allPreviousSearches: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchBarValue = action.payload;
    },
    setCurrentResults: (state, action) => {
      state.currentResults = action.payload;
    },
    addCachedSearches: (state, action) => {
      const {searchBarValue, currentResults} = action.payload;
      state.cachedSearches[searchBarValue] = currentResults;
    },
    addAllPreviousSearches: (state, action) => {
      const resultSet = new Set(state.allPreviousSearches.map(item => item.common_name));
      action.payload.forEach((el) => {
        if (!resultSet.has(el.common_name)) {
          resultSet.add(el.common_name); 
          state.allPreviousSearches.push(el); 
        }
      });
    },

    //// Deprecated code due to lack of async thunk
    // addFavorite: async (state, action) => {
    //   const plantId = action.payload.plantId;
    //   const newFavPlant = findNewFavorite(plantId, state.currentResults)
    //   const userId = action.payload.userId;
    //   const url = '/favorites'
    //   console.log(`trying to add favorite: ${plantId}`)
    //   await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({plantId: plantId, userId: userId}),
    //   })
    //   const newFavList = [...state.favPlants];
    //   const newFavorite = {
    //     ...newFavPlant,
    //     userId: userId,
    //   }
    //   newFavList.push(newFavorite)
    //   state.favPlants = newFavList;
    // },
    // removeFavorite: (state, action) => {
    //   const plantId = action.payload.plantId;
    //   const userId = action.payload.userId;
    //   const url = '/favorites';
    //   console.log(`trying to delete: ${plantId}`)
    //   fetch(url, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({plantId: plantId, userId: userId}),
    //   })
    //   const newFavList = [...state.favPlants];
    //   for(let i = 0; i < newFavList.length; i++){
    //     if( newFavList[i].plantId === plantId && newFavList[i].userId === userId ){
    //       newFavList.splice(i, 1)
    //       break
    //     }
    //   }
    //   state.favPlants = newFavList;
    // },
    // setNote: (state, action) => {
    //   const plantId = action.payload.plantId;
    //   const userId = action.payload.userId;

    // },
  },
});

export const {
  setSearchValue,
  setCurrentResults,
  addCachedSearches,
  addAllPreviousSearches,
  addFavorite,
  removeFavorite,
  setNote,
} = searchSlice.actions;

export default searchSlice.reducer;
