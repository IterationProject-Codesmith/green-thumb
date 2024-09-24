import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  isLoggedIn: false,
  favoritePlants: {},
  favoriteSearch: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPlant: (state) => {},
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setLoggedIn: (state) => {
      if (state.isLoggedIn) {
        state.isLoggedIn = false;
      } else if (state.isLoggedIn) {
        state.isLoggedIn = true;
      }
    },
  },
});

export const { addPlant, setUsername, setLoggedIn } = userSlice.actions;
export const selectUsername = (state) => state.user.username;
export default userSlice.reducer;
