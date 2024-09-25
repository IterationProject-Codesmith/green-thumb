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
    addCachedSearches: (state) => {
      state.cachedSearches[state.searchBarValue] = state.currentResults;
    },
    addAllPreviousSearches: (state, action) => {
        const resultSet = new Set(state.allPreviousSearches);
        action.payload.forEach(el => result.add(el));
        const resultArr = [...resultSet];
      state.allPreviousSearches.push(resultArr);
    },
  },
});

export const {
  setSearchValue,
  setCurrentResults,
  addCachedSearches,
  addAllPreviousSearches,
} = searchSlice.actions;

export default searchSlice.reducer;
