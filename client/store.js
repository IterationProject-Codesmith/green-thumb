import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import searchReducer from './reducers/searchSlice';
import favoritesReducer from './reducers/favoriteSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    favorites: favoritesReducer,
  },
});
